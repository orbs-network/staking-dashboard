import { mock } from 'ts-mockito';
import Twitter from 'twitter';
import { ITwitGist } from '../../../shared/IStoreTypes';
import { IOrbsTwitterService, OrbsTwitterService } from '../../services/orbsTwitterService';
import { TwitterClientTestKit } from '../testKits/apis/TwitterClientTestKit';

describe('Orbs-Twitter service (server) functionality', () => {
  let mockedTweeterClient: Twitter;
  let twitterClientTestKit: TwitterClientTestKit = null;

  // Initialize a new mock and test kit
  beforeEach(() => {
    mockedTweeterClient = mock(Twitter);
    twitterClientTestKit = new TwitterClientTestKit();
  });

  it('Should extract the latest tweet gist properly on init and on re-fetch', async () => {
    const tweetGistForInit: ITwitGist = {
      tweetText: 'This is the latest tweet foor init https://t.co/tweetForInit',
      tweetUrl: 'https://t.co/tweetForInit',
    };

    const tweetGistForAfterChange: ITwitGist = {
      tweetText: 'This is the latest tweet after some time https://t.co/tweetAfterChange',
      tweetUrl: 'https://t.co/tweetAfterChange',
    };

    // 1) Assign the values for the 'real world' mocking
    twitterClientTestKit.withLatestTweetGist(tweetGistForInit);

    // Built with mocks + init
    const tweeterService = buildWithMocks(twitterClientTestKit.buildMockedInstance());
    await tweeterService.init();

    // We expect the returned value to have the proper form and values
    const expectedTweetGistAfterInit: ITwitGist = {
      tweetText: 'This is the latest tweet foor init',
      tweetUrl: 'https://t.co/tweetForInit',
    };
    const lastCommitGist = tweeterService.getCachedLatestTweetGist();
    expect(lastCommitGist).toStrictEqual(expectedTweetGistAfterInit);

    // 2) Change the 'real world' latest tweet values
    twitterClientTestKit.withLatestTweetGist(tweetGistForAfterChange);

    // Ask the service to re-fetch the latest tweet gist
    await tweeterService.fetchAndCacheLatestTweetGist();

    // We expect the returned value to have the proper form and values
    const expectedTweetGistAfterChange: ITwitGist = {
      tweetText: 'This is the latest tweet after some time',
      tweetUrl: 'https://t.co/tweetAfterChange',
    };
    const lastCommitGistAfterChange = tweeterService.getCachedLatestTweetGist();
    expect(lastCommitGistAfterChange).toStrictEqual(expectedTweetGistAfterChange);
  });
});

/**
 * Builds an instance of the service with mocked dependencies
 */
function buildWithMocks(mockedTwitterClientInstance: Twitter): IOrbsTwitterService {
  const githubService: IOrbsTwitterService = new OrbsTwitterService(mockedTwitterClientInstance, 'screenName');

  return githubService;
}
