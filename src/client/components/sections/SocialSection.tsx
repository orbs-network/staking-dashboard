/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '../base/Typography';

const Root = styled.div`
  padding-top: 22px;
`;

const Title = styled(Typography)`
  padding-left: 10px;
  text-transform: uppercase;
`;

const TitleContainer = styled.div``;

const TextContainer = styled(Typography)`
  padding-top: 14px;
  padding-bottom: 14px;
  line-height: 26px;
`;

export interface IProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

export const SocialSection: React.FunctionComponent<IProps> = ({ icon, title, text }) => {
  return (
    <Root>
      <TitleContainer>
        {icon}
        <Title dark variant='small'>
          {title}
        </Title>
      </TitleContainer>
      <TextContainer>{text}</TextContainer>
    </Root>
  );
};
