import { GitHubApiTestKit } from './GithubApi';

export class ApiDependenciesKit {
  public gitHubApiTestKit: GitHubApiTestKit;

  constructor() {
    this.gitHubApiTestKit = new GitHubApiTestKit();
  }

  public buildAppDependencies() {
    return {
      gitHubApi: this.gitHubApiTestKit.buildMockedInstance(),
    };
  }
}
