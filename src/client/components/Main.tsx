/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { LeftPanel } from './LeftPanel';
import { Globe } from './globe/Globe';
import { RightPanel } from './RightPanel';
import styled, { createGlobalStyle } from 'styled-components';
import { theme } from './base/Theme';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.lightTextColor};
  }
`;

const Root = styled.div`
  color: ${theme.lightTextColor};
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  background-color: black;
  margin: 0 auto;
  background-size: 100%;
`;

const Inner = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  display: flex;
`;

const Left = styled.div`
  width: 210px;
  position: relative;
`;

const Center = styled.div`
  flex-grow: 1;
`;

const Right = styled.div`
  width: 350px;
`;

export const Main: React.FunctionComponent = () => (
  <Root>
    <GlobalStyle />
    <Container>
      <Inner>
        <Left>
          <LeftPanel />
        </Left>
        <Center>
          <Globe />
        </Center>
        <Right>
          <RightPanel />
        </Right>
      </Inner>
    </Container>
  </Root>
);
