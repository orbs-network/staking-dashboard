import { observable, action } from 'mobx';

export class SocialStore {
  @observable public latestTweet: string = '';
  @observable public latestCommit: string = '';
  @observable public recentUpdate: string = '';

  public async init(): Promise<void> {
    await this.loadStore();
  }

  @action private async loadStore(): Promise<void> {
    this.latestTweet = '#SUMMIT2019 #LIVECRYPTO #KEYWORD #TALKINGABOUTIT #GITHUB #SOCIALIMPACT #GUARDIANS';
    this.latestCommit = 'orbs-network/orbs-network-go';
    this.recentUpdate = '25.6.2019 Latest Blog Update';
  }
}
