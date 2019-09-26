import { Client, NetworkType } from 'orbs-client-sdk';
import { orbsPOSDataServiceFactory } from 'orbs-pos-data';
import * as Web3 from 'web3';

const ETHEREUM_PROVIDER_URL = 'https://mainnet.infura.io/v3/3fe9b03bd8374639809addf2164f7287';
const ORBS_VIRTUAL_CHAIN_ID = 1_100_000; // The virtual chain Id on the Orbs network
const ORBS_NODE_ADDRESS = '18.197.127.2'; // The Orbs node that we will query
const ORBS_NODE_URL = `http://${ORBS_NODE_ADDRESS}/vchains/${ORBS_VIRTUAL_CHAIN_ID.toString()}`;

export function buildOrbsPOSDataService() {
  const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER_URL));
  const orbsClient = new Client(ORBS_NODE_URL, ORBS_VIRTUAL_CHAIN_ID, NetworkType.NETWORK_TYPE_TEST_NET);
  return orbsPOSDataServiceFactory(web3, orbsClient);
}
