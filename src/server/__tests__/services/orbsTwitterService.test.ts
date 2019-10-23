import { anyString, instance, mock, when } from 'ts-mockito';
import { IOrbsTwitterService, OrbsTwitterService } from '../../services/orbsTwitterService';
import Twitter from 'twitter';
import { TwitterClientTestKit } from '../testKits/apis/TwitterClientTestKit';
import { ITwitGist } from '../../../shared/IStoreTypes';

describe('Orbs-Twitter service (server) functionality', () => {
  let mockedTweeterClient: Twitter;
  let twitterClientTestKit: TwitterClientTestKit = null;

  // Initialize a new mock and test kit
  beforeEach(() => {
    mockedTweeterClient = mock(Twitter);
    twitterClientTestKit = new TwitterClientTestKit();
  });

  it('Should extract the latest tweet gist properly', async () => {
    const expectedLastTweetText = 'This is the latest tweet';
    const expectedLastTweetUrl = 'https://twitter.com/stam';

    // Assign the values for the 'real world' mocking
    twitterClientTestKit.withLatestTweetText(expectedLastTweetText);
    twitterClientTestKit.withLatestTweetUrl(expectedLastTweetUrl);

    // Built with mocks + init
    const tweeterService = buildWithMocks(twitterClientTestKit.buildMockedInstance());
    await tweeterService.init();

    const lastCommitGist = await tweeterService.getCachedLatestTweetGist();

    // We expect the returned value to be in the proper form + have the proper value
    const expectedTweetGist: ITwitGist = {
      tweetText: expectedLastTweetText,
      tweetUrl: expectedLastTweetUrl,
    };

    expect(lastCommitGist).toStrictEqual(expectedTweetGist);
  });
});

/**
 * Builds an instance of the service with mocked dependencies
 */
function buildWithMocks(mockedTwitterClientInstance: Twitter): IOrbsTwitterService {
  const githubService: IOrbsTwitterService = new OrbsTwitterService(mockedTwitterClientInstance, 'screenName');

  return githubService;
}
