import { observable, computed, action } from 'mobx';
import { IPOIStoreState } from '../../shared/IStore';
import { IPoi } from '../../shared/IPoi';

export const defaultSocialStoreState: Readonly<IPOIStoreState> = {
  pointsOfInterest: [],
};

export class POIStore implements IPOIStoreState {
  @observable public pointsOfInterest = defaultSocialStoreState.pointsOfInterest;

  @observable private currentPoiIndex: number = 0;

  constructor(initialData?: IPOIStoreState) {
    if (initialData) {
      this.pointsOfInterest = initialData.pointsOfInterest;
    }
  }

  @computed
  public get currentPoi(): IPoi {
    return this.pointsOfInterest[this.currentPoiIndex];
  }

  @computed
  public get nextPoi(): IPoi {
    return this.pointsOfInterest[this.calculateNextPOIIndex()];
  }

  /**
   * Sets the new 'Current POI' in a cyclic manner.
   */
  @action public nextCurrentPoi(): void {
    this.currentPoiIndex = this.calculateNextPOIIndex();
  }

  private calculateNextPOIIndex(): number {
    return (this.currentPoiIndex + 1) % this.pointsOfInterest.length;
  }

  public async init(): Promise<void> {}
}
