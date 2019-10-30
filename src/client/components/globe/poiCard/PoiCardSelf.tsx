import React, { forwardRef, MouseEvent } from 'react';
import styled from 'styled-components';
import Color from 'color';

import { theme } from '../../base/Theme';
import { PoiCardFooterSelf } from './PoiCardFooterSelf';
import { PoiCardHeaderSelf } from './PoiCardHeaderSelf';
import { Typography } from '../../base/Typography';

interface IProps {
  location: string;
}

type Ref = HTMLDivElement;

const PopUpCard = styled('div')(props => ({
  width: `${props.theme.cardTheme.widthInEm}em`,
  backgroundColor: Color(theme.poiCardBackgroundColor)
    .alpha(theme.poiCardBackgroundAlpha)
    .rgb()
    .toString(),
  padding: `${props.theme.cardTheme.paddingInEm}em`,
}));

const StyledDivider = styled('div')(props => ({
  height: 2,
  borderRadius: 2,
  backgroundColor: 'gray',
  marginTop: `${props.theme.cardTheme.paddingInEm * 0.75}em`,
  marginBottom: `${props.theme.cardTheme.paddingInEm * 0.75}em`,
}));

const StyledCardContent = styled('div')(props => ({
  color: props.theme.textColor,
}));

export const PoiCardSelf = React.memo(
  forwardRef<Ref, IProps>((props, ref) => {
    const { location } = props;

    // TODO : FUTURE : O.L : Decide on a data structure for the POI's and take this information as a prop
    const name = 'Andrey Tarantinov';
    const profileImageUrl = 'https://www.orbs.com/wp-content/uploads/2019/02/Andrey-Dulkin-Orbs.jpg';
    const role = 'Guardian';

    return (
      // Containing click events inside the card
      <PopUpCard ref={ref} onClick={stopEventPropagation}>
        {/* Header */}
        <PoiCardHeaderSelf name={name} imageUrl={profileImageUrl} location={location} role={role} />

        {/* Content */}
        <StyledCardContent>
          <Typography variant={'medium'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </Typography>
        </StyledCardContent>

        {/* Divider  */}
        <StyledDivider />

        {/* Footer */}
        <PoiCardFooterSelf rank={9} totalStake={28000} activeSince={2018} />
      </PopUpCard>
    );
  }),
);

const stopEventPropagation = (e: MouseEvent) => e.stopPropagation();
