import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Link, Room } from '@material-ui/icons';
import { Typography } from '../../base/Typography';
import { Button } from '../../base/Button';
import { Avatar } from './Avatar';

// TODO : O.L : FUTURE: Change these props to match a complex data type
//  once deciding how to design the POIs
interface IProps {
  name: string;
  role: string;
  imageUrl: string;
  location: string;
}

const StyledCardHeader = styled('div')(props => ({
  color: props.theme.textColor,
  paddingBottom: 16,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const StyledTitlesArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledAvatar = styled(Avatar)(props => ({
  borderWidth: 2,
  borderColor: props.theme.textColor,
  borderStyle: 'solid',
}));

const HeaderTypography = styled(Typography)(props => ({
  fontWeight: 'bold',
  color: props.theme.textColor,
}));

const SubHeaderTypography = styled(Typography)(props => ({
  display: 'flex',
  alignItems: 'center',
  color: props.theme.textColor,
}));

const StyledButton = styled(Button)(props => ({
  color: props.theme.mainColor,
  borderColor: props.theme.mainColor,

  display: 'flex',
  alignItems: 'center',
}));

const StyledLinkIcon = styled(Link)(props => ({
  transform: 'rotate(-45deg)',
}));

export const PoiCardHeaderSelf: React.FC<IProps> = props => {
  const { name, role, imageUrl, location } = props;

  // Role action button
  const buttonAction = useMemo(
    () => (
      <StyledButton>
        <StyledLinkIcon />
        <Typography variant={'medium'}>{role.toLocaleUpperCase()}</Typography>
      </StyledButton>
    ),
    [role],
  );

  // return <StyledCardHeader avatar={poiAvatar} title={title} subheader={subHeader} action={buttonAction} />;
  return (
    <StyledCardHeader>
      <StyledAvatar src={imageUrl} />
      <StyledTitlesArea>
        {/* Title */}
        <HeaderTypography variant={'small'}>{name}</HeaderTypography>
        {/* Sub Header */}
        <SubHeaderTypography variant={'small'}>
          <Room />
          {location}
        </SubHeaderTypography>
      </StyledTitlesArea>
      {buttonAction}
    </StyledCardHeader>
  );
};
