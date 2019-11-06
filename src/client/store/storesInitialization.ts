import { configure } from 'mobx';
import { IStoreInitialData } from '../../shared/IStore';
import { IOrbsGithubService } from '../services/OrbsGitHubService';
import { POIStore } from './POIStore';
import { POSStore } from './POSStore';
import { SocialStore } from './SocialStore';
import { IStores } from './stores';
import { TokenStore } from './TokenStore';
import { IOrbsBlocksPolling } from 'orbs-blocks-polling-js';

/**
 * Configures the mobx library. Should get called at App's initialization.
 */
export function configureMobx() {
  configure({
    enforceActions: 'observed',
  });
}

/**
 * Builds and initializes all of the stores
 */
export function getStores(orbsGitHubService: IOrbsGithubService, orbsBlocksPolling: IOrbsBlocksPolling, initialStore: IStoreInitialData): IStores {

  // Create stores instances + Hydrate the stores
  const socialStore = new SocialStore(orbsGitHubService, initialStore.socialStoreState);
  const tokenStore = new TokenStore(initialStore.tokenStoreState);
  const posStore = new POSStore(initialStore.posStoreState, orbsBlocksPolling);
  const poiStore = new POIStore(initialStore.poiStoreState);

  // Call the initialize function on each one
  socialStore.activate();
  tokenStore.activate();
  posStore.activate();
  poiStore.activate();

  const stores = {
    socialStore,
    tokenStore,
    posStore,
    poiStore,
  };

  return stores;
}
