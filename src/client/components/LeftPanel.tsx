/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { Section } from './Section';
import styled from 'styled-components';
import { Typography } from './Typography';

const Root = styled.div`
  margin-top: 40px;
`;

export const LeftPanel: React.FunctionComponent = () => {
  return (
    <Root>
      <Section title='Total token holders' helpText='this is a help text'>
        <Typography variant='large'>6,000</Typography>
      </Section>
      <Section title='Rewards distrebuted' helpText='this is a help text'>
        <Typography variant='large'>$68,788</Typography>
      </Section>
      <Section title='Top 3 guardians' />
    </Root>
  );
};
