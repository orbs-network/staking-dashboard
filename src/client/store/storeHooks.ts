import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import { IStores } from './stores';
import { ISocialStoreState } from '../../shared/IStore';
import { ISocialStore } from './SocialStore';

export function useStores(): IStores {
  return React.useContext(MobXProviderContext);
}

export function useSocialStore(): ISocialStore {
  return useStores().socialStore;
}
