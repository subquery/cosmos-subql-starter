from gql import gql

latest_block_timestamp = gql(  # get the timestamp from the latest block
    """
    query latestBlockTimestamp {
        blocks (orderBy:TIMESTAMP_DESC, first:1) {
            nodes {
                timestamp
            }
        }
    }
    """
)
