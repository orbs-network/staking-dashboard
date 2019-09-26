/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './AppDriver';
import {AppHydration} from './AppHydration';

describe('Social Data in the app', () => {
  let appHydration: AppHydration;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    appHydration = new AppHydration();
  });

  it('should display the "Latest commit" from the hydrated hydrated Social store', () => {
    appHydration.withLatestCommit('Latest commit');

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('latest-commit')).toHaveTextContent('Latest commit');
  });

  it('should display the "Latest tweet" from the hydrated hydrated Social store', () => {
    appHydration.withLatestTweet('Latest tweet');

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('latest-tweet')).toHaveTextContent('Latest tweet');
  });

  it('should display the "Recent Update" from the hydrated hydrated Social store', () => {
    appHydration.withRecentUpdate('Recent Update');

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');
  });
});
