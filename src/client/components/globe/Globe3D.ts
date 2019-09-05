/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import {
  BackSide,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Object3D,
  SphereGeometry,
  TextureLoader,
  SpriteMaterial,
  ImageUtils,
  AdditiveBlending,
  Sprite,
} from 'three';

export class Globe3D {
  public globe: Object3D;
  private sphereGeometry: SphereGeometry;
  private sphereMaterial: any;
  private sphereMaterialBack: any;
  private innerSphereMaterial: any;

  constructor(private globeRadius: number) {
    const textureLoader = new TextureLoader();
    const sphereTexture = textureLoader.load('/assets/map-texture.png');
    this.sphereGeometry = new SphereGeometry(globeRadius, 32, 32);
    this.sphereMaterial = new MeshLambertMaterial({
      color: 0xffffff,
      map: sphereTexture,
      transparent: true,
      side: FrontSide,
    });
    this.sphereMaterialBack = new MeshLambertMaterial({
      color: 0xffffff,
      map: sphereTexture,
      transparent: true,
      opacity: 0.4,
      side: BackSide,
    });
    this.innerSphereMaterial = new MeshBasicMaterial({
      color: 0x080808,
      wireframe: false,
      opacity: 1,
      transparent: false,
      side: FrontSide,
    });
    // this.sphereMaterial = createFresnelShaderMaterial();
    // this.sphereMaterialBack = createFresnelShaderMaterial();
  }

  public build(): Object3D {
    this.globe = this.createGlobe();
    return this.globe;
  }

  public handleHover(object: Object3D): void {}

  public handleHoverOut(object: Object3D): void {}

  private createGlow(radius: number): Sprite {
    const spriteMaterial = new SpriteMaterial({
      map: ImageUtils.loadTexture('assets/glow.png'),
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
      blending: AdditiveBlending,
    });
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(radius * 4, radius * 4, 1.0);
    return sprite;
  }

  private createGlobe(): Object3D {
    const sphereMesh = new Mesh(this.sphereGeometry, this.sphereMaterial);
    const sphereMeshBack = new Mesh(this.sphereGeometry, this.sphereMaterialBack);
    const innerSphereMesh = new Mesh(this.sphereGeometry, this.innerSphereMaterial);

    sphereMesh.renderOrder = 2;
    // innerSphereMesh.scale.set(0.99, 0.99, 0.99);

    const glow = this.createGlow(this.globeRadius);

    const globe = new Object3D();
    globe.add(sphereMeshBack);
    globe.add(sphereMesh);
    // globe.add(innerSphereMesh);
    // globe.add(glow);
    return globe;
  }
}