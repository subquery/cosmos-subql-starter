--! Previous: sha1:9744879ec421a1edd39b9bc53b717a35b00e31cc
--! Hash: sha1:da26eb35d28f84418481866c2f08a576617e9bc6

-- Enter migration here
CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

alter table app.cw20_balance_changes
    RENAME column contract to contract_id;
CREATE INDEX cw20_balance_changes_contract_id ON app.cw20_balance_changes USING hash (contract_id);
ALTER TABLE ONLY app.cw20_balance_changes
    ADD CONSTRAINT cw20_balance_changes_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES app.contracts(id) ON UPDATE CASCADE;
