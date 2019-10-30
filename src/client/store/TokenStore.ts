import { action, observable } from 'mobx';
import { ITokenStoreState } from '../../shared/IStore';

export const defaultTokenStoreState: Readonly<ITokenStoreState> = {
  orbsInCirculation: 0,
  tokenPrice: 0,
  token24HVolume: 0,
  totalHolders: 0,
};

export type TTokenStore = ITokenStoreState;

export class TokenStore implements TTokenStore {
  @observable public orbsInCirculation: number;
  @observable public tokenPrice: number;
  @observable public token24HVolume: number;
  @observable public totalHolders: number;

  constructor(initialData: ITokenStoreState) {
    this.orbsInCirculation = initialData.orbsInCirculation;
    this.tokenPrice = initialData.tokenPrice;
    this.token24HVolume = initialData.token24HVolume;
    this.totalHolders = initialData.totalHolders;
  }

  public async init(): Promise<void> {}
}
