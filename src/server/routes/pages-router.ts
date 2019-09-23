import { Router } from 'express';
import * as config from '../config';
import { getManifest } from './manifest-manager';
import { IStoreInitialData } from '../../shared/IStore';
import { RealtimeDataProvider } from '../realtime-data/realtimeDataProvider';

export function pagesRouter(realTimeDataProvider: RealtimeDataProvider) {
  const router = Router({ mergeParams: true });

  router.use('/**', async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', {
      manifest,
      appVersion: config.APP_VERSION,
      initialStore: realTimeDataProvider.getStoreInitialData(),
    });
  });

  return router;
}
