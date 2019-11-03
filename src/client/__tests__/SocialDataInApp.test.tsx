/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { IGitHubCommitGist, ITwitGist } from '../../shared/IStoreTypes';
import { AppDriver } from './testKits/AppDriver';
import { StoreInitialDataTestKit } from './testKits/StoreInitialDataTestKit';
import { GitHubApiTestKit } from './testKits/apis/GithubApi';

describe('Social Data in the app', () => {
  let storeInitialData: StoreInitialDataTestKit;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    storeInitialData = new StoreInitialDataTestKit();
  });

  it('should display the "Latest commit" from the hydrated hydrated Social store', async () => {
    const hydrationCommitGist: IGitHubCommitGist = {
      commitText: 'Hydration Commit text',
      commitUrl: 'http://localhost/hydrationCommit',
    };
    const apiCommitGist: IGitHubCommitGist = {
      commitText: 'Api Commit text',
      commitUrl: 'http://localhost/apiCommit',
    };

    const githubApiTestKit: GitHubApiTestKit = new GitHubApiTestKit();

    // Set the commit for the hydration
    storeInitialData.withLatestCommitGist(hydrationCommitGist);

    // Set the commit for the 'real world'
    const githubApi = githubApiTestKit
      .withLastCommitMessage(apiCommitGist.commitText)
      .withLastCommitUrl(apiCommitGist.commitUrl)
      .build();

    const { getByTestId } = appDriver
      .withGithubApi(githubApi)
      .hydrateApp(storeInitialData)
      .render();
    expect(getByTestId('latest-commit')).toHaveTextContent(hydrationCommitGist.commitText);
    expect(getByTestId('latest-commit_link')).toHaveProperty('href', hydrationCommitGist.commitUrl);

    await appDriver.initApp();
    expect(getByTestId('latest-commit')).toHaveTextContent(apiCommitGist.commitText);
    expect(getByTestId('latest-commit_link')).toHaveProperty('href', apiCommitGist.commitUrl);
  });

  it('should display the "Latest tweet" from the hydrated hydrated Social store', async () => {
    const hydrationTweetGist: ITwitGist = {
      tweetText: 'Latest tweet',
      tweetUrl: 'http://localhost/hydrationTweet',
    };

    storeInitialData.withLatestTweetGist(hydrationTweetGist);

    const { getByTestId } = appDriver.hydrateApp(storeInitialData).render();
    expect(getByTestId('latest-tweet')).toHaveTextContent(hydrationTweetGist.tweetText);
    expect(getByTestId('latest-tweet_link')).toHaveProperty('href', hydrationTweetGist.tweetUrl);

    // DEV_NOTE : We expect no change after init.
    await appDriver.initApp();
    expect(getByTestId('latest-tweet')).toHaveTextContent(hydrationTweetGist.tweetText);
    expect(getByTestId('latest-tweet_link')).toHaveProperty('href', hydrationTweetGist.tweetUrl);
  });

  it('should display the "Recent Update" from the hydrated hydrated Social store', async () => {
    storeInitialData.withRecentUpdate('Recent Update');

    const { getByTestId } = appDriver.hydrateApp(storeInitialData).render();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');

    await appDriver.initApp();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');
  });
});
