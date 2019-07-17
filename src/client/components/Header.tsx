/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import AppBar from '@material-ui/core/AppBar';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
    },
  });

interface IProps extends WithStyles<typeof styles> {
}


export const Header = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
  <AppBar position='static'>
    <Toolbar>
      <div className={classes.title}>
        <Typography variant='h5'>Staking dashboard</Typography>
      </div>
    </Toolbar>
  </AppBar>
</div>
));
