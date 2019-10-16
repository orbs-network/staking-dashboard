import { IPOIStoreState, IPOSStoreState, ISocialStoreState, ITokenStoreState } from '../../shared/IStore';

interface IStores {
  socialStore: ISocialStoreState;
  tokenStore: ITokenStoreState;
  posStore: IPOSStoreState;
  poiStore: IPOIStoreState;
}
