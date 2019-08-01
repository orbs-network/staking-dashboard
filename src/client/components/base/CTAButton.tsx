/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const Root = styled(Button)`
  text-transform: uppercase;
  border-width: 3px;
  padding: 14px 15px;
`;

export const CTAButton: React.FunctionComponent = ({ children }) => {
  return <Root>{children}</Root>;
};
