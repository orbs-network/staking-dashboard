import { observable, action } from 'mobx';

export class SocialStore {
  @observable public latestTweet: string = '';

  public async init(): Promise<void> {
    await this.loadStore();
  }

  @action private async loadStore(): Promise<void> {
    this.latestTweet = '#SUMMIT2019 #LIVECRYPTO #KEYWORD #TALKINGABOUTIT #GITHUB #SOCIALIMPACT #GUARDIANS';
  }
}
