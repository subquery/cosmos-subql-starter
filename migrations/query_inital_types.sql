select * from pg_enum;

select * from pg_type where oid in (select typarray from pg_type where typcategory = 'E') or typcategory = 'E';
