/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { TweenMax } from 'gsap';
import { Mesh, MeshLambertMaterial, Object3D, SphereGeometry, Vector3 } from 'three';

export class Dot3D extends Object3D {
  private dotMesh: Object3D;
  private blinkTween: TweenMax;

  constructor(globeRadius: number, dotRadius: number, xRotation: number, yRotation: number) {
    super();
    this.createDot(globeRadius, dotRadius, xRotation, yRotation);
  }

  public blink(): void {
    this.blinkTween = TweenMax.to(this.dotMesh.scale, 0.75, {
      x: 2,
      y: 2,
      z: 2,
      yoyo: true,
      repeat: -1,
    });
  }

  public unblink(): void {
    if (this.blinkTween) {
      this.blinkTween.kill();
      TweenMax.to(this.dotMesh.scale, 0.75, {
        x: 1,
        y: 1,
        z: 1,
      });
    } else {
      this.dotMesh.scale.set(1, 1, 1);
    }
  }

  private createDot(globeRadius: number, dotRadius: number, xRotation: number, yRotation: number): void {
    // Dot
    const dotGeometry: SphereGeometry = new SphereGeometry(dotRadius, 8, 8);
    const dotMaterial = new MeshLambertMaterial({
      color: 0xffffff,
    });

    this.dotMesh = new Mesh(dotGeometry, dotMaterial);
    this.dotMesh.position.add(new Vector3(0, 0, globeRadius));
    this.add(this.dotMesh);
    this.rotation.set(xRotation, yRotation, 0, 'YXZ');
  }
}
