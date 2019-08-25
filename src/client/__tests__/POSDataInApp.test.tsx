/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './AppDriver';

describe('POS Data in the app', () => {

  it('should display the "Top Guardians" from the Token store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.withTopGuardians(['guardian 0', 'guardian 1', 'guardian 2']).render();
    expect(getByTestId('guardian-0')).toHaveTextContent('guardian 0');
    expect(getByTestId('guardian-1')).toHaveTextContent('guardian 1');
    expect(getByTestId('guardian-2')).toHaveTextContent('guardian 2');
  });

  it('should display the "Rewards Distributed" from the Token store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.withRewardsDistributed(123_456).render();
    expect(getByTestId('rewards-distributed')).toHaveTextContent('$123,456');
  });

  it('should display the "Rewards Clock" from the Token store', () => {
    const appDriver = new AppDriver();
    jest.spyOn(Date, 'now').mockImplementation(() => 1566724665192); // In order to prevent flackyness
    const HOURS = 15;
    const MINUTES = 45;
    const SECONDS = 17;
    const nextVotingTime = Date.now() + (HOURS * 60 * 60 * 1_000) + (MINUTES * 60 * 1_000) + SECONDS * 1_000;
    const { getByTestId } = appDriver.withNextVotingTime(nextVotingTime).render();
    expect(getByTestId('clock-hours')).toHaveTextContent(HOURS.toString());
    expect(getByTestId('clock-minutes')).toHaveTextContent(MINUTES.toString());
    expect(getByTestId('clock-seconds')).toHaveTextContent(SECONDS.toString());
  });
});
