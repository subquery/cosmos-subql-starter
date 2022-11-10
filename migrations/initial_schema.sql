--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY app.transactions DROP CONSTRAINT IF EXISTS transactions_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.store_contract_messages DROP CONSTRAINT IF EXISTS store_contract_messages_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.store_contract_messages DROP CONSTRAINT IF EXISTS store_contract_messages_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.store_contract_messages DROP CONSTRAINT IF EXISTS store_contract_messages_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_transfers DROP CONSTRAINT IF EXISTS native_transfers_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_transfers DROP CONSTRAINT IF EXISTS native_transfers_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_transfers DROP CONSTRAINT IF EXISTS native_transfers_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_balance_changes DROP CONSTRAINT IF EXISTS native_balance_changes_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_balance_changes DROP CONSTRAINT IF EXISTS native_balance_changes_event_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_balance_changes DROP CONSTRAINT IF EXISTS native_balance_changes_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.native_balance_changes DROP CONSTRAINT IF EXISTS native_balance_changes_account_id_fkey;
ALTER TABLE IF EXISTS ONLY app.messages DROP CONSTRAINT IF EXISTS messages_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.messages DROP CONSTRAINT IF EXISTS messages_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.legacy_bridge_swaps DROP CONSTRAINT IF EXISTS legacy_bridge_swaps_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.legacy_bridge_swaps DROP CONSTRAINT IF EXISTS legacy_bridge_swaps_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.legacy_bridge_swaps DROP CONSTRAINT IF EXISTS legacy_bridge_swaps_execute_contract_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.legacy_bridge_swaps DROP CONSTRAINT IF EXISTS legacy_bridge_swaps_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.instantiate_contract_messages DROP CONSTRAINT IF EXISTS instantiate_contract_messages_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.instantiate_contract_messages DROP CONSTRAINT IF EXISTS instantiate_contract_messages_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.instantiate_contract_messages DROP CONSTRAINT IF EXISTS instantiate_contract_messages_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.ibc_transfers DROP CONSTRAINT IF EXISTS ibc_transfers_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.ibc_transfers DROP CONSTRAINT IF EXISTS ibc_transfers_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.ibc_transfers DROP CONSTRAINT IF EXISTS ibc_transfers_event_id_fkey;
ALTER TABLE IF EXISTS ONLY app.ibc_transfers DROP CONSTRAINT IF EXISTS ibc_transfers_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.gov_proposal_votes DROP CONSTRAINT IF EXISTS gov_proposal_votes_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.gov_proposal_votes DROP CONSTRAINT IF EXISTS gov_proposal_votes_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.gov_proposal_votes DROP CONSTRAINT IF EXISTS gov_proposal_votes_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.genesis_balances DROP CONSTRAINT IF EXISTS genesis_balances_account_id_fkey;
ALTER TABLE IF EXISTS ONLY app.execute_contract_messages DROP CONSTRAINT IF EXISTS execute_contract_messages_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.execute_contract_messages DROP CONSTRAINT IF EXISTS execute_contract_messages_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.execute_contract_messages DROP CONSTRAINT IF EXISTS execute_contract_messages_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.events DROP CONSTRAINT IF EXISTS events_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.events DROP CONSTRAINT IF EXISTS events_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.dist_delegator_claims DROP CONSTRAINT IF EXISTS dist_delegator_claims_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.dist_delegator_claims DROP CONSTRAINT IF EXISTS dist_delegator_claims_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.dist_delegator_claims DROP CONSTRAINT IF EXISTS dist_delegator_claims_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_transfers DROP CONSTRAINT IF EXISTS cw20_transfers_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_transfers DROP CONSTRAINT IF EXISTS cw20_transfers_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_transfers DROP CONSTRAINT IF EXISTS cw20_transfers_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_transaction_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_execute_contract_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_event_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_block_id_fkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_account_id_fkey;
ALTER TABLE IF EXISTS ONLY app.contracts DROP CONSTRAINT IF EXISTS contracts_store_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.contracts DROP CONSTRAINT IF EXISTS contracts_instantiate_message_id_fkey;
ALTER TABLE IF EXISTS ONLY app.c_w20_contracts DROP CONSTRAINT IF EXISTS c_w20_contracts_contract_id_fkey;
DROP INDEX IF EXISTS app.transactions_timeout_height;
DROP INDEX IF EXISTS app.transactions_signer_address;
DROP INDEX IF EXISTS app.transactions_fees;
DROP INDEX IF EXISTS app.transactions_block_id;
DROP INDEX IF EXISTS app.store_contract_messages_transaction_id;
DROP INDEX IF EXISTS app.store_contract_messages_message_id;
DROP INDEX IF EXISTS app.store_contract_messages_code_id;
DROP INDEX IF EXISTS app.store_contract_messages_block_id;
DROP INDEX IF EXISTS app.native_transfers_transaction_id;
DROP INDEX IF EXISTS app.native_transfers_to_address;
DROP INDEX IF EXISTS app.native_transfers_message_id;
DROP INDEX IF EXISTS app.native_transfers_from_address;
DROP INDEX IF EXISTS app.native_transfers_denom;
DROP INDEX IF EXISTS app.native_transfers_block_id;
DROP INDEX IF EXISTS app.native_transfers_amounts;
DROP INDEX IF EXISTS app.native_balance_changes_transaction_id;
DROP INDEX IF EXISTS app.native_balance_changes_event_id;
DROP INDEX IF EXISTS app.native_balance_changes_denom;
DROP INDEX IF EXISTS app.native_balance_changes_block_id;
DROP INDEX IF EXISTS app.native_balance_changes_account_id;
DROP INDEX IF EXISTS app.messages_type_url;
DROP INDEX IF EXISTS app.messages_transaction_id;
DROP INDEX IF EXISTS app.messages_block_id;
DROP INDEX IF EXISTS app.legacy_bridge_swaps_transaction_id;
DROP INDEX IF EXISTS app.legacy_bridge_swaps_message_id;
DROP INDEX IF EXISTS app.legacy_bridge_swaps_execute_contract_message_id;
DROP INDEX IF EXISTS app.legacy_bridge_swaps_block_id;
DROP INDEX IF EXISTS app.instantiate_contract_messages_transaction_id;
DROP INDEX IF EXISTS app.instantiate_contract_messages_sender;
DROP INDEX IF EXISTS app.instantiate_contract_messages_message_id;
DROP INDEX IF EXISTS app.instantiate_contract_messages_funds;
DROP INDEX IF EXISTS app.instantiate_contract_messages_block_id;
DROP INDEX IF EXISTS app.ibc_transfers_transaction_id;
DROP INDEX IF EXISTS app.ibc_transfers_to_address;
DROP INDEX IF EXISTS app.ibc_transfers_source_port;
DROP INDEX IF EXISTS app.ibc_transfers_source_channel;
DROP INDEX IF EXISTS app.ibc_transfers_message_id;
DROP INDEX IF EXISTS app.ibc_transfers_from_address;
DROP INDEX IF EXISTS app.ibc_transfers_event_id;
DROP INDEX IF EXISTS app.ibc_transfers_denom;
DROP INDEX IF EXISTS app.ibc_transfers_block_id;
DROP INDEX IF EXISTS app.ibc_transfers_amount;
DROP INDEX IF EXISTS app.gov_proposal_votes_voter_address;
DROP INDEX IF EXISTS app.gov_proposal_votes_transaction_id;
DROP INDEX IF EXISTS app.gov_proposal_votes_proposal_id;
DROP INDEX IF EXISTS app.gov_proposal_votes_message_id;
DROP INDEX IF EXISTS app.gov_proposal_votes_block_id;
DROP INDEX IF EXISTS app.genesis_balances_denom;
DROP INDEX IF EXISTS app.genesis_balances_account_id;
DROP INDEX IF EXISTS app.execute_contract_messages_transaction_id;
DROP INDEX IF EXISTS app.execute_contract_messages_method;
DROP INDEX IF EXISTS app.execute_contract_messages_message_id;
DROP INDEX IF EXISTS app.execute_contract_messages_funds;
DROP INDEX IF EXISTS app.execute_contract_messages_contract;
DROP INDEX IF EXISTS app.execute_contract_messages_block_id;
DROP INDEX IF EXISTS app.events_type;
DROP INDEX IF EXISTS app.events_transaction_id;
DROP INDEX IF EXISTS app.events_block_id;
DROP INDEX IF EXISTS app.events_attributes;
DROP INDEX IF EXISTS app.dist_delegator_claims_transaction_id;
DROP INDEX IF EXISTS app.dist_delegator_claims_message_id;
DROP INDEX IF EXISTS app.dist_delegator_claims_block_id;
DROP INDEX IF EXISTS app.cw20_transfers_transaction_id;
DROP INDEX IF EXISTS app.cw20_transfers_to_address;
DROP INDEX IF EXISTS app.cw20_transfers_message_id;
DROP INDEX IF EXISTS app.cw20_transfers_from_address;
DROP INDEX IF EXISTS app.cw20_transfers_contract;
DROP INDEX IF EXISTS app.cw20_transfers_block_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_transaction_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_message_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_execute_contract_message_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_event_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_contract;
DROP INDEX IF EXISTS app.cw20_balance_changes_block_id;
DROP INDEX IF EXISTS app.cw20_balance_changes_account_id;
DROP INDEX IF EXISTS app.contracts_store_message_id;
DROP INDEX IF EXISTS app.contracts_instantiate_message_id;
DROP INDEX IF EXISTS app.c_w20_contracts_contract_id;
DROP INDEX IF EXISTS app.blocks_height;
DROP INDEX IF EXISTS app.blocks_chain_id;
DROP INDEX IF EXISTS app.accounts_chain_id;
ALTER TABLE IF EXISTS ONLY app.transactions DROP CONSTRAINT IF EXISTS transactions_pkey;
ALTER TABLE IF EXISTS ONLY app.store_contract_messages DROP CONSTRAINT IF EXISTS store_contract_messages_pkey;
ALTER TABLE IF EXISTS ONLY app.native_transfers DROP CONSTRAINT IF EXISTS native_transfers_pkey;
ALTER TABLE IF EXISTS ONLY app.native_balance_changes DROP CONSTRAINT IF EXISTS native_balance_changes_pkey;
ALTER TABLE IF EXISTS ONLY app.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS ONLY app.legacy_bridge_swaps DROP CONSTRAINT IF EXISTS legacy_bridge_swaps_pkey;
ALTER TABLE IF EXISTS ONLY app.instantiate_contract_messages DROP CONSTRAINT IF EXISTS instantiate_contract_messages_pkey;
ALTER TABLE IF EXISTS ONLY app.ibc_transfers DROP CONSTRAINT IF EXISTS ibc_transfers_pkey;
ALTER TABLE IF EXISTS ONLY app.gov_proposal_votes DROP CONSTRAINT IF EXISTS gov_proposal_votes_pkey;
ALTER TABLE IF EXISTS ONLY app.genesis_balances DROP CONSTRAINT IF EXISTS genesis_balances_pkey;
ALTER TABLE IF EXISTS ONLY app.execute_contract_messages DROP CONSTRAINT IF EXISTS execute_contract_messages_pkey;
ALTER TABLE IF EXISTS ONLY app.events DROP CONSTRAINT IF EXISTS events_pkey;
ALTER TABLE IF EXISTS ONLY app.dist_delegator_claims DROP CONSTRAINT IF EXISTS dist_delegator_claims_pkey;
ALTER TABLE IF EXISTS ONLY app.cw20_transfers DROP CONSTRAINT IF EXISTS cw20_transfers_pkey;
ALTER TABLE IF EXISTS ONLY app.cw20_balance_changes DROP CONSTRAINT IF EXISTS cw20_balance_changes_pkey;
ALTER TABLE IF EXISTS ONLY app.contracts DROP CONSTRAINT IF EXISTS contracts_pkey;
ALTER TABLE IF EXISTS ONLY app.c_w20_contracts DROP CONSTRAINT IF EXISTS c_w20_contracts_pkey;
ALTER TABLE IF EXISTS ONLY app.blocks DROP CONSTRAINT IF EXISTS blocks_pkey;
ALTER TABLE IF EXISTS ONLY app.accounts DROP CONSTRAINT IF EXISTS accounts_pkey;
ALTER TABLE IF EXISTS ONLY app._metadata DROP CONSTRAINT IF EXISTS _metadata_pkey;
DROP TABLE IF EXISTS app.transactions;
DROP TABLE IF EXISTS app.store_contract_messages;
DROP TABLE IF EXISTS app.native_transfers;
DROP TABLE IF EXISTS app.native_balance_changes;
DROP TABLE IF EXISTS app.messages;
DROP TABLE IF EXISTS app.legacy_bridge_swaps;
DROP TABLE IF EXISTS app.instantiate_contract_messages;
DROP TABLE IF EXISTS app.ibc_transfers;
DROP TABLE IF EXISTS app.gov_proposal_votes;
DROP TABLE IF EXISTS app.genesis_balances;
DROP TABLE IF EXISTS app.execute_contract_messages;
DROP TABLE IF EXISTS app.events;
DROP TABLE IF EXISTS app.dist_delegator_claims;
DROP TABLE IF EXISTS app.cw20_transfers;
DROP TABLE IF EXISTS app.cw20_balance_changes;
DROP TABLE IF EXISTS app.contracts;
DROP TABLE IF EXISTS app.c_w20_contracts;
DROP TABLE IF EXISTS app.blocks;
DROP TABLE IF EXISTS app.accounts;
DROP TABLE IF EXISTS app._metadata;
DROP SCHEMA IF EXISTS app;
--
-- Name: app; Type: SCHEMA; Schema: -; Owner: subquery
--

