import {
    addProjectConfiguration, formatFiles, getWorkspaceLayout, names, Tree
} from '@nrwl/devkit';

import { DotNetClient, dotnetFactory, dotnetNewOptions } from '@nx-dotnet/dotnet';
import { isDryRun } from '@nx-dotnet/utils';

import initSchematic from '../init/generator';
import { NxDotnetGeneratorSchema } from './schema';

interface NormalizedSchema extends NxDotnetGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  projectLanguage: string;
  projectTemplate: string;
  parsedTags: string[];
}

function normalizeOptions(
  host: Tree,
  options: NxDotnetGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(host).appsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    name,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    projectLanguage: options.language,
    projectTemplate: options.template,
  };
}

export default async function (host: Tree, options: NxDotnetGeneratorSchema, dotnetClient = new DotNetClient(dotnetFactory())) {
  initSchematic(host);

  const normalizedOptions = normalizeOptions(host, options);
  addProjectConfiguration(host, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'application',
    sourceRoot: `${normalizedOptions.projectRoot}`,
    targets: {
      build: {
        executor: '@nx-dotnet/core:build',
        options: {
          output: `dist/${normalizedOptions.name}`,
          configuration: 'Debug'
        },
        configurations: {
          production: {
            configuration: 'Release'
          }
        }
      },
      serve: {
        executor: '@nx-dotnet/core:serve',
        options: {
          configuration: 'Debug'
        },
        configurations: {
          production: {
            configuration: 'Release'
          }
        }
      },
      test: {
        executor: '@nx-dotnet/core:test',
      },
    },
    tags: normalizedOptions.parsedTags,
  });

  const newParams: dotnetNewOptions = [
    {
      flag: 'language',
      value: normalizedOptions.language,
    },
    {
      flag: 'name',
      value: normalizedOptions.name,
    },
    {
      flag: 'output',
      value: normalizedOptions.projectRoot,
    },
  ];

  if (isDryRun()) {
    newParams.push({
      flag: 'dry-run',
    });
  }

  dotnetClient.new(normalizedOptions.template, newParams);

  await formatFiles(host);
}
