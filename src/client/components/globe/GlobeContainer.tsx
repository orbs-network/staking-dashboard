/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Globe } from './Globe';

const styles = (theme: Theme) => createStyles({});

export const GlobeContainer = withStyles(styles)(
  class extends React.Component {
    public render() {
      return (
        <Card>
          <CardHeader />
          <CardContent>
            <Globe />
          </CardContent>
        </Card>
      );
    }
  },
);
