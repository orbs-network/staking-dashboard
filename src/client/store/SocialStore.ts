import {observable, action, runInAction} from 'mobx';
import { ISocialStore } from '../../shared/IStore';
import {getRepoLastCommitGist} from '../services/gitHubService';


export class SocialStore {
  @observable public latestTweet: string = '';
  @observable public latestCommit: string = '';
  @observable public recentUpdate: string = '';

  constructor(initialData: ISocialStore) {
    this.latestTweet = initialData.latestTweet;
    this.latestCommit = initialData.latestCommit;
    this.recentUpdate = initialData.recentUpdate;
  }

  public async init(): Promise<void> {
    await this.initLatestCommit();
  }

  private async initLatestCommit() {
    const latestCommitSummary = await getRepoLastCommitGist('orbs-network', 'orbs-network-go');

    // Update the latest commit message
    runInAction('Set Latest commit', () => this.latestCommit = latestCommitSummary.message);
  }
}
