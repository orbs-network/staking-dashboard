import { observable, action } from 'mobx';

export class TokenStore {
  @observable public orbsInCirculation: number = 0;
  @observable public tokenPrice: number = 0;
  @observable public marketCap: number = 0;
  @observable public totalHolders: number = 0;

  public async init(): Promise<void> {
    await this.loadStore();
  }

  @action private async loadStore(): Promise<void> {
    this.orbsInCirculation = 1_700_000_000;
    this.tokenPrice = 0.0241;
    this.marketCap = 40_000_000;
    this.totalHolders = 6_000;
  }
}
