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

export interface IProps {
  className?: string;
  tokenStore?: TokenStore;
}

export const TokenPriceSection = inject('tokenStore')(({ tokenStore, className }: IProps) => {
  return (
    <Section title='Token Price' className={className}>
      <Typography variant='xx-large'>${tokenStore.tokenPrice}</Typography>
    </Section>
  );
});
