import React, { ReactNode, useMemo } from 'react';
import format from 'format-number';
import styled from 'styled-components';
import { Typography } from '../../base/Typography';

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

const StyledTypography = styled(
  ({ emphasised, ...typographyProps }: { emphasised?: boolean } & { children?: ReactNode }) => (
    <Typography variant='small' {...typographyProps} />
  ),
)(props => ({
  color: props.emphasised ? props.theme.mainColor : props.theme.textColor,
}));

export const PoiCardFooterSelf: React.FC<IProps> = props => {
  const { rank, totalStake, activeSince } = props;

  const formattedRank = useMemo(() => formatter(rank), [rank]);
  const formattedStake = useMemo(() => formatter(totalStake), [totalStake]);

  return (
    <FooterContainer>
      {/* Rank */}
      <StyledTypography emphasised>Rank #{formattedRank}</StyledTypography>

      {/* Total stake */}
      <StyledTypography>
        Total Stake: <StyledTypography emphasised>{formattedStake} Orbs</StyledTypography>
      </StyledTypography>

      {/* Active since */}
      <StyledTypography>Active since: {activeSince}</StyledTypography>
    </FooterContainer>
  );
};
