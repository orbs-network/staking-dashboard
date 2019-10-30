/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '../base/Theme';
import { Clock } from '../clock/Clock';
import { observer } from 'mobx-react';
import { usePosStore } from '../../store/storeHooks';

const Root = styled.div`
  margin-top: ${theme.sizes.SIZE_SMALL_2};
  margin-bottom: ${theme.sizes.SIZE_LARGE_4};
`;

export const ClockSection = observer(() => {
  const posStore = usePosStore();

  return (
    <Root>
      <Clock targetTime={posStore.nextVotingTime} />
    </Root>
  );
});
