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
  display: flex;
  height: 210px;
  justify-content: center;
  align-items: center;
  padding-top: ${theme.sizes.SIZE_SMALL_2};
  padding-bottom: ${theme.sizes.SIZE_LARGE_4};
`;

const DigitBox = styled.span`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  align-items: center;
`;

const SeperatorBox = styled(DigitBox)`
  padding-left: ${theme.sizes.SIZE_SMALL_3};
  padding-right: ${theme.sizes.SIZE_SMALL_3};
`;

export const ClockSection: React.FunctionComponent = () => {
  return (
    <Root>
      <DigitBox>
        <Typography variant='x-large'>15</Typography>
        <Typography variant='xxx-small' dark>
          Hours
        </Typography>
      </DigitBox>
      <SeperatorBox>
        <Typography variant='x-large'>:</Typography>
        <Typography variant='xxx-small' dark>
          &nbsp;
        </Typography>
      </SeperatorBox>
      <DigitBox>
        <Typography variant='x-large'>45</Typography>
        <Typography variant='xxx-small' dark>
          Minutes
        </Typography>
      </DigitBox>
      <SeperatorBox>
        <Typography variant='x-large'>:</Typography>
        <Typography variant='xxx-small' dark>
          &nbsp;
        </Typography>
      </SeperatorBox>
      <DigitBox>
        <Typography variant='x-large'>15</Typography>
        <Typography variant='xxx-small' dark>
          Seconds
        </Typography>
      </DigitBox>
    </Root>
  );
};
