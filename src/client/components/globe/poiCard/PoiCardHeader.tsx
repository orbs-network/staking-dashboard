import React, { Fragment, useMemo } from 'react';
import { Avatar, Button, CardHeader, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from '@material-ui/icons';

interface IProps {}

const mainColor = 'rgb(96, 125, 131)';
const textColor = 'rgb(156, 156, 156)';

const StyledCardHeader = styled(CardHeader)({
  color: textColor,
});

const StyledAvatar = styled(Avatar)({
  borderWidth: 2,
  borderColor: textColor,
  borderStyle: 'solid',
});

const StyledButton = styled(Button)({
  color: mainColor,
  borderColor: mainColor,
  '.MuiButton-startIcon': {
    transform: 'rotate(-45deg)',
  },
});

export const PoiCardHeader: React.FC<IProps> = props => {
  const {} = props;

  const poiAvatar = useMemo(
    () => <StyledAvatar alt={'A'} src={'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg'} />,
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
    <StyledCardHeader
      avatar={poiAvatar}
      title={'Andrey Tarantinov'}
      subheader={'South Korea'}
      action={buttonAction}
      subheaderTypographyProps={{ color: 'inherit' }}
    />
  );
};
