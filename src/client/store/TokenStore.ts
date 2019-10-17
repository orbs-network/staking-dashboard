import { action, observable } from 'mobx';
import { ITokenStoreState } from '../../shared/IStore';

export const defaultTokenStoreState: Readonly<ITokenStoreState> = {
  orbsInCirculation: 0,
  tokenPrice: 0,
  token24HVolume: 0,
  totalHolders: 0,
};

// tslint:disable-next-line:no-empty-interface
interface ITokenStoreActions {}

export interface ITokenStore extends ITokenStoreState, ITokenStoreActions {}

export class TokenStore implements ITokenStore {
  @observable public orbsInCirculation: number;
  @observable public tokenPrice: number;
  @observable public token24HVolume: number;
  @observable public totalHolders: number;

  constructor(initialData: ITokenStoreState) {
    this.orbsInCirculation = initialData.orbsInCirculation;
    this.tokenPrice = initialData.tokenPrice;
    this.token24HVolume = initialData.token24HVolume;
    this.totalHolders = initialData.totalHolders;

    this.startFakingChanges();
  }

  public async init(): Promise<void> {}

  @action
  private fakeIncreaseCirculation() {
    // 50 <-> 150
    const totalOrbsChange = Math.random() * 100 + 50;

    this.orbsInCirculation += totalOrbsChange;
  }

  @action
  private fakeUpdateTokenPrice() {
    // 0.5 <-> 1.5
    const percentageChange = Math.random() + 0.5;

    this.tokenPrice *= percentageChange;
  }

  @action
  private fakeUpdateTotalHolders() {
    // -50 <-> 50
    const totalHoldersChange = Math.round(Math.random() * 100 + -50);

    this.totalHolders += totalHoldersChange;
  }

  private startFakingChanges() {
    setInterval(this.fakeIncreaseCirculation.bind(this), 5_000);
    setInterval(this.fakeUpdateTokenPrice.bind(this), 10_000);
    setInterval(this.fakeUpdateTotalHolders.bind(this), 10_000);
  }
}
