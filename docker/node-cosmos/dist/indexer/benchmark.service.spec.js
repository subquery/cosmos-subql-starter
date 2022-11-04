"use strict";
// Copyright 2020-2022 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const promise_1 = require("../utils/promise");
const benchmark_service_1 = require("./benchmark.service");
jest.setTimeout(90000);
describe('Benchmark service', () => {
    let loggerSpy;
    beforeEach(() => {
        const logger = (0, logger_1.getLogger)('benchmark');
        loggerSpy = jest.spyOn(logger, 'info');
    });
    it('Handle bps when fully synced', async () => {
        const newbenchmarkService = new benchmark_service_1.BenchmarkService();
        newbenchmarkService.currentProcessingHeight = 1208163;
        newbenchmarkService.targetHeight = 1208163;
        newbenchmarkService.lastRegisteredHeight = 1208163;
        newbenchmarkService.lastRegisteredTimestamp = 10000;
        newbenchmarkService.currentProcessingTimestamp = 10000;
        await newbenchmarkService.benchmark();
        await (0, promise_1.delay)(20);
        expect(loggerSpy).toHaveBeenCalledWith('Fully synced, waiting for new blocks');
    });
    it('Connection dropped', async () => {
        const newbenchmarkService = new benchmark_service_1.BenchmarkService();
        newbenchmarkService.currentProcessingHeight = 1209000;
        newbenchmarkService.targetHeight = 1209000;
        newbenchmarkService.lastRegisteredHeight = 1208162;
        newbenchmarkService.currentProcessingTimestamp = 10000;
        newbenchmarkService.lastRegisteredTimestamp = 10000;
        await newbenchmarkService.benchmark();
        await (0, promise_1.delay)(20);
        expect(loggerSpy).toHaveBeenCalledWith('0.00 bps, target: #1209000, current: #1209000, estimate time: unknown');
    });
    it('Handle normal', async () => {
        const newbenchmarkService = new benchmark_service_1.BenchmarkService();
        newbenchmarkService.currentProcessingHeight = 1208163;
        newbenchmarkService.targetHeight = 1209163;
        newbenchmarkService.lastRegisteredHeight = 1208162;
        newbenchmarkService.currentProcessingTimestamp = 15000;
        newbenchmarkService.lastRegisteredTimestamp = 10000;
        await newbenchmarkService.benchmark();
        await (0, promise_1.delay)(20);
        expect(loggerSpy).toHaveBeenCalledWith('0.20 bps, target: #1209163, current: #1208163, estimate time: 0 days 01 hours 23 mins');
    });
});
//# sourceMappingURL=benchmark.service.spec.js.map