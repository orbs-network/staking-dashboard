import { observable, action } from 'mobx';

export class POSStore {
  @observable public blockHeight: number = 0;
  @observable public rewardsDistributed: number = 0;
  @observable public nextVotingTime: number = 0;
  @observable public topGuardians: string[] = [];

  public async init(): Promise<void> {
    await this.loadStore();
    this.fakeBlockHeight();
  }

  private fakeBlockHeight() {
    setInterval(() => this.blockHeight++, 3_000);
  }

  @action private async loadStore(): Promise<void> {
    this.blockHeight = 1_234_567;
    this.rewardsDistributed = 68_789;
    this.nextVotingTime = Date.now() + (15 * 60 * 60 * 1_000) + (45 * 60 * 1_000) + 15 * 1_000;
    this.topGuardians.push('MR.SHOWOFFTOKEN');
    this.topGuardians.push('SLOWMOSHE');
    this.topGuardians.push('DONTTELLMYMAMA');
  }
}
