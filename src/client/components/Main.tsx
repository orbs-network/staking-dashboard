/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import { GlobeFc } from './globe/Globe';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core';
import { theme } from './base/Theme';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${theme.lightTextColor};

    @media (min-width: 1920px) {
      font-size: 20px;
    }

    @media (max-width: 1920px) {
      font-size: 18px;
    }

    @media (max-width: 1600px) {
      font-size: 16px;
    }

    @media (max-width: 1366px) {
      font-size: 14px;
    }

    @media (max-width: 1200px) {
      font-size: 12px;
    }

    @media (max-width: 1024px) {
      font-size: 10px;
    }

    @media (max-width: 768px) {
      font-size: 8px;
    }
  }
`;

const Root = styled.main`
  max-width: 1920px;
  margin: 0 auto;
`;

const Container = styled.div`
  margin: 0 1em;
  display: flex;
`;

const Left = styled.div`
  width: 16em;
  position: relative;
`;

const Center = styled.div`
  flex-grow: 1;
`;

const Right = styled.div`
  width: 20em;
`;

interface IProps {
  disableCanvas: boolean;
}
export const Main: React.FunctionComponent<IProps> = ({ disableCanvas }) => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Root>
          <GlobalStyle />
          <Container>
            <Left>
              <LeftPanel />
            </Left>
            <Center>{!disableCanvas && <GlobeFc />}</Center>
            <Right>
              <RightPanel />
            </Right>
          </Container>
        </Root>
      </ThemeProvider>
    </StylesProvider>
  );
};
