/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Globe } from './Globe';

const styles = (theme: Theme) => createStyles({});

export const GlobeContainer = withStyles(styles)(
  class extends React.Component {
    public render() {
      return (
        <div style={{ margin: '0 auto' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1600,
              backgroundColor: 'black',
              margin: '0 auto',
              backgroundImage: 'url(assets/noise.jpg)',
              backgroundSize: '100%',
            }}
          >
            <div style={{ maxWidth: 1380, margin: '0 auto', display: 'flex' }}>
              <div id='left' style={{ minWidth: 210 }}>
                <img src={'assets/left.jpg'}/>
              </div>
              <div id='center' style={{ flexGrow: 1 }}>
                <Globe/>
              </div>
              <div id='right' style={{ minWidth: 350 }}>
                <img src={'assets/right.jpg'}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
  },
);
