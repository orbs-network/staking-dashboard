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
import { POSStore } from '../store/POSStore';
import { SocialStore } from '../store/SocialStore';
import { TokenStore } from '../store/TokenStore';
import { Main } from '../components/Main';

export class AppDriver {
  private socialStore: SocialStore;
  private tokenStore: TokenStore;
  private posStore: POSStore;

  constructor() {
    this.socialStore = new SocialStore();
    this.tokenStore = new TokenStore();
    this.posStore = new POSStore();

    this.socialStore.init();
    this.tokenStore.init();
    this.posStore.init();
  }

  // POS data
  public withNextVotingTime(value: number): this {
    this.posStore.nextVotingTime = value;
    return this;
  }

  public withTopGuardians(value: string[]): this {
    this.posStore.topGuardians = value;
    return this;
  }

  public withRewardsDistributed(value: number): this {
    this.posStore.rewardsDistributed = value;
    return this;
  }

  // SOCIAL data
  public withRecentUpdate(value: string): this {
    this.socialStore.recentUpdate = value;
    return this;
  }

  public withLatestTweet(value: string): this {
    this.socialStore.latestTweet = value;
    return this;
  }

  public withLatestCommit(value: string): this {
    this.socialStore.latestCommit = value;
    return this;
  }

  // TOKEN data
  public with24HVolume(volume: number): this {
    this.tokenStore.token24HVolume = volume;
    return this;
  }

  public withOrbsInCirculation(orbsInCirculation: number): this {
    this.tokenStore.orbsInCirculation = orbsInCirculation;
    return this;
  }

  public withTokenPrice(tokenPrice: number): this {
    this.tokenStore.tokenPrice = tokenPrice;
    return this;
  }

  public withTotalHolders(totalHolders: number): this {
    this.tokenStore.totalHolders = totalHolders;
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
