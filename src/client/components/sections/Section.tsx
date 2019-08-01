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

const Root = styled.div`
  padding-top: 12px;
`;

const ChildrenContainer = styled.div`
  padding-top: 14px;
  padding-bottom: 14px;
`;

export interface IProps {
  className?: string;
  title?: string;
  helpText?: string;
}

export const Section: React.FunctionComponent<IProps> = ({ className, children, title, helpText }) => {
  return (
    <Root className={className}>
      {title ? <SectionTitle title={title} helpText={helpText} /> : null}
      <ChildrenContainer>{children}</ChildrenContainer>
    </Root>
  );
};
