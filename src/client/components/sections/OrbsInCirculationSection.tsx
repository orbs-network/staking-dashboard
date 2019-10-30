/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { observer } from 'mobx-react';
import React from 'react';
import { useTokenStore } from '../../store/storeHooks';
import { Typography } from '../base/Typography';
import { Section } from './Section';

export const OrbsInCirculationSection = observer(() => {
  const tokenStore = useTokenStore();

  return (
    <Section title='Orbs In Circulation'>
      <Typography variant='xx-large' dataTestId='orbs-in-circulation'>
        {Math.round(tokenStore.orbsInCirculation).toLocaleString()}
      </Typography>
    </Section>
  );
});
