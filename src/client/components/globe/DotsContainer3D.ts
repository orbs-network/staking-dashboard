/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Object3D } from 'three';
import { Dot3D } from './Dot3D';

export class DotsContainer3D extends Object3D {
  private activeDotIdx: number = 0;
  private dotsList: Dot3D[] = [];

  constructor(globeRadius: number, count: number) {
    super();
    for (let i = 0; i < 5; i++) {
      const xRotation = Math.random() * Math.PI * 2;
      const yRotation = Math.random() * Math.PI * 2;
      const dot = new Dot3D(globeRadius, 0.2, xRotation, yRotation);
      this.add(dot);
      this.dotsList.push(dot);
    }
  }

  public get activeDot(): Dot3D {
    return this.dotsList[this.activeDotIdx];
  }

  public nextActiveDot(): void {
    this.activeDotIdx = (this.activeDotIdx + 1) % this.dotsList.length;
  }
}
