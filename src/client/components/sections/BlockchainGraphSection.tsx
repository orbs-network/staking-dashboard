/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { observer } from 'mobx-react';
import React from 'react';
import { usePosStore } from '../../store/storeHooks';
import { Blockchain } from '../blockchain/Blockchain';
import { Section } from './Section';

export const BlockchainGraphSection = observer(() => {
  const posStore = usePosStore();

  const title = (
    <>
      {'Total blocks created: '}
      <strong data-testid='total-blocks'>{posStore.blockHeight.toLocaleString()}</strong>
    </>
  );
  return (
    <Section
      title={title}
      helpPlacement='bottom'
      helpText='Total blocks created, for more information please visit Orbs Block Explorer'
    >
      <Blockchain blockHeight={posStore.blockHeight} />
    </Section>
  );
});
