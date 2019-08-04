/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { GlobeContainer } from './components/globe/GlobeContainer';
import { SocialStore } from './store/SocialStore';
import { TokenStore } from './store/TokenStore';

const appVersion = (window as any).appVersion;

const socialStore = new SocialStore();
const tokenStore = new TokenStore();
const stores = {
  socialStore,
  tokenStore
};

socialStore.init();
tokenStore.init();

export const App = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <GlobeContainer />
    </Provider>
  </BrowserRouter>
);
