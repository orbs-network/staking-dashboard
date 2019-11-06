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

describe('Token Data in the app', () => {
  let storeInitialData: StoreInitialDataTestKit;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    storeInitialData = new StoreInitialDataTestKit();
  });

  it('should display the "24H volume" from the Token store', async () => {
    storeInitialData.with24HVolume(35_000_000);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();

    expect(getByTestId('24h-volume')).toHaveTextContent('$35M');

    await appDriver.activateApp();
    expect(getByTestId('24h-volume')).toHaveTextContent('$35M');
  });

  it('should display the "Orbs In Circulation" from the Token store', async () => {
    storeInitialData.withOrbsInCirculation(1_234_567_890);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();
    expect(getByTestId('orbs-in-circulation')).toHaveTextContent('1,234,567,890');

    await appDriver.activateApp();
    expect(getByTestId('orbs-in-circulation')).toHaveTextContent('1,234,567,890');
  });

  it('should display the "Token Price" from the Token store', async () => {
    storeInitialData.withTokenPrice(0.0242);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();
    expect(getByTestId('token-price')).toHaveTextContent('$0.0242');

    await appDriver.activateApp();
    expect(getByTestId('token-price')).toHaveTextContent('$0.0242');
  });

  it('should display the "Total Holders" from the Token store', async () => {
    storeInitialData.withTotalHolders(1_234);

    const { getByTestId } = appDriver.initApp(storeInitialData).render();
    expect(getByTestId('total-token-holders')).toHaveTextContent('1,234');

    await appDriver.activateApp();
    expect(getByTestId('total-token-holders')).toHaveTextContent('1,234');
  });
});
