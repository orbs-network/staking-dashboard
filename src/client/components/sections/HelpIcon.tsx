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
  width: 13px;
  height: 13px;
  border-radius: 10px;
  border-width: 0.5px;
  border-style: solid;
  justify-content: center;
  border-color: white;
  display: flex;
`;

const QuestionMark = styled(Typography)`
  padding-top: 1px;
  padding-left: 2px;
  font-size: 8px;
`;

const TooltipContent = styled.div`
  display: none;
`;

export interface IProps {
  helpText: string;
}
export const HelpIcon: React.FunctionComponent<IProps> = ({ helpText }) => {
  return (
    <Root>
      <QuestionMark variant='small'>?</QuestionMark>
      <TooltipContent>{helpText}</TooltipContent>
    </Root>
  );
};
