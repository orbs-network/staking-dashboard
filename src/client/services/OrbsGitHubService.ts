import GitHub from 'github-api';
import { IGitHubCommitGist } from '../../shared/IStoreTypes';

export interface IOrbsGithubService {
  /**
   * Returns the gist of the latest commit for the given owner/repo.
   */
  getRepoLastCommitGist(): Promise<IGitHubCommitGist>;
}

export class OrbsGitHubService implements IOrbsGithubService {
  private readonly repoOwner: string;
  private readonly repoName: string;

  constructor(private gitHubApi: GitHub, repoData: { repoOwner: string; repoName: string }) {
    this.repoOwner = repoData.repoOwner;
    this.repoName = repoData.repoName;
  }

  public async getRepoLastCommitGist(): Promise<IGitHubCommitGist> {
    const repoData = await this.gitHubApi.getRepo(this.repoOwner, this.repoName);

    const commits = await repoData.listCommits();

    const latestCommitMessage = commits.data[0].commit.message;
    const latestCommitGitHubUrl = commits.data[0].html_url;

    return {
      commitText: latestCommitMessage,
      commitUrl: latestCommitGitHubUrl,
    };
  }
}
