"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectRoot = exports.loadNetworkChainType = exports.loadDataSourceScript = exports.updateDataSourcesV0_3_0 = exports.processNetworkConfig = exports.isCustomHandler = exports.isBaseHandler = exports.prepareProjectDir = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@subql/common");
const common_cosmos_1 = require("@subql/common-cosmos");
const protobuf = __importStar(require("protobufjs"));
const tar_1 = __importDefault(require("tar"));
async function prepareProjectDir(projectPath) {
    const stats = fs_1.default.statSync(projectPath);
    if (stats.isFile()) {
        const sep = path_1.default.sep;
        const tmpDir = os_1.default.tmpdir();
        const tempPath = fs_1.default.mkdtempSync(`${tmpDir}${sep}`);
        // Will promote errors if incorrect format/extension
        await tar_1.default.x({ file: projectPath, cwd: tempPath });
        return tempPath.concat('/package');
    }
    else if (stats.isDirectory()) {
        return projectPath;
    }
}
exports.prepareProjectDir = prepareProjectDir;
function isBaseHandler(handler) {
    return Object.values(common_cosmos_1.SubqlCosmosHandlerKind).includes(handler.kind);
}
exports.isBaseHandler = isBaseHandler;
function isCustomHandler(handler) {
    return !isBaseHandler(handler);
}
exports.isCustomHandler = isCustomHandler;
async function processNetworkConfig(network, reader) {
    if (network.chainId && network.genesisHash) {
        throw new Error('Please only provide one of chainId and genesisHash');
    }
    else if (network.genesisHash && !network.chainId) {
        network.chainId = network.genesisHash;
    }
    delete network.genesisHash;
    const chainTypes = new Map();
    if (!network.chainTypes) {
        network.chainTypes = chainTypes;
        return network;
    }
    const protoRoot = new protobuf.Root();
    for (const [key, value] of network.chainTypes) {
        const [packageName, proto] = await loadNetworkChainType(reader, value.file);
        chainTypes.set(key, Object.assign(Object.assign({}, value), { packageName, proto }));
        protoRoot.add(proto);
    }
    chainTypes.protoRoot = protoRoot;
    network.chainTypes = chainTypes;
    return network;
}
exports.processNetworkConfig = processNetworkConfig;
async function updateDataSourcesV0_3_0(_dataSources, reader, root) {
    // force convert to updated ds
    return Promise.all(_dataSources.map(async (dataSource) => {
        const entryScript = await loadDataSourceScript(reader, dataSource.mapping.file);
        const file = await updateDataSourcesEntry(reader, dataSource.mapping.file, root, entryScript);
        if ((0, common_cosmos_1.isCustomCosmosDs)(dataSource)) {
            if (dataSource.processor) {
                dataSource.processor.file = await updateProcessor(reader, root, dataSource.processor.file);
            }
            if (dataSource.assets) {
                for (const [, asset] of dataSource.assets) {
                    if (reader instanceof common_1.LocalReader) {
                        asset.file = path_1.default.resolve(root, asset.file);
                    }
                    else {
                        const res = await reader.getFile(asset.file);
                        const outputPath = path_1.default.resolve(root, asset.file.replace('ipfs://', ''));
                        await fs_1.default.promises.writeFile(outputPath, res);
                        asset.file = outputPath;
                    }
                }
            }
            return Object.assign(Object.assign({}, dataSource), { mapping: Object.assign(Object.assign({}, dataSource.mapping), { entryScript, file }) });
        }
        else {
            return Object.assign(Object.assign({}, dataSource), { mapping: Object.assign(Object.assign({}, dataSource.mapping), { entryScript, file }) });
        }
    }));
}
exports.updateDataSourcesV0_3_0 = updateDataSourcesV0_3_0;
async function updateDataSourcesEntry(reader, file, root, script) {
    if (reader instanceof common_1.LocalReader)
        return file;
    else if (reader instanceof common_1.IPFSReader || reader instanceof common_1.GithubReader) {
        const outputPath = `${path_1.default.resolve(root, file.replace('ipfs://', ''))}.js`;
        await fs_1.default.promises.writeFile(outputPath, script);
        return outputPath;
    }
}
async function updateProcessor(reader, root, file) {
    if (reader instanceof common_1.LocalReader) {
        return path_1.default.resolve(root, file);
    }
    else {
        const res = await reader.getFile(file);
        const outputPath = `${path_1.default.resolve(root, file.replace('ipfs://', ''))}.js`;
        await fs_1.default.promises.writeFile(outputPath, res);
        return outputPath;
    }
}
async function loadDataSourceScript(reader, file) {
    let entry;
    const entryScript = await reader.getFile(file ? file : entry);
    if (entryScript === undefined) {
        throw new Error(`Entry file ${entry} for datasource not exist`);
    }
    return entryScript;
}
exports.loadDataSourceScript = loadDataSourceScript;
async function loadNetworkChainType(reader, file) {
    const proto = await reader.getFile(file);
    if (!proto)
        throw new Error(`Unable to load chain type from ${file}`);
    const { package: packageName, root } = protobuf.parse(proto);
    return [packageName, root];
}
exports.loadNetworkChainType = loadNetworkChainType;
async function makeTempDir() {
    const sep = path_1.default.sep;
    const tmpDir = os_1.default.tmpdir();
    return fs_1.default.promises.mkdtemp(`${tmpDir}${sep}`);
}
async function getProjectRoot(reader) {
    if (reader instanceof common_1.LocalReader)
        return reader.root;
    if (reader instanceof common_1.IPFSReader || reader instanceof common_1.GithubReader) {
        return makeTempDir();
    }
}
exports.getProjectRoot = getProjectRoot;
//# sourceMappingURL=project.js.map