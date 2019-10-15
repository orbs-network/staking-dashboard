import { IStoreInitialData } from '../../shared/IStore';
import { EthplorerAdapter } from './ethplorerAdapter';
import { OrbsPosDataAdapter } from './orbsPosDataAdapter';
import { IPoi } from '../../shared/IPoi';

// NOTE : O.L : These static POIs are only here untill we'll have a POI caching/generation mechanism.
const staticPois: IPoi[] = [
  {
    // Israel
    name: 'Israel',
    xRotation: 5.68,
    yRotation: 1.75,
  },
  {
    // Japan
    name: 'JP',
    xRotation: 5.59,
    yRotation: 3.58,
  },
  {
    // Bulgaria
    name: 'BG',
    xRotation: 5.47,
    yRotation: 1.57,
  },
  {
    // Canada
    name: 'CA',
    xRotation: 5.35,
    yRotation: 5.84,
  },
  {
    // Hoing Kong
    name: 'HK',
    xRotation: 5.86,
    yRotation: 3.26,
  },
  {
    // Thailand
    name: 'Th',
    xRotation: 6.05,
    yRotation: 3,
  },
  {
    // USA (CA)
    name: 'US-CA',
    xRotation: 5.64,
    yRotation: 5.39,
  },
  {
    // Cayman Islands
    name: 'Cayman Islands',
    xRotation: 5.93,
    yRotation: 5.99,
  },
  {
    // Korea
    name: 'Korea',
    xRotation: 5.6,
    yRotation: 3.38,
  },
  {
    // Macau
    name: 'Macau',
    xRotation: 5.88,
    yRotation: 3.2,
  },
  {
    // UK
    name: 'UK',
    xRotation: 5.3,
    yRotation: 1.12,
  },
  {
    // Cyprus
    name: 'CYP',
    xRotation: 5.65,
    yRotation: 1.71,
  },
  {
    // Singapore
    name: 'SG',
    xRotation: 6.27,
    yRotation: 3.06,
  },
  {
    // Russia
    name: 'RUS',
    xRotation: 5.17,
    yRotation: 2.67,
  },
  {
    // USA (NY)
    name: 'NY',
    xRotation: 5.55,
    yRotation: 6.24,
  },
  {
    // Slovak Republic
    name: 'SlV',
    xRotation: 5.39,
    yRotation: 1.46,
  },
  {
    // New Zealand
    name: 'NZ',
    xRotation: 0.86,
    yRotation: 4.05,
  },
  {
    // Scotland
    name: 'Scotland',
    xRotation: 5.22,
    yRotation: 1.09,
  },
];

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
      poiStoreState: {
        pointsOfInterest: staticPois,
      },
    };
  }
}
