import { observable, action } from 'mobx';
import { ISocialStore } from '../../shared/IStore';
import { orbsPOSDataServiceFactory } from 'orbs-pos-data';
import { Client, NetworkType } from 'orbs-client-sdk';

export class SocialStore {
  @observable public latestTweet: string = '';
  @observable public latestCommit: string = '';
  @observable public recentUpdate: string = '';

  constructor(initialData: ISocialStore) {
    this.latestTweet = initialData.latestTweet;
    this.latestCommit = initialData.latestCommit;
    this.recentUpdate = initialData.recentUpdate;
  }

  public async init(): Promise<void> {
    // creating the web3 instance
    let web3;
    if (typeof (window as any).web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      const clazz = (window as any).Web3;
      web3 = new clazz((window as any).web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!');
    }

    // create the orbs-client-sdk instance
    const orbsNodeAddress = '18.197.127.2'; // The Orbs node that we will query
    const virtualChainId = 1100000; // The virtual chain Id on the Orbs network
    const orbsNodeUrl = `http://${orbsNodeAddress}/vchains/${virtualChainId.toString()}`;
    const orbsClient = new Client(orbsNodeUrl, virtualChainId, NetworkType.NETWORK_TYPE_TEST_NET);

    const orbsPosData = orbsPOSDataServiceFactory(web3, orbsClient);
    console.log(orbsPosData);
  }
}
