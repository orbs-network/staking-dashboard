/* tslint:disable:variable-name */
import { defaultSocialStoreState, SocialStore } from '../../store/SocialStore';
import { defaultTokenStoreState, TokenStore } from '../../store/TokenStore';
import { defaultPosStoreState, POSStore } from '../../store/POSStore';
import { defaultPoiStoreState } from '../../store/POIStore';
import {
  IPOIStoreState,
  IPOSStoreState,
  ISocialStoreState,
  IStoreInitialData,
  ITokenStoreState,
} from '../../../shared/IStore';
import { IGitHubCommitGist, ITwitGist } from '../../../shared/IStoreTypes';
import { IGuardianDisplayGist } from '../../../shared/IGuardian';

export class AppHydration implements IStoreInitialData {
  private _socialStoreState: ISocialStoreState;
  private _tokenStoreState: ITokenStoreState;
  private _posStoreState: IPOSStoreState;
  private _poiStoreState: IPOIStoreState;

  constructor(stateHydration?: IStoreInitialData) {
    this._socialStoreState = stateHydration ? stateHydration.socialStoreState : defaultSocialStoreState;
    this._tokenStoreState = stateHydration ? stateHydration.tokenStoreState : defaultTokenStoreState;
    this._posStoreState = stateHydration ? stateHydration.posStoreState : defaultPosStoreState;
    this._poiStoreState = stateHydration ? stateHydration.poiStoreState : defaultPoiStoreState;
  }

  get socialStoreState(): ISocialStoreState {
    return this._socialStoreState;
  }

  get tokenStoreState(): ITokenStoreState {
    return this._tokenStoreState;
  }

  get posStoreState(): IPOSStoreState {
    return this._posStoreState;
  }

  get poiStoreState(): IPOIStoreState {
    return this._poiStoreState;
  }

  // POS data
  public withBlockHeight(value: number): this {
    this._posStoreState.blockHeight = value;
    return this;
  }

  public withNextVotingTime(value: number): this {
    this._posStoreState.nextVotingTime = value;
    return this;
  }

  public withTopGuardians(value: IGuardianDisplayGist[]): this {
    this._posStoreState.topGuardians = value;
    return this;
  }

  public withRewardsDistributed(value: number): this {
    this._posStoreState.rewardsDistributed = value;
    return this;
  }

  // SOCIAL data
  public withRecentUpdate(value: string): this {
    this._socialStoreState.recentUpdate = value;
    return this;
  }

  public withLatestTweetGist(value: ITwitGist): this {
    this._socialStoreState.latestTweetGist = value;
    return this;
  }

  public withLatestCommitGist(value: IGitHubCommitGist): this {
    this._socialStoreState.latestCommitGist = value;
    return this;
  }

  // TOKEN data
  public with24HVolume(volume: number): this {
    this._tokenStoreState.token24HVolume = volume;
    return this;
  }

  public withOrbsInCirculation(orbsInCirculation: number): this {
    this._tokenStoreState.orbsInCirculation = orbsInCirculation;
    return this;
  }

  public withTokenPrice(tokenPrice: number): this {
    this._tokenStoreState.tokenPrice = tokenPrice;
    return this;
  }

  public withTotalHolders(totalHolders: number): this {
    this._tokenStoreState.totalHolders = totalHolders;
    return this;
  }
}
