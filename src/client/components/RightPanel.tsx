/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { OrbsInCirculationSection } from './sections/OrbsInCirculationSection';
import { BlockchainGraphSection } from './sections/BlockchainGraphSection';
import { TokenPriceSection } from './sections/TokenPriceSection';
import { Token24HVolumeSection } from './sections/Token24HVolumeSection';
import { theme } from './base/Theme';
import { HSeparator } from './sections/HSeparator';
import { VSeparator } from './sections/VSeparator';
import { SocialSection } from './sections/SocialSection';
import { TwitterSection } from './sections/TwitterSection';
import { GithubSection } from './sections/GithubSection';
import { NewsSection } from './sections/NewsSection';

const Root = styled.div``;

const TwoBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-top: 14px;
  padding-bottom: 14px;
`;

const TokenPriceContainer = styled(TokenPriceSection)`
  flex-grow: 1;
`;

const TokenVolumeContainer = styled(Token24HVolumeSection)`
  flex-grow: 1;
  padding-left: 20px;
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
