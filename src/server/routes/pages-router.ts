import { Router } from 'express';
import * as config from '../config';
import { getManifest } from './manifest-manager';

export function pagesRouter() {
  const router = Router({ mergeParams: true });

  router.use('/**', async (_, res) => {
    const manifest = await getManifest();
    res.render('page.ejs', { manifest, appVersion: config.APP_VERSION });
  });

  return router;
}
