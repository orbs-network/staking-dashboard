import { ISocialStore } from './SocialStore';
import { IPOIStore } from './POIStore';
import { ITokenStore } from './TokenStore';
import { IPOSStore } from './POSStore';

interface IStores {
  socialStore: ISocialStore;
  tokenStore: ITokenStore;
  posStore: IPOSStore;
  poiStore: IPOIStore;
}
