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
import {anyString, instance, mock, when} from 'ts-mockito';

export class AppDriver {
  private socialStore: SocialStore;
  private tokenStore: TokenStore;
  private posStore: POSStore;

  public async hydrateAndInitializeApp(stateHydration: IStoreInitialData): Promise<this> {
    this.hydrateApp(stateHydration);
    await this.initApp();

    return this;
  }

  public async initApp(): Promise<this> {
    await this.socialStore.init();
    await this.tokenStore.init();
    await this.posStore.init();

    return this;
  }

  public hydrateApp(stateHydration: IStoreInitialData): this {
    const initialStoresState: IStoreInitialData = {
      socialStoreState: defaultSocialStoreState,
      posStoreState: defaultPosStoreState,
      tokenStoreState: defaultTokenStoreState,
    };

    const mockedGitHubApi = mock(GitHub);

    // Build the mocked response
    const mockedRepositoryResponse = {
      listCommits: async () => {
        return {
          data: [
            {
              commit: {
                message: 'last commit for test',
              }
            }
          ]
        };
      }
    };

    when(mockedGitHubApi.getRepo(anyString(), anyString())).thenReturn(mockedRepositoryResponse);

    const githubApi = instance(mockedGitHubApi);



    const services = buildAppServices({ gitHubApi: githubApi});

    this.socialStore = new SocialStore(services.gitHubService, stateHydration.socialStoreState);
    this.tokenStore = new TokenStore(stateHydration.tokenStoreState);
    this.posStore = new POSStore(stateHydration.posStoreState);

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
