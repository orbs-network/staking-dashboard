/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { Section } from './Section';
export const BlockchainGraphSection: React.FunctionComponent = () => {
  const title = <>{'Total blocks created: '}<strong>1,234,567</strong></>;
  return (
    <Section title={title}>
      <img src={'assets/chain.jpg'} />
    </Section>
  );
};
