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

describe('Token Data in the app', () => {

  let appHydration: AppHydration;
  let appDriver: AppDriver;

  beforeEach(() => {
    appDriver = new AppDriver();
    appHydration = new AppHydration();
  });

  it('should display the "24H volume" from the Token store', () => {
    appHydration.with24HVolume(35_000_000);

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('24h-volume')).toHaveTextContent('$35M');
  });

  it('should display the "Orbs In Circulation" from the Token store', () => {
    appHydration.withOrbsInCirculation(1_234_567_890);

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('orbs-in-circulation')).toHaveTextContent('1,234,567,890');
  });

  it('should display the "Token Price" from the Token store', () => {
    appHydration.withTokenPrice(0.0242);

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('token-price')).toHaveTextContent('$0.0242');
  });

  it('should display the "Total Holders" from the Token store', () => {
    appHydration.withTotalHolders(1_234);

    const { getByTestId } = appDriver.initializeApp(appHydration).render();
    expect(getByTestId('total-token-holders')).toHaveTextContent('1,234');
  });
});
