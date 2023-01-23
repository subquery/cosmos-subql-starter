import type { SimpleGitPlugin } from './simple-git-plugin';
import type { SimpleGitOptions } from '../types';
export declare function timeoutPlugin({ block, }: Exclude<SimpleGitOptions['timeout'], undefined>): SimpleGitPlugin<'spawn.after'> | void;
