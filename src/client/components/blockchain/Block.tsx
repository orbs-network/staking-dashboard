/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  border: 1px solid white;
  position: absolute;
`;

export class Block extends React.Component {
  public render() {
    return <Root />;
  }
}
