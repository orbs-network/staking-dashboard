import React, { forwardRef, MouseEvent } from 'react';
import styled from 'styled-components';
import Color from 'color';

import { PoiCardFooter } from './PoiCardFooter';
import { PoiCardHeader } from './PoiCardHeader';
import { theme } from '../../base/Theme';
import { PoiCardFooterSelf } from './PoiCardFooterSelf';
import { PoiCardHeaderSelf } from './PoiCardHeaderSelf';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

export const POI_CARD_WIDTH_IN_PX = 400;

const PopUpCard = styled('div')({
  width: POI_CARD_WIDTH_IN_PX,
  backgroundColor: Color(theme.poiCardBackgroundColor)
    .alpha(theme.poiCardBackgroundAlpha)
    .rgb()
    .toString(),
});

const StyledDivider = styled('div')({
  height: 2,
  borderRadius: 2,
  backgroundColor: 'gray',
  marginTop: 10,
  marginBottom: 10,
});

const StyledCardContent = styled('div')(props => ({
  color: props.theme.textColor,
  padding: 16,
  paddingTop: 0,
}));

export const PoiCardSelf = React.memo(
  forwardRef<Ref, IProps>((props, ref) => {
    const { location } = props;

    // TODO : FUTURE : O.L : Decide on a data structure for the POI's and take this information as a prop
    const name = 'Andrey Tarantinov';
    const profileImageUrl = 'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg';
    const role = 'Guardian';

    return (
      // Containing click events inside the card
      <PopUpCard ref={ref} onClick={stopEventPropagation}>
        <PoiCardHeaderSelf name={name} imageUrl={profileImageUrl} location={location} role={role} />
        <StyledCardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          <StyledDivider />
          <PoiCardFooterSelf rank={9} totalStake={28000} activeSince={2018} />
        </StyledCardContent>
      </PopUpCard>
    );
  }),
);

const stopEventPropagation = (e: MouseEvent) => e.stopPropagation();
