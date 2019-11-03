/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { render } from '@testing-library/react';
import GitHub from 'github-api';
import { Provider } from 'mobx-react';
import React from 'react';
import { IStoreInitialData } from '../../../shared/IStore';
import { IGitHubCommitGist } from '../../../shared/IStoreTypes';
import { Main } from '../../components/Main';
import { IOrbsGithubService, OrbsGitHubService } from '../../services/OrbsGitHubService';
import { POSStore } from '../../store/POSStore';
import { SocialStore } from '../../store/SocialStore';
import { TokenStore } from '../../store/TokenStore';
import { GitHubApiTestKit } from './apis/GithubApi';

export class AppDriver {
  public readonly outerWorldState: OuterWorldState;

  private socialStore: SocialStore;
  private tokenStore: TokenStore;
  private posStore: POSStore;

  constructor() {
    this.outerWorldState = new OuterWorldState(new GitHubApiTestKit());
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

  public hydrateApp(initialStoresState: IStoreInitialData): this {
    const gitHubApi: GitHub = this.outerWorldState.buildGithub();
    const orbsGitHubService: IOrbsGithubService = new OrbsGitHubService(gitHubApi);

    this.socialStore = new SocialStore(orbsGitHubService, initialStoresState.socialStoreState);
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
  constructor(private gitHubApiTestKit: GitHubApiTestKit) {}

  public buildGithub(): GitHub {
    return this.gitHubApiTestKit.buildMockedInstance();
  }

  public setLastGitHubCommitGist(lastCommitGist: IGitHubCommitGist): void {
    this.gitHubApiTestKit.withLastCommitMessage(lastCommitGist.commitText);
    this.gitHubApiTestKit.withLastCommitUrl(lastCommitGist.commitUrl);
  }
}
