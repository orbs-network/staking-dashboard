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
import { theme } from '../base/Theme';

const Root = styled.div`
  padding-top: ${theme.sizes.SIZE_LARGE_2};
`;

const Title = styled(Typography)`
  padding-left: ${theme.sizes.SIZE_SMALL_2};
  text-transform: uppercase;
`;

const TitleContainer = styled.div`
  color: ${theme.darkTextColor};
`;

const TextContainer = styled(Typography)`
  padding-top: ${theme.sizes.SIZE_SMALL_1};
  padding-bottom: ${theme.sizes.SIZE_SMALL_1};
  line-height: ${theme.sizes.SIZE_LARGE_2};
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
        <Title variant='x-small'>{title}</Title>
      </TitleContainer>
      <TextContainer variant='small'>{text}</TextContainer>
    </Root>
  );
};
