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

const Base = styled.p`
  color: ${props => props.dark ? theme.darkTextColor : theme.lightTextColor};
  font-weight: lighter;
  display: inline-block;
  margin: 0;
`;

const Tiny = styled(Base)`
  font-size: 6px;
  letter-spacing: 0.7px;
`;

const Small = styled(Base)`
  font-size: 10px;
  letter-spacing: 1.16px;
`;

const Medium = styled(Base)`
  font-size: 12px;
  letter-spacing: 1.39px;
`;

const Large = styled(Base)`
  font-size: 24px;
  letter-spacing: 2.38px;
`;

const Huge = styled(Base)`
  font-size: 32px;
  letter-spacing: 3.71px;
`;

export interface IProps {
  className?: string;
  dark?: boolean;
  variant?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
}

export const Typography: React.FunctionComponent<IProps> = ({
  variant = 'medium',
  dark = false,
  className,
  children,
}) => {
  switch (variant) {
    case 'tiny':
      return <Tiny className={className} dark={dark}>{children}</Tiny>;

    case 'small':
      return <Small className={className} dark={dark}>{children}</Small>;

    case 'medium':
      return <Medium className={className} dark={dark}>{children}</Medium>;

    case 'large':
      return <Large className={className} dark={dark}>{children}</Large>;

    case 'huge':
      return <Huge className={className} dark={dark}>{children}</Huge>;

    default:
      break;
  }
};
