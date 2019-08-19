import React from 'react';
import styled from 'styled-components';
import { Arrow } from './Arrow';
import { TooltipContainer } from './TooltipContainer';
import { TPlacement } from './TPlacement';
import { theme } from '../Theme';

const Wrapper = styled.span<{ borderColor: string }>`
  position: relative;
  opacity: 0.75;
  filter: drop-shadow(0 0 3px ${props => props.borderColor});
`;

export const Bubble = styled.div<{ backgroundColor: string; borderColor: string }>`
  display: table;
  background: black;
  max-width: 300px;
  border: 1px solid ${props => props.borderColor};
  border-radius: 12px;
  padding: 12px;
  background-color: ${props => props.backgroundColor};
`;

interface IProps {
  content: any;
  arrowSize?: number;
  offset?: number;
  placement?: TPlacement;
  backgroundColor?: string;
  borderColor?: string;
}

interface IState {
  open: boolean;
}
export class Tooltip extends React.Component<IProps, IState> {
  public static displayName: 'Tooltip';
  public static defaultProps: Omit<IProps, 'content'> = {
    arrowSize: 12,
    offset: 0,
    placement: 'right',
    backgroundColor: theme.tooltipBackgroundColor,
    borderColor: theme.tooltipBorderColor,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  public render() {
    const { open } = this.state;
    const { arrowSize, children, content, offset, placement, backgroundColor, borderColor } = this.props;

    return (
      <Wrapper
        borderColor={borderColor}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchEnd={this.handleTouch}
      >
        {children}
        <TooltipContainer open={true} placement={placement} offset={offset + arrowSize}>
          <Bubble backgroundColor={backgroundColor} borderColor={borderColor}>
            <Arrow
              arrowSize={arrowSize}
              placement={placement}
              borderColor={borderColor}
              backgroundColor={backgroundColor}
            />
            {content}
          </Bubble>
        </TooltipContainer>
      </Wrapper>
    );
  }

  private handleMouseEnter = () => {
    this.setState({ open: true });
  };

  private handleMouseLeave = () => {
    this.setState({ open: false });
  };

  private handleTouch = () => {
    const isOpen = this.state.open;
    this.setState({ open: !isOpen });
  };
}
