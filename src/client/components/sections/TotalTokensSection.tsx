/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { inject } from 'mobx-react';
import * as React from 'react';
import { TokenStore } from '../../store/TokenStore';
import { Typography } from '../base/Typography';
import { Section } from './Section';

interface IProps {
  tokenStore?: TokenStore;
}

export const TotalTokensSection = inject('tokenStore')(({ tokenStore }: IProps) => {
  return (
    <Section title='Total token holders' helpText='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'>
      <Typography variant='xx-large'>{tokenStore.totalHolders.toLocaleString()}</Typography>
    </Section>
  );
});
