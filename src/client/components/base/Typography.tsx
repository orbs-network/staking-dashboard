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

const Base = styled.span`
  font-weight: lighter;
  display: inline-block;
  margin: 0;
`;

function fontSizeToLetterSpacing(fontSize: string): string {
  const emAsNumber = parseFloat(fontSize.replace(/[a-z]/gi, ''));
  const letterSpacing = emAsNumber * 0.116; // as a rule letter-spacing is alway 11.6% of the font-size.
  const roundedLetterSpacing = Math.round(letterSpacing * 1_000) / 1_000;
  return `${roundedLetterSpacing.toString()}em`;
}

// 6px
const XXXSmall = styled(Base)`
  font-size: ${theme.sizes.SIZE_SMALL_4};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_SMALL_4)};
`;

// 8px
const XXSmall = styled(Base)`
  font-size: ${theme.sizes.SIZE_SMALL_3};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_SMALL_3)};
`;

// 10px
const XSmall = styled(Base)`
  font-size: ${theme.sizes.SIZE_SMALL_2};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_SMALL_2)};
`;

// 12px
const Small = styled(Base)`
  font-size: ${theme.sizes.SIZE_SMALL_1};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_SMALL_1)};
`;

// 16px
const Medium = styled(Base)`
  font-size: ${theme.sizes.SIZE_BASIC};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_BASIC)};
`;

// 20px
const Large = styled(Base)`
  font-size: ${theme.sizes.SIZE_LARGE_1};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_LARGE_1)};
`;

// 25px
const XLarge = styled(Base)`
  font-size: ${theme.sizes.SIZE_LARGE_2};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_LARGE_2)};
`;

// 31px
const XXLarge = styled(Base)`
  font-size: ${theme.sizes.SIZE_LARGE_3};
  letter-spacing: ${fontSizeToLetterSpacing(theme.sizes.SIZE_LARGE_3)};
`;

export interface IProps {
  className?: string;
  variant?: 'xxx-small' | 'xx-small' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
}

export const Typography: React.FunctionComponent<IProps> = ({
  variant = 'medium',
  className,
  children,
}) => {
  switch (variant) {
    case 'xxx-small':
      return (
        <XXXSmall className={className}>
          {children}
        </XXXSmall>
      );

    case 'xx-small':
      return (
        <XXSmall className={className}>
          {children}
        </XXSmall>
      );

    case 'x-small':
      return (
        <XSmall className={className}>
          {children}
        </XSmall>
      );

    case 'small':
      return (
        <Small className={className}>
          {children}
        </Small>
      );

    case 'medium':
      return (
        <Medium className={className}>
          {children}
        </Medium>
      );

    case 'large':
      return (
        <Large className={className}>
          {children}
        </Large>
      );

    case 'x-large':
      return (
        <XLarge className={className}>
          {children}
        </XLarge>
      );

    case 'xx-large':
      return (
        <XXLarge className={className}>
          {children}
        </XXLarge>
      );

    default:
      break;
  }
};
