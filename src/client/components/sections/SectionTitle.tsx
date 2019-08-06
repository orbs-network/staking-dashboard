/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { HelpIcon } from './HelpIcon';
import { Typography } from '../base/Typography';
import styled from 'styled-components';
import { theme } from '../base/Theme';

const Root = styled.div`
  padding-top: ${theme.sizes.SIZE_SMALL_5};
  display: flex;
`;

const Title = styled(Typography)`
  text-transform: uppercase;
  padding-right: ${theme.sizes.SIZE_SMALL_6};
  align-self: flex-end;
`;

export interface IProps {
  title: React.ReactNode;
  helpText?: string;
}

export const SectionTitle: React.FunctionComponent<IProps> = ({ title, helpText }) => {
  return (
    <Root>
      <Title variant='small'>{title}</Title>
      {helpText && <HelpIcon helpText={helpText} />}
    </Root>
  );
};
