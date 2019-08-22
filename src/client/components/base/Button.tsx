/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from './Theme';
import { Typography } from './Typography';

const Root = styled.button<ICSSProps>`
  font-size: ${theme.sizes.SIZE_SMALL_1};
  border-radius: ${theme.sizes.SIZE_SMALL_6};
  border-color: ${theme.secondaryColor};
  background-color: ${theme.buttonColor};
  color: inherit;
  width: ${props => (props.fullWidth ? '100%' : 'unset')};

  &:hover {
    background-color: ${theme.buttonHoverColor};
    color: black;
  }

  &:active {
    background-color: ${theme.buttonDownColor};
    color: black;
  }

  &:focus {
    outline: none;
  }
`;

export interface ICSSProps {
  fullWidth?: boolean;
}

export interface IProps extends ICSSProps {
  className?: string;
}

export const Button: React.FunctionComponent<IProps> = ({ className, fullWidth, children }) => {
  return (
    <Root className={className} fullWidth={fullWidth}>
      <Typography variant='small'>{children}</Typography>
    </Root>
  );
};
