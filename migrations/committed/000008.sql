--! Previous: sha1:01a07630d28c5937f37856ab8f899d37c46264c4
--! Hash: sha1:ef021224dbd9c54944f24efa19806b596189d9b2

-- Enter migration here
CREATE SCHEMA IF NOT EXISTS app;
SET SCHEMA 'app';

ALTER TABLE app.contracts
    ADD COLUMN interface public.app_enum_0f6c2478ba;

UPDATE app.contracts
    SET interface = interfaces[1];

ALTER TABLE app.contracts
    DROP COLUMN interfaces;

ALTER TABLE app.contracts
    ALTER COLUMN interface set NOT NULL;
