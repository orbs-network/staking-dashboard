import { observable, action } from 'mobx';
import { ISocialStore } from '../../shared/IStore';

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
  }
}
