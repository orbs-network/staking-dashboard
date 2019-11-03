import { IGuardianDisplayGist } from '../../../shared/IGuardian';
import { IPOIStoreState, IPOSStoreState, ISocialStoreState, IStoreInitialData, ITokenStoreState } from '../../../shared/IStore';
import { IGitHubCommitGist, ITwitGist } from '../../../shared/IStoreTypes';
import { defaultPoiStoreState } from '../../store/POIStore';
import { defaultPosStoreState } from '../../store/POSStore';
import { defaultSocialStoreState } from '../../store/SocialStore';
import { defaultTokenStoreState } from '../../store/TokenStore';

export class AppHydration implements IStoreInitialData {
  public readonly socialStoreState: ISocialStoreState;
  public readonly tokenStoreState: ITokenStoreState;
  public readonly posStoreState: IPOSStoreState;
  public readonly poiStoreState: IPOIStoreState;

  constructor(stateHydration?: IStoreInitialData) {
    this.socialStoreState = stateHydration ? stateHydration.socialStoreState : defaultSocialStoreState;
    this.tokenStoreState = stateHydration ? stateHydration.tokenStoreState : defaultTokenStoreState;
    this.posStoreState = stateHydration ? stateHydration.posStoreState : defaultPosStoreState;
    this.poiStoreState = stateHydration ? stateHydration.poiStoreState : defaultPoiStoreState;
  }

  // POS data
  public withBlockHeight(value: number): this {
    this.posStoreState.blockHeight = value;
    return this;
  }

  public withNextVotingTime(value: number): this {
    this.posStoreState.nextVotingTime = value;
    return this;
  }

  public withTopGuardians(value: IGuardianDisplayGist[]): this {
    this.posStoreState.topGuardians = value;
    return this;
  }

  public withRewardsDistributed(value: number): this {
    this.posStoreState.rewardsDistributed = value;
    return this;
  }

  // SOCIAL data
  public withRecentUpdate(value: string): this {
    this.socialStoreState.recentUpdate = value;
    return this;
  }

  public withLatestTweetGist(value: ITwitGist): this {
    this.socialStoreState.latestTweetGist = value;
    return this;
  }

  public withLatestCommitGist(value: IGitHubCommitGist): this {
    this.socialStoreState.latestCommitGist = value;
    return this;
  }

  // TOKEN data
  public with24HVolume(volume: number): this {
    this.tokenStoreState.token24HVolume = volume;
    return this;
  }

  public withOrbsInCirculation(orbsInCirculation: number): this {
    this.tokenStoreState.orbsInCirculation = orbsInCirculation;
    return this;
  }

  public withTokenPrice(tokenPrice: number): this {
    this.tokenStoreState.tokenPrice = tokenPrice;
    return this;
  }

  public withTotalHolders(totalHolders: number): this {
    this.tokenStoreState.totalHolders = totalHolders;
    return this;
  }
}
