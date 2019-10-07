import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import format from 'format-number';
import styled from 'styled-components';
import { TypographyProps } from '@material-ui/core/Typography';

interface IProps {
  rank: number;
  totalStake: number;
  activeSince: number;
}

const formatter = format();

const FooterContainer = styled('div')({
  justifyContent: 'space-between',
  display: 'flex',
});

const StyledTypography = styled((typographyProps: TypographyProps) => (
  <Typography variant='caption' align='center' display='inline' {...typographyProps} />
))<{ emphasised?: boolean }>(props => ({
  color: props.emphasised ? props.theme.mainColor : props.theme.textColor,
}));

export const PoiCardFooter: React.FC<IProps> = props => {
  const { rank, totalStake, activeSince } = props;

  const formattedRank = useMemo(() => formatter(rank), [rank]);
  const formattedStake = useMemo(() => formatter(totalStake), [totalStake]);

  return (
    <FooterContainer>
      <StyledTypography emphasised>Rank #{formattedRank}</StyledTypography>
      <StyledTypography>
        Total Stake: <StyledTypography emphasised>{formattedStake} Orbs</StyledTypography>
      </StyledTypography>
      <StyledTypography>Active since: {activeSince}</StyledTypography>
    </FooterContainer>
  );
};
