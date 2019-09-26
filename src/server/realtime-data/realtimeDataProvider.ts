import { IStoreInitialData } from '../../shared/IStore';
import { EthplorerAdapter } from './ethplorerAdapter';
import { OrbsPosDataAdapter } from './orbsPosDataAdapter';

export class RealtimeDataProvider {
  constructor(private ethplorer: EthplorerAdapter, private orbsPosDataAdapter: OrbsPosDataAdapter) {}

  public getStoreInitialData(): IStoreInitialData {
    return {
      posStoreState: {
        blockHeight: 1_234_567,
        rewardsDistributed: 68_789,
        nextVotingTime: Date.now() + 15 * 60 * 60 * 1_000 + 45 * 60 * 1_000 + 15 * 1_000,
        topGuardians: this.orbsPosDataAdapter.top3Guardians,
      },
      socialStoreState: {
        latestTweet: '#SUMMIT2019 #LIVECRYPTO #KEYWORD #TALKINGABOUTIT #GITHUB #SOCIALIMPACT #GUARDIANS',
        latestCommit: 'orbs-network/orbs-network-go',
        recentUpdate: '25.6.2019 Latest Blog Update',
      },
      tokenStoreState: {
        orbsInCirculation: this.ethplorer.orbsInCirculation,
        tokenPrice: this.ethplorer.tokenPrice,
        token24HVolume: this.ethplorer.token24HVolume,
        totalHolders: this.ethplorer.totalHolders,
      },
    };
  }
}
