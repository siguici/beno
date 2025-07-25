export type WhichOptions = { path?: string; cwd?: string };
export type WhichResult = string | null;

export type Version = `${number}.${number}.${number}`;

export type PackageManagerName =
  | 'npm'
  | 'cnpm'
  | 'yarn'
  | 'pnpm'
  | 'bun'
  | 'deno';

export interface PackageManagerInfo {
  name: PackageManagerName;
  version?: Version;
  lockfile?: string;
}

export interface FindUpOptions {
  cwd?: string;
  type?: 'file' | 'directory';
  stopAt?: string;
}

export type RuntimeName = 'node' | 'bun' | 'deno';

export interface RuntimeInfo {
  name: RuntimeName;
  version?: Version;
}

export type Cwd = string | URL;
export interface Env {
  [key: string]: string;
}

export type ExecOptions = Partial<{
  cwd: string;
  env: Record<string, string>;
}>;
export type ExecResult = Promise<ProcessResult>;
export type ExecCallback<T = void> = (output: ProcessResult) => T;

export type SpawnOptions = ExecOptions & { stdio?: Stdio };

export type IO = 'pipe' | 'ignore' | 'inherit';
export type Stdio =
  | IO
  | {
      stdin: IO;
      stdout: IO;
      stderr: IO;
    };
export type Status = {
  code: number;
  success: boolean;
  failed: boolean;
};
export type ProcessResult = Status & {
  stdout: string | undefined;
  stderr: string | undefined;
};
export type Signal =
  | 'SIGABRT'
  | 'SIGALRM'
  | 'SIGBREAK'
  | 'SIGBUS'
  | 'SIGCHLD'
  | 'SIGCONT'
  | 'SIGEMT'
  | 'SIGFPE'
  | 'SIGHUP'
  | 'SIGILL'
  | 'SIGINFO'
  | 'SIGINT'
  | 'SIGIO'
  | 'SIGPOLL'
  | 'SIGUNUSED'
  | 'SIGKILL'
  | 'SIGPIPE'
  | 'SIGPROF'
  | 'SIGPWR'
  | 'SIGQUIT'
  | 'SIGSEGV'
  | 'SIGSTKFLT'
  | 'SIGSTOP'
  | 'SIGSYS'
  | 'SIGTERM'
  | 'SIGTRAP'
  | 'SIGTSTP'
  | 'SIGTTIN'
  | 'SIGTTOU'
  | 'SIGURG'
  | 'SIGUSR1'
  | 'SIGUSR2'
  | 'SIGVTALRM'
  | 'SIGWINCH'
  | 'SIGXCPU'
  | 'SIGXFSZ';

export type QueryType = 'string' | 'number';
export type QueryValue = string | number;
export type Index = number;
export type Name = string;
export type Key = Index | Name;
export type Argument = { index: Index; value: QueryValue };
export type Parameter = { name: Name; type: QueryType; value: QueryValue };
export type Option = { key: Key; value: QueryValue };
export type Arguments = Record<Index, QueryValue>;
export type Parameters = Record<Name, QueryValue>;
export type Options = Record<Key, QueryValue>;

export type Result = boolean | number | string | object | Response;
export type Path = string;
export type Pattern = string;
export type Resolver = (...args: any[]) => Result;

export type Port = number;
export type Hostname = `${number}.${number}.${number}.${number}` | string;
export type Address = { port: Port; hostname: Hostname };
export type ServeHandler = (request: Request) => Response | Promise<Response>;
export type ServeOptions = Address & {
  handler: ServeHandler;
};

export type Engine = 'V8' | 'JSC';
export type Runtime = 'Node.js' | 'Deno' | 'Bun';

export interface Logger {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export interface PathInfo {
  name: string;
  realname: string;
  normalname: string;
  isAbsolute: boolean;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
  size: number;
  mtime: Date | null;
  atime: Date | null;
  birthtime: Date | null;
  extension: string;
  basename: string;
  dirname: string;
}
