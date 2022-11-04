"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const graphql_1 = require("graphql");
const sequelize_1 = require("sequelize");
const NodeConfig_1 = require("../configure/NodeConfig");
const SubqueryProject_1 = require("../configure/SubqueryProject");
const db_module_1 = require("../db/db.module");
const project_service_1 = require("./project.service");
function testSubqueryProject() {
    return {
        network: {
            endpoint: 'wss://polkadot.api.onfinality.io/public-ws',
            dictionary: `https://api.subquery.network/sq/subquery/dictionary-polkadot`,
        },
        dataSources: [],
        id: 'test',
        root: './',
        schema: new graphql_1.GraphQLSchema({}),
        templates: [],
    };
}
const prepare = async () => {
    var _a, _b, _c, _d;
    const module = await testing_1.Test.createTestingModule({
        providers: [
            {
                provide: SubqueryProject_1.SubqueryProject,
                useFactory: () => testSubqueryProject(),
            },
            {
                provide: project_service_1.ProjectService,
                useFactory: (sequelize, project, subqueryRepo) => {
                    const projectService = new project_service_1.ProjectService(undefined, undefined, undefined, undefined, sequelize, project, undefined, undefined, undefined, subqueryRepo, undefined);
                    return projectService;
                },
                inject: [sequelize_1.Sequelize, SubqueryProject_1.SubqueryProject, 'Subquery'],
            },
            // {
            //   provide: IndexerManager,
            //   useFactory: (
            //     sequelize: Sequelize,
            //     project: SubqueryProject,
            //     projectService: ProjectService,
            //     subqueryRepo: SubqueryRepo,
            //   ) => {
            //     const indexerManager = new IndexerManager(
            //       undefined,
            //       undefined,
            //       undefined,
            //       undefined,
            //       undefined,
            //       sequelize,
            //       project,
            //       undefined,
            //       undefined,
            //       undefined,
            //       undefined,
            //       subqueryRepo,
            //       undefined,
            //       projectService,
            //     );
            //     return indexerManager;
            //   },
            //   inject: [Sequelize, SubqueryProject, ProjectService, 'Subquery'],
            // },
        ],
        imports: [
            db_module_1.DbModule.forRoot({
                host: (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '127.0.0.1',
                port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
                username: (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : 'postgres',
                password: (_c = process.env.DB_PASS) !== null && _c !== void 0 ? _c : 'postgres',
                database: (_d = process.env.DB_DATABASE) !== null && _d !== void 0 ? _d : 'postgres',
            }),
            db_module_1.DbModule.forFeature(['Subquery']),
        ],
    }).compile();
    const app = module.createNestApplication();
    await app.init();
    return app.get(project_service_1.ProjectService);
};
function prepareProject(name, dbSchema, nextBlockHeight) {
    return {
        name,
        dbSchema,
        hash: '0x',
        nextBlockHeight,
        network: 'test',
        networkGenesis: '0x1234',
    };
}
const TEST_PROJECT = 'test-user/TEST_PROJECT';
describe('ProjectService Integration Tests', () => {
    let projectService;
    let subqueryRepo;
    async function createSchema(name) {
        await subqueryRepo.sequelize.createSchema(`"${name}"`, undefined);
    }
    async function checkSchemaExist(schema) {
        const schemas = await subqueryRepo.sequelize.showAllSchemas(undefined);
        return schemas.includes(schema);
    }
    beforeAll(async () => {
        projectService = await prepare();
        subqueryRepo = projectService.subqueryRepo;
    });
    beforeEach(async () => {
        delete projectService.nodeConfig;
        await subqueryRepo.destroy({ where: { name: TEST_PROJECT } });
        await subqueryRepo.sequelize.dropSchema(`"${TEST_PROJECT}"`, undefined);
    });
    it("read existing project's schema from subqueries table", async () => {
        const schemaName = 'subql_99999';
        projectService.nodeConfig = new NodeConfig_1.NodeConfig({
            subquery: '/test/dir/test-query-project',
            subqueryName: TEST_PROJECT,
        });
        await subqueryRepo.create(prepareProject(TEST_PROJECT, schemaName, 1));
        await expect(projectService.getExistingProjectSchema()).resolves.toBe(schemaName);
    });
    it("read existing project's schema from nodeConfig", async () => {
        projectService.nodeConfig = new NodeConfig_1.NodeConfig({
            subquery: '/test/dir/test-query-project',
            subqueryName: TEST_PROJECT,
        });
        await createSchema(TEST_PROJECT);
        await subqueryRepo.create(prepareProject(TEST_PROJECT, 'subql_99999', 1));
        await expect(projectService.getExistingProjectSchema()).resolves.toBe(TEST_PROJECT);
    });
    it("read existing project's schema when --local", async () => {
        projectService.nodeConfig = new NodeConfig_1.NodeConfig({
            subquery: '/test/dir/test-query-project',
            subqueryName: TEST_PROJECT,
            localMode: true,
        });
        await createSchema(TEST_PROJECT);
        await subqueryRepo.create(prepareProject(TEST_PROJECT, 'subql_99999', 1));
        await expect(projectService.getExistingProjectSchema()).resolves.toBe('public');
    });
    it('create project schema', async () => {
        projectService.nodeConfig = new NodeConfig_1.NodeConfig({
            subquery: '/test/dir/test-query-project',
            subqueryName: TEST_PROJECT,
        });
        await expect(projectService.createProjectSchema()).resolves.toBe(TEST_PROJECT);
        await expect(checkSchemaExist(TEST_PROJECT)).resolves.toBe(true);
    });
});
//# sourceMappingURL=project.service.test.js.map