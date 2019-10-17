import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './stores';
import { ISocialStore } from './SocialStore';
import { IPOIStore } from './POIStore';
import { IPOSStore } from './POSStore';
import { ITokenStore } from './TokenStore';

export function useStores(): IStores {
  return React.useContext(MobXProviderContext);
}

export function useSocialStore(): ISocialStore {
  return useStores().socialStore;
}

export function usePoiStore(): IPOIStore {
  return useStores().poiStore;
}

export function usePosStore(): IPOSStore {
  return useStores().posStore;
}

export function useTokenStore(): ITokenStore {
  return useStores().tokenStore;
}
