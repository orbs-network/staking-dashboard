export interface IPOSStore {
  blockHeight: number;
  rewardsDistributed: number;
  nextVotingTime: number;
  topGuardians: string[];
}

export interface ISocialStore {
  latestTweet: string;
  latestCommit: string;
  recentUpdate: string;
}

export interface ITokenStore {
  orbsInCirculation: number;
  tokenPrice: number;
  token24HVolume: number;
  totalHolders: number;
}

export interface IStoreInitialData {
  posStore: IPOSStore;
  socialStore: ISocialStore;
  tokenStore: ITokenStore;
}
