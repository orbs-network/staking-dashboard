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
import { IStoreInitialData } from '../shared/IStore';
import {getStores} from './store';
import {configureMobx} from './store/storesInitialization';
import {buildProductionAppServices} from './services/services';

const appVersion = (window as any).appVersion;
const initialStore: IStoreInitialData = (window as any).initialStore;

const appServices = buildProductionAppServices();

configureMobx();
const stores = getStores(appServices, initialStore);

export const App = () => (
  <BrowserRouter>
    <Provider {...stores}>
      <Main disableCanvas={DISABLE_CANVAS} />
    </Provider>
  </BrowserRouter>
);
