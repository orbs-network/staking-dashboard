import { configure } from 'mobx';
import { IPOSStoreState, ISocialStoreState, IStoreInitialData, ITokenStoreState } from '../../shared/IStore';
import { SocialStore } from './SocialStore';
import { TokenStore } from './TokenStore';
import { POSStore } from './POSStore';
import { IAppServices } from '../services/services';

interface IStores {
  socialStore: ISocialStoreState;
  tokenStore: ITokenStoreState;
  posStore: IPOSStoreState;
}

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
export function getStores(services: IAppServices, initialStore: IStoreInitialData): IStores {
  const { gitHubService } = services;

  // Create stores instances + Hydrate the stores
  const socialStore = new SocialStore(gitHubService, initialStore.socialStoreState);
  const tokenStore = new TokenStore(initialStore.tokenStoreState);
  const posStore = new POSStore(initialStore.posStoreState);

  // Call the initialize function on each one
  // NOTE : FUTURE : O.L : Should consider the order and relation between Hydrating and 'init'
  // NOTE : FUTURE : O.L : Should handle the async calls properly
  socialStore.init();
  tokenStore.init();
  posStore.init();

  const stores = {
    socialStore,
    tokenStore,
    posStore,
  };

  return stores;
}
