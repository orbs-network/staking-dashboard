import { Client, NetworkType } from 'orbs-client-sdk';

const ORBS_VIRTUAL_CHAIN_ID = 1_100_000; // The virtual chain Id on the Orbs network
const ORBS_NODE_ADDRESS = '18.197.127.2'; // The Orbs node that we will query
const ORBS_NODE_URL = `http://${ORBS_NODE_ADDRESS}/vchains/${ORBS_VIRTUAL_CHAIN_ID.toString()}`;

export function GenerateOrbsClient(): Client {
  return new Client(ORBS_NODE_URL, ORBS_VIRTUAL_CHAIN_ID, NetworkType.NETWORK_TYPE_TEST_NET);
}