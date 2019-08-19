/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { Tooltip } from '../base/Tooltip';
import { Typography } from '../base/Typography';
import * as PopperJS from 'popper.js';

const Icon = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 10px;
  border-width: 0.5px;
  border-style: solid;
  justify-content: center;
  border-color: white;
  display: flex;
`;

const QuestionMark = (
  <svg width='15' height='15' viewBox='0 0 15 15'>
    <g fill='none' fillRule='evenodd' transform='translate(1 1)'>
      <circle cx='6.5' cy='6.5' r='6.5' stroke='#FFF' strokeWidth='.5' />
      <path
        fill='#FFF'
        fillRule='nonzero'
        d='M6.776 7.968a1.432 1.432 0 0 1 .376-1c.107-.117.245-.25.416-.4.23-.203.399-.38.508-.532a.927.927 0 0 0 .164-.556.854.854 0 0 0-.344-.708c-.23-.179-.544-.268-.944-.268-.661 0-1.17.216-1.528.648L5 4.832C5.453 4.277 6.117 4 6.992 4c.56 0 1.007.125 1.34.376.333.25.5.59.5 1.016 0 .219-.036.412-.108.58-.072.168-.16.31-.264.428a5.452 5.452 0 0 1-.412.408c-.23.208-.4.393-.512.556a1.04 1.04 0 0 0-.168.604h-.592zm.296 1.72a.396.396 0 0 1-.296-.124.406.406 0 0 1-.12-.292.39.39 0 0 1 .12-.292.41.41 0 0 1 .296-.116.42.42 0 0 1 .304.116.39.39 0 0 1 .12.292.4.4 0 0 1-.124.292.409.409 0 0 1-.3.124z'
      />
    </g>
  </svg>
);

export interface IProps {
  helpText: string;
  helpPlacement?: PopperJS.Placement;
}

export const HelpIcon: React.FunctionComponent<IProps> = ({ helpText, helpPlacement }) => {
  return (
    <Tooltip tooltip={<Typography variant='small'>{helpText}</Typography>} placement={helpPlacement}>
      {QuestionMark}
    </Tooltip>
  );
};
