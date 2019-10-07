import React, { forwardRef, useMemo } from 'react';
import styled from 'styled-components';

import { Avatar, Button, Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import { Link } from '@material-ui/icons';
import { PoiCardFooter } from './PoiCardFooter';
import { PoiCardHeader } from './PoiCardHeader';

interface IProps {
  name: string;
  top: number;
  left: number;
}

type Ref = HTMLDivElement;

const height = 100;
const width = 200;

const mainColor = 'rgb(96, 125, 131)';
const textColor = 'rgb(156, 156, 156)';

const PopUpCard = styled(Card)<{ top: number; left: number }>(props => ({
  width: '400px',
  position: 'absolute',
  left: props.left,
  top: props.top, // TODO : ORL : Find out how to raise the card by its own height
  backgroundColor: 'rgba(20, 20, 20, 0.6)',
}));

const StyledDivider = styled(Divider)({
  height: 2,
  backgroundColor: 'gray',
  borderRadius: 2,
  marginTop: 10,
  marginBottom: 10,
});

const StyledCardContent = styled(CardContent)({
  color: textColor,
  paddingTop: 0,
});

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  const { top, left } = props;

  return (
    <PopUpCard top={top} left={left} ref={ref}>
      <PoiCardHeader />
      <StyledCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        <StyledDivider />
        <PoiCardFooter rank={9} totalStake={28000} activeSince={2018} />
      </StyledCardContent>
    </PopUpCard>
  );
});
