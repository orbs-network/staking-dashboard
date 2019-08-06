/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { Typography } from '../base/Typography';
import { Section } from './Section';
import { inject } from 'mobx-react';
import { TokenStore } from '../../store/TokenStore';

interface IProps {
  tokenStore?: TokenStore;
}

export const OrbsInCirculationSection = inject('tokenStore')(({ tokenStore }: IProps) => {
  return (
    <Section title='Orbs In Circulation' helpText='this is a help text'>
      <Typography variant='xx-large'>{tokenStore.orbsInCirculation.toLocaleString()}</Typography>
    </Section>
  );
});
