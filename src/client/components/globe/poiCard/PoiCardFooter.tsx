import React, { Fragment, useMemo } from 'react';
import { Typography } from '@material-ui/core';
import format from 'format-number';
import styled from 'styled-components';

interface IProps {
  rank: number;
  totalStake: number;
  activeSince: number;
}

const mainColor = 'rgb(96, 125, 131)';

const formatter = format();

export const PoiCardFooter: React.FC<IProps> = props => {
  const { rank, totalStake, activeSince } = props;

  const formattedRank = useMemo(() => formatter(rank), [rank]);
  const formattedStake = useMemo(() => formatter(totalStake), [totalStake]);

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Typography variant='caption' align='center' display='inline' style={{ color: mainColor }}>
        Rank #{formattedRank}
      </Typography>
      <Typography variant='caption' display='inline'>
        Total Stake:{' '}
        <Typography variant='caption' display='inline' style={{ color: mainColor }}>
          {formattedStake} Orbs
        </Typography>
      </Typography>
      <Typography variant='caption' display='inline'>
        Active since: {activeSince}
      </Typography>
    </div>
  );
};
