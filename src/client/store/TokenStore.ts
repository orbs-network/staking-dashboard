import { observable, action } from 'mobx';
import { ITokenStore } from '../../shared/IStore';

export class TokenStore {
  @observable public orbsInCirculation: number = 0;
  @observable public tokenPrice: number = 0;
  @observable public token24HVolume: number = 0;
  @observable public totalHolders: number = 0;

  constructor(initialData: ITokenStore) {
    this.orbsInCirculation = initialData.orbsInCirculation;
    this.tokenPrice = initialData.tokenPrice;
    this.token24HVolume = initialData.token24HVolume;
    this.totalHolders = initialData.totalHolders;
  }

  public async init(): Promise<void> {}
}
