/**
 * Copyright 2019 the prism authors
 * This file is part of the prism library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { formatLargeNumber } from '../utils/LargeNumbersFormatter';

describe('capper', () => {
  it('should not format a small number', () => {
    const num = Math.floor(Math.random() * 999) + 1;
    const actual = formatLargeNumber(num);
    expect(actual).toEqual(num.toString());
  });

  it('should format a number larger than 999 to K', () => {
    expect(formatLargeNumber(1_000)).toEqual(`1K`);
    expect(formatLargeNumber(5_000)).toEqual(`5K`);
    expect(formatLargeNumber(9_000)).toEqual(`9K`);
    expect(formatLargeNumber(10_000)).toEqual(`10K`);
    expect(formatLargeNumber(152_000)).toEqual(`152K`);
  });

  it('should floor a given K number', () => {
    expect(formatLargeNumber(1_999)).toEqual(`1K`);
    expect(formatLargeNumber(5_999)).toEqual(`5K`);
    expect(formatLargeNumber(9_999)).toEqual(`9K`);
    expect(formatLargeNumber(10_999)).toEqual(`10K`);
    expect(formatLargeNumber(152_999)).toEqual(`152K`);
    expect(formatLargeNumber(999_999)).toEqual(`999K`);
  });

  it('should format a number larger than 999,999 to M', () => {
    expect(formatLargeNumber(1_000_000)).toEqual(`1M`);
    expect(formatLargeNumber(5_000_000)).toEqual(`5M`);
    expect(formatLargeNumber(9_000_000)).toEqual(`9M`);
    expect(formatLargeNumber(10_000_000)).toEqual(`10M`);
    expect(formatLargeNumber(152_000_000)).toEqual(`152M`);
  });

  it('should floor a given M number', () => {
    expect(formatLargeNumber(1_999_999)).toEqual(`1M`);
    expect(formatLargeNumber(5_999_999)).toEqual(`5M`);
    expect(formatLargeNumber(9_999_999)).toEqual(`9M`);
    expect(formatLargeNumber(10_999_999)).toEqual(`10M`);
    expect(formatLargeNumber(152_999_999)).toEqual(`152M`);
  });
});
