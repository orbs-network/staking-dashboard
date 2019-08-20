/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import { SocialSection } from './SocialSection';
import { inject } from 'mobx-react';
import { SocialStore } from '../../store/SocialStore';
import { theme } from '../base/Theme';

const icon = (
  <svg width={theme.sizes.SIZE_LARGE_1} viewBox='0 0 22 22'>
    <path
      fill='#FFF'
      fillRule='nonzero'
      d='M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm0 17.181a7.888 7.888 0 0 1-3.562-.835c-.28.225-1.55 1.156-2.81.72.762-.72.9-1.561.882-2.146C4.503 13.854 3.9 12.488 3.9 11c0-3.414 3.18-6.182 7.101-6.182 3.922 0 7.101 2.768 7.101 6.182 0 3.414-3.18 6.181-7.101 6.181z'
    />
  </svg>
);

interface IProps {
  socialStore?: SocialStore;
}

export const NewsSection = inject('socialStore')(({ socialStore }: IProps) => {
  return <SocialSection icon={icon} title='Recent Update' text={socialStore.recentUpdate} />;
});
