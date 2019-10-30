import React from 'react';
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
  paddingBottom: `${props.theme.poiCard.paddingInEm}em`,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const TitlesArea = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 3,
});

const AvatarArea = styled('div')({
  flex: 1,
});

const ActionButtonArea = styled('div')({
  flex: 1,
});

const StyledAvatar = styled(Avatar)(props => ({
  // Adds a nice border to the avatar
  borderWidth: 2,
  borderColor: props.theme.textColor,
  borderStyle: 'solid',

  // Ensures responsive dimensions
  width: '3em',
  height: '3em',
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

  maxHeight: '5em',
}));

const StyledLinkIcon = styled(Link)(props => ({
  transform: 'rotate(-45deg)',
}));

export const PoiCardHeader: React.FC<IProps> = props => {
  const { name, role, imageUrl, location } = props;

  // return <StyledCardHeader avatar={poiAvatar} title={title} subheader={subHeader} action={buttonAction} />;
  return (
    <StyledCardHeader>
      {/* Avatar */}
      <AvatarArea>
        <StyledAvatar src={imageUrl} />
      </AvatarArea>

      {/* Titles */}
      <TitlesArea>
        {/* header */}
        <HeaderTypography variant={'small'}>{name}</HeaderTypography>
        {/* Sub Header */}
        <SubHeaderTypography variant={'small'}>
          <Room />
          {location}
        </SubHeaderTypography>
      </TitlesArea>

      {/* Action button */}
      <ActionButtonArea>
        <StyledButton>
          <StyledLinkIcon />
          <Typography variant={'medium'}>{role.toLocaleUpperCase()}</Typography>
        </StyledButton>
      </ActionButtonArea>
    </StyledCardHeader>
  );
};
