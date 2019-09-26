/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { render } from '@testing-library/react';
import { Provider } from 'mobx-react';
import React from 'react';
import {defaultPosStoreState, POSStore} from '../store/POSStore';
import {defaultSocialStoreState, SocialStore} from '../store/SocialStore';
import {defaultTokenStoreState, TokenStore} from '../store/TokenStore';
import { Main } from '../components/Main';
import {IStoreInitialData} from '../../shared/IStore';
import {IGithubService} from '../services/gitHubService';
import {buildAppServices} from '../services/services';

import GitHub from 'github-api';

export class AppDriver {
  private socialStore: SocialStore;
  private tokenStore: TokenStore;
  private posStore: POSStore;

  public initializeApp(stateHydration: IStoreInitialData): this {
    const initialStoresState: IStoreInitialData = {
      socialStoreState: defaultSocialStoreState,
      posStoreState: defaultPosStoreState,
      tokenStoreState: defaultTokenStoreState,
    };

    const services = buildAppServices({ gitHubApi: new GitHub()});

    this.socialStore = new SocialStore(services.gitHubService, initialStoresState.socialStoreState);
    this.tokenStore = new TokenStore(initialStoresState.tokenStoreState);
    this.posStore = new POSStore(initialStoresState.posStoreState);

    this.socialStore.init();
    this.tokenStore.init();
    this.posStore.init();

    return this;
  }

  public render() {
    const stores = {
      socialStore: this.socialStore,
      tokenStore: this.tokenStore,
      posStore: this.posStore,
    };

    return render(
      <Provider {...stores}>
        <Main disableCanvas={true} />
      </Provider>,
    );
  }
}
