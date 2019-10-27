import { IPOIStoreState } from '../../../shared/IStore';
import { POIStore } from '../../store/POIStore';
import { IPoi } from '../../../shared/IPoi';

describe('POI store functionality', () => {
  let pois: IPoi[] = [];

  // Initialize the pois
  beforeEach(() => {
    pois = [buildPoiForTest(0), buildPoiForTest(1), buildPoiForTest(2), buildPoiForTest(3), buildPoiForTest(4)];
  });

  it('Constructs properly', () => {
    const hydratingState: IPOIStoreState = {
      pointsOfInterest: pois,
    };

    // Get store instance
    const poiStore: POIStore = new POIStore(hydratingState);

    // Ensure state is equal to hydrating state
    expect(poiStore.pointsOfInterest).toStrictEqual(hydratingState.pointsOfInterest);
  });

  it('Defined getters properly', () => {
    const hydratingState: IPOIStoreState = {
      pointsOfInterest: pois,
    };

    // Get store instance
    const poiStore: POIStore = new POIStore(hydratingState);

    // Ensure observable getters works properly (after hydration)
    expect(poiStore.currentPoi).toStrictEqual(hydratingState.pointsOfInterest[0]);
    expect(poiStore.nextPoi).toStrictEqual(hydratingState.pointsOfInterest[1]);
  });

  it('Advances to next current-poi properly', () => {
    const hydratingState: IPOIStoreState = {
      pointsOfInterest: pois,
    };

    // Get store instance
    const poiStore: POIStore = new POIStore(hydratingState);

    // Ensure observable getters works properly (after first advancement)
    poiStore.nextCurrentPoi();
    expect(poiStore.currentPoi).toStrictEqual(hydratingState.pointsOfInterest[1]);
    expect(poiStore.nextPoi).toStrictEqual(hydratingState.pointsOfInterest[2]);
  });

  it('Ensures cyclic works', () => {
    const hydratingState: IPOIStoreState = {
      pointsOfInterest: pois,
    };

    // Get store instance
    const poiStore: POIStore = new POIStore(hydratingState);

    const poisLength = hydratingState.pointsOfInterest.length;

    // Ensure observable getters works properly (after first advancement)
    for (let i = 0; i < poisLength - 1; i++) {
      expect(poiStore.currentPoi).toStrictEqual(hydratingState.pointsOfInterest[i]);
      expect(poiStore.nextPoi).toStrictEqual(hydratingState.pointsOfInterest[i + 1]);

      poiStore.nextCurrentPoi();
    }

    // Advance one more time - should set the 'current' to the last poi and the 'next' to the first poi.
    expect(poiStore.currentPoi).toStrictEqual(hydratingState.pointsOfInterest[poisLength - 1]);
    expect(poiStore.nextPoi).toStrictEqual(hydratingState.pointsOfInterest[0]);
  });
});

/**
 * Builds a POI for testing purposes
 */
function buildPoiForTest(poiNumber: number): IPoi {
  return {
    name: `Poi ${poiNumber}`,
    id: `id_${poiNumber}`,
    xRotation: poiNumber,
    yRotation: poiNumber,
  };
}
