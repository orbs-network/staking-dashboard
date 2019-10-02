import GitHub from 'github-api';

import { IGithubService, GitHubService } from './gitHubService';

export interface IAppServices {
  gitHubService: IGithubService;
}

export interface IServicesDependencies {
  gitHubApi: GitHub;
}

/**
 * Builds the app-services with production dependencies-implementations.
 */
export function buildProductionAppServices(): IAppServices {
  const productionDependencies: IServicesDependencies = {
    gitHubApi: new GitHub(),
  };
  return buildAppServices(productionDependencies);
}

/**
 * Builds all of the app services with the given dependencies implementations.
 * @param servicesDependencies
 */
export function buildAppServices(servicesDependencies: IServicesDependencies): IAppServices {
  const { gitHubApi } = servicesDependencies;

  const gitHubService = new GitHubService(gitHubApi);

  return {
    gitHubService,
  };
}
