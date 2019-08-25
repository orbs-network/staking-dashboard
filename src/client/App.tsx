/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DISABLE_CANVAS } from './config';
import { Main } from './components/Main';
import { POSStore } from './store/POSStore';
import { SocialStore } from './store/SocialStore';
import { TokenStore } from './store/TokenStore';
import { IStoreInitialData } from '../shared/IStore';

const appVersion = (window as any).appVersion;
const initialStore: IStoreInitialData = (window as any).initialStore;

const socialStore = new SocialStore(initialStore.socialStore);
const tokenStore = new TokenStore(initialStore.tokenStore);
const posStore = new POSStore(initialStore.posStore);

const stores = {
  socialStore,
  tokenStore,
  posStore,
};

socialStore.init();
tokenStore.init();
posStore.init();

export const App = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <Main disableCanvas={DISABLE_CANVAS} />
    </Provider>
  </BrowserRouter>
);
