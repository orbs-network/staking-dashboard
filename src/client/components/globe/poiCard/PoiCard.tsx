import React, { forwardRef, MouseEvent } from 'react';
import styled from 'styled-components';

import { Card, CardContent, Divider } from '@material-ui/core';
import { PoiCardFooter } from './PoiCardFooter';
import { PoiCardHeader } from './PoiCardHeader';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

export const POI_CARD_WIDTH_IN_PX = 400;

const PopUpCard = styled(Card)(props => ({
  width: POI_CARD_WIDTH_IN_PX,
  backgroundColor: 'rgba(20, 20, 20, 0.6)',
}));

const StyledDivider = styled(Divider)({
  height: 2,
  backgroundColor: 'gray',
  borderRadius: 2,
  marginTop: 10,
  marginBottom: 10,
});

const StyledCardContent = styled(CardContent)(props => ({
  color: props.theme.textColor,
  paddingTop: 0,
}));

export const PoiCard = React.memo(
  forwardRef<Ref, IProps>((props, ref) => {
    const { location } = props;

    // TODO : FUTURE : O.L : Decide on a data structure for the POI's and take this information as a prop
    const name = 'Andrey Tarantinov';
    const profileImageUrl = 'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg';
    const role = 'Guardian';

    return (
      // Containing click events inside the card
      <PopUpCard ref={ref} onClick={stopEventPropagation}>
        <PoiCardHeader name={name} imageUrl={profileImageUrl} location={location} role={role} />
        <StyledCardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          <StyledDivider />
          <PoiCardFooter rank={9} totalStake={28000} activeSince={2018} />
        </StyledCardContent>
      </PopUpCard>
    );
  }),
);

const stopEventPropagation = (e: MouseEvent) => e.stopPropagation();
