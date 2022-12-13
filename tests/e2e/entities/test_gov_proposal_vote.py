import datetime as dt
import json
import sys
import time
import unittest
from pathlib import Path

from cosmpy.aerial.client import utils
from cosmpy.aerial.tx import Transaction
from cosmpy.protos.cosmos.base.v1beta1 import coin_pb2
from cosmpy.protos.cosmos.gov.v1beta1 import gov_pb2
from cosmpy.protos.cosmos.gov.v1beta1 import tx_pb2 as gov_tx
from google.protobuf import any_pb2
from gql import gql

from tests.helpers.graphql import filtered_test_query

repo_root_path = Path(__file__).parent.parent.parent.absolute()
sys.path.insert(0, str(repo_root_path))

from src.genesis.helpers.field_enums import GovProposalVoteFields
from tests.helpers.entity_test import EntityTest


class TestGovernance(EntityTest):
    vote_tx = None
    denom = "atestfet"
    amount = "10000000"
    option = "YES"

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.clean_db({"gov_proposal_votes"})
        """ 
        As voting can only occur once from an address per proposal, three must be created and voted upon individually.
        All proposals must reach the voting stage and be voted upon to create enough data to assert correct sorting.
        """
        for proposal in range(3):
            proposal_content = any_pb2.Any()
            proposal_content.Pack(
                gov_pb2.TextProposal(
                    title="Test Proposal", description="This is a test proposal"
                ),
                "",
            )

            msg = gov_tx.MsgSubmitProposal(
                content=proposal_content,
                initial_deposit=[coin_pb2.Coin(denom=cls.denom, amount=cls.amount)],
                proposer=cls.validator_address,
            )

            tx = Transaction()
            tx.add_message(msg)

            tx = utils.prepare_and_broadcast_basic_transaction(
                cls.ledger_client, tx, cls.validator_wallet
            )
            tx.wait_to_complete()
            cls.assertTrue(
                tx.response.is_successful(),
                "\nTXError: governance proposal tx unsuccessful",
            )

            cls.msg = gov_tx.MsgVote(
                proposal_id=int(tx.response.events["submit_proposal"]["proposal_id"]),
                voter=cls.validator_address,
                option=gov_pb2.VoteOption.VOTE_OPTION_YES,
            )
            cls.vote_tx = Transaction()
            cls.vote_tx.add_message(cls.msg)
            tx = utils.prepare_and_broadcast_basic_transaction(
                cls.ledger_client, cls.vote_tx, cls.validator_wallet
            )
            tx.wait_to_complete()
            cls.assertTrue(
                tx.response.is_successful(), "\nTXError: vote tx unsuccessful"
            )

        # primitive solution to wait for indexer to observe and handle new tx - TODO: add robust solution
        time.sleep(5)

    def test_proposal_vote(self):
        vote = self.db_cursor.execute(GovProposalVoteFields.select_query()).fetchone()
        self.assertIsNotNone(
            vote, "\nDBError: table is empty - maybe indexer did not find an entry?"
        )
        self.assertEqual(
            vote[GovProposalVoteFields.voter_address.value],
            self.validator_address,
            "\nDBError: voter address does not match",
        )
        self.assertEqual(
            vote[GovProposalVoteFields.option.value],
            self.option,
            "\nDBError: voter option does not match",
        )

    def test_retrieve_vote(
        self,
    ):  # As of now, this test depends on the execution of the previous test in this class.
        latest_block_timestamp = self.get_latest_block_timestamp()
        # create a second timestamp for five minutes before
        min_timestamp = (
            latest_block_timestamp - dt.timedelta(minutes=5)
        ).isoformat()  # convert both to JSON ISO format
        max_timestamp = latest_block_timestamp.isoformat()

        gov_proposal_vote_nodes = """
            {
                id,
                message { id }
                transaction { id }
                block {
                    id
                    height
                }
                proposalId
                voterAddress
                option
            }
            """

        default_filter = {  # filter parameter of helper function must not be null, so instead use rhetorical filter
            "block": {"height": {"greaterThanOrEqualTo": "0"}}
        }

        def filtered_gov_proposal_votes_query(_filter, order=""):
            return filtered_test_query(
                "govProposalVotes", _filter, gov_proposal_vote_nodes, _order=order
            )

        order_by_block_height_asc = filtered_gov_proposal_votes_query(
            default_filter, "GOV_PROPOSAL_VOTES_BY_BLOCK_HEIGHT_ASC"
        )

        order_by_block_height_desc = filtered_gov_proposal_votes_query(
            default_filter, "GOV_PROPOSAL_VOTES_BY_BLOCK_HEIGHT_DESC"
        )

        # query native transactions, query related block and filter by timestamp, returning all within last five minutes
        filter_by_block_timestamp_range = filtered_gov_proposal_votes_query(
            {
                "block": {
                    "timestamp": {
                        "greaterThanOrEqualTo": min_timestamp,
                        "lessThanOrEqualTo": max_timestamp,
                    }
                }
            }
        )

        # query native transactions, filter by recipient address
        filter_by_voter_address_equals = filtered_gov_proposal_votes_query(
            {"voterAddress": {"equalTo": str(self.validator_address)}}
        )

        # query native transactions, filter by recipient address
        filter_by_option_equals = filtered_gov_proposal_votes_query(
            {"option": {"isNull": False}}
        )

        for query in [
            filter_by_option_equals,
            filter_by_block_timestamp_range,
            filter_by_voter_address_equals,
        ]:
            result = self.gql_client.execute(query)
            """
            ["govProposalVotes"]["nodes"][0] denotes the sequence of keys to access the message contents queried for above.
            This provides {"voterAddress":voter address, "option":voter option}
            which can be destructured for the values of interest.
            """
            votes = result["govProposalVotes"]["nodes"]
            self.assertTrue(votes[0], "\nGQLError: No results returned from query")
            self.assertEqual(
                votes[0]["voterAddress"],
                self.validator_address,
                "\nGQLError: voter address does not match",
            )
            self.assertEqual(
                votes[0]["option"],
                self.option,
                "\nGQLError: voter option does not match",
            )

        for (name, query, orderAssert) in (
            (
                "order by block height ascending",
                order_by_block_height_asc,
                self.assertGreaterEqual,
            ),
            (
                "order by block height descending",
                order_by_block_height_desc,
                self.assertLessEqual,
            ),
        ):
            with self.subTest(name):
                result = self.gql_client.execute(query)
                gov_proposal_votes = result["govProposalVotes"]["nodes"]
                last = gov_proposal_votes[0]["block"]["height"]
                for entry in gov_proposal_votes:
                    cur = entry["block"]["height"]
                    orderAssert(
                        cur, last, msg="OrderAssertError: order of objects is incorrect"
                    )
                    last = cur


if __name__ == "__main__":
    unittest.main()
