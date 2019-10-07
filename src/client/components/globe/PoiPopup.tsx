import React, { forwardRef, useMemo } from 'react';
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

const mainColor = 'rgb(96, 125, 131)';
const textColor = 'rgb(156, 156, 156)';

const PopUpCard = styled(Card)<{ top: number; left: number }>(props => ({
  width: '400px',
  position: 'absolute',
  left: props.left,
  top: props.top, // TODO : ORL : Find out how to raise the card by its own height
  backgroundColor: 'rgba(20, 20, 20, 0.6)',
}));

const StyledCardHeader = styled(CardHeader)({
  color: textColor,
});

const StyledDivider = styled(Divider)({
  height: 2,
  backgroundColor: 'gray',
  borderRadius: 2,
  marginTop: 5,
  marginBottom: 5,
});

const StyledButton = styled(Button)({
  color: mainColor,
  borderColor: mainColor,
  '.MuiButton-startIcon': {
    transform: 'rotate(-45deg)',
  },
});

const StyledCardContent = styled(CardContent)({
  color: textColor,
});

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  const { top, left } = props;

  const poiAvatar = useMemo(
    () => <Avatar alt={'A'} src={'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg'} />,
    [],
  );

  const buttonAction = useMemo(
    () => (
      <StyledButton variant='outlined' size='small' autoCapitalize={'false'} startIcon={<Link />}>
        Guardian
      </StyledButton>
    ),
    [],
  );

  return (
    <PopUpCard top={top} left={left} ref={ref}>
      <StyledCardHeader
        avatar={poiAvatar}
        title={'Andrey Tarantinov'}
        subheader={'South Korea'}
        action={buttonAction}
        subheaderTypographyProps={{ color: 'inherit' }}
      />
      <StyledCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        <StyledDivider />
        Rank #9 Total stake: 23,000 Orbs Active since: 2018
      </StyledCardContent>
      {/*<StyledHeader>Cool data about node - {props.name}</StyledHeader>*/}
    </PopUpCard>
  );
});
