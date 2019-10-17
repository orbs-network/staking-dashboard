/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React from 'react';
import { SocialSection } from './SocialSection';
import { theme } from '../base/Theme';
import { useSocialStore } from '../../store/storeHooks';
import { observer } from 'mobx-react';

const icon = (
  <svg width={theme.sizes.SIZE_LARGE_2} viewBox='0 0 24 23'>
    <path
      fill='#FFF'
      fillRule='nonzero'
      d='M22.39 5.871a11.845 11.845 0 0 0-4.367-4.29C16.185.527 14.177 0 12 0 9.823 0 7.815.527 5.977 1.581a11.843 11.843 0 0 0-4.368 4.29C.536 7.677 0 9.65 0 11.788c0 2.569.763 4.878 2.289 6.93 1.526 2.052 3.497 3.472 5.914 4.26.281.05.49.015.625-.108a.595.595 0 0 0 .203-.46l-.008-.83c-.005-.521-.008-.976-.008-1.365l-.36.061c-.228.041-.517.059-.866.054a6.722 6.722 0 0 1-1.086-.108 2.448 2.448 0 0 1-1.047-.46 1.95 1.95 0 0 1-.688-.944l-.156-.353a3.824 3.824 0 0 0-.492-.782c-.224-.287-.45-.481-.68-.584l-.109-.077a1.14 1.14 0 0 1-.203-.184.84.84 0 0 1-.14-.215c-.032-.072-.006-.13.078-.177.083-.046.234-.068.453-.068l.312.046c.208.04.466.163.773.368.308.205.56.47.758.798.24.42.529.74.867.96.339.22.68.33 1.024.33.343 0 .64-.026.89-.077.25-.051.485-.128.703-.23.094-.687.35-1.213.766-1.582a10.873 10.873 0 0 1-1.602-.276 6.441 6.441 0 0 1-1.468-.599 4.19 4.19 0 0 1-1.258-1.028c-.333-.41-.607-.947-.82-1.612-.214-.665-.32-1.433-.32-2.302 0-1.239.411-2.293 1.234-3.162-.386-.931-.35-1.975.11-3.131.301-.093.75-.023 1.343.207.594.23 1.029.427 1.305.59.276.164.497.303.664.415a11.282 11.282 0 0 1 3-.399c1.03 0 2.031.133 3 .4l.594-.369c.406-.246.885-.47 1.437-.676.552-.204.974-.26 1.266-.168.469 1.156.51 2.2.125 3.13.823.87 1.234 1.925 1.234 3.163 0 .87-.107 1.64-.32 2.31-.213.67-.49 1.207-.828 1.611-.339.405-.76.745-1.266 1.021a6.453 6.453 0 0 1-1.468.599c-.474.123-1.008.215-1.602.277.542.46.812 1.186.812 2.179v3.238c0 .184.065.338.196.46.13.123.336.16.617.108 2.417-.788 4.388-2.208 5.914-4.26 1.526-2.05 2.289-4.36 2.289-6.93 0-2.138-.537-4.11-1.61-5.916z'
    />
  </svg>
);

// tslint:disable-next-line:no-empty-interface
interface IProps {}

export const GithubSection = observer((props: IProps) => {
  // tslint:disable-next-line:react-hooks-nesting
  const socialStore = useSocialStore();

  return <SocialSection icon={icon} dataTestId='latest-commit' title='Latest Commit' text={socialStore.latestCommit} />;
});
