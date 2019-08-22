/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'mobx-react';
import * as React from 'react';
import { Token24HVolumeSection } from '../components/sections/Token24HVolumeSection';
import { POSStore } from '../store/POSStore';
import { SocialStore } from '../store/SocialStore';
import { TokenStore } from '../store/TokenStore';

describe('<Token24HVolumeSection/>', () => {

  function createWrapper(children) {
    const socialStore = new SocialStore();
    const tokenStore = new TokenStore();
    const posStore = new POSStore();
    const stores = {
      socialStore,
      tokenStore,
      posStore,
    };

    socialStore.init();
    tokenStore.init();
    posStore.init();

    return <Provider {...stores}>{children}</Provider>;
  }

  it('should display the 24H volume from the Token store', () => {
    const {getByTestId} = render(createWrapper(<Token24HVolumeSection />));
    expect(getByTestId('24h-volume')).toHaveTextContent('$40M');
  });
});
