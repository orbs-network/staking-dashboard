import React, { useMemo } from 'react';
import { Avatar, Button, CardHeader, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Link, Room } from '@material-ui/icons';
import { TypographyProps } from '@material-ui/core/Typography/Typography';

// TODO : O.L : FUTURE: Change these props to match a complex data type
//  once deciding how to design the POIs
interface IProps {
  name: string;
  role: string;
  imageUrl: string;
  location: string;
}

const StyledCardHeader = styled(CardHeader)(props => ({
  color: props.theme.textColor,

  '.MuiCardHeader-action': {
    // Prevents 'lifting' of button
    marginTop: 0,
    marginRight: 0,
  },
}));

const StyledAvatar = styled(Avatar)(props => ({
  borderWidth: 2,
  borderColor: props.theme.textColor,
  borderStyle: 'solid',
}));

const SubHeaderTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

const StyledButton = styled(Button)(props => ({
  color: props.theme.mainColor,
  borderColor: props.theme.mainColor,

  // Gives the icon an angle
  '.MuiButton-startIcon': {
    transform: 'rotate(-45deg)',
  },
}));

const subheaderTypographyProps: Partial<TypographyProps> = { color: 'inherit' };

export const PoiCardHeader: React.FC<IProps> = props => {
  const { name, role, imageUrl, location } = props;

  // Alt avatar (just first letter)
  const avatarAlt = useMemo(() => name.charAt(0).toUpperCase(), [name]);

  // The avatar
  const poiAvatar = useMemo(() => <StyledAvatar alt={'A'} src={imageUrl} />, [imageUrl, avatarAlt]);

  // Role action button
  const buttonAction = useMemo(
    () => (
      <StyledButton variant='outlined' size='small' autoCapitalize={'false'} startIcon={<Link />}>
        {role}
      </StyledButton>
    ),
    [role],
  );

  // Title and sub-header
  const title = useMemo(() => <Typography variant={'h6'}>{name}</Typography>, [name]);
  const subHeader = useMemo(
    () => (
      <SubHeaderTypography variant={'caption'}>
        <Room />
        {location}
      </SubHeaderTypography>
    ),
    [location],
  );

  return (
    <StyledCardHeader
      avatar={poiAvatar}
      title={title}
      subheader={subHeader}
      action={buttonAction}
      subheaderTypographyProps={subheaderTypographyProps}
    />
  );
};
