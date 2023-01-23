export { packageInfo } from './packageInfo';
type GlobalThis = typeof globalThis & Record<string, unknown>;
type GlobalNames = keyof typeof globalThis;
type GlobalType<N extends GlobalNames> = typeof globalThis[N];
export declare const xglobal: GlobalThis;
export declare function extractGlobal<N extends GlobalNames, T extends GlobalType<N>>(name: N, fallback: unknown): T;
export declare function exposeGlobal<N extends GlobalNames>(name: N, fallback: unknown): void;
