import { EthplorerAdapter } from './ethplorerAdapter';
import { IStoreInitialData } from '../../shared/IStore';

export class RealTimeDataProvider {
  constructor(private ethplorer: EthplorerAdapter) {}

  public getStoreInitialData(): IStoreInitialData {
    return {
      posStore: {
        blockHeight: 1_234_567,
        rewardsDistributed: 68_789,
        nextVotingTime: Date.now() + 15 * 60 * 60 * 1_000 + 45 * 60 * 1_000 + 15 * 1_000,
        topGuardians: ['MR.SHOWOFFTOKEN', 'SLOWMOSHE', 'DONTTELLMYMAMA'],
      },
      socialStore: {
        latestTweet: '#SUMMIT2019 #LIVECRYPTO #KEYWORD #TALKINGABOUTIT #GITHUB #SOCIALIMPACT #GUARDIANS',
        latestCommit: 'orbs-network/orbs-network-go',
        recentUpdate: '25.6.2019 Latest Blog Update',
      },
      tokenStore: {
        orbsInCirculation: this.ethplorer.orbsInCirculation,
        tokenPrice: this.ethplorer.tokenPrice,
        token24HVolume: this.ethplorer.token24HVolume,
        totalHolders: this.ethplorer.totalHolders,
      },
    };
  }
}
