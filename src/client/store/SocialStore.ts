import {observable, action, runInAction} from 'mobx';
import { ISocialStore } from '../../shared/IStore';
import {IGithubService} from '../services/gitHubService';

export class SocialStore {
  @observable public latestTweet: string = '';
  @observable public latestCommit: string = '';
  @observable public recentUpdate: string = '';

  // Services
  private githubService: IGithubService;

  constructor(gitHubService: IGithubService, initialData: ISocialStore) {
    this.githubService = gitHubService;

    this.latestTweet = initialData.latestTweet;
    this.latestCommit = initialData.latestCommit;
    this.recentUpdate = initialData.recentUpdate;
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
