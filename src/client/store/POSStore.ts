import { observable, action } from 'mobx';
import { IPOSStoreState } from '../../shared/IStore';

export const defaultPosStoreState: IPOSStoreState = {
  blockHeight: 0,
  rewardsDistributed: 0,
  nextVotingTime: 0,
  topGuardians: [],
};

export class POSStore {
  @observable public blockHeight: number;
  @observable public rewardsDistributed: number;
  @observable public nextVotingTime: number;
  @observable public topGuardians: string[];

  constructor(initialData: IPOSStoreState) {
    this.blockHeight = initialData.blockHeight;
    this.rewardsDistributed = initialData.rewardsDistributed;
    this.nextVotingTime = initialData.nextVotingTime;
    this.topGuardians = initialData.topGuardians;
  }

  public async init(): Promise<void> {
    this.fakeBlockHeight();
  }

  @action('Increase block height')
  private increaseBlockHeight() {
    this.blockHeight++;
  }

  private fakeBlockHeight() {
    setInterval(this.increaseBlockHeight, 3_000);
  }
}
