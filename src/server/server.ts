/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import express from 'express';
import path from 'path';
import Twitter from 'twitter';
import winston from 'winston';
import config from './config';
import { buildOrbsPOSDataService } from './factories';
import { forceHttps } from './middlewares/ForceHttps';
import { EthplorerAdapter } from './realtime-data/ethplorerAdapter';
import { OrbsPosDataAdapter } from './realtime-data/orbsPosDataAdapter';
import { RealtimeDataProvider } from './realtime-data/realtimeDataProvider';
import { pagesRouter } from './routes/pages-router';
import { staticsRouter } from './routes/statics-router';
import { IOrbsTwitterService, OrbsTwitterService } from './services/orbsTwitterService';

async function initOrbsTwitterService() {
  const twitterClient = new Twitter({
    // eslint-disable-next-line @typescript-eslint/camelcase
    consumer_key: config.TWITTER.consumerKey,
    // eslint-disable-next-line @typescript-eslint/camelcase
    consumer_secret: config.TWITTER.consumerSecret,
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_token_key: config.TWITTER.tokenKey,
    // eslint-disable-next-line @typescript-eslint/camelcase
    access_token_secret: config.TWITTER.tokenSecret,
  });

  const orbsTwitterService: IOrbsTwitterService = new OrbsTwitterService(
    twitterClient,
    config.TWITTER.orbsTwitterScreenName,
  );

  await orbsTwitterService.init();

  return orbsTwitterService;
}

export async function initServer(logger: winston.Logger) {
  // process.on('unhandledRejection', (reason, p) => {
  //   console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // });

  const app = express();

  if (config.FORCE_HTTPS) {
    app.use(forceHttps);
  }

  const orbsTwitterService = await initOrbsTwitterService();
  const orbsPOSDataService = buildOrbsPOSDataService();
  const orbsPosDataAdapter: OrbsPosDataAdapter = new OrbsPosDataAdapter(orbsPOSDataService);
  const ethplorerAdapter: EthplorerAdapter = new EthplorerAdapter();
  const realtimeDataProvider: RealtimeDataProvider = new RealtimeDataProvider(
    ethplorerAdapter,
    orbsPosDataAdapter,
    orbsTwitterService,
  );
  orbsPosDataAdapter.init();
  ethplorerAdapter.init();

  app.set('view engine', 'ejs');
  app.use('/assets', express.static(path.join(process.cwd(), 'assets')));
  app.use(staticsRouter());
  app.use(pagesRouter(realtimeDataProvider));

  startServicesTimers(orbsTwitterService);

  const server = app.listen(config.SERVER_PORT, () => {
    console.log(`App listening on port ${config.SERVER_PORT}!`);
  });
  return server;
}

/**
 * Initiates all of the required intervals for routinely update of our services.
 * TODO : FUTURE : O.L : We an make the timers managing into its own service once it will grow more.
 */
function startServicesTimers(orbsTwitterService: IOrbsTwitterService) {
  const oneMinute = 1000 * 60;

  // Starts an interval for updating the twitter service (Every 5 Minutes)
  setInterval(() => orbsTwitterService.fetchAndCacheLatestTweetGist(), oneMinute * 1);
}
