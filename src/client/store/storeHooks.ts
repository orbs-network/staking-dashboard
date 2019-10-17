import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './stores';
import { ISocialStore } from './SocialStore';
import { IPOIStore } from './POIStore';

export function useStores(): IStores {
  return React.useContext(MobXProviderContext);
}

export function useSocialStore(): ISocialStore {
  return useStores().socialStore;
}

export function usePoiStore(): IPOIStore {
  return useStores().poiStore;
}
