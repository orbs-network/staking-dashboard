import { IOrbsTwitterService, OrbsTwitterService } from './orbsTwitterService';
import Twitter from 'twitter';

import config from '../config';

export interface IServerServices {
  orbsTwitterService: IOrbsTwitterService;
}

export interface IServerServicesDependencies {
  twitterClient: Twitter;
}

/**
 * Builds the app-services with production dependencies-implementations.
 */
export function buildProductionAppServices(): IServerServices {
  const twitterClient = new Twitter({
    consumer_key: config.TWITTER.consumerKey,
    consumer_secret: config.TWITTER.consumerSecret,
    access_token_key: config.TWITTER.tokenKey,
    access_token_secret: config.TWITTER.tokenSecret,
  });

  // Build production dependencies
  const serverServicesDependencies: IServerServicesDependencies = {
    twitterClient,
  };

  // Return the built services
  return buildAppServices(serverServicesDependencies);
}

/**
 * Builds all of the app services with the given dependencies implementations.
 */
export function buildAppServices(serverServicesDependencies: IServerServicesDependencies): IServerServices {
  const orbsTwitterService: IOrbsTwitterService = new OrbsTwitterService(
    serverServicesDependencies.twitterClient,
    config.TWITTER.orbsTwitterScreenName,
  );

  return {
    orbsTwitterService,
  };
}
