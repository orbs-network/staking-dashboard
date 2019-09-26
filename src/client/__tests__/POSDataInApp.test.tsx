/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './testKits/AppDriver';
import {AppHydration} from './testKits/AppHydration';

describe('POS Data in the app', () => {

  let appHydration: AppHydration;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    appHydration = new AppHydration();
  });

  it('should display the "Top Guardians" from the Token store', async () => {
    appHydration.withTopGuardians(['guardian 0', 'guardian 1', 'guardian 2']);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();

    expect(getByTestId('guardian-0')).toHaveTextContent('guardian 0');
    expect(getByTestId('guardian-1')).toHaveTextContent('guardian 1');
    expect(getByTestId('guardian-2')).toHaveTextContent('guardian 2');

    await appDriver.initApp();
    expect(getByTestId('guardian-0')).toHaveTextContent('guardian 0');
    expect(getByTestId('guardian-1')).toHaveTextContent('guardian 1');
    expect(getByTestId('guardian-2')).toHaveTextContent('guardian 2');
  });

  it('should display the "Rewards Distributed" from the hydrated Token store', async () => {
    appHydration.withRewardsDistributed(123_456);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();

    expect(getByTestId('rewards-distributed')).toHaveTextContent('$123,456');

    await appDriver.initApp();
    expect(getByTestId('rewards-distributed')).toHaveTextContent('$123,456');
  });

  it('should display the "BlockHeight" from the hydrated Token store', async () => {
    appHydration.withBlockHeight(1_234_000);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();

    expect(getByTestId('total-blocks')).toHaveTextContent('1,234,000');

    await appDriver.initApp();
    expect(getByTestId('total-blocks')).toHaveTextContent('1,234,000');

    // TODO : FUTURE : O.L : Move this test to the 'store-to-ui' tests.
    // appDriver.withBlockHeight(1_234_568);
    // expect(getByTestId('total-blocks')).toHaveTextContent('1,234,568');
  });

  it('should display the "Rewards Clock" from the hydrated Token store', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1566724665192); // In order to prevent flackyness
    const HOURS = 15;
    const MINUTES = 45;
    const SECONDS = 17;
    const nextVotingTime = Date.now() + (HOURS * 60 * 60 * 1_000) + (MINUTES * 60 * 1_000) + SECONDS * 1_000;

    appHydration.withNextVotingTime(nextVotingTime);

    const { getByTestId } = appDriver.hydrateApp(appHydration).render();

    expect(getByTestId('clock-hours')).toHaveTextContent(HOURS.toString());
    expect(getByTestId('clock-minutes')).toHaveTextContent(MINUTES.toString());
    expect(getByTestId('clock-seconds')).toHaveTextContent(SECONDS.toString());

    await appDriver.initApp();
    expect(getByTestId('clock-hours')).toHaveTextContent(HOURS.toString());
    expect(getByTestId('clock-minutes')).toHaveTextContent(MINUTES.toString());
    expect(getByTestId('clock-seconds')).toHaveTextContent(SECONDS.toString());
  });
});
