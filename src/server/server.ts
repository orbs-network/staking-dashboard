/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import express from 'express';
import path from 'path';
import winston from 'winston';
import config from './config';
import { forceHttps } from './middlewares/ForceHttps';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import { EthplorerAdapter } from './realtime-data/ethplorerAdapter';
import { OrbsPosDataAdapter } from './realtime-data/orbsPosDataAdapter';
import { RealtimeDataProvider } from './realtime-data/realtimeDataProvider';
import { buildOrbsPOSDataService } from './factories';
import { buildProductionAppServices, IServerServices } from './services/services';

export async function initServer(logger: winston.Logger) {
  const app = express();

  if (config.FORCE_HTTPS) {
    app.use(forceHttps);
  }

  const serverServices: IServerServices = buildProductionAppServices();

  await serverServices.orbsTwitterService.init();

  const orbsPOSDataService = buildOrbsPOSDataService();
  const orbsPosDataAdapter: OrbsPosDataAdapter = new OrbsPosDataAdapter(orbsPOSDataService);
  const ethplorerAdapter: EthplorerAdapter = new EthplorerAdapter();
  const realtimeDataProvider: RealtimeDataProvider = new RealtimeDataProvider(
    ethplorerAdapter,
    orbsPosDataAdapter,
    serverServices.orbsTwitterService,
  );
  orbsPosDataAdapter.init();
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
