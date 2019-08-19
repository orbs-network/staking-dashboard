/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { BoxGeometry, Mesh, MeshLambertMaterial, Object3D } from 'three';

export class Axis3D extends Object3D {

  constructor(size: number) {
    super();
    this.createAxis(size);
  }

  private createAxis(size: number): void {
    // X Axis
    const xAxisMaterial = new MeshLambertMaterial({
      color: 0xff0000,
    });
    const xAxisGeometry = new BoxGeometry(size, size / 20, size / 20);
    const xAxisMesh = new Mesh(xAxisGeometry, xAxisMaterial);
    xAxisMesh.position.setX(size / 2);
    this.add(xAxisMesh);

    // Y Axis
    const yAxisMaterial = new MeshLambertMaterial({
      color: 0x00ff00,
    });
    const yAxisGeometry = new BoxGeometry(size / 20, size, size / 20);
    const yAxisMesh = new Mesh(yAxisGeometry, yAxisMaterial);
    yAxisMesh.position.setY(size / 2);
    this.add(yAxisMesh);

    // Z Axis
    const zAxisMaterial = new MeshLambertMaterial({
      color: 0x0000ff,
    });
    const zAxisGeometry = new BoxGeometry(size / 20, size / 20, size);
    const zAxisMesh = new Mesh(zAxisGeometry, zAxisMaterial);
    zAxisMesh.position.setZ(size / 2);
    this.add(zAxisMesh);
  }
}
