--! Previous: sha1:07039c1f7e5327105f926f5d9288c9e3f97b876f
--! Hash: sha1:1ac102c5a5b3baf595ce66aac2912ad9f1090b49

DROP FUNCTION IF EXISTS jsonb_merge;
CREATE FUNCTION jsonb_merge(JSONB, JSONB)
RETURNS JSONB AS $$
WITH json_union AS (
    SELECT * FROM JSONB_EACH($1)
    UNION ALL
    SELECT * FROM JSONB_EACH($2)
) SELECT JSON_OBJECT_AGG(key, value)::JSONB
     FROM json_union
     WHERE key NOT IN (SELECT key FROM json_union WHERE value ='null');
$$ LANGUAGE SQL;

UPDATE app.messages SET json = (jsonb_merge(json::jsonb, '{"wasmByteCode": null}'))::text WHERE type_url = '/cosmwasm.wasm.v1.MsgStoreCode';
