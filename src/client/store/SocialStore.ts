import {observable, action, runInAction} from 'mobx';
import { ISocialStoreState } from '../../shared/IStore';
import {IGithubService} from '../services/gitHubService';

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
  private githubService: IGithubService;

  constructor(gitHubService: IGithubService, initialData?: ISocialStoreState) {
    this.githubService = gitHubService;

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
    const latestCommitSummary = await this.githubService.getRepoLastCommitGist('orbs-network', 'orbs-network-go');

    // Update the latest commit message
    runInAction('Set Latest commit', () => this.latestCommit = latestCommitSummary.message);
  }
}
