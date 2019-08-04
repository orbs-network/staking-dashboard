/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { LeftPanel } from '../LeftPanel';
import { Globe } from './Globe';
import { RightPanel } from '../RightPanel';

export class GlobeContainer extends React.Component {
    public render() {
      return (
        <div style={{ margin: '0 auto' }}>
          <div
            style={{
              width: '100%',
              maxWidth: 1600,
              backgroundColor: 'black',
              margin: '0 auto',
              // backgroundImage: 'url(assets/noise.jpg)',
              backgroundSize: '100%',
            }}
          >
            <div style={{ maxWidth: 1380, margin: '0 auto', display: 'flex' }}>
              <div id='left' style={{ width: 210, position: 'relative' }}>
                <LeftPanel />
                <img src={'assets/left.jpg'} style={{ position: 'absolute', visibility: 'hidden', top: 0, left: 220 }} />
              </div>
              <div id='center' style={{ flexGrow: 1 }}>
                <Globe />
              </div>
              <div id='right' style={{ width: 350 }}>
                <RightPanel />
                <img src={'assets/right.jpg'} style={{ position: 'absolute', visibility: 'hidden', top: -27, right: 540}} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
