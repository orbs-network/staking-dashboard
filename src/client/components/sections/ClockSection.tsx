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
  display: flex;
  height: 210px;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 40px;
`;

const DigitBox = styled.span`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  align-items: center;
`;

const SeperatorBox = styled(DigitBox)`
  padding-left: 8px;
  padding-right: 8px;
`;

export const ClockSection: React.FunctionComponent = () => {
  return (
    <Root>
      <DigitBox>
        <Typography variant='large'>15</Typography>
        <Typography variant='tiny' dark>
          Hours
        </Typography>
      </DigitBox>
      <SeperatorBox>
        <Typography variant='large'>:</Typography>
        <Typography variant='tiny' dark>
          &nbsp;
        </Typography>
      </SeperatorBox>
      <DigitBox>
        <Typography variant='large'>45</Typography>
        <Typography variant='tiny' dark>
          Minutes
        </Typography>
      </DigitBox>
      <SeperatorBox>
        <Typography variant='large'>:</Typography>
        <Typography variant='tiny' dark>
          &nbsp;
        </Typography>
      </SeperatorBox>
      <DigitBox>
        <Typography variant='large'>15</Typography>
        <Typography variant='tiny' dark>
          Seconds
        </Typography>
      </DigitBox>
    </Root>
  );
};
