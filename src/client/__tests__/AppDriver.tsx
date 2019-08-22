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

  public render(component) {
    const stores = {
      socialStore: this.socialStore,
      tokenStore: this.tokenStore,
      posStore: this.posStore,
    };

    return render(<Provider {...stores}>{component}</Provider>);
  }
}
