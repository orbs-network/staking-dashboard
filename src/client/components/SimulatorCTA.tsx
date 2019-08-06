/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { CTAButton } from './base/CTAButton';
import { theme } from './base/Theme';

const Root = styled.div`
  padding: ${theme.sizes.SIZE_LARGE_3} 0;
  display: flex;
  justify-content: center;
`;

export const SimulatorCTA: React.FunctionComponent = ({ children }) => {
  return (
    <Root>
      <CTAButton>Rewards Simulator</CTAButton>
    </Root>
  );
};
