import GitHub from 'github-api';

import { IOrbsGithubService, OrbsGitHubService } from './OrbsGitHubService';

export interface IAppServices {
  orbsGitHubService: IOrbsGithubService;
}

export function buildAppServices(gitHubApi: GitHub): IAppServices {
  const orbsGitHubService = new OrbsGitHubService(gitHubApi);

  return {
    orbsGitHubService,
  };
}
