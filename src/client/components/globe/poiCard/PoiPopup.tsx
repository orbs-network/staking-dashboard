import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { POI_CARD_WIDTH_IN_PX, PoiCard } from './PoiCard';
import { theme } from '../../base/Theme';
import Color from 'color';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

const POP_UP_TOP_MARGIN = 20;
const POP_UP_OUTER_ARROW_WIDTH = POP_UP_TOP_MARGIN;
const POP_UP_INNER_ARROW_WIDTH = POP_UP_OUTER_ARROW_WIDTH - 3;

const StyledPopUpDiv = styled('div')({
  // These properties ensures that we display the pop up in just a bit below (marginTop)
  // the it's container's center
  position: 'absolute',
  left: '50%',
  marginLeft: -(POI_CARD_WIDTH_IN_PX / 2),
  top: '50%',
  marginTop: 20,

  // We keep the popup background clear to allow the card's style to take effect
  backgroundColor: 'rgba(0, 0, 0, 0)',

  // Creates a nice 'pop up shadow' effect
  borderRadius: theme.sizes.SIZE_SMALL_1,
  border: `1px solid ${theme.poiPopUpBorderColor}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.18)',
  filter: `drop-shadow(0 0 3px ${theme.poiPopUpBorderColor})`,

  // *****************************************
  // This part handles the 'tooltip arrow'
  // DEV_NOTE : Taken from http://www.cssarrowplease.com/
  // *****************************************

  // Rules for both outer and inner triangles
  '&::after, &::before': {
    // Pushes both triangles to the top and sets them at the horizontal center (before margin fixing)
    position: 'absolute',
    bottom: '100%',
    left: '50%',

    // The pseudo elements needs to have some content (a single space in this case) in order to be displayed
    content: '" "',

    // We want 'border only' elements
    height: 0,
    width: 0,
  },

  // The inner triangle
  '&::after': {
    // borderRadius: 1,

    // Handle visibility and color (transparent besides the bottom)
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',

    // Should match the popup border **background** color
    borderBottomColor: Color(theme.poiCardBackgroundColor)
      .alpha(theme.poiCardBackgroundAlpha)
      .rgb()
      .toString(),

    // Size and margin fix to ensure proper centering.
    borderWidth: POP_UP_INNER_ARROW_WIDTH,
    marginLeft: -POP_UP_INNER_ARROW_WIDTH,
  },

  // The outer triangle
  '&::before': {
    // Handle visibility and color (transparent besides the bottom)
    border: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',

    // Should match the popup border **border** color
    borderBottomColor: theme.poiPopUpBorderColor,

    // Size and margin fix to ensure proper centering.
    borderWidth: POP_UP_OUTER_ARROW_WIDTH,
    marginLeft: -POP_UP_OUTER_ARROW_WIDTH,
  },
});

export const PoiPopup = React.memo(
  forwardRef<Ref, IProps>((props, ref) => {
    const { location } = props;

    return (
      <StyledPopUpDiv ref={ref}>
        <PoiCard location={location} />
      </StyledPopUpDiv>
    );
  }),
);
