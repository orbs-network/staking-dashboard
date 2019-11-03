import GitHub from 'github-api';

import { IOrbsGithubService, OrbsGitHubService } from './OrbsGitHubService';

export interface IAppServices {
  orbsGitHubService: IOrbsGithubService;
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

  // TODO : FUTURE : O.L : We can move this constants to a file/make them injected as well.
  const orbsGitHubService = new OrbsGitHubService(gitHubApi);

  return {
    orbsGitHubService,
  };
}
