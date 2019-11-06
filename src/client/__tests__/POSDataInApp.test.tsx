/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { AppDriver } from './testKits/AppDriver';
import { StoreInitialDataTestKit } from './testKits/StoreInitialDataTestKit';
import { IGuardianDisplayGist } from '../../shared/IGuardian';

describe('POS Data in the app', () => {
  let storeInitialData: StoreInitialDataTestKit;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    storeInitialData = new StoreInitialDataTestKit();
  });

  it('should display the "Top Guardians" from the Token store', async () => {
    const guardian1: IGuardianDisplayGist = {
      id: 'g1',
      homePage: 'http://g1.comn',
      displayName: 'guardian 1',
    };

    const guardian2: IGuardianDisplayGist = {
      id: 'g2',
      homePage: 'http://g2.comn',
      displayName: 'guardian 2',
    };

    const guardian3: IGuardianDisplayGist = {
      id: 'g3',
      homePage: 'http://g3.comn',
      displayName: 'guardian 3',
    };

    storeInitialData.withTopGuardians([guardian1, guardian2, guardian3]);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();

    expect(getByTestId('guardian-link-0')).toHaveTextContent(guardian1.displayName);
    expect(getByTestId('guardian-link-0')).toHaveAttribute('href', guardian1.homePage);
    expect(getByTestId('guardian-link-1')).toHaveTextContent(guardian2.displayName);
    expect(getByTestId('guardian-link-1')).toHaveAttribute('href', guardian2.homePage);
    expect(getByTestId('guardian-link-2')).toHaveTextContent(guardian3.displayName);
    expect(getByTestId('guardian-link-2')).toHaveAttribute('href', guardian3.homePage);

    // The service init should not have no effect for now
    await appDriver.activateApp();
    expect(getByTestId('guardian-link-0')).toHaveTextContent(guardian1.displayName);
    expect(getByTestId('guardian-link-0')).toHaveAttribute('href', guardian1.homePage);
    expect(getByTestId('guardian-link-1')).toHaveTextContent(guardian2.displayName);
    expect(getByTestId('guardian-link-1')).toHaveAttribute('href', guardian2.homePage);
    expect(getByTestId('guardian-link-2')).toHaveTextContent(guardian3.displayName);
    expect(getByTestId('guardian-link-2')).toHaveAttribute('href', guardian3.homePage);
  });

  it('should display the "Rewards Distributed" from the hydrated Token store', async () => {
    storeInitialData.withRewardsDistributed(123_456);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();

    expect(getByTestId('rewards-distributed')).toHaveTextContent('$123,456');

    await appDriver.activateApp();
    expect(getByTestId('rewards-distributed')).toHaveTextContent('$123,456');
  });

  it('should display the "BlockHeight" from the hydrated Token store', async () => {
    const { getByTestId } = appDriver.initApp(storeInitialData).render();

    expect(getByTestId('total-blocks')).toHaveTextContent('--');

    // await appDriver.initApp();
    // expect(getByTestId('total-blocks')).toHaveTextContent('1,234,000');
  });

  it('should display the "Rewards Clock" from the hydrated Token store', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => 1566724665192); // In order to prevent flackyness
    const HOURS = 15;
    const MINUTES = 45;
    const SECONDS = 17;
    const nextVotingTime = Date.now() + HOURS * 60 * 60 * 1_000 + MINUTES * 60 * 1_000 + SECONDS * 1_000;

    storeInitialData.withNextVotingTime(nextVotingTime);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();

    expect(getByTestId('clock-hours')).toHaveTextContent(HOURS.toString());
    expect(getByTestId('clock-minutes')).toHaveTextContent(MINUTES.toString());
    expect(getByTestId('clock-seconds')).toHaveTextContent(SECONDS.toString());

    await appDriver.activateApp();
    expect(getByTestId('clock-hours')).toHaveTextContent(HOURS.toString());
    expect(getByTestId('clock-minutes')).toHaveTextContent(MINUTES.toString());
    expect(getByTestId('clock-seconds')).toHaveTextContent(SECONDS.toString());
  });
});
