import Twitter from 'twitter';
import { ITwitGist } from '../../shared/IStoreTypes';

interface IServerService {
  init: () => Promise<void>;
}

export interface IOrbsTwitterService extends IServerService {
  getCachedLatestTweetGist(): ITwitGist;
  fetchAndCacheLatestTweetGist(): void;
}

const LAST_LINK_REGEX = /https:\/\/t\.co\/.*$/g;

/**
 * Handles cases of 'truncated' tweet text to ensure proper displayable values.
 */
function parseTweetForDisplay(rawTweetText: string, isTruncated: boolean) {
  let tweetText = rawTweetText;

  // extract the tweetUrl
  const tweetUrlMatch = tweetText.match(LAST_LINK_REGEX);
  const tweetUrl = tweetUrlMatch ? tweetUrlMatch[0] : '';

  // Removes the link from the end of the text
  tweetText = tweetText.replace(LAST_LINK_REGEX, '');

  // Twitter adds a '…' with a shortend link for truncated tweets. we will remove this special char and the
  // link to deliver only text.
  if (isTruncated) {
    const HORIZONTAL_ELIPSIS = '…';

    // Take just the relevant text part
    tweetText = tweetText.replace(HORIZONTAL_ELIPSIS, '...');
  }

  tweetText = tweetText.trim();
  return { tweetUrl, tweetText };
}

export class OrbsTwitterService implements IOrbsTwitterService {
  private latestTweetGist: ITwitGist = null;

  constructor(private twitterClient: Twitter, private screenName: string) {}

  public getCachedLatestTweetGist(): ITwitGist {
    return this.latestTweetGist;
  }

  public async init() {
    await this.fetchAndCacheLatestTweetGist();
  }

  /**
   * Fetched the latest tweet gist from Twitter and replaces the current cached one.
   */
  public async fetchAndCacheLatestTweetGist(): Promise<void> {
    this.latestTweetGist = await this.fetchFreshLatestTweet();
  }

  private async fetchFreshLatestTweet(): Promise<ITwitGist> {
    const params: Twitter.RequestParams = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      screen_name: this.screenName,
      // eslint-disable-next-line @typescript-eslint/camelcase
      exclude_replies: true, // No need for replies
      // eslint-disable-next-line @typescript-eslint/camelcase
      include_rts: false, // No need for re-tweets
    };

    const res = await this.twitterClient.get('statuses/user_timeline', params);

    // The first tweet is the latest
    const latestTweet = res[0];
    // Get the tweet URL (Using the expanded_url allows the user to get to the twitter page directly without getting redirected)
    const { text, truncated } = latestTweet;

    const result = parseTweetForDisplay(text, truncated);

    return result;
  }
}
