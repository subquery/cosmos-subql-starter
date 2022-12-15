--! Previous: sha1:c2a3b464a3fa8fb56aabf1a630b0e366cdb15f07
--! Hash: sha1:01a07630d28c5937f37856ab8f899d37c46264c4

-- Enter migration here
CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

alter table app.cw20_transfers
    RENAME column contract to contract_id;
CREATE INDEX cw20_transfers_contract_id ON app.cw20_transfers USING hash (contract_id);
ALTER TABLE ONLY app.cw20_transfers
    ADD CONSTRAINT cw20_transfers_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;
