import { EventEmitter } from 'events';
import { orbsPOSDataServiceFactory, OrbsPOSDataService } from 'orbs-pos-data';
import { Client, NetworkType } from 'orbs-client-sdk';
import * as Web3 from 'web3';

const ETHEREUM_PROVIDER_URL = 'https://mainnet.infura.io/v3/3fe9b03bd8374639809addf2164f7287';
const ORBS_VIRTUAL_CHAIN_ID = 1_100_000; // The virtual chain Id on the Orbs network
const ORBS_NODE_ADDRESS = '18.197.127.2'; // The Orbs node that we will query
const ORBS_NODE_URL = `http://${ORBS_NODE_ADDRESS}/vchains/${ORBS_VIRTUAL_CHAIN_ID.toString()}`;

export class OrbsPosDataAdapter extends EventEmitter {
  public top3Guardians: string[] = [];

  private orbsPOSDataService: OrbsPOSDataService;

  public async init() {
    await this.initPOSService();
    await this.updateTop3Guardians();
  }

  private async updateTop3Guardians(): Promise<void> {
    const guardians = await this.orbsPOSDataService.getGuardiansList(0, 1_000);
    const guardiansInfo = [];
    for (const guardianAddress of guardians) {
      const guardianInfo = await this.orbsPOSDataService.getGuardianInfo(guardianAddress);
      guardiansInfo.push(guardianInfo);
    }
    const sortedGuardians = guardiansInfo.sort((a, b) => b.stake - a.stake);
    this.top3Guardians = [sortedGuardians[0].name, sortedGuardians[1].name, sortedGuardians[2].name];
  }

  private async initPOSService(): Promise<void> {
    const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER_URL));
    const orbsClient = new Client(ORBS_NODE_URL, ORBS_VIRTUAL_CHAIN_ID, NetworkType.NETWORK_TYPE_TEST_NET);
    this.orbsPOSDataService = orbsPOSDataServiceFactory(web3, orbsClient);
  }
}
