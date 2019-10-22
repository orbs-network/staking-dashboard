import { IPoi } from './IPoi';
import { ITwitGist, IGitHubCommitGist } from './IStoreTypes';

export interface IPOSStoreState {
  blockHeight: number;
  rewardsDistributed: number;
  nextVotingTime: number;
  topGuardians: string[];
}

export interface ISocialStoreState {
  latestTweetGist: ITwitGist;
  latestCommitGist: IGitHubCommitGist;
  recentUpdate: string;
}

export interface ITokenStoreState {
  orbsInCirculation: number;
  tokenPrice: number;
  token24HVolume: number;
  totalHolders: number;
}

export interface IPOIStoreState {
  pointsOfInterest: IPoi[];
}

export interface IStoreInitialData {
  posStoreState: IPOSStoreState;
  socialStoreState: ISocialStoreState;
  tokenStoreState: ITokenStoreState;
  poiStoreState: IPOIStoreState;
}
