export interface IPOSStoreState {
  blockHeight: number;
  rewardsDistributed: number;
  nextVotingTime: number;
  topGuardians: string[];
}

export interface ISocialStoreState {
  latestTweet: string;
  latestCommit: string;
  recentUpdate: string;
}

export interface ITokenStoreState {
  orbsInCirculation: number;
  tokenPrice: number;
  token24HVolume: number;
  totalHolders: number;
}

export interface IStoreInitialData {
  posStore: IPOSStoreState;
  socialStore: ISocialStoreState;
  tokenStore: ITokenStoreState;
}
