import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Card, CardContent, Divider } from '@material-ui/core';
import { PoiCardFooter } from './PoiCardFooter';
import { PoiCardHeader } from './PoiCardHeader';

interface IProps {
  name: string;
  top: number;
  left: number;
}

type Ref = HTMLDivElement;

const PopUpCard = styled(Card)<{ top: number; left: number }>(props => ({
  width: '400px',
  position: 'absolute',
  left: props.left,
  top: props.top,
  backgroundColor: 'rgba(20, 20, 20, 0.6)',

  // TODO : O.L : Decide if we want the border
  // borderWidth: 1,
  // borderStyle: 'solid',
  // borderColor: props.theme.textColor,
  // borderRadius: 10,
  // borderTopLeftRadius: 5,
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

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  const { top, left } = props;

  // TODO : FUTURE : O.L : Decide on a data structure for the POI's and take this information as a prop
  const name = 'Andrey Tarantinov';
  const profileImageUrl = 'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg';
  const location = 'South Korea';
  const role = 'Guardian';

  return (
    <PopUpCard top={top} left={left} ref={ref}>
      <PoiCardHeader name={name} imageUrl={profileImageUrl} location={location} role={role} />
      <StyledCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        <StyledDivider />
        <PoiCardFooter rank={9} totalStake={28000} activeSince={2018} />
      </StyledCardContent>
    </PopUpCard>
  );
});
