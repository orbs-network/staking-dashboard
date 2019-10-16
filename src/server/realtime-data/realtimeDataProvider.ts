import { IStoreInitialData } from '../../shared/IStore';
import { EthplorerAdapter } from './ethplorerAdapter';
import { OrbsPosDataAdapter } from './orbsPosDataAdapter';
import { IPoi } from '../../shared/IPoi';

function buildPOI(id, name, xRotation, yRotation): IPoi {
  const poi: IPoi = {
    id,
    name,
    xRotation,
    yRotation,
  };

  return poi;
}

// NOTE : O.L : These static POIs are only here untill we'll have a POI caching/generation mechanism.
const staticPois: IPoi[] = [
  buildPOI('IL', 'Israel', 5.96, 1.9), // Israel
  buildPOI('JP', 'Japan', 5.59, 3.58), // Japan
  {
    // Bulgaria
    id: 'BG',
    name: 'BG',
    xRotation: 5.47,
    yRotation: 1.57,
  },
  {
    // Canada
    id: 'CA',
    name: 'CA',
    xRotation: 5.35,
    yRotation: 5.84,
  },
  {
    // Hong Kong
    id: 'HK',
    name: 'HK',
    xRotation: 5.86,
    yRotation: 3.26,
  },
  {
    // Thailand
    id: 'Th',
    name: 'Th',
    xRotation: 6.05,
    yRotation: 3,
  },
  {
    // USA (CA)
    id: 'US-CA',
    name: 'US-CA',
    xRotation: 5.64,
    yRotation: 5.39,
  },
  {
    // Cayman Islands
    id: 'Cayman-islands',
    name: 'Cayman Islands',
    xRotation: 5.93,
    yRotation: 5.99,
  },
  {
    // Korea
    id: 'Korea',
    name: 'Korea',
    xRotation: 5.6,
    yRotation: 3.38,
  },
  {
    // Macau
    id: 'Macau',
    name: 'Macau',
    xRotation: 5.88,
    yRotation: 3.2,
  },
  {
    // UK
    id: 'UK',
    name: 'UK',
    xRotation: 5.3,
    yRotation: 1.12,
  },
  {
    // Cyprus
    id: 'CP',
    name: 'CYP',
    xRotation: 5.65,
    yRotation: 1.71,
  },
  {
    // Singapore
    id: 'SG',
    name: 'SG',
    xRotation: 6.27,
    yRotation: 3.06,
  },
  {
    // Russia
    id: 'Rus',
    name: 'RUS',
    xRotation: 5.17,
    yRotation: 2.67,
  },
  {
    // USA (NY)
    id: 'US-NY',
    name: 'US-NY',
    xRotation: 5.55,
    yRotation: 6.24,
  },
  {
    // Slovak Republic
    id: 'Slv',
    name: 'SlV',
    xRotation: 5.39,
    yRotation: 1.46,
  },
  {
    // New Zealand
    id: 'NZ',
    name: 'NZ',
    xRotation: 0.86,
    yRotation: 4.05,
  },
  {
    // Scotland
    id: 'Scotland',
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
