import { observable, action } from 'mobx';
import { IPOSStoreState } from '../../shared/IStore';
import { IGuardianDisplayGist } from '../../shared/IGuardian';
import { IOrbsBlocksPolling, INewBlocksHandler } from 'orbs-blocks-polling-js';
import { GetBlockResponse } from 'orbs-client-sdk/dist/codec/OpGetBlock';
export const defaultPosStoreState: IPOSStoreState = {
  blockHeight: 0,
  rewardsDistributed: 0,
  nextVotingTime: 0,
  topGuardians: [],
};

export type TPOSStore = IPOSStoreState;

export class POSStore implements TPOSStore, INewBlocksHandler {
  @observable public blockHeight: number;
  @observable public rewardsDistributed: number;
  @observable public nextVotingTime: number;
  @observable public topGuardians: IGuardianDisplayGist[];

  constructor(initialData: IPOSStoreState, private orbsBlocksPolling: IOrbsBlocksPolling) {
    this.blockHeight = 0;
    this.rewardsDistributed = initialData.rewardsDistributed;
    this.nextVotingTime = initialData.nextVotingTime;
    this.topGuardians = initialData.topGuardians;
  }

  public async activate(): Promise<void> {
    await this.orbsBlocksPolling.init();
    await this.orbsBlocksPolling.initPooling(5_000);
    this.orbsBlocksPolling.RegisterToNewBlocks(this);
    const latestBlockHeight = await this.orbsBlocksPolling.getLatestKnownHeight();
    this.setBlockHeight(Number(latestBlockHeight));
  }

  public async handleNewBlock(block: GetBlockResponse): Promise<void> {
    this.setBlockHeight(Number(block.blockHeight));
  }

  @action('Set the block height')
  private setBlockHeight(blockHeight: number) {
    this.blockHeight = blockHeight;
  }
}
