/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './testKits/AppDriver';
import { AppHydration } from './testKits/AppHydration';
import { ApiDependenciesKit } from './testKits/apis/ApiDependenciesKit';
import { IGitHubCommitGist, ITwitGist } from '../../shared/IStoreTypes';

describe('Social Data in the app', () => {
  let appHydration: AppHydration;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    appHydration = new AppHydration();
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

    // Set the commit for the hydration
    appHydration.withLatestCommitGist(hydrationCommitGist);

    // Set the commit for the 'real world'
    appDriver.outerWorldState.setLastGitHubCommitGist(apiCommitGist);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();
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

    appHydration.withLatestTweetGist(hydrationTweetGist);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();
    expect(getByTestId('latest-tweet')).toHaveTextContent(hydrationTweetGist.tweetText);
    expect(getByTestId('latest-tweet_link')).toHaveProperty('href', hydrationTweetGist.tweetUrl);

    // DEV_NOTE : We expect no change after init.
    await appDriver.initApp();
    expect(getByTestId('latest-tweet')).toHaveTextContent(hydrationTweetGist.tweetText);
    expect(getByTestId('latest-tweet_link')).toHaveProperty('href', hydrationTweetGist.tweetUrl);
  });

  it('should display the "Recent Update" from the hydrated hydrated Social store', async () => {
    appHydration.withRecentUpdate('Recent Update');

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');

    await appDriver.initApp();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');
  });
});
