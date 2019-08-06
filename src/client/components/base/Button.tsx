/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { theme } from './Theme';
import { Typography } from './Typography';

const Root = styled.button`
  border-radius: ${theme.sizes.SIZE_SMALL_6};
  border-color: ${theme.secondaryColor};
  background-color: ${theme.buttonColor};
`;

export interface IProps {
  className?: string;
}

export const Button: React.FunctionComponent<IProps> = ({ className, children }) => {
  return (
    <Root className={className}>
      <Typography variant='small'>{children}</Typography>
    </Root>
  );
};
