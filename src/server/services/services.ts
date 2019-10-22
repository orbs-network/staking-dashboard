import { IOrbsTwitterService, OrbsTwitterService } from './orbsTwitterService';
import Twitter from 'twitter';

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
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
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
  const orbsTwitterService: IOrbsTwitterService = new OrbsTwitterService(serverServicesDependencies.twitterClient);

  return {
    orbsTwitterService,
  };
}
