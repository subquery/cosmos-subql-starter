"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubqueryProject = void 0;
const common_1 = require("@subql/common");
const common_cosmos_1 = require("@subql/common-cosmos");
const utils_1 = require("@subql/utils");
const project_1 = require("../utils/project");
const NOT_SUPPORT = (name) => () => {
    throw new Error(`Manifest specVersion ${name}() is not supported`);
};
class SubqueryProject {
    static async create(path, networkOverrides, readerOptions) {
        // We have to use reader here, because path can be remote or local
        // and the `loadProjectManifest(projectPath)` only support local mode
        const reader = await common_1.ReaderFactory.create(path, readerOptions);
        const projectSchema = await reader.getProjectSchema();
        if (projectSchema === undefined) {
            throw new Error(`Get manifest from project path ${path} failed`);
        }
        const manifest = (0, common_cosmos_1.parseCosmosProjectManifest)(projectSchema);
        if (manifest.isV0_3_0) {
            return loadProjectFromManifestBase(manifest.asV0_3_0, reader, path, networkOverrides);
        }
        else if (manifest.isV1_0_0) {
            return loadProjectFromManifest1_0_0(manifest.asV1_0_0, reader, path, networkOverrides);
        }
    }
}
exports.SubqueryProject = SubqueryProject;
async function loadProjectFromManifestBase(projectManifest, reader, path, networkOverrides) {
    const root = await (0, project_1.getProjectRoot)(reader);
    const network = await (0, project_1.processNetworkConfig)(Object.assign(Object.assign({}, projectManifest.network), networkOverrides), reader);
    if (!network.endpoint) {
        throw new Error(`Network endpoint must be provided for network. chainId="${network.chainId}"`);
    }
    let schemaString;
    try {
        schemaString = await reader.getFile(projectManifest.schema.file);
    }
    catch (e) {
        throw new Error(`unable to fetch the schema from ${projectManifest.schema.file}`);
    }
    const schema = (0, utils_1.buildSchemaFromString)(schemaString);
    const dataSources = await (0, project_1.updateDataSourcesV0_3_0)(projectManifest.dataSources, reader, root);
    return {
        id: reader.root ? reader.root : path,
        root,
        network,
        dataSources,
        schema,
        templates: [],
    };
}
const { version: packageVersion } = require('../../package.json');
async function loadProjectFromManifest1_0_0(projectManifest, reader, path, networkOverrides) {
    const project = await loadProjectFromManifestBase(projectManifest, reader, path, networkOverrides);
    project.templates = await loadProjectTemplates(projectManifest, reader);
    project.runner = projectManifest.runner;
    if (!(0, common_1.validateSemver)(packageVersion, project.runner.node.version)) {
        throw new Error(`Runner require node version ${project.runner.node.version}, current node ${packageVersion}`);
    }
    return project;
}
async function loadProjectTemplates(projectManifest, reader) {
    if (projectManifest.templates && projectManifest.templates.length !== 0) {
        const root = await (0, project_1.getProjectRoot)(reader);
        const dsTemplates = await (0, project_1.updateDataSourcesV0_3_0)(projectManifest.templates, reader, root);
        return dsTemplates.map((ds, index) => (Object.assign(Object.assign({}, ds), { name: projectManifest.templates[index].name })));
    }
    return [];
}
//# sourceMappingURL=SubqueryProject.js.map