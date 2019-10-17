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

// tslint:disable-next-line:no-empty-interface
interface IProps {}

export const TotalTokensSection = observer((props: IProps) => {
  const tokenStore = useTokenStore();

  return (
    <Section title='Total token holders' helpText='Estimated number of Orbs token holders excluding exchanges'>
      <Typography variant='xx-large' dataTestId='total-token-holders'>
        {tokenStore.totalHolders.toLocaleString()}
      </Typography>
    </Section>
  );
});
