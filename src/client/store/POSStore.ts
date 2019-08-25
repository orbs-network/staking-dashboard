import { observable, action } from 'mobx';
import { IPOSInitialData } from '../../shared/IStore';

export class POSStore {
  @observable public blockHeight: number;
  @observable public rewardsDistributed: number;
  @observable public nextVotingTime: number;
  @observable public topGuardians: string[];

  constructor(initialData: IPOSInitialData) {
    this.blockHeight = initialData.blockHeight;
    this.rewardsDistributed = initialData.rewardsDistributed;
    this.nextVotingTime = initialData.nextVotingTime;
    this.topGuardians = initialData.topGuardians;
  }

  public async init(): Promise<void> {
    this.fakeBlockHeight();
  }

  private fakeBlockHeight() {
    setInterval(() => this.blockHeight++, 3_000);
  }
}