CREATE SCHEMA app;


ALTER SCHEMA app OWNER TO subquery;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _metadata; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE app._metadata OWNER TO subquery;

--
-- Name: accounts; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.accounts (
    id text NOT NULL,
    chain_id text NOT NULL
);


ALTER TABLE app.accounts OWNER TO subquery;

--
-- Name: blocks; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.blocks (
    id text NOT NULL,
    chain_id text NOT NULL,
    height numeric NOT NULL,
    "timestamp" timestamp without time zone NOT NULL
);


ALTER TABLE app.blocks OWNER TO subquery;

--
-- Name: c_w20_contracts; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.c_w20_contracts (
    id text NOT NULL,
    contract_id text NOT NULL
);


ALTER TABLE app.c_w20_contracts OWNER TO subquery;

--
-- Name: contracts; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.contracts (
    id text NOT NULL,
    interfaces public.app_enum_0f6c2478ba[],
    store_message_id text NOT NULL,
    instantiate_message_id text NOT NULL
);


ALTER TABLE app.contracts OWNER TO subquery;

--
-- Name: cw20_balance_changes; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.cw20_balance_changes (
    id text NOT NULL,
    balance_offset numeric NOT NULL,
    contract text NOT NULL,
    account_id text NOT NULL,
    execute_contract_message_id text NOT NULL,
    event_id text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.cw20_balance_changes OWNER TO subquery;

--
-- Name: cw20_transfers; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.cw20_transfers (
    id text NOT NULL,
    to_address text NOT NULL,
    from_address text NOT NULL,
    contract text NOT NULL,
    amount numeric NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.cw20_transfers OWNER TO subquery;

--
-- Name: dist_delegator_claims; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.dist_delegator_claims (
    id text NOT NULL,
    delegator_address text NOT NULL,
    validator_address text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL,
    amount numeric NOT NULL,
    denom text NOT NULL
);


ALTER TABLE app.dist_delegator_claims OWNER TO subquery;

--
-- Name: events; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.events (
    id text NOT NULL,
    type text NOT NULL,
    attributes jsonb NOT NULL,
    log text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.events OWNER TO subquery;

--
-- Name: execute_contract_messages; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.execute_contract_messages (
    id text NOT NULL,
    contract text NOT NULL,
    method text NOT NULL,
    funds jsonb NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.execute_contract_messages OWNER TO subquery;

--
-- Name: genesis_balances; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.genesis_balances (
    id text NOT NULL,
    amount numeric NOT NULL,
    denom text NOT NULL,
    account_id text NOT NULL
);


ALTER TABLE app.genesis_balances OWNER TO subquery;

--
-- Name: gov_proposal_votes; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.gov_proposal_votes (
    id text NOT NULL,
    proposal_id text NOT NULL,
    voter_address text NOT NULL,
    option public.app_enum_15c287bea7 NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.gov_proposal_votes OWNER TO subquery;

--
-- Name: ibc_transfers; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.ibc_transfers (
    id text NOT NULL,
    to_address text NOT NULL,
    from_address text NOT NULL,
    amount jsonb NOT NULL,
    denom text NOT NULL,
    source_channel text NOT NULL,
    source_port text NOT NULL,
    event_id text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.ibc_transfers OWNER TO subquery;

--
-- Name: instantiate_contract_messages; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.instantiate_contract_messages (
    id text NOT NULL,
    sender text NOT NULL,
    admin text NOT NULL,
    code_id integer NOT NULL,
    label text NOT NULL,
    payload text NOT NULL,
    funds jsonb,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.instantiate_contract_messages OWNER TO subquery;

--
-- Name: legacy_bridge_swaps; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.legacy_bridge_swaps (
    id text NOT NULL,
    destination text NOT NULL,
    contract text NOT NULL,
    amount numeric NOT NULL,
    denom text NOT NULL,
    execute_contract_message_id text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.legacy_bridge_swaps OWNER TO subquery;

--
-- Name: messages; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.messages (
    id text NOT NULL,
    type_url text NOT NULL,
    json text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.messages OWNER TO subquery;

--
-- Name: native_balance_changes; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.native_balance_changes (
    id text NOT NULL,
    balance_offset numeric NOT NULL,
    denom text NOT NULL,
    account_id text NOT NULL,
    event_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.native_balance_changes OWNER TO subquery;

--
-- Name: native_transfers; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.native_transfers (
    id text NOT NULL,
    to_address text NOT NULL,
    from_address text NOT NULL,
    amounts jsonb NOT NULL,
    denom text NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.native_transfers OWNER TO subquery;

--
-- Name: store_contract_messages; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.store_contract_messages (
    id text NOT NULL,
    sender text NOT NULL,
    permission public.app_enum_c55bdb5a48,
    code_id integer NOT NULL,
    message_id text NOT NULL,
    transaction_id text NOT NULL,
    block_id text NOT NULL
);


ALTER TABLE app.store_contract_messages OWNER TO subquery;

--
-- Name: transactions; Type: TABLE; Schema: app; Owner: subquery
--

CREATE TABLE app.transactions (
    id text NOT NULL,
    block_id text NOT NULL,
    gas_used numeric NOT NULL,
    gas_wanted numeric NOT NULL,
    fees jsonb NOT NULL,
    memo text,
    status public.app_enum_1c563c52f4 NOT NULL,
    log text NOT NULL,
    timeout_height numeric,
    signer_address text
);


ALTER TABLE app.transactions OWNER TO subquery;

--
-- Name: _metadata _metadata_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: blocks blocks_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (id);


--
-- Name: c_w20_contracts c_w20_contracts_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.c_w20_contracts
    ADD CONSTRAINT c_w20_contracts_pkey PRIMARY KEY (id);


--
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (id);


--
-- Name: cw20_balance_changes cw20_balance_changes_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_pkey PRIMARY KEY (id);


--
-- Name: cw20_transfers cw20_transfers_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_transfers
    ADD CONSTRAINT cw20_transfers_pkey PRIMARY KEY (id);


--
-- Name: dist_delegator_claims dist_delegator_claims_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.dist_delegator_claims
    ADD CONSTRAINT dist_delegator_claims_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: execute_contract_messages execute_contract_messages_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.execute_contract_messages
    ADD CONSTRAINT execute_contract_messages_pkey PRIMARY KEY (id);


--
-- Name: genesis_balances genesis_balances_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.genesis_balances
    ADD CONSTRAINT genesis_balances_pkey PRIMARY KEY (id);


--
-- Name: gov_proposal_votes gov_proposal_votes_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.gov_proposal_votes
    ADD CONSTRAINT gov_proposal_votes_pkey PRIMARY KEY (id);


--
-- Name: ibc_transfers ibc_transfers_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.ibc_transfers
    ADD CONSTRAINT ibc_transfers_pkey PRIMARY KEY (id);


--
-- Name: instantiate_contract_messages instantiate_contract_messages_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.instantiate_contract_messages
    ADD CONSTRAINT instantiate_contract_messages_pkey PRIMARY KEY (id);


--
-- Name: legacy_bridge_swaps legacy_bridge_swaps_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: native_balance_changes native_balance_changes_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_balance_changes
    ADD CONSTRAINT native_balance_changes_pkey PRIMARY KEY (id);


--
-- Name: native_transfers native_transfers_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_transfers
    ADD CONSTRAINT native_transfers_pkey PRIMARY KEY (id);


--
-- Name: store_contract_messages store_contract_messages_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.store_contract_messages
    ADD CONSTRAINT store_contract_messages_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: accounts_chain_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX accounts_chain_id ON app.accounts USING btree (chain_id);


--
-- Name: blocks_chain_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX blocks_chain_id ON app.blocks USING btree (chain_id);


--
-- Name: blocks_height; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX blocks_height ON app.blocks USING btree (height);


--
-- Name: c_w20_contracts_contract_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX c_w20_contracts_contract_id ON app.c_w20_contracts USING hash (contract_id);


--
-- Name: contracts_instantiate_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX contracts_instantiate_message_id ON app.contracts USING hash (instantiate_message_id);


--
-- Name: contracts_store_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX contracts_store_message_id ON app.contracts USING hash (store_message_id);


--
-- Name: cw20_balance_changes_account_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_account_id ON app.cw20_balance_changes USING hash (account_id);


--
-- Name: cw20_balance_changes_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_block_id ON app.cw20_balance_changes USING hash (block_id);


--
-- Name: cw20_balance_changes_contract; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_contract ON app.cw20_balance_changes USING btree (contract);


--
-- Name: cw20_balance_changes_event_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_event_id ON app.cw20_balance_changes USING hash (event_id);


--
-- Name: cw20_balance_changes_execute_contract_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_execute_contract_message_id ON app.cw20_balance_changes USING hash (execute_contract_message_id);


--
-- Name: cw20_balance_changes_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_message_id ON app.cw20_balance_changes USING hash (message_id);


--
-- Name: cw20_balance_changes_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_balance_changes_transaction_id ON app.cw20_balance_changes USING hash (transaction_id);


--
-- Name: cw20_transfers_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_block_id ON app.cw20_transfers USING hash (block_id);


--
-- Name: cw20_transfers_contract; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_contract ON app.cw20_transfers USING btree (contract);


--
-- Name: cw20_transfers_from_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_from_address ON app.cw20_transfers USING btree (from_address);


--
-- Name: cw20_transfers_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_message_id ON app.cw20_transfers USING hash (message_id);


--
-- Name: cw20_transfers_to_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_to_address ON app.cw20_transfers USING btree (to_address);


--
-- Name: cw20_transfers_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX cw20_transfers_transaction_id ON app.cw20_transfers USING hash (transaction_id);


--
-- Name: dist_delegator_claims_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX dist_delegator_claims_block_id ON app.dist_delegator_claims USING hash (block_id);


--
-- Name: dist_delegator_claims_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX dist_delegator_claims_message_id ON app.dist_delegator_claims USING hash (message_id);


--
-- Name: dist_delegator_claims_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX dist_delegator_claims_transaction_id ON app.dist_delegator_claims USING hash (transaction_id);


--
-- Name: events_attributes; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX events_attributes ON app.events USING gin (attributes);


--
-- Name: events_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX events_block_id ON app.events USING hash (block_id);


--
-- Name: events_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX events_transaction_id ON app.events USING hash (transaction_id);


--
-- Name: events_type; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX events_type ON app.events USING btree (type);


--
-- Name: execute_contract_messages_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_block_id ON app.execute_contract_messages USING hash (block_id);


--
-- Name: execute_contract_messages_contract; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_contract ON app.execute_contract_messages USING btree (contract);


--
-- Name: execute_contract_messages_funds; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_funds ON app.execute_contract_messages USING gin (funds);


--
-- Name: execute_contract_messages_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_message_id ON app.execute_contract_messages USING hash (message_id);


--
-- Name: execute_contract_messages_method; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_method ON app.execute_contract_messages USING btree (method);


--
-- Name: execute_contract_messages_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX execute_contract_messages_transaction_id ON app.execute_contract_messages USING hash (transaction_id);


--
-- Name: genesis_balances_account_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX genesis_balances_account_id ON app.genesis_balances USING hash (account_id);


--
-- Name: genesis_balances_denom; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX genesis_balances_denom ON app.genesis_balances USING btree (denom);


--
-- Name: gov_proposal_votes_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX gov_proposal_votes_block_id ON app.gov_proposal_votes USING hash (block_id);


--
-- Name: gov_proposal_votes_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX gov_proposal_votes_message_id ON app.gov_proposal_votes USING hash (message_id);


--
-- Name: gov_proposal_votes_proposal_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX gov_proposal_votes_proposal_id ON app.gov_proposal_votes USING btree (proposal_id);


--
-- Name: gov_proposal_votes_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX gov_proposal_votes_transaction_id ON app.gov_proposal_votes USING hash (transaction_id);


--
-- Name: gov_proposal_votes_voter_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX gov_proposal_votes_voter_address ON app.gov_proposal_votes USING btree (voter_address);


--
-- Name: ibc_transfers_amount; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_amount ON app.ibc_transfers USING gin (amount);


--
-- Name: ibc_transfers_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_block_id ON app.ibc_transfers USING hash (block_id);


--
-- Name: ibc_transfers_denom; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_denom ON app.ibc_transfers USING btree (denom);


--
-- Name: ibc_transfers_event_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_event_id ON app.ibc_transfers USING hash (event_id);


--
-- Name: ibc_transfers_from_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_from_address ON app.ibc_transfers USING btree (from_address);


--
-- Name: ibc_transfers_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_message_id ON app.ibc_transfers USING hash (message_id);


--
-- Name: ibc_transfers_source_channel; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_source_channel ON app.ibc_transfers USING btree (source_channel);


--
-- Name: ibc_transfers_source_port; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_source_port ON app.ibc_transfers USING btree (source_port);


--
-- Name: ibc_transfers_to_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_to_address ON app.ibc_transfers USING btree (to_address);


--
-- Name: ibc_transfers_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX ibc_transfers_transaction_id ON app.ibc_transfers USING hash (transaction_id);


--
-- Name: instantiate_contract_messages_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX instantiate_contract_messages_block_id ON app.instantiate_contract_messages USING hash (block_id);


--
-- Name: instantiate_contract_messages_funds; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX instantiate_contract_messages_funds ON app.instantiate_contract_messages USING gin (funds);


--
-- Name: instantiate_contract_messages_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX instantiate_contract_messages_message_id ON app.instantiate_contract_messages USING hash (message_id);


--
-- Name: instantiate_contract_messages_sender; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX instantiate_contract_messages_sender ON app.instantiate_contract_messages USING btree (sender);


--
-- Name: instantiate_contract_messages_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX instantiate_contract_messages_transaction_id ON app.instantiate_contract_messages USING hash (transaction_id);


--
-- Name: legacy_bridge_swaps_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX legacy_bridge_swaps_block_id ON app.legacy_bridge_swaps USING hash (block_id);


--
-- Name: legacy_bridge_swaps_execute_contract_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX legacy_bridge_swaps_execute_contract_message_id ON app.legacy_bridge_swaps USING hash (execute_contract_message_id);


--
-- Name: legacy_bridge_swaps_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX legacy_bridge_swaps_message_id ON app.legacy_bridge_swaps USING hash (message_id);


--
-- Name: legacy_bridge_swaps_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX legacy_bridge_swaps_transaction_id ON app.legacy_bridge_swaps USING hash (transaction_id);


--
-- Name: messages_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX messages_block_id ON app.messages USING hash (block_id);


--
-- Name: messages_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX messages_transaction_id ON app.messages USING hash (transaction_id);


--
-- Name: messages_type_url; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX messages_type_url ON app.messages USING btree (type_url);


--
-- Name: native_balance_changes_account_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_balance_changes_account_id ON app.native_balance_changes USING hash (account_id);


--
-- Name: native_balance_changes_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_balance_changes_block_id ON app.native_balance_changes USING hash (block_id);


--
-- Name: native_balance_changes_denom; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_balance_changes_denom ON app.native_balance_changes USING btree (denom);


--
-- Name: native_balance_changes_event_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_balance_changes_event_id ON app.native_balance_changes USING hash (event_id);


--
-- Name: native_balance_changes_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_balance_changes_transaction_id ON app.native_balance_changes USING hash (transaction_id);


--
-- Name: native_transfers_amounts; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_amounts ON app.native_transfers USING gin (amounts);


--
-- Name: native_transfers_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_block_id ON app.native_transfers USING hash (block_id);


--
-- Name: native_transfers_denom; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_denom ON app.native_transfers USING btree (denom);


--
-- Name: native_transfers_from_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_from_address ON app.native_transfers USING btree (from_address);


--
-- Name: native_transfers_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_message_id ON app.native_transfers USING hash (message_id);


--
-- Name: native_transfers_to_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_to_address ON app.native_transfers USING btree (to_address);


--
-- Name: native_transfers_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX native_transfers_transaction_id ON app.native_transfers USING hash (transaction_id);


--
-- Name: store_contract_messages_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX store_contract_messages_block_id ON app.store_contract_messages USING hash (block_id);


--
-- Name: store_contract_messages_code_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX store_contract_messages_code_id ON app.store_contract_messages USING btree (code_id);


--
-- Name: store_contract_messages_message_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX store_contract_messages_message_id ON app.store_contract_messages USING hash (message_id);


--
-- Name: store_contract_messages_transaction_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX store_contract_messages_transaction_id ON app.store_contract_messages USING hash (transaction_id);


--
-- Name: transactions_block_id; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX transactions_block_id ON app.transactions USING hash (block_id);


--
-- Name: transactions_fees; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX transactions_fees ON app.transactions USING gin (fees);


--
-- Name: transactions_signer_address; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX transactions_signer_address ON app.transactions USING btree (signer_address);


--
-- Name: transactions_timeout_height; Type: INDEX; Schema: app; Owner: subquery
--

CREATE INDEX transactions_timeout_height ON app.transactions USING btree (timeout_height);


--
-- Name: c_w20_contracts c_w20_contracts_contract_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.c_w20_contracts
    ADD CONSTRAINT c_w20_contracts_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;


--
-- Name: contracts contracts_instantiate_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.contracts
    ADD CONSTRAINT contracts_instantiate_message_id_fkey FOREIGN KEY (instantiate_message_id) REFERENCES app.instantiate_contract_messages(id) ON UPDATE CASCADE;


--
-- Name: contracts contracts_store_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.contracts
    ADD CONSTRAINT contracts_store_message_id_fkey FOREIGN KEY (store_message_id) REFERENCES app.store_contract_messages(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT contracts_store_message_id_fkey ON contracts; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT contracts_store_message_id_fkey ON app.contracts IS '@foreignFieldName contracts';


--
-- Name: cw20_balance_changes cw20_balance_changes_account_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_account_id_fkey FOREIGN KEY (account_id) REFERENCES app.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT cw20_balance_changes_account_id_fkey ON cw20_balance_changes; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT cw20_balance_changes_account_id_fkey ON app.cw20_balance_changes IS '@foreignFieldName cw20BalanceChanges';


--
-- Name: cw20_balance_changes cw20_balance_changes_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: cw20_balance_changes cw20_balance_changes_event_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_event_id_fkey FOREIGN KEY (event_id) REFERENCES app.events(id) ON UPDATE CASCADE;


--
-- Name: cw20_balance_changes cw20_balance_changes_execute_contract_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_execute_contract_message_id_fkey FOREIGN KEY (execute_contract_message_id) REFERENCES app.execute_contract_messages(id) ON UPDATE CASCADE;


--
-- Name: cw20_balance_changes cw20_balance_changes_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: cw20_balance_changes cw20_balance_changes_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: cw20_transfers cw20_transfers_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_transfers
    ADD CONSTRAINT cw20_transfers_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: cw20_transfers cw20_transfers_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_transfers
    ADD CONSTRAINT cw20_transfers_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: cw20_transfers cw20_transfers_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.cw20_transfers
    ADD CONSTRAINT cw20_transfers_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: dist_delegator_claims dist_delegator_claims_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.dist_delegator_claims
    ADD CONSTRAINT dist_delegator_claims_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: dist_delegator_claims dist_delegator_claims_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.dist_delegator_claims
    ADD CONSTRAINT dist_delegator_claims_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: dist_delegator_claims dist_delegator_claims_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.dist_delegator_claims
    ADD CONSTRAINT dist_delegator_claims_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: events events_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.events
    ADD CONSTRAINT events_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT events_block_id_fkey ON events; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT events_block_id_fkey ON app.events IS '@foreignFieldName events';


--
-- Name: events events_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.events
    ADD CONSTRAINT events_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: execute_contract_messages execute_contract_messages_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.execute_contract_messages
    ADD CONSTRAINT execute_contract_messages_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: execute_contract_messages execute_contract_messages_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.execute_contract_messages
    ADD CONSTRAINT execute_contract_messages_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: execute_contract_messages execute_contract_messages_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.execute_contract_messages
    ADD CONSTRAINT execute_contract_messages_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: genesis_balances genesis_balances_account_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.genesis_balances
    ADD CONSTRAINT genesis_balances_account_id_fkey FOREIGN KEY (account_id) REFERENCES app.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT genesis_balances_account_id_fkey ON genesis_balances; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT genesis_balances_account_id_fkey ON app.genesis_balances IS '@foreignFieldName genesisBalances';


--
-- Name: gov_proposal_votes gov_proposal_votes_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.gov_proposal_votes
    ADD CONSTRAINT gov_proposal_votes_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: gov_proposal_votes gov_proposal_votes_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.gov_proposal_votes
    ADD CONSTRAINT gov_proposal_votes_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: gov_proposal_votes gov_proposal_votes_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.gov_proposal_votes
    ADD CONSTRAINT gov_proposal_votes_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: ibc_transfers ibc_transfers_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.ibc_transfers
    ADD CONSTRAINT ibc_transfers_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: ibc_transfers ibc_transfers_event_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.ibc_transfers
    ADD CONSTRAINT ibc_transfers_event_id_fkey FOREIGN KEY (event_id) REFERENCES app.events(id) ON UPDATE CASCADE;


--
-- Name: ibc_transfers ibc_transfers_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.ibc_transfers
    ADD CONSTRAINT ibc_transfers_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: ibc_transfers ibc_transfers_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.ibc_transfers
    ADD CONSTRAINT ibc_transfers_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: instantiate_contract_messages instantiate_contract_messages_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.instantiate_contract_messages
    ADD CONSTRAINT instantiate_contract_messages_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: instantiate_contract_messages instantiate_contract_messages_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.instantiate_contract_messages
    ADD CONSTRAINT instantiate_contract_messages_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: instantiate_contract_messages instantiate_contract_messages_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.instantiate_contract_messages
    ADD CONSTRAINT instantiate_contract_messages_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: legacy_bridge_swaps legacy_bridge_swaps_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: legacy_bridge_swaps legacy_bridge_swaps_execute_contract_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_execute_contract_message_id_fkey FOREIGN KEY (execute_contract_message_id) REFERENCES app.execute_contract_messages(id) ON UPDATE CASCADE;


--
-- Name: legacy_bridge_swaps legacy_bridge_swaps_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: legacy_bridge_swaps legacy_bridge_swaps_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: messages messages_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.messages
    ADD CONSTRAINT messages_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT messages_block_id_fkey ON messages; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT messages_block_id_fkey ON app.messages IS '@foreignFieldName messages';


--
-- Name: messages messages_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.messages
    ADD CONSTRAINT messages_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT messages_transaction_id_fkey ON messages; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT messages_transaction_id_fkey ON app.messages IS '@foreignFieldName messages';


--
-- Name: native_balance_changes native_balance_changes_account_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_balance_changes
    ADD CONSTRAINT native_balance_changes_account_id_fkey FOREIGN KEY (account_id) REFERENCES app.accounts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT native_balance_changes_account_id_fkey ON native_balance_changes; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT native_balance_changes_account_id_fkey ON app.native_balance_changes IS '@foreignFieldName nativeBalanceChanges';


--
-- Name: native_balance_changes native_balance_changes_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_balance_changes
    ADD CONSTRAINT native_balance_changes_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: native_balance_changes native_balance_changes_event_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_balance_changes
    ADD CONSTRAINT native_balance_changes_event_id_fkey FOREIGN KEY (event_id) REFERENCES app.events(id) ON UPDATE CASCADE;


--
-- Name: native_balance_changes native_balance_changes_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_balance_changes
    ADD CONSTRAINT native_balance_changes_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: native_transfers native_transfers_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_transfers
    ADD CONSTRAINT native_transfers_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: native_transfers native_transfers_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_transfers
    ADD CONSTRAINT native_transfers_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: native_transfers native_transfers_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.native_transfers
    ADD CONSTRAINT native_transfers_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: store_contract_messages store_contract_messages_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.store_contract_messages
    ADD CONSTRAINT store_contract_messages_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE;


--
-- Name: store_contract_messages store_contract_messages_message_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.store_contract_messages
    ADD CONSTRAINT store_contract_messages_message_id_fkey FOREIGN KEY (message_id) REFERENCES app.messages(id) ON UPDATE CASCADE;


--
-- Name: store_contract_messages store_contract_messages_transaction_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.store_contract_messages
    ADD CONSTRAINT store_contract_messages_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES app.transactions(id) ON UPDATE CASCADE;


--
-- Name: transactions transactions_block_id_fkey; Type: FK CONSTRAINT; Schema: app; Owner: subquery
--

ALTER TABLE ONLY app.transactions
    ADD CONSTRAINT transactions_block_id_fkey FOREIGN KEY (block_id) REFERENCES app.blocks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CONSTRAINT transactions_block_id_fkey ON transactions; Type: COMMENT; Schema: app; Owner: subquery
--

COMMENT ON CONSTRAINT transactions_block_id_fkey ON app.transactions IS '@foreignFieldName transactions';


--
-- PostgreSQL database dump complete
--

