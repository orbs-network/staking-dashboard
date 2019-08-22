/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Typography } from './Typography';
import { theme } from './Theme';

const Root = styled(Button)`
  text-transform: uppercase;
  border-width: 3px;
  padding: ${theme.sizes.SIZE_BASIC} ${theme.sizes.SIZE_LARGE_1};
`;

export const CTAButton: React.FunctionComponent = ({ children }) => {
  return (
    <Root fullWidth>
      <Typography variant='large'>{children}</Typography>
    </Root>
  );
};
