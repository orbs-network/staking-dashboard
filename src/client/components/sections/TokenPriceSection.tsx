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
import { observer } from 'mobx-react';
import { useTokenStore } from '../../store/storeHooks';

export interface IProps {
  className?: string;
}

const formatPrice = price => Math.round(price * 10_000) / 10_000;

export const TokenPriceSection = observer(({ className }: IProps) => {
  const tokenStore = useTokenStore();

  return (
    <Section title='Token Price' className={className}>
      <Typography variant='xx-large' dataTestId='token-price'>
        ${formatPrice(tokenStore.tokenPrice)}
      </Typography>
    </Section>
  );
});
