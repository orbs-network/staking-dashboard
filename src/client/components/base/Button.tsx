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

const Root = styled.button<ICSSProps>(props => ({
  fontSize: theme.sizes.SIZE_SMALL_1,
  borderRadius: theme.sizes.SIZE_SMALL_6,
  borderColor: theme.secondaryColor,
  backgroundColor: theme.buttonColor,
  color: 'inherit',
  width: props.fullWidth ? '100%' : 'unset',

  '&:hover': {
    backgroundColor: theme.buttonHoverColor,
    color: 'black',
  },

  '&:active': {
    backgroundColor: theme.buttonDownColor,
    color: 'black',
  },

  '&:focus': {
    outline: 'none',
  },
}));

export interface ICSSProps {
  fullWidth?: boolean;
}

export interface IProps extends ICSSProps {
  className?: string;
}

export const Button: React.FunctionComponent<IProps> = ({ className, fullWidth, children }) => {
  return (
    <Root className={className} fullWidth={fullWidth}>
      {children}
    </Root>
  );
};
