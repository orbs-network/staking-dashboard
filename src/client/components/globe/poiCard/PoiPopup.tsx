import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Card } from '@material-ui/core';
import { POI_CARD_WIDTH_IN_PX, PoiCard } from './PoiCard';
import { theme } from '../../base/Theme';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

const StyledPopUpDiv = styled(Card)({
  // These properties ensures that we display the pop up in just a bit below (marginTop)
  // the it's container's center
  position: 'absolute',
  left: '50%',
  marginLeft: -(POI_CARD_WIDTH_IN_PX / 2),
  top: '50%',
  marginTop: 20,

  // We keep the popup background clear to allow the card's style to take effect
  backgroundColor: 'rgba(0, 0, 0, 0)',

  borderRadius: theme.sizes.SIZE_SMALL_1,
  border: `1px solid ${theme.tooltipBorderColor}`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.18)',
  filter: `drop-shadow(0 0 3px ${theme.tooltipBorderColor})`,
  // display: flex,
  // flex-direction: column,
  // margin: 0.4rem,
  // padding: '0.1rem',
  // transition: 'opacity 0.3s',
  // z-index: 2147483647,
  // opacity: 0.75,

  // TODO : O.L : Decide if we want the border
  // borderWidth: 1,
  // borderStyle: 'solid',
  // borderColor: props.theme.textColor,
  // borderRadius: 10,
  // borderTopLeftRadius: 5,
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
