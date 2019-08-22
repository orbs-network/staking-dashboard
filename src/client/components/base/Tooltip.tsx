import React, { memo } from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import { ChildrenArg, TooltipArg } from 'react-popper-tooltip/dist/types';
import styled from 'styled-components';
import { theme } from './Theme';

export interface IBasicTooltipTriggerProps {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  hideArrow?: boolean;
  [key: string]: any;
}

const Container = styled.div`
  background-color: ${theme.tooltipBackgroundColor};
  border-radius: ${theme.sizes.SIZE_SMALL_1};
  border: 1px solid ${theme.tooltipBorderColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  margin: 0.4rem;
  padding: 0.4rem;
  transition: opacity 0.3s;
  z-index: 2147483647;
  opacity: 0.75;
  filter: drop-shadow(0 0 3px ${theme.tooltipBorderColor});
`;

const Arrow = styled.div`
  height: 1rem;
  position: absolute;
  width: 1rem;

  &:before {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }

  &:after {
    border-style: solid;
    content: '';
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }

  &[data-placement*='right'] {
    height: 1rem;
    left: 0;
    margin-left: -0.7rem;
    width: 1rem;
    &:before {
      border-color: transparent ${theme.tooltipBorderColor} transparent transparent;
      border-width: 0.5rem 0.4rem 0.5rem 0;
    }

    &:after {
      border-color: transparent ${theme.tooltipBackgroundColor} transparent transparent;
      border-width: 0.5rem 0.4rem 0.5rem 0;
      left: 6px;
      top: 0;
    }
  }

  &[data-placement*='left'] {
    height: 1rem;
    margin-right: -0.7rem;
    right: 0;
    width: 1rem;

    &:before {
      border-color: transparent transparent transparent ${theme.tooltipBorderColor};
      border-width: 0.5rem 0 0.5rem 0.4em;
    }

    &:after {
      border-color: transparent transparent transparent ${theme.tooltipBackgroundColor};
      border-width: 0.5rem 0 0.5rem 0.4em;
      left: 3px;
      top: 0;
    }
  }

  &[data-placement*='top'] {
    bottom: 0;
    height: 1rem;
    left: 0;
    margin-bottom: -1rem;
    width: 1rem;

    &:before {
      border-color: ${theme.tooltipBorderColor} transparent transparent transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
      position: absolute;
      top: 1px;
    }

    &:after {
      border-color: ${theme.tooltipBackgroundColor} transparent transparent transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
    }
  }

  &[data-placement*='bottom'] {
    height: 1rem;
    left: 0;
    margin-top: -0.4rem;
    top: 0;
    width: 1rem;

    &:before {
      border-color: transparent transparent ${theme.tooltipBorderColor} transparent;
      border-width: 0 0.5rem 0.4rem 0.5rem;
      position: absolute;
      top: -1px;
    }

    &:after {
      border-color: transparent transparent ${theme.tooltipBackgroundColor} transparent;
      border-width: 0 0.5rem 0.4rem 0.5rem;
    }
  }
`;

const Trigger = (children: React.ReactNode) => ({ triggerRef, getTriggerProps }: ChildrenArg) => (
  <span
    {...getTriggerProps({
      ref: triggerRef,
    })}
  >
    {children}
  </span>
);

const TooltipContainer = (tooltip: React.ReactNode) => ({
  arrowRef,
  tooltipRef,
  getArrowProps,
  getTooltipProps,
  placement,
}: TooltipArg) => {
  return (
    <Container
      {...getTooltipProps({
        ref: tooltipRef,
      })}
    >
      <Arrow
        {...getArrowProps({
          'data-placement': placement,
          ref: arrowRef,
        })}
      />
      <div style={{ maxWidth: 300 }}>{tooltip}</div>
    </Container>
  );
};

export const Tooltip = memo(({ tooltip, children, ...props }: IBasicTooltipTriggerProps) => (
  <TooltipTrigger {...props} tooltip={TooltipContainer(tooltip)}>
    {Trigger(children)}
  </TooltipTrigger>
));
