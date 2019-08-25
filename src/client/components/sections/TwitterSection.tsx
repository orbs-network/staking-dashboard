/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import { SocialSection } from './SocialSection';
import { inject } from 'mobx-react';
import { SocialStore } from '../../store/SocialStore';
import { theme } from '../base/Theme';

const icon = (
  <svg width={theme.sizes.SIZE_LARGE_1} viewBox='0 0 22 18'>
    <path
      fill='#FFF'
      fillRule='nonzero'
      d='M22 2.13c-.81.362-1.68.606-2.592.716A4.553 4.553 0 0 0 21.392.332a9 9 0 0 1-2.866 1.103A4.494 4.494 0 0 0 15.231 0c-2.492 0-4.513 2.034-4.513 4.544 0 .356.04.703.117 1.036C7.084 5.39 3.758 3.58 1.532.832A4.546 4.546 0 0 0 .92 3.116 4.55 4.55 0 0 0 2.928 6.9 4.472 4.472 0 0 1 .884 6.33v.057a4.54 4.54 0 0 0 3.62 4.456 4.494 4.494 0 0 1-2.038.078 4.522 4.522 0 0 0 4.216 3.156A9.017 9.017 0 0 1 0 15.958 12.712 12.712 0 0 0 6.919 18C15.22 18 19.76 11.076 19.76 5.07c0-.196-.005-.392-.013-.587A9.204 9.204 0 0 0 22 2.13z'
    />
  </svg>
);

interface IProps {
  socialStore?: SocialStore;
}

export const TwitterSection = inject('socialStore')(({ socialStore }: IProps) => {
  return <SocialSection dataTestId='latest-tweet' icon={icon} title='Latest Tweets' text={socialStore.latestTweet} />;
});
