import { anything, instance, mock, when } from 'ts-mockito';
import Twitter from 'twitter';
import { ITwitGist } from '../../../../shared/IStoreTypes';

export class TwitterClientTestKit {
  private latestTweetText: string;
  private latestTweetUrl: string;

  constructor() {
    this.latestTweetText = 'default latest tweet text';
    this.latestTweetUrl = 'default latest tweet url';
  }

  public buildMockedInstance(): Twitter {
    const mockedTwitterClient = mock(Twitter);

    // @ts-ignore (no types for library)
    when(mockedTwitterClient.get('statuses/user_timeline', anything())).thenCall(
      this.buildGetStatusesUserTimelineResponse.bind(this), // Always returning a freshly built response
    );

    const twitterClient = instance(mockedTwitterClient);

    return twitterClient;
  }

  /**
   * Combines all of the tweet gist's state variables in one method.
   */
  public withLatestTweetGist(tweetGist: ITwitGist) {
    this.withLatestTweetText(tweetGist.tweetText);
    this.withLatestTweetUrl(tweetGist.tweetUrl);
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
