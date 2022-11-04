import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class MmrExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
