import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Color from 'color';
import { PoiCardSelf } from './PoiCardSelf';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

const POP_UP_TOP_MARGIN_EM = 1;
const POP_UP_OUTER_ARROW_WIDTH_EM = POP_UP_TOP_MARGIN_EM;
const POP_UP_INNER_ARROW_WIDTH_EM = POP_UP_OUTER_ARROW_WIDTH_EM * 0.8;

const StyledPopUpDiv = styled('div')(({ theme }) => ({
  // These properties ensures that we display the pop up in just a bit below (marginTop)
  // the it's container's center
  position: 'absolute',
  left: '50%',
  // marginLeft: -(POI_CARD_WIDTH_IN_PX / 2),
  marginLeft: '-13em',
  top: '50%',
  marginTop: `${POP_UP_TOP_MARGIN_EM}em`,

  // We keep the popup background clear to allow the card's style to take effect
  backgroundColor: 'rgba(0, 0, 0, 0)',

  // Creates a nice 'pop up shadow' effect
  borderRadius: theme.sizes.SIZE_SMALL_1,
  border: `1px solid ${theme.poiPopUpBorderColor}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.18)',
  filter: `drop-shadow(0 0 3px ${theme.poiPopUpBorderColor})`,

  // *****************************************
  // This part handles the 'tooltip arrow'
  // DEV_NOTE : Inspiration taken from http://www.cssarrowplease.com/
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
    // Handle visibility and color (transparent besides the bottom)
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',

    // Should match the popup border **background** color (with the same alpha value)
    // DEV_NOTE : We reduce the alpha value in order to compensate about the fact that the
    //            inner triangle is sitting upon the outer one, which makes the final result more opaque.
    borderBottomColor: Color(theme.poiCardBackgroundColor)
      .alpha(theme.poiCardBackgroundAlpha * 0.8)
      .rgb()
      .toString(),

    // Size and margin fix to ensure proper centering.
    borderWidth: `${POP_UP_INNER_ARROW_WIDTH_EM}em`,
    marginLeft: `${calculatePopUpArrowLeftMargin(theme.cardTheme.paddingInEm, POP_UP_INNER_ARROW_WIDTH_EM)}em`,
  },

  // The outer triangle
  '&::before': {
    // Handle visibility and color (transparent besides the bottom)
    border: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',

    // Should match the popup border **border** color
    // DEV_NOTE: Reducing alpha value for same reason as for the inner triangle.
    borderBottomColor: Color(theme.poiPopUpBorderColor)
      .alpha(0.5)
      .rgb()
      .toString(),

    // Size and margin fix to ensure proper centering.
    borderWidth: `${POP_UP_OUTER_ARROW_WIDTH_EM}em`,
    marginLeft: `${calculatePopUpArrowLeftMargin(theme.cardTheme.paddingInEm, POP_UP_OUTER_ARROW_WIDTH_EM)}em`,
  },
}));

export const PoiPopup = React.memo(
  forwardRef<Ref, IProps>((props, ref) => {
    const { location } = props;

    return (
      <StyledPopUpDiv ref={ref}>
        <PoiCardSelf location={location} />
      </StyledPopUpDiv>
    );
  }),
);

/**
 * Calculating the appropriate margin left for the tooltip arrows.
 */
function calculatePopUpArrowLeftMargin(innerElementPadding: number, arrowWidth: number): number {
  const halfInnerElementPadding = innerElementPadding / 2;

  return -(halfInnerElementPadding + arrowWidth);
}
