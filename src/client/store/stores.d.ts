import { TSocialStore } from './SocialStore';
import { IPOIStore } from './POIStore';
import { TTokenStore } from './TokenStore';
import { TPOSStore } from './POSStore';

interface IStores {
  socialStore: TSocialStore;
  tokenStore: TTokenStore;
  posStore: TPOSStore;
  poiStore: IPOIStore;
}
