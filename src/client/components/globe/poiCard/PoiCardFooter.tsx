import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

interface IProps {
  rank: number;
  totalStake: number;
  activeSince: number;
}

const mainColor = 'rgb(96, 125, 131)';

export const PoiCardFooter: React.FC<IProps> = props => {
  const { rank, totalStake, activeSince } = props;

  return (
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <Typography variant='caption' align='center' display='inline' style={{ color: mainColor }}>
        Rank #{rank}
      </Typography>
      <Typography variant='caption' display='inline'>
        Total Stake:{' '}
        <Typography variant='caption' display='inline' style={{ color: mainColor }}>
          {totalStake} Orbs
        </Typography>
      </Typography>
      <Typography variant='caption' display='inline'>
        Active since: {activeSince}
      </Typography>
    </div>
  );
};
