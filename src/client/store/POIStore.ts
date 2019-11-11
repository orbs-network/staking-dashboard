import { observable, computed, action } from 'mobx';
import { IPOIStoreState } from '../../shared/IStore';
import { IPoi } from '../../shared/IPoi';

export const defaultPoiStoreState: Readonly<IPOIStoreState> = {
  pointsOfInterest: [],
};

export interface IPOIStore extends IPOIStoreState {
  currentPoi: IPoi;
  nextPoi: IPoi;

  nextCurrentPoi(): void;
}

export class POIStore implements IPOIStore {
  @observable public pointsOfInterest = defaultPoiStoreState.pointsOfInterest;

  @observable private currentPoiIndex = 0;

  constructor(initialData: IPOIStoreState) {
    this.pointsOfInterest = initialData.pointsOfInterest;
  }

  public async activate(): Promise<void> {}

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

  /**
   * Returns the next poi index in a cyclic manner.
   */
  private calculateNextPOIIndex(): number {
    return (this.currentPoiIndex + 1) % this.pointsOfInterest.length;
  }
}
