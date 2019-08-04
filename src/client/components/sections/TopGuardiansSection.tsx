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
import styled from 'styled-components';
import { inject } from 'mobx-react';
import { POSStore } from '../../store/POSStore';

const ListContainer = styled.ul`
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  padding-bottom: 10px;
`;

interface IProps {
  posStore?: POSStore;
}

export const TopGuardiansSection = inject('posStore')(({ posStore }: IProps) => {
  return (
    <Section title={`Top ${posStore.topGuardians.length} guardians`} helpText='this is a help text'>
      <ListContainer>
        {posStore.topGuardians.map(g => <ListItem>
          <Typography variant='small' dark>{g}</Typography>
        </ListItem>)}
      </ListContainer>
    </Section>
  );
});
