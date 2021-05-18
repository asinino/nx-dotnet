import { readJson, Tree, writeJson } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { DotNetClient, mockDotnetFactory } from '@nx-dotnet/dotnet';

import { CONFIG_FILE_PATH, NxDotnetConfig } from '@nx-dotnet/utils';

import generator from './generator';

describe('init generator', () => {
  let appTree: Tree;
  let dotnetClient: DotNetClient;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
    dotnetClient = new DotNetClient(mockDotnetFactory());

    const packageJson = { scripts: {} };
    writeJson(appTree, 'package.json', packageJson);
  });

  it('should create config', async () => {
    await generator(appTree, dotnetClient);
    const config = appTree.isFile(CONFIG_FILE_PATH);
    expect(config).toBeTruthy();
  });

  it('should update gitignore', async () => {
    appTree.write('.gitignore', '');
    await generator(appTree, dotnetClient);
    const gitignoreValue = appTree.read('.gitignore')?.toString();
    expect(gitignoreValue).toBeTruthy();
  });

  it('should put dependency array inside config', async () => {
    await generator(appTree, dotnetClient);
    const config: NxDotnetConfig = readJson(appTree, CONFIG_FILE_PATH);
    expect(config.nugetPackages).toBeDefined();
  });

  it('should create tool manifest', async () => {
    const spy = spyOn(dotnetClient, 'new');
    await generator(appTree, dotnetClient);
    expect(spy).toHaveBeenCalledWith('tool-manifest');
  });

  it('should not create tool manifest if it exists', async () => {
    appTree.write('.config/dotnet-tools.json', '');
    const spy = spyOn(dotnetClient, 'new');
    await generator(appTree, dotnetClient);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should add restore to prepare script', async () => {
    await generator(appTree, dotnetClient);
    const updated = readJson(appTree, 'package.json');
    expect(updated.scripts.prepare).toBe('nx g @nx-dotnet/core:restore');
  });

  it('should not add restore if it already exists', async () => {
    const packageJson = {
      scripts: { prepare: 'nx g @nx-dotnet/core:restore' },
    };
    writeJson(appTree, 'package.json', packageJson);
    await generator(appTree, dotnetClient);
    const updated = readJson(appTree, 'package.json');
    expect(updated.scripts.prepare).toBe('nx g @nx-dotnet/core:restore');
  });
});
