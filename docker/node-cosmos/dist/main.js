"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@subql/common");
const app_module_1 = require("./app.module");
const indexer_manager_1 = require("./indexer/indexer.manager");
const logger_1 = require("./utils/logger");
const yargs_1 = require("./yargs");
const DEFAULT_PORT = 3000;
const logger = (0, logger_1.getLogger)('subql-node');
const { argv } = (0, yargs_1.getYargsOption)();
const telemetry = common_1.telemetry;

async function bootstrap() {
    var _a;
    if (!!telemetry) {
        await telemetry.start();
        logger.info('Tracing started...');
    }

    const debug = argv.debug;
    const validate = (x) => {
        const p = parseInt(x);
        return isNaN(p) ? null : p;
    };
    const port = (_a = validate(argv.port)) !== null && _a !== void 0 ? _a : (await (0, common_1.findAvailablePort)(DEFAULT_PORT));
    if (!port) {
        logger.error(`Unable to find available port (tried ports in range (${port}..${port + 10})). Try setting a free port manually by setting the --port flag`);
        process.exit(1);
    }
    if (argv.unsafe) {
        logger.warn('UNSAFE MODE IS ENABLED. This is not recommended for most projects and will not be supported by our hosted service');
    }
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule, {
            logger: debug ? new logger_1.NestLogger() : false,
        });
        await app.init();
        const indexerManager = app.get(indexer_manager_1.IndexerManager);
        await indexerManager.start();

        await app.listen(port);
        logger.info(`Node started on port: ${port}`);
    }
    catch (e) {
        logger.error(e, 'Node failed to start');
        process.exit(1);
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map
