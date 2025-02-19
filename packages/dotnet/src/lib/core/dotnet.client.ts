import { getSpawnParameterArray, swapKeysUsingMap } from '@nx-dotnet/utils';
import { ChildProcess, spawn, spawnSync } from 'child_process';

import {
  addPackageKeyMap,
  buildKeyMap,
  dotnetAddPackageOptions,
  dotnetBuildOptions,
  dotnetFormatOptions,
  dotnetNewOptions,
  dotnetPublishOptions,
  dotnetRunOptions,
  dotnetTemplate,
  dotnetTestOptions,
  formatKeyMap,
  newKeyMap,
  publishKeyMap,
  runKeyMap,
  testKeyMap,
} from '../models';
import { LoadedCLI } from './dotnet.factory';

export class DotNetClient {
  constructor(private cliCommand: LoadedCLI, public cwd?: string) {}

  new(template: dotnetTemplate, parameters?: dotnetNewOptions): void {
    const params = [`new`, template];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, newKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    return this.logAndExecute(params);
  }

  build(project: string, parameters?: dotnetBuildOptions): void {
    const params = [`build`, project];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, buildKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    return this.logAndExecute(params);
  }

  run(
    project: string,
    watch = false,
    parameters?: dotnetRunOptions,
  ): ChildProcess {
    const params = watch
      ? [`watch`, `--project`, project, `run`]
      : [`run`, `--project`, project];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, runKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }

    return this.logAndSpawn(params);
  }

  test(
    project: string,
    watch?: boolean,
    parameters?: dotnetTestOptions,
  ): void | ChildProcess {
    const params = watch
      ? [`watch`, `--project`, project, `test`]
      : [`test`, project];

    if (parameters) {
      parameters = swapKeysUsingMap(parameters, testKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    if (!watch) {
      return this.logAndExecute(params);
    } else {
      const slicedParams = params.slice(1).filter((x) => x.length);
      return this.logAndSpawn(slicedParams);
    }
  }

  addPackageReference(
    project: string,
    pkg: string,
    parameters?: dotnetAddPackageOptions,
  ): void {
    const params = [`add`, project, `package`, pkg];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, addPackageKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    return this.logAndExecute(params);
  }

  addProjectReference(hostCsProj: string, targetCsProj: string): void {
    return this.logAndExecute([`add`, hostCsProj, `reference`, targetCsProj]);
  }

  publish(
    project: string,
    parameters?: dotnetPublishOptions,
    publishProfile?: string,
    extraParameters?: string,
  ): void {
    const params = [`publish`, `"${project}"`];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, publishKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    if (publishProfile) {
      params.push(`-p:PublishProfile=${publishProfile}`);
    }
    if (extraParameters) {
      params.push(`${extraParameters}`);
    }
    return this.logAndExecute(params);
  }

  installTool(tool: string): void {
    const cmd = [`tool`, `install`, tool];
    return this.logAndExecute(cmd);
  }

  restorePackages(project: string): void {
    const cmd = [`restore`, project];
    return this.logAndExecute(cmd);
  }

  restoreTools(): void {
    const cmd = [`tool`, `restore`];
    return this.logAndExecute(cmd);
  }

  format(project: string, parameters?: dotnetFormatOptions): void {
    const params = [`format`, project];
    if (parameters) {
      parameters = swapKeysUsingMap(parameters, formatKeyMap);
      params.push(...getSpawnParameterArray(parameters));
    }
    return this.logAndExecute(params);
  }

  addProjectToSolution(solutionFile: string, project: string) {
    const params = [`sln`, solutionFile, `add`, project];
    this.logAndExecute(params);
  }

  getSdkVersion(): Buffer {
    return this.execute(['--version']);
  }

  printSdkVersion(): void {
    this.logAndExecute(['--version']);
  }

  private logAndExecute(params: string[]): void {
    console.log(
      `Executing Command: ${this.cliCommand.command} "${params.join('" "')}"`,
    );
    spawnSync(this.cliCommand.command, params, {
      cwd: this.cwd || process.cwd(),
      stdio: 'inherit',
    });
  }

  private execute(params: string[]): Buffer {
    return spawnSync(this.cliCommand.command, params, {
      cwd: this.cwd || process.cwd(),
    })
      .output.filter((buf) => buf !== null)
      .reduce(
        (acc, buf) => Buffer.concat([acc as Buffer, buf as Buffer]),
        Buffer.from(''),
      ) as Buffer;
  }

  private logAndSpawn(params: string[]): ChildProcess {
    console.log(
      `Executing Command: ${this.cliCommand.command} "${params.join('" "')}"`,
    );
    return spawn(this.cliCommand.command, params, {
      stdio: 'inherit',
      cwd: this.cwd || process.cwd(),
    });
  }
}
