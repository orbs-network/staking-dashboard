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
    expect(formatLargeNumber(1_000)).toEqual(`1k`);
    expect(formatLargeNumber(5_000)).toEqual(`5k`);
    expect(formatLargeNumber(9_000)).toEqual(`9k`);
    expect(formatLargeNumber(10_000)).toEqual(`10k`);
    expect(formatLargeNumber(152_000)).toEqual(`152k`);
  });

  it('should floor a given K number', () => {
    expect(formatLargeNumber(1_999)).toEqual(`1k`);
    expect(formatLargeNumber(5_999)).toEqual(`5k`);
    expect(formatLargeNumber(9_999)).toEqual(`9k`);
    expect(formatLargeNumber(10_999)).toEqual(`10k`);
    expect(formatLargeNumber(152_999)).toEqual(`152k`);
    expect(formatLargeNumber(999_999)).toEqual(`999k`);
  });

  it('should format a number larger than 999,999 to M', () => {
    expect(formatLargeNumber(1_000_000)).toEqual(`1m`);
    expect(formatLargeNumber(5_000_000)).toEqual(`5m`);
    expect(formatLargeNumber(9_000_000)).toEqual(`9m`);
    expect(formatLargeNumber(10_000_000)).toEqual(`10m`);
    expect(formatLargeNumber(152_000_000)).toEqual(`152m`);
  });

  it('should floor a given M number', () => {
    expect(formatLargeNumber(1_999_999)).toEqual(`1m`);
    expect(formatLargeNumber(5_999_999)).toEqual(`5m`);
    expect(formatLargeNumber(9_999_999)).toEqual(`9m`);
    expect(formatLargeNumber(10_999_999)).toEqual(`10m`);
    expect(formatLargeNumber(152_999_999)).toEqual(`152m`);
  });
});
