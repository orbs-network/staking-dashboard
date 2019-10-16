import Twitter from 'twitter';

interface IServerService {
  init: () => Promise<void>;
}

export interface IOrbsTwitterService extends IServerService {
  getLatestTweet: () => { message: string };
}

export class OrbsTwitterService implements IOrbsTwitterService {
  constructor(private twitterClient: Twitter) {}

  public getLatestTweet(): { message: string } {
    return {
      message: 'TBI',
    };
  }

  public async init() {
    const message = await this.twitterClient.get('/');
  }
}
