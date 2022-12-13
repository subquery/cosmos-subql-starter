--! Previous: sha1:b16de8bb2e28541b6b0444a5fb2ecc79874e5cec
--! Hash: sha1:c2a3b464a3fa8fb56aabf1a630b0e366cdb15f07

-- Enter migration here
CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

alter table app.execute_contract_messages
    RENAME column contract to contract_id;
CREATE INDEX execute_contract_messages_contract_id ON app.execute_contract_messages USING hash (contract_id);
ALTER TABLE ONLY app.execute_contract_messages
    ADD CONSTRAINT execute_contract_messages_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;
