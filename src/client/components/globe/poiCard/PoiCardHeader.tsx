import React, { Fragment, useMemo } from 'react';
import { Avatar, Button, CardHeader, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from '@material-ui/icons';

interface IProps {}

const StyledCardHeader = styled(CardHeader)(props => ({
  color: props.theme.textColor,
}));

const StyledAvatar = styled(Avatar)(props => ({
  borderWidth: 2,
  borderColor: props.theme.textColor,
  borderStyle: 'solid',
}));

const StyledButton = styled(Button)(props => ({
  color: props.theme.mainColor,
  borderColor: props.theme.mainColor,
  '.MuiButton-startIcon': {
    transform: 'rotate(-45deg)',
  },
}));

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
