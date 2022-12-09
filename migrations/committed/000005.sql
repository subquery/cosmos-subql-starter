--! Previous: sha1:da26eb35d28f84418481866c2f08a576617e9bc6
--! Hash: sha1:b16de8bb2e28541b6b0444a5fb2ecc79874e5cec

-- Enter migration here
CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

alter table app.legacy_bridge_swaps
    RENAME column contract to contract_id;
CREATE INDEX legacy_bridge_swaps_contract_id ON app.legacy_bridge_swaps USING hash (contract_id);
ALTER TABLE ONLY app.legacy_bridge_swaps
    ADD CONSTRAINT legacy_bridge_swaps_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;
