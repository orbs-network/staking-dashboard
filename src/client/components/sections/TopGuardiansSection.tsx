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
import styled from 'styled-components';
import { theme } from '../base/Theme';
import { observer } from 'mobx-react';
import { usePosStore } from '../../store/storeHooks';

const ListContainer = styled.ul`
  color: ${theme.darkTextColor};
  padding: 0;
  margin: 0;
  list-style: none;
`;
const ListItem = styled.li`
  padding-bottom: ${theme.sizes.SIZE_SMALL_2};
`;

// tslint:disable-next-line:no-empty-interface
interface IProps {}

export const TopGuardiansSection = observer((props: IProps) => {
  const posStore = usePosStore();

  return (
    <Section
      title={`Top ${posStore.topGuardians.length} guardians`}
      helpText='The top 3 Guardians with biggest amount of Orbs tokens delegated to them'
    >
      <ListContainer>
        {posStore.topGuardians.map((g, idx) => (
          <ListItem key={g}>
            <Typography variant='x-small' dataTestId={`guardian-${idx}`}>
              {g}
            </Typography>
          </ListItem>
        ))}
      </ListContainer>
    </Section>
  );
});
