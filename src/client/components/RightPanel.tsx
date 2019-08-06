/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { BlockchainGraphSection } from './sections/BlockchainGraphSection';
import { GithubSection } from './sections/GithubSection';
import { HSeparator } from './sections/HSeparator';
import { NewsSection } from './sections/NewsSection';
import { OrbsInCirculationSection } from './sections/OrbsInCirculationSection';
import { Token24HVolumeSection } from './sections/Token24HVolumeSection';
import { TokenPriceSection } from './sections/TokenPriceSection';
import { TwitterSection } from './sections/TwitterSection';
import { VSeparator } from './sections/VSeparator';
import { theme } from './base/Theme';

const Root = styled.div``;

const TwoBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: ${theme.sizes.SIZE_SMALL_1};
  padding-bottom: ${theme.sizes.SIZE_SMALL_1};
`;

const TokenPriceContainer = styled(TokenPriceSection)`
  flex-grow: 1;
`;

const TokenVolumeContainer = styled(Token24HVolumeSection)`
  flex-grow: 1;
  padding-left: ${theme.sizes.SIZE_LARGE_1};
`;

export const RightPanel: React.FunctionComponent = () => {
  return (
    <Root>
      <BlockchainGraphSection />
      <HSeparator />
      <OrbsInCirculationSection />
      <HSeparator />
      <TwoBoxContainer>
        <TokenPriceContainer />
        <VSeparator />
        <TokenVolumeContainer />
      </TwoBoxContainer>
      <HSeparator />
      <TwitterSection />
      <HSeparator />
      <GithubSection />
      <HSeparator />
      <NewsSection />
      <HSeparator />
    </Root>
  );
};
