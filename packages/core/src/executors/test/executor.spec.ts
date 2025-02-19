import { ExecutorContext } from '@nrwl/devkit';

import { DotNetClient, mockDotnetFactory } from '@nx-dotnet/dotnet';

import * as utils from '@nx-dotnet/utils';

jest.mock('@nx-dotnet/utils', () => ({
  ...(jest.requireActual('@nx-dotnet/utils') as typeof utils),
  getProjectFileForNxProject: () => Promise.resolve('1.csproj'),
}));

import executor from './executor';
import { TestExecutorSchema } from './schema';

const options: TestExecutorSchema = {};
const root = process.cwd() + '/tmp';

jest.mock('../../../../dotnet/src/lib/core/dotnet.client');

describe('Test Executor', () => {
  let context: ExecutorContext;
  let dotnetClient: DotNetClient;

  beforeEach(() => {
    context = {
      root: root,
      cwd: root,
      projectName: 'my-app',
      targetName: 'build',
      workspace: {
        version: 2,
        projects: {
          'my-app': {
            root: `${root}/apps/my-app`,
            sourceRoot: `${root}/apps/my-app`,
            targets: {
              build: {
                executor: '@nx-dotnet/core:build',
              },
            },
          },
        },
        npmScope: 'unit-tests',
      },
      isVerbose: false,
    };
    dotnetClient = new DotNetClient(mockDotnetFactory());
  });

  it('runs dotnet test', async () => {
    const output = await executor(options, context, dotnetClient);
    expect(output.success).toBe(true);
    const mock = dotnetClient as jest.Mocked<DotNetClient>;
    expect(mock.test).toHaveBeenCalledTimes(1);
  });
});
