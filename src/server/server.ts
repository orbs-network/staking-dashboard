/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as express from 'express';
import * as path from 'path';
import * as winston from 'winston';
import * as config from './config';
import { forceHttps } from './middlewares/ForceHttps';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import { EthplorerAdapter } from './realtime-data/ethplorerAdapter';
import { RealTimeDataProvider } from './realtime-data/realtimeDataProvider';

export function initServer(logger: winston.Logger) {
  const app = express();

  if (config.FORCE_HTTPS) {
    app.use(forceHttps);
  }

  const ethplorerAdapter: EthplorerAdapter = new EthplorerAdapter();
  const realtimeDataProvider: RealTimeDataProvider = new RealTimeDataProvider(ethplorerAdapter);
  ethplorerAdapter.init();

  app.set('view engine', 'ejs');
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  app.use(staticsRouter());
  app.use(pagesRouter(realtimeDataProvider));

  const server = app.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
  return server;
}
