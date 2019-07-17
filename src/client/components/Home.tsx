/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { GlobeContainer } from './globe/GlobeContainer';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

export const Home = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <div>Test</div>
    <GlobeContainer />
  </div>
));
