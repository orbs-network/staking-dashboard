/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Object3D } from 'three';
import { Dot3D } from './Dot3D';
import { IPoi } from '../../../shared/IPoi';

export class DotsContainer3D extends Object3D {
  private activeDotIdx: number = 0;
  private dotsList: Dot3D[] = [];

  constructor(pois: IPoi[], globeRadius: number) {
    super();
    pois.forEach(dot => this.addDot(globeRadius, dot.xRotation, dot.yRotation, dot.name));
  }

  public get activeDot(): Dot3D {
    return this.dotsList[this.activeDotIdx];
  }

  public nextActiveDot(): void {
    this.activeDotIdx = (this.activeDotIdx + 1) % this.dotsList.length;
  }

  private addDot(globeRadius: number, xRotation: number, yRotation: number, name: string): void {
    const dot = new Dot3D(globeRadius, 0.15, xRotation, yRotation, name);
    this.add(dot);
    this.dotsList.push(dot);
  }
}
