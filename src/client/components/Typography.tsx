/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';

const Base = styled.p`
  color: #ededed;
  display: inline-block;
  margin: 0;
`;

const Tiny = styled(Base)`
  font-size: 8px;
  letter-spacing: 1px;
`;

const Small = styled(Base)`
  font-size: 12px;
  letter-spacing: 1.4px;
`;

const Medium = styled(Base)`
  font-size: 22px;
  letter-spacing: 2.5px;
`;

const Large = styled(Base)`
  font-size: 32px;
  letter-spacing: 3.7px;
  font-weight: lighter;
`;

const Huge = styled(Base)`
  font-size: 48px;
  letter-spacing: 5px;
`;

export interface IProps {
  className?: string;
  variant?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
}

export const Typography: React.FunctionComponent<IProps> = ({ variant = 'medium', className, children }) => {
  switch (variant) {
    case 'tiny':
      return <Tiny className={className}>{children}</Tiny>;

    case 'small':
      return <Small className={className}>{children}</Small>;

    case 'medium':
      return <Medium className={className}>{children}</Medium>;

    case 'large':
      return <Large className={className}>{children}</Large>;

    case 'huge':
      return <Huge className={className}>{children}</Huge>;

    default:
      break;
  }
};
