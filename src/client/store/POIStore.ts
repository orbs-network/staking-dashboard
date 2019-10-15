import { observable, computed } from 'mobx';
import { IPOIStoreState } from '../../shared/IStore';
import { IPoi } from '../../shared/IPoi';

export const defaultSocialStoreState: Readonly<IPOIStoreState> = {
  pointsOfInterest: [],
};

export class POIStore implements IPOIStoreState {
  @observable public pointsOfInterest = defaultSocialStoreState.pointsOfInterest;

  private currentPoiIndex: number = 0;

  constructor(initialData?: IPOIStoreState) {
    if (initialData) {
      this.pointsOfInterest = initialData.pointsOfInterest;
    }
  }

  @computed
  public get currentPoi(): any {
    return this.pointsOfInterest[this.currentPoiIndex];
  }

  /**
   * Sets the new 'Current POI' in a cyclic manner.
   */
  public nextCurrentPoi(): void {
    this.currentPoiIndex = (this.currentPoiIndex + 1) % this.pointsOfInterest.length;
  }

  public async init(): Promise<void> {}
}
