/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { SectionTitle } from './SectionTitle';
import { theme } from '../base/Theme';
import * as PopperJS from 'popper.js';

const Root = styled.div`
  padding-top: ${theme.sizes.SIZE_SMALL_1};
`;

const ChildrenContainer = styled.div`
  padding-top: ${theme.sizes.SIZE_SMALL_1};
  padding-bottom: ${theme.sizes.SIZE_SMALL_1};
`;

export interface IProps {
  className?: string;
  title?: React.ReactNode;
  helpText?: string;
  helpPlacement?: PopperJS.Placement;
}

export const Section: React.FunctionComponent<IProps> = ({ className, children, title, helpText, helpPlacement }) => {
  return (
    <Root className={className}>
      {title ? <SectionTitle title={title} helpText={helpText} helpPlacement={helpPlacement} /> : null}
      <ChildrenContainer>{children}</ChildrenContainer>
    </Root>
  );
};
