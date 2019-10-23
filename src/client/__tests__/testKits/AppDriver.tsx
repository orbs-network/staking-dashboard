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
import { defaultPosStoreState, POSStore } from '../../store/POSStore';
import { defaultSocialStoreState, SocialStore } from '../../store/SocialStore';
import { defaultTokenStoreState, TokenStore } from '../../store/TokenStore';
import { Main } from '../../components/Main';
import { IStoreInitialData } from '../../../shared/IStore';
import { IOrbsGithubService } from '../../services/OrbsGitHubService';
import { buildAppServices, IServicesDependencies } from '../../services/services';

import GitHub from 'github-api';
import { anyString, instance, mock, when } from 'ts-mockito';
import { ApiDependenciesKit } from './apis/ApiDependenciesKit';
import { defaultPoiStoreState } from '../../store/POIStore';
import { IGitHubCommitGist } from '../../../shared/IStoreTypes';

export class AppDriver {
  public readonly outerWorldState: OuterWorldState;

  private socialStore: SocialStore;
  private tokenStore: TokenStore;
  private posStore: POSStore;

  constructor() {
    this.outerWorldState = new OuterWorldState(new ApiDependenciesKit());
  }

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

  public hydrateApp(stateHydration?: IStoreInitialData, appApisDependencies?: IServicesDependencies): this {
    const defaultInitialStoresState: IStoreInitialData = {
      socialStoreState: defaultSocialStoreState,
      posStoreState: defaultPosStoreState,
      tokenStoreState: defaultTokenStoreState,
      poiStoreState: defaultPoiStoreState,
    };

    const initialStoresState = stateHydration || defaultInitialStoresState;
    const appServicesDependenciesToUse = appApisDependencies || this.outerWorldState.appApisDependencies;

    const services = buildAppServices(appServicesDependenciesToUse);

    this.socialStore = new SocialStore(services.orbsGitHubService, initialStoresState.socialStoreState);
    this.tokenStore = new TokenStore(initialStoresState.tokenStoreState);
    this.posStore = new POSStore(initialStoresState.posStoreState);

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

/**
 * Helps us set the state of the 'Real world' (Anything outside of our application, usually gets read vi api calls)
 */
// tslint:disable-next-line:max-classes-per-file
class OuterWorldState {
  // tslint:disable-next-line:variable-name
  constructor(private apiDependenciesKit: ApiDependenciesKit) {}

  get appApisDependencies(): IServicesDependencies {
    return this.apiDependenciesKit.buildAppDependencies();
  }

  public setLastGitHubCommitGist(lastCommitGist: IGitHubCommitGist): void {
    this.apiDependenciesKit.gitHubApiTestKit.withLastCommitMessage(lastCommitGist.commitText);
    this.apiDependenciesKit.gitHubApiTestKit.withLastCommitUrl(lastCommitGist.commitUrl);
  }
}
