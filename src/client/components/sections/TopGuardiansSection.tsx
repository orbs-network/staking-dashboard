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

const ListContainer = styled.ul`
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  padding-bottom: 10px;
`;

export const TopGuardiansSection: React.FunctionComponent = () => {
  return (
    <Section title='Top 3 guardians' helpText='this is a help text'>
      <ListContainer>
        <ListItem>
          <Typography variant='small' dark>MR.SHOWOFFTOKEN</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='small' dark>SLOWMOSHE</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='small' dark>DONTTELLMYMAMA</Typography>
        </ListItem>
      </ListContainer>
    </Section>
  );
};
