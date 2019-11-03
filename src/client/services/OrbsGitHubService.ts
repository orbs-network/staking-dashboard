import GitHub from 'github-api';
import { IGitHubCommitGist } from '../../shared/IStoreTypes';

export interface IOrbsGithubService {
  /**
   * Returns the gist of the latest commit for the given owner/repo.
   */
  getRepoLastCommitGist(): Promise<IGitHubCommitGist>;
}

const REPO_OWNER = 'orbs-network';
const REPO_NAME = 'orbs-network-go';

export class OrbsGitHubService implements IOrbsGithubService {
  constructor(private gitHubApi: GitHub) {}

  public async getRepoLastCommitGist(): Promise<IGitHubCommitGist> {
    const repoData = await this.gitHubApi.getRepo(REPO_OWNER, REPO_NAME);

    const commits = await repoData.listCommits();

    const latestCommitMessage = commits.data[0].commit.message;
    const latestCommitGitHubUrl = commits.data[0].html_url;

    return {
      commitText: latestCommitMessage,
      commitUrl: latestCommitGitHubUrl,
    };
  }
}
