import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Card } from '@material-ui/core';

interface IProps {
  name: string;
  top: number;
  left: number;
}

type Ref = HTMLDivElement;

const height = 100;
const width = 200;

const StyledDiv = styled.div<{ top: number; left: number }>`
  position: absolute;
  border: 1px solid red;

  height: ${height}px;
  width: ${width}px;

  align-content: 'center';
  align-items: 'center';

  // Positioning
  left: ${props => props.left}px;
  top: ${props => props.top - height - 5}px;
`;

const StyledHeader = styled.h1`
  color: blue;
  text-align: center;
`;

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  const { top, left } = props;

  return (
    <StyledDiv top={top} left={left} ref={ref}>
      <StyledHeader>Cool data about node - {props.name}</StyledHeader>
    </StyledDiv>
  );
});
