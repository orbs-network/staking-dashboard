import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './stores';
import { TSocialStore } from './SocialStore';
import { IPOIStore } from './POIStore';
import { TPOSStore } from './POSStore';
import { TTokenStore } from './TokenStore';

export function useStores(): IStores {
  return React.useContext(MobXProviderContext);
}

export function useSocialStore(): TSocialStore {
  return useStores().socialStore;
}

export function usePoiStore(): IPOIStore {
  return useStores().poiStore;
}

export function usePosStore(): TPOSStore {
  return useStores().posStore;
}

export function useTokenStore(): TTokenStore {
  return useStores().tokenStore;
}
