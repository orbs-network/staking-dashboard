/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { RewardsDistributedSection } from './sections/RewardsDistributedSection';
import { TotalTokensSection } from './sections/TotalTokensSection';
import { SimulatorCTA } from './SimulatorCTA';
import { TopGuardiansSection } from './sections/TopGuardiansSection';
import { ClockSection } from './sections/ClockSection';
import { HSeparator } from './sections/HSeparator';
import { theme } from './base/Theme';

const Root = styled.div`
  margin-top: ${theme.sizes.SIZE_LARGE_4};
`;

export const LeftPanel: React.FunctionComponent = () => {
  return (
    <Root>
      <TotalTokensSection />
      <HSeparator />
      <RewardsDistributedSection />
      <HSeparator />
      <SimulatorCTA />
      <ClockSection />
      <HSeparator />
      <TopGuardiansSection />
    </Root>
  );
};
