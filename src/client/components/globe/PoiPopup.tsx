import React, { forwardRef } from 'react';
import styled from 'styled-components';

import { Avatar, Button, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import { Link } from '@material-ui/icons';

interface IProps {
  name: string;
  top: number;
  left: number;
}

type Ref = HTMLDivElement;

const height = 100;
const width = 200;

const StyledDiv = styled.div<{ top: number; left: number }>`
  position: absolute;
  border: 1px solid red;

  height: ${height}px;
  width: ${width}px;

  align-content: 'center';
  align-items: 'center';

  // Positioning
  left: ${props => props.left}px;
  top: ${props => props.top - height - 5}px;
`;

const StyledHeader = styled.h1`
  color: blue;
  text-align: center;
`;

const PopUpCard = styled(Card)<{ top: number; left: number }>`
  position: absolute;
  // height: ${height}px;
  // width: ${width}px;
  width: 20%;

  // Positioning
  left: ${props => props.left}px;
  top: ${props => props.top}px; // TODO : ORL : Find out how to raise the card by its own height
`;

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  const { top, left } = props;

  return (
    <PopUpCard top={top} left={left} ref={ref}>
      <CardHeader
        avatar={<Avatar alt={'A'} src={'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg'} />}
        title={'Andrey Tarantinov'}
        subheader={'South Korea'}
        action={
          <Button variant='outlined' size='small' startIcon={<Link />}>
            Guardian
          </Button>
        }
      />
      <CardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        <Divider />
        Rank #9 Total stake: 23,000 Orbs Active since: 2018
      </CardContent>
      {/*<StyledHeader>Cool data about node - {props.name}</StyledHeader>*/}
    </PopUpCard>
  );
});
