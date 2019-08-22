/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { Token24HVolumeSection } from '../components/sections/Token24HVolumeSection';
import { AppDriver } from './AppDriver';

describe('<Token24HVolumeSection/>', () => {
  it('should display the 24H volume from the Token store', () => {
    const appDriver = new AppDriver();
    const { getByTestId } = appDriver.with24HVolume(35_000_000).render(<Token24HVolumeSection />);
    expect(getByTestId('24h-volume')).toHaveTextContent('$35M');
  });
});
