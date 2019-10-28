import { observable, action, runInAction } from 'mobx';
import { ISocialStoreState } from '../../shared/IStore';
import { IOrbsGithubService } from '../services/OrbsGitHubService';
import { IGitHubCommitGist, ITwitGist } from '../../shared/IStoreTypes';

export const defaultSocialStoreState: Readonly<ISocialStoreState> = {
  latestTweetGist: {
    tweetUrl: '',
    tweetText: '',
  },
  latestCommitGist: {
    commitText: '',
    commitUrl: '',
  },
  recentUpdate: '',
};

export type TSocialStore = ISocialStoreState;

export class SocialStore implements TSocialStore {
  @observable public latestTweetGist: ITwitGist = defaultSocialStoreState.latestTweetGist;
  @observable public latestCommitGist: IGitHubCommitGist = defaultSocialStoreState.latestCommitGist;
  @observable public recentUpdate: string = defaultSocialStoreState.recentUpdate;

  // Services
  private orbsGithubService: IOrbsGithubService;

  constructor(orbsGitHubService: IOrbsGithubService, initialData?: ISocialStoreState) {
    this.orbsGithubService = orbsGitHubService;

    if (initialData) {
      this.latestTweetGist = initialData.latestTweetGist;
      this.latestCommitGist = initialData.latestCommitGist;
      this.recentUpdate = initialData.recentUpdate;
    }
  }

  public async init(): Promise<void> {
    await this.initLatestCommit();
  }

  private async initLatestCommit() {
    const latestCommitSummary = await this.orbsGithubService.getRepoLastCommitGist();

    // Update the latest commit message
    runInAction('Set Latest commit', () => (this.latestCommitGist = latestCommitSummary));
  }
}
