import { Router } from 'express';
import * as config from '../config';
import { getManifest } from './manifest-manager';
import { IStoreInitialData } from '../../shared/IStore';

const initialStore: IStoreInitialData = {
  posStore: {
    blockHeight: 1_234_567,
    rewardsDistributed: 68_789,
    nextVotingTime: Date.now() + 15 * 60 * 60 * 1_000 + 45 * 60 * 1_000 + 15 * 1_000,
    topGuardians: ['MR.SHOWOFFTOKEN', 'SLOWMOSHE', 'DONTTELLMYMAMA'],
  },
  socialStore: {
    latestTweet: '#SUMMIT2019 #LIVECRYPTO #KEYWORD #TALKINGABOUTIT #GITHUB #SOCIALIMPACT #GUARDIANS',
    latestCommit: 'orbs-network/orbs-network-go',
    recentUpdate: '25.6.2019 Latest Blog Update',
  },
  tokenStore: {
    orbsInCirculation: 1_700_000_000,
    tokenPrice: 0.0241,
    token24HVolume: 40_000_000,
    totalHolders: 6_000,
  },
};

export function pagesRouter() {
  const router = Router({ mergeParams: true });

  router.use('/**', async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', { manifest, appVersion: config.APP_VERSION, initialStore });
  });

  return router;
}
