import GitHub from 'github-api';
import { anyString, anything, instance, mock, when } from 'ts-mockito';
import Twitter from 'twitter';
import { IServerApiTestClass } from './IServerApiTestClass';

export class TwitterClientTestKit implements IServerApiTestClass<Twitter> {
  private latestTweetText: string;
  private latestTweetUrl: string;

  constructor() {
    this.latestTweetText = 'default latest tweet text';
    this.latestTweetUrl = 'default latest tweet url';
  }

  public buildMockedInstance(): Twitter {
    const mockedTwitterClient = mock(Twitter);

    // Build the mocked response for 'getRepo
    const mockedRepositoryResponse = this.buildGetStatusesUserTimelineResponse();

    // @ts-ignore (no types for library)
    when(mockedTwitterClient.get('statuses/user_timeline', anything())).thenReturn(mockedRepositoryResponse);

    const twitterClient = instance(mockedTwitterClient);

    return twitterClient;
  }

  public withLatestTweetText(tweetText: string) {
    this.latestTweetText = tweetText;
  }

  public withLatestTweetUrl(tweetUrl: string) {
    this.latestTweetUrl = tweetUrl;
  }

  /**
   * Used to mimic the response of 'getRepo'
   */
  private buildGetStatusesUserTimelineResponse() {
    return buildGetStatusesUserTimelineResponse(this.latestTweetText, this.latestTweetUrl);
  }
}

/**
 * Builds the response object for the 'getRepo' function.
 */
export function buildGetStatusesUserTimelineResponse(
  latestTweetText: string,
  latestTweetUrl: string,
  isTruncated: boolean = false,
) {
  const mockedUserTimelineResponse = [
    {
      text: latestTweetText,
      truncated: isTruncated,
      entities: {
        urls: [
          {
            expanded_url: latestTweetUrl,
          },
        ],
      },
    },
  ];

  return mockedUserTimelineResponse;
}
