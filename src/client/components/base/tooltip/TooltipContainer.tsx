import * as React from 'react';
import styled from 'styled-components';
import { TPlacement } from './TPlacement';

const Base = styled.div<ICSSProps>`
  position: absolute;
  display: table;
  z-index: 999;
`;

const Top = styled(Base)`
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: ${props => props.offset}px;
`;

const Bottom = styled(Base)`
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: ${props => props.offset}px;
`;

const Left = styled(Base)`
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: ${props => props.offset}px;
`;

const RightStart = styled(Base)`
  top: -16px;
  left: 100%;
  margin-left: ${props => props.offset}px;
`;

const Right = styled(Base)`
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: ${props => props.offset}px;
`;

const RightEnd = styled(Base)`
  bottom: -16px;
  left: 100%;
  margin-left: ${props => props.offset}px;
`;

interface ICSSProps {
  offset: number;
}

interface IProps extends ICSSProps {
  children: any;
  open: boolean;
  placement: TPlacement;
}

export const TooltipContainer: React.FunctionComponent<IProps> = ({ children, open, placement, offset }) => {
  if (!open) {
    return null;
  }

  switch (placement) {
    case 'right-start':
      return <RightStart offset={offset}>{children}</RightStart>;
    case 'right':
      return <Right offset={offset}>{children}</Right>;
    case 'right-end':
      return <RightEnd offset={offset}>{children}</RightEnd>;
    case 'left':
      return <Left offset={offset}>{children}</Left>;
  }
};
