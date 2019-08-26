/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import { POSStore } from '../../store/POSStore';
import { Blockchain } from '../blockchain/Blockchain';
import { inject, observer } from 'mobx-react';
import { Section } from './Section';

interface IProps {
  posStore?: POSStore;
}

export const BlockchainGraphSection = inject('posStore')(
  observer(({ posStore }: IProps) => {
    const title = (
      <>
        {'Total blocks created: '}
        <strong data-testid='total-blocks'>{posStore.blockHeight.toLocaleString()}</strong>
      </>
    );
    return (
      <Section title={title}>
        <Blockchain blockHeight={posStore.blockHeight} />
      </Section>
    );
  }),
);
