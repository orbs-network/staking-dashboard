/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import nock from 'nock';
import {
  ETHPLORER_URL,
  GET_TOKEN_INFO_PATH,
  API_KEY,
  EthplorerAdapter,
} from '../../server/realtime-token/ethplorerAdapter';
import { EventEmitter } from 'events';
import { sleep } from '../utils/time-utils';

function interceptAPI(response) {
  nock(ETHPLORER_URL)
    .get(`/${GET_TOKEN_INFO_PATH}?apiKey=${API_KEY}`)
    .reply(200, response);
}

const waitForEvent = (emitter: EventEmitter, event: string) => new Promise(resolve => emitter.once(event, resolve));

describe('ethplorer adapter', () => {
  describe('first time use', () => {
    let ethplorer: EthplorerAdapter;

    beforeEach(() => {
      ethplorer = new EthplorerAdapter(100);
      interceptAPI({
        holdersCount: 6125,
        price: {
          rate: 0.0150013639215,
          availableSupply: 1849881664.74335,
          volume24h: 373194.73774591502,
        },
      });
      ethplorer.init();
    });

    afterEach(() => {
      ethplorer.dispose();
    });

    it('should notify the "totalHolders" on the first call', async () => {
      const totalHolders = await waitForEvent(ethplorer, 'totalHolders');
      expect(totalHolders).toEqual(6125);
    });

    it('should notify the "tokenPrice" on the first call', async () => {
      const tokenPrice = await waitForEvent(ethplorer, 'tokenPrice');
      expect(tokenPrice).toEqual(0.0150013639215);
    });

    it('should notify the "orbsInCirculation" on the first call', async () => {
      const orbsInCirculation = await waitForEvent(ethplorer, 'orbsInCirculation');
      expect(orbsInCirculation).toEqual(1849881664.74335);
    });

    it('should notify the "token24HVolume" on the first call', async () => {
      const token24HVolume = await waitForEvent(ethplorer, 'token24HVolume');
      expect(token24HVolume).toEqual(373194.737745915);
    });
  });

  describe('emit changes to previous values', () => {
    const firstResponse = {
      holdersCount: 1111,
      price: {
        rate: 2222,
        availableSupply: 3333,
        volume24h: 4444,
      },
    };

    const secondResponse = {
      holdersCount: 5555,
      price: {
        rate: 6666,
        availableSupply: 7777,
        volume24h: 8888,
      },
    };

    let ethplorer: EthplorerAdapter;

    beforeEach(() => {
      ethplorer = new EthplorerAdapter(100);
      ethplorer.init();
    });

    afterEach(() => {
      ethplorer.dispose();
    });

    it('should notify the "totalHolders" twice', async () => {
      interceptAPI(firstResponse);

      const totalHolders1 = await waitForEvent(ethplorer, 'totalHolders');
      expect(totalHolders1).toEqual(1111);

      interceptAPI(secondResponse);

      const totalHolders2 = await waitForEvent(ethplorer, 'totalHolders');
      expect(totalHolders2).toEqual(5555);
    });

    it('should notify the "tokenPrice" twice', async () => {
      interceptAPI(firstResponse);

      const tokenPrice1 = await waitForEvent(ethplorer, 'tokenPrice');
      expect(tokenPrice1).toEqual(2222);

      interceptAPI(secondResponse);

      const tokenPrice2 = await waitForEvent(ethplorer, 'tokenPrice');
      expect(tokenPrice2).toEqual(6666);
    });

    it('should notify the "orbsInCirculation" twice', async () => {
      interceptAPI(firstResponse);

      const orbsInCirculation1 = await waitForEvent(ethplorer, 'orbsInCirculation');
      expect(orbsInCirculation1).toEqual(3333);

      interceptAPI(secondResponse);

      const orbsInCirculation2 = await waitForEvent(ethplorer, 'orbsInCirculation');
      expect(orbsInCirculation2).toEqual(7777);
    });

    it('should notify the "token24HVolume" twice', async () => {
      interceptAPI(firstResponse);

      const token24HVolume1 = await waitForEvent(ethplorer, 'token24HVolume');
      expect(token24HVolume1).toEqual(4444);

      interceptAPI(secondResponse);

      const token24HVolume2 = await waitForEvent(ethplorer, 'token24HVolume');
      expect(token24HVolume2).toEqual(8888);
    });
  });

  describe(`do NOT emit if there's no change from last value`, () => {
    it('should notify the token info first time only', async () => {
      const ethplorer: EthplorerAdapter = new EthplorerAdapter(100);
      ethplorer.init();

      const response = {
        holdersCount: 1111,
        price: {
          rate: 2222,
          availableSupply: 3333,
          volume24h: 4444,
        },
      };

      const callsCounter = {
        totalHolders: 0,
        tokenPrice: 0,
        orbsInCirculation: 0,
        token24HVolume: 0,
      };
      interceptAPI(response);
      interceptAPI(response);
      ethplorer.on('totalHolders', () => callsCounter.totalHolders++);
      ethplorer.on('tokenPrice', () => callsCounter.tokenPrice++);
      ethplorer.on('orbsInCirculation', () => callsCounter.orbsInCirculation++);
      ethplorer.on('token24HVolume', () => callsCounter.token24HVolume++);

      await sleep(200);
      expect(callsCounter.totalHolders).toEqual(1);
      expect(callsCounter.tokenPrice).toEqual(1);
      expect(callsCounter.orbsInCirculation).toEqual(1);
      expect(callsCounter.token24HVolume).toEqual(1);

      ethplorer.dispose();
    });
  });
});
