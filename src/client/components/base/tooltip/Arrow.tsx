import * as React from 'react';
import styled from 'styled-components';
import { TPlacement } from './TPlacement';

const Base = styled.div<ICSSProps>`
  position: absolute;
  width: ${props => props.arrowSize}px;
  height: ${props => props.arrowSize}px;
  background-color: ${props => props.backgroundColor};
`;

const Up = styled(Base)`
  transform: translateX(-50%) translateY(50%) rotateZ(45deg);
  bottom: 100%;
  left: 50%;
  border-left: 1px solid ${props => props.borderColor};
  border-top: 1px solid ${props => props.borderColor};
`;
const Down = styled(Base)`
  transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
  top: 100%;
  left: 50%;
  border-right: 1px solid ${props => props.borderColor};
  border-bottom: 1px solid ${props => props.borderColor};
`;

const RightStart = styled(Base)`
  transform: translateX(50%) translateY(-50%) rotateZ(45deg);
  right: 100%;
  top: 23px;
  border-left: 1px solid ${props => props.borderColor};
  border-bottom: 1px solid ${props => props.borderColor};
`;

const Right = styled(Base)`
  transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
  left: 0%;
  top: 50%;
  border-left: 1px solid ${props => props.borderColor};
  border-bottom: 1px solid ${props => props.borderColor};
`;

const RightEnd = styled(Base)`
  transform: translateX(50%) translateY(-50%) rotateZ(45deg);
  right: 100%;
  bottom: 10px;
  border-left: 1px solid ${props => props.borderColor};
  border-bottom: 1px solid ${props => props.borderColor};
`;

const Left = styled(Base)`
  transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
  right: 0%;
  top: 50%;
  border-left: 1px solid ${props => props.borderColor};
  border-bottom: 1px solid ${props => props.borderColor};
`;

interface ICSSProps {
  backgroundColor: string;
  borderColor: string;
  arrowSize: number;
}

interface IProps extends ICSSProps {
  placement: TPlacement;
}

export const Arrow: React.FunctionComponent<IProps> = ({
  arrowSize,
  borderColor,
  backgroundColor,
  placement,
  children,
}) => {
  if (arrowSize <= 0) {
    return null;
  }

  switch (placement) {
    case 'right-start':
      return (
        <RightStart arrowSize={arrowSize} borderColor={borderColor} backgroundColor={backgroundColor}>
          {children}
        </RightStart>
      );
    case 'right':
      return (
        <Right arrowSize={arrowSize} borderColor={borderColor} backgroundColor={backgroundColor}>
          {children}
        </Right>
      );
    case 'right-end':
      return (
        <RightEnd arrowSize={arrowSize} borderColor={borderColor} backgroundColor={backgroundColor}>
          {children}
        </RightEnd>
      );
      case 'left':
        return (
          <Left arrowSize={arrowSize} borderColor={borderColor} backgroundColor={backgroundColor}>
            {children}
          </Left>
        );
    }
};
