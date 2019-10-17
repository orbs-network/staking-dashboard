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
import { usePosStore } from '../../store/storeHooks';

// tslint:disable-next-line:no-empty-interface
interface IProps {}

export const BlockchainGraphSection = observer((props: IProps) => {
  // tslint:disable-next-line:react-hooks-nesting
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
