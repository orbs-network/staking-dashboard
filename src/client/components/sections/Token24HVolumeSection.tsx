/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import { Typography } from '../base/Typography';
import { Section } from './Section';
import { inject } from 'mobx-react';
import { TokenStore } from '../../store/TokenStore';
import { formatLargeNumber } from '../../utils/LargeNumbersFormatter';

export interface IProps {
  className?: string;
  tokenStore?: TokenStore;
}

export const Token24HVolumeSection = inject('tokenStore')(({ tokenStore, className }: IProps) => {
  const bigPrice = tokenStore.token24HVolume;
  return (
    <Section title='24H Volume' className={className}>
      <Typography variant='xx-large' dataTestId='24h-volume'>${formatLargeNumber(bigPrice)}</Typography>
    </Section>
  );
});
