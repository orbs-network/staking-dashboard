import Twitter from 'twitter';
import { ITwitGist } from '../../shared/IStoreTypes';

interface IServerService {
  init: () => Promise<void>;
}

export interface IOrbsTwitterService extends IServerService {
  getCachedLatestTweetGist(): ITwitGist;
}

export class OrbsTwitterService implements IOrbsTwitterService {
  private latestTweetGist: ITwitGist = null;

  constructor(private twitterClient: Twitter) {}

  public getCachedLatestTweetGist(): ITwitGist {
    return this.latestTweetGist;
  }

  public async init() {
    this.latestTweetGist = await this.fetchFreshLatestTweet();
  }

  private async fetchFreshLatestTweet(): Promise<ITwitGist> {
    const params: Twitter.RequestParams = {
      screen_name: 'orbs_network', // TODO : ORL : Take this from the config
      exclude_replies: true, // No need for replies
      include_rts: false, // No need for re-tweets
    };

    const res = await this.twitterClient.get('statuses/user_timeline', params);

    // The first tweet is the latest
    const latestTweet = res[0];

    // Get the tweet URL
    const { entities } = latestTweet;
    const { urls } = entities;
    const tweetUrl = urls[0].url;

    const tweetText = prepareTweetTextForDisplay(latestTweet.text, latestTweet.truncated, [tweetUrl]);

    return {
      tweetText,
      tweetUrl,
    };
  }
}

/**
 * Handles cases of 'truncated' tweet text to ensure proper displayable values.
 */
function prepareTweetTextForDisplay(rawTweetText: string, isTruncated: boolean, stringsToRemove?: string[]) {
  let textForDisplay = rawTweetText;

  // Removes all given strings from the text for display
  if (stringsToRemove) {
    stringsToRemove.forEach(textToRemove => {
      textForDisplay = textForDisplay.replace(textToRemove, '');
    });
  }

  // Twitter adds a '…' with a shortend link for truncated tweets. we will remove this special char and the
  // link to deliver only text.
  if (isTruncated) {
    const HORIZONTAL_ELIPSIS = '…';

    // Take just the relevant text part
    textForDisplay = textForDisplay.replace(HORIZONTAL_ELIPSIS, '...');
  }

  return textForDisplay;
}
