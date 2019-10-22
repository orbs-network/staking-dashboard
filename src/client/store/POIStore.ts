import { observable, computed, action } from 'mobx';
import { IPOIStoreState } from '../../shared/IStore';
import { IPoi } from '../../shared/IPoi';

export const defaultPoiStoreState: Readonly<IPOIStoreState> = {
  pointsOfInterest: [],
};

interface IPOIStoreActions {
  currentPoi: IPoi;
  nextPoi: IPoi;

  nextCurrentPoi(): void;
}

export interface IPOIStore extends IPOIStoreState, IPOIStoreActions {}

export class POIStore implements IPOIStore {
  @observable public pointsOfInterest = defaultPoiStoreState.pointsOfInterest;

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

  // tslint:disable-next-line:no-empty
  public async init(): Promise<void> {}

  private calculateNextPOIIndex(): number {
    return (this.currentPoiIndex + 1) % this.pointsOfInterest.length;
  }
}
