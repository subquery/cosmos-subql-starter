import { LoggerService } from '@nestjs/common';
import Pino from 'pino';
export declare function getLogger(category: string): Pino.Logger;
export declare function setLevel(level: Pino.LevelWithSilent): void;
export declare class NestLogger implements LoggerService {
    private logger;
    error(message: any, trace?: string): void;
    log(message: any): any;
    warn(message: any): any;
}
