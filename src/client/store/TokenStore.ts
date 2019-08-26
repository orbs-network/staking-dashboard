import { observable, action } from 'mobx';
import { ITokenStore } from '../../shared/IStore';

export class TokenStore {
  @observable public orbsInCirculation: number;
  @observable public tokenPrice: number;
  @observable public token24HVolume: number;
  @observable public totalHolders: number;

  constructor(initialData: ITokenStore) {
    this.orbsInCirculation = initialData.orbsInCirculation;
    this.tokenPrice = initialData.tokenPrice;
    this.token24HVolume = initialData.token24HVolume;
    this.totalHolders = initialData.totalHolders;
  }

  public async init(): Promise<void> {}
}
