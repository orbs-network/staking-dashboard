import {IPOSStore, ISocialStore, IStoreInitialData, ITokenStore} from '../../shared/IStore';
import {SocialStore} from './SocialStore';
import {TokenStore} from './TokenStore';
import {POSStore} from './POSStore';

interface IStores {
    socialStore: ISocialStore,
    tokenStore: ITokenStore,
    posStore: IPOSStore
};

export function getStores(initialStore: IStoreInitialData): IStores {
    // Hydrate the stores
    const socialStore = new SocialStore(initialStore.socialStore);
    const tokenStore = new TokenStore(initialStore.tokenStore);
    const posStore = new POSStore(initialStore.posStore);

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