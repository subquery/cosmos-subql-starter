"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexerEvent = void 0;
var IndexerEvent;
(function (IndexerEvent) {
    IndexerEvent["ApiConnected"] = "api_connected";
    IndexerEvent["InjectedApiConnected"] = "injected_api_connected";
    IndexerEvent["BlockTarget"] = "block_target_height";
    IndexerEvent["BlockBest"] = "block_best_height";
    IndexerEvent["BlockProcessing"] = "block_processing_height";
    IndexerEvent["BlockQueueSize"] = "block_queue_size";
    IndexerEvent["BlocknumberQueueSize"] = "blocknumber_queue_size";
    IndexerEvent["NetworkMetadata"] = "network_metadata";
    IndexerEvent["UsingDictionary"] = "using_dictionary";
    IndexerEvent["SkipDictionary"] = "skip_dictionary";
    IndexerEvent["Ready"] = "ready";
})(IndexerEvent = exports.IndexerEvent || (exports.IndexerEvent = {}));
//# sourceMappingURL=events.js.map