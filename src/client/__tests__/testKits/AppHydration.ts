/* tslint:disable:variable-name */
import {defaultSocialStoreState, SocialStore} from '../../store/SocialStore';
import {defaultTokenStoreState, TokenStore} from '../../store/TokenStore';
import {defaultPosStoreState, POSStore} from '../../store/POSStore';
import {IPOSStoreState, ISocialStoreState, IStoreInitialData, ITokenStoreState} from '../../../shared/IStore';

export class AppHydration implements IStoreInitialData {
    private _socialStoreState: ISocialStoreState;
    private _tokenStoreState: ITokenStoreState;
    private _posStoreState: IPOSStoreState;

    constructor(stateHydration?: IStoreInitialData) {
        this._socialStoreState = stateHydration ? stateHydration.socialStoreState : defaultSocialStoreState;
        this._tokenStoreState = stateHydration ? stateHydration.tokenStoreState : defaultTokenStoreState;
        this._posStoreState = stateHydration ? stateHydration.posStoreState : defaultPosStoreState;
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

// POS data
    public withBlockHeight(value: number): this {
        this._posStoreState.blockHeight = value;
        return this;
    }

    public withNextVotingTime(value: number): this {
        this._posStoreState.nextVotingTime = value;
        return this;
    }

    public withTopGuardians(value: string[]): this {
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

    public withLatestTweet(value: string): this {
        this._socialStoreState.latestTweet = value;
        return this;
    }

    public withLatestCommit(value: string): this {
        this._socialStoreState.latestCommit = value;
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