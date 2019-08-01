/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Section } from './Section';

const Graph = styled.div`
  height: 187px;
`;

export const BlockchainGraphSection: React.FunctionComponent = () => {
  return (
    <Section title='Total blocks created' helpText='this is a help text'>
      <Graph />
    </Section>
  );
};
