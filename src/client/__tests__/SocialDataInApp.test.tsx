/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './AppDriver';

describe('Social Data in the app', () => {

  it('should display the "Latest commit" from the Social store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.withLatestCommit('Latest commit').render();
    expect(getByTestId('latest-commit')).toHaveTextContent('Latest commit');
  });

  it('should display the "Latest tweet" from the Social store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.withLatestTweet('Latest tweet').render();
    expect(getByTestId('latest-tweet')).toHaveTextContent('Latest tweet');
  });

  it('should display the "Recent Update" from the Social store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.withRecentUpdate('Recent Update').render();
    expect(getByTestId('recent-update')).toHaveTextContent('Recent Update');
  });
});
