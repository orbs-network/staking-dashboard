import { observable, action, runInAction } from 'mobx';
import { ISocialStoreState } from '../../shared/IStore';
import { IOrbsGithubService } from '../services/OrbsGitHubService';

export const defaultSocialStoreState: Readonly<ISocialStoreState> = {
  latestTweet: '',
  latestCommit: '',
  recentUpdate: '',
};

export class SocialStore implements ISocialStoreState {
  @observable public latestTweet: string = defaultSocialStoreState.latestTweet;
  @observable public latestCommit: string = defaultSocialStoreState.latestCommit;
  @observable public recentUpdate: string = defaultSocialStoreState.recentUpdate;

  // Services
  private orbsGithubService: IOrbsGithubService;

  constructor(orbsGitHubService: IOrbsGithubService, initialData?: ISocialStoreState) {
    this.orbsGithubService = orbsGitHubService;

    if (initialData) {
      this.latestTweet = initialData.latestTweet;
      this.latestCommit = initialData.latestCommit;
      this.recentUpdate = initialData.recentUpdate;
    }
  }

  public async init(): Promise<void> {
    await this.initLatestCommit();
  }

  private async initLatestCommit() {
    const latestCommitSummary = await this.orbsGithubService.getRepoLastCommitGist('orbs-network', 'orbs-network-go');

    // Update the latest commit message
    runInAction('Set Latest commit', () => (this.latestCommit = latestCommitSummary.message));
  }
}
