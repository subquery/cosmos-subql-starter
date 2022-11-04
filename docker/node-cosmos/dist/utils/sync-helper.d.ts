export interface SmartTags {
    foreignKey?: string;
    foreignFieldName?: string;
    singleForeignFieldName?: string;
}
export declare function smartTags(tags: SmartTags, separator?: string): string;
export declare function getVirtualFkTag(field: string, to: string): string;
export declare function getFkConstraint(tableName: string, foreignKey: string): string;
export declare function getUniqConstraint(tableName: string, field: string): string;
export declare function commentConstraintQuery(table: string, constraint: string, comment: string): string;
export declare function commentTableQuery(column: string, comment: string): string;
export declare function addTagsToForeignKeyMap(map: Map<string, Map<string, SmartTags>>, tableName: string, foreignKey: string, newTags: SmartTags): void;
export declare const BTREE_GIST_EXTENSION_EXIST_QUERY = "SELECT * FROM pg_extension where extname = 'btree_gist'";
export declare function createExcludeConstraintQuery(schema: string, table: string): string;
export declare function createUniqueIndexQuery(schema: string, table: string, field: string): string;
export declare const createSendNotificationTriggerFunction = "\nCREATE OR REPLACE FUNCTION send_notification()\n    RETURNS trigger AS $$\nDECLARE\n    row RECORD;\n    payload JSONB;\nBEGIN\n    IF (TG_OP = 'DELETE') THEN\n      row = OLD;\n    ELSE\n      row = NEW;\n    END IF;\n    payload = jsonb_build_object(\n      'id', row.id,\n      'mutation_type', TG_OP,\n      '_entity', row);\n    IF payload -> '_entity' ? '_block_range' THEN\n      IF NOT upper_inf(row._block_range) THEN\n        RETURN NULL;\n      END IF;\n      payload = payload || '{\"mutation_type\": \"UPDATE\"}';\n      payload = payload #- '{\"_entity\",\"_id\"}';\n      payload = payload #- '{\"_entity\",\"_block_range\"}';\n    END IF;\n    IF (octet_length(payload::text) >= 8000) THEN\n      payload = payload || '{\"_entity\": null}';\n    END IF;\n    PERFORM pg_notify(\n      CONCAT(TG_TABLE_SCHEMA, '.', TG_TABLE_NAME),\n      payload::text);\n    RETURN NULL;\nEND;\n$$ LANGUAGE plpgsql;";
export declare function dropNotifyTrigger(schema: string, table: string): string;
export declare function getNotifyTriggers(): string;
export declare function createNotifyTrigger(schema: string, table: string): string;
