import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Card } from '@material-ui/core';
import { POI_CARD_WIDTH_IN_PX, PoiCard } from './PoiCard';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

const PopUpDiv = styled(Card)({
  // These properties ensures that we display the pop up in just a bit below (marginTop)
  // the it's container's center
  position: 'absolute',
  left: '50%',
  marginLeft: -(POI_CARD_WIDTH_IN_PX / 2),
  top: '50%',
  marginTop: 20,

  // We keep the popup background clear to allow the card's style to take effect
  backgroundColor: 'rgba(0, 0, 0, 0)',

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
      <PopUpDiv ref={ref}>
        <PoiCard location={location} />
      </PopUpDiv>
    );
  }),
);
