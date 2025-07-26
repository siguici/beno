import { description, license, name, version } from '../package.json';
import { whichPackageManager } from './pm';
import { whichRuntime } from './runtime';
import serve from './serve';
import { exec, execSync, spawn, spawnSync } from './subprocess';

export { default as assert } from './assert';
export * as async_hooks from './async_hooks';
export * as buffer from './buffer';
export * as child_process from './child_process';
export { default as console } from './console';
export * as crypto from './crypto';
export * as defaults from './defaults';
export * as dgram from './dgram';
export * as diagnostics_channel from './diagnostics_channel';
export * as dns from './dns';
export { default as events } from './events';
export * as find_up from './find_up';
export * as fs from './fs';
export * as helpers from './helpers';
export * as http from './http';
export * as http2 from './http2';
export * as https from './https';
export { default as module } from './module';
export * as net from './net';
export * as os from './os';
export { default as path } from './path';
export * as perf_hooks from './perf_hooks';
export * as pm from './pm';
export { default as process } from './process';
export * as punycode from './punycode';
export * as querystring from './querystring';
export * as readline from './readline';
export * as runtime from './runtime';
export { default as serve } from './serve';
export { default as stream } from './stream';
export * as string_decoder from './string_decoder';
export * as subprocess from './subprocess';
export * as timers from './timers';
export * as tls from './tls';
export * as tty from './tty';
export type * from './types';
export * as url from './url';
export * from './urlpattern';
export * as util from './util';
export * as vm from './vm';
export * as which from './which';
export * as worker_threads from './worker_threads';
export * as zlib from './zlib';

const _beno = {
  name,
  version,
  license,
  description,
  runtime: whichRuntime(),
  packageManager: whichPackageManager(),
  serve,
  exec,
  execSync,
  spawn,
  spawnSync,
} as const;

declare global {
  var Beno: typeof _beno;
}

globalThis.Beno = _beno;

export { _beno as Beno };
