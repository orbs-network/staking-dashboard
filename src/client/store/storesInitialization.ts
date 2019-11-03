import { configure } from 'mobx';
import { IStoreInitialData } from '../../shared/IStore';
import { IOrbsGithubService } from '../services/OrbsGitHubService';
import { POIStore } from './POIStore';
import { POSStore } from './POSStore';
import { SocialStore } from './SocialStore';
import { IStores } from './stores';
import { TokenStore } from './TokenStore';

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
export function getStores(orbsGitHubService: IOrbsGithubService, initialStore: IStoreInitialData): IStores {

  // Create stores instances + Hydrate the stores
  const socialStore = new SocialStore(orbsGitHubService, initialStore.socialStoreState);
  const tokenStore = new TokenStore(initialStore.tokenStoreState);
  const posStore = new POSStore(initialStore.posStoreState);
  const poiStore = new POIStore(initialStore.poiStoreState);

  // Call the initialize function on each one
  // NOTE : FUTURE : O.L : Should consider the order and relation between Hydrating and 'init'
  // NOTE : FUTURE : O.L : Should handle the async calls properly
  socialStore.init();
  tokenStore.init();
  posStore.init();
  poiStore.init();

  const stores = {
    socialStore,
    tokenStore,
    posStore,
    poiStore,
  };

  return stores;
}
