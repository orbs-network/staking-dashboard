/* tslint:disable:react-hooks-nesting */
/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Power2, TimelineLite, TweenMax } from 'gsap';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { DotsContainer3D } from './DotsContainer3D';
import { Globe3D } from './Globe3D';
import { generateStarField } from './StarField';
import { PoiPopup } from './poiCard/PoiPopup';
import { inject, observer } from 'mobx-react';
import { POIStore } from '../../store/POIStore';

const raycaster = new Raycaster();
const CAMERA_POS = 35;
const ANIMATION_SPEED = 0.8;

const boxSizeForDev = {
  height: 100,
  width: 200,
};

interface IState {
  rotationX: number;
  rotationY: number;

  centerLeftOffset: number;
  centerTopOffset: number;
}

interface IProps {
  poiStore?: POIStore;
}

const useGlobeAnimation = () => {
  const clock: Clock = useMemo(() => new Clock(), []);

  const rayCaster: Raycaster = useMemo(() => new Raycaster(), []);

  const scene: Scene = useMemo(() => new Scene(), []);

  const renderer: WebGLRenderer = useMemo(() => {
    // ADD RENDERER
    const wegGLRenderer = new WebGLRenderer({ antialias: true, alpha: true });
    wegGLRenderer.setClearColor(0x000000, 0.0);
    wegGLRenderer.setPixelRatio(window.devicePixelRatio);

    return wegGLRenderer;
  }, [window.devicePixelRatio]);

  const composer: EffectComposer = useMemo(() => {
    return new EffectComposer(renderer);
  }, [renderer]);

  const camera: PerspectiveCamera = useMemo(() => {
    const perspectiveCamera = new PerspectiveCamera(50, 0.5, 0.1, 1000);
    perspectiveCamera.position.z = CAMERA_POS;

    return perspectiveCamera;
  }, []);

  return {
    clock,
    rayCaster,
    scene,
    renderer,
    composer,
    camera,
  };
};

export const GlobeFc = inject('poiStore')(
  observer(({ poiStore }: IProps) => {
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    const [centerOffset, setCenterOffset] = useState({ centerLeftOffset: 0, centerTopOffset: 0 });
    const [currentPoiName, setCurrentPoiName] = useState('');

    // Dom elements refs
    const mountRef = useRef<HTMLDivElement>(null);
    const popUpDivRef = useRef<HTMLDivElement>(null);

    // Animation frame id ref
    const animationFrameRef = useRef<number>(null);

    const dotsContainer: DotsContainer3D = useMemo(() => new DotsContainer3D(10), []);

    const { renderer, composer, camera, clock, scene } = useGlobeAnimation();

    /**
     * Calculates and sets the state for the 'top' and 'left' offsets for the center of the globe.
     */
    const calculateAndSetCenterOffset = useCallback(() => {
      const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = renderer.domElement;

      const canvasHalfWidth = offsetWidth / 2;
      const canvasHalfHeight = offsetHeight / 2;

      setCenterOffset({
        centerLeftOffset: canvasHalfWidth + offsetLeft,
        centerTopOffset: canvasHalfHeight + offsetTop,
      });
    }, [renderer.domElement, setCenterOffset]);

    const resizeRendererToDisplaySize = useCallback(
      (forceResize: boolean = false) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;

        // TODO : O.L : FUTURE : Ask why we are setting here widthxwidth
        if (canvas.width !== width || forceResize) {
          renderer.setSize(width, width, false);
          composer.setSize();
          canvas.removeAttribute('style');
          camera.aspect = 1;
          camera.updateProjectionMatrix();

          // Calculates and sets the center of the canvas for the POI popup
          calculateAndSetCenterOffset();
        }
      },
      [renderer.domElement, composer],
    );

    const handleHover = useCallback(() => {
      // TODO : O.L : Add the 'handleHover' code when necessary
    }, []);

    const animate = useCallback(() => {
      handleHover();
      resizeRendererToDisplaySize();

      // Apply post-processing
      composer.render(clock.getDelta());

      // Continue the animation in the next frame & keep reference to the frame id
      animationFrameRef.current = requestAnimationFrame(animate);
    }, [handleHover]);

    /**
     * Animates transition to next point
     */
    const onGlobClick = useCallback(() => {
      // TODO : ORL :  Move this to an an outer 'current poi' store/state
      dotsContainer.activeDot.unblink();
      dotsContainer.nextActiveDot();
      dotsContainer.activeDot.blink();

      const timeLine = new TimelineLite();
      timeLine.timeScale(ANIMATION_SPEED);

      const singleAnimationDuration = 1;

      timeLine.add(
        TweenMax.to(popUpDivRef.current, singleAnimationDuration / 4, {
          scale: 0.2,
          autoAlpha: 0,
          transformOrigin: 'top left',
        }),
        0,
      );

      // Creates the zoom out - zoom in when transitioning between dots.
      timeLine.add(
        TweenMax.to(camera.position, singleAnimationDuration / 2, {
          z: CAMERA_POS * 1.25,
          ease: Power2.easeInOut,
          repeat: 1,
          yoyo: true,
        }),
        0,
      );

      // This tween is responsible for rotating the scene to the appropriate active dot.
      timeLine.add(
        TweenMax.to(scene.rotation, singleAnimationDuration, {
          x: -dotsContainer.activeDot.rotation.x,
          y: -dotsContainer.activeDot.rotation.y,
          z: 0,
          ease: Power2.easeInOut,
        }),
        0,
      );

      // Display the node data "pop up"
      timeLine.add(
        TweenMax.to(popUpDivRef.current, singleAnimationDuration / 4, {
          scale: 1,
          autoAlpha: 1,
        }),
      );

      // TODO : ORL : Ensure re-rendering with a better method.
      setCurrentPoiName(dotsContainer.activeDot.name);
    }, []);

    // Initialize the scene
    useEffect(() => {
      // Add main light
      const light = new AmbientLight(0xffffff, 0.7);
      scene.add(light);

      // Add secondary lights
      const leftLight = new DirectionalLight(0xffffff, 0.8);
      leftLight.position.set(-1, 0, 0);
      scene.add(leftLight);

      const rightLight = new DirectionalLight(0xffffff, 0.8);
      rightLight.position.set(1, 0, 0);
      scene.add(rightLight);

      const topLight = new DirectionalLight(0xffffff, 0.8);
      topLight.position.set(0, 1, 0);
      scene.add(topLight);

      const bottomLight = new DirectionalLight(0xffffff, 0.8);
      bottomLight.position.set(0, -1, 0);
      scene.add(bottomLight);

      // Add effects
      const effectPass = new EffectPass(camera, new BloomEffect(6));
      effectPass.renderToScreen = true;

      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(effectPass);

      // Add the globe
      const globe3D = new Globe3D(10);
      scene.add(globe3D.build());

      // Add the dots
      scene.add(dotsContainer);

      // Add the starfield
      const starField = generateStarField(130, 200);
      scene.add(starField);

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      renderer.setSize(width, height, false);

      mountRef.current.appendChild(renderer.domElement);

      resizeRendererToDisplaySize(true);

      setCurrentPoiName(dotsContainer.activeDot.name);
    }, []);

    // Initiate Animation
    useEffect(() => {
      animationFrameRef.current = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    return (
      <>
        <div
          id='mount'
          style={{ width: '100%', height: '200px' }}
          // onMouseMove={e => this.onDocumentMouseMove(e)}
          onClick={onGlobClick}
          ref={mountRef}
        />
        <div style={{ position: 'absolute', left: 200, top: 900 }}>
          <label style={{ color: 'white', display: 'block' }}>X: {rotationX}</label>
          <input
            type='range'
            id='rotationX'
            value={rotationX * 100}
            min={0}
            max={Math.PI * 2 * 100}
            onChange={e => setRotationX(parseInt(e.currentTarget.value, 10) / 100)}
          />
          <label style={{ color: 'white', display: 'block' }}>Y: {rotationY}</label>
          <input
            type='range'
            id='rotationY'
            value={rotationY * 100}
            min={0}
            max={Math.PI * 2 * 100}
            onChange={e => setRotationY(parseInt(e.currentTarget.value, 10) / 100)}
          />
        </div>

        <PoiPopup
          ref={popUpDivRef}
          top={centerOffset.centerTopOffset}
          left={centerOffset.centerLeftOffset}
          location={currentPoiName}
        />
      </>
    );
  }),
);

export class Globe extends React.Component<{}, IState> {
  private clock: Clock = new Clock();
  private globe3D: Globe3D;
  private starField: Object3D;
  private dotsContainer: DotsContainer3D;
  private scene: Scene;
  private mount: HTMLDivElement;
  private popUpDivRef = React.createRef<HTMLDivElement>();
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private composer: EffectComposer;
  private frameId: number;
  private mouse: Vector2 = new Vector2();
  private hoverdObject: Object3D;

  constructor(props) {
    super(props);
    this.state = { rotationX: 0, rotationY: 0, centerLeftOffset: 0, centerTopOffset: 0 };
  }

  public componentWillMount() {
    // Create new Scene object
    this.scene = new Scene();

    // Add main light
    const light = new AmbientLight(0xffffff, 0.7);
    this.scene.add(light);

    // Add secondary lights
    const leftLight = new DirectionalLight(0xffffff, 0.8);
    leftLight.position.set(-1, 0, 0);
    this.scene.add(leftLight);

    const rightLight = new DirectionalLight(0xffffff, 0.8);
    rightLight.position.set(1, 0, 0);
    this.scene.add(rightLight);

    const topLight = new DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 1, 0);
    this.scene.add(topLight);

    const bottomLight = new DirectionalLight(0xffffff, 0.8);
    bottomLight.position.set(0, -1, 0);
    this.scene.add(bottomLight);

    // ADD CAMERA
    this.camera = new PerspectiveCamera(50, 0.5, 0.1, 1000);
    this.camera.position.z = CAMERA_POS;

    // ADD RENDERER
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Add effects
    this.composer = new EffectComposer(this.renderer);
    const effectPass = new EffectPass(this.camera, new BloomEffect(6));
    effectPass.renderToScreen = true;

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);

    // Add the globe
    this.globe3D = new Globe3D(10);
    this.scene.add(this.globe3D.build());

    // Add the dots
    this.dotsContainer = new DotsContainer3D(10);
    this.scene.add(this.dotsContainer);

    // Add the starfield
    this.starField = generateStarField(130, 200);
    this.scene.add(this.starField);
  }

  public componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.camera.aspect = width / height;
    this.renderer.setSize(width, height, false);

    this.mount.appendChild(this.renderer.domElement);

    this.resizeRendererToDisplaySize(true);
    this.startAnimation();
  }

  public componentWillUnmount() {
    this.stopAnimation();
    this.mount.removeChild(this.renderer.domElement);
  }

  public render() {
    // this.dotsContainer.activeDot.rotation.set(this.state.rotationX, this.state.rotationY, 0, 'YXZ');
    // this.scene.rotation.set(-this.state.rotationX, -this.state.rotationY, 0);
    return (
      <>
        <div
          id='mount'
          style={{ width: '100%', height: '200px' }}
          onMouseMove={e => this.onDocumentMouseMove(e)}
          onClick={e => this.onClick()}
          ref={mount => (this.mount = mount)}
        />
        <div style={{ position: 'absolute', left: 200, top: 900 }}>
          <label style={{ color: 'white', display: 'block' }}>X: {this.state.rotationX}</label>
          <input
            type='range'
            id='rotationX'
            value={this.state.rotationX * 100}
            min={0}
            max={Math.PI * 2 * 100}
            onChange={e => this.setState({ rotationX: parseInt(e.currentTarget.value, 10) / 100 })}
          />
          <label style={{ color: 'white', display: 'block' }}>Y: {this.state.rotationY}</label>
          <input
            type='range'
            id='rotationY'
            value={this.state.rotationY * 100}
            min={0}
            max={Math.PI * 2 * 100}
            onChange={e => this.setState({ rotationY: parseInt(e.currentTarget.value, 10) / 100 })}
          />
        </div>

        <PoiPopup
          ref={this.popUpDivRef}
          top={this.state.centerTopOffset}
          left={this.state.centerLeftOffset}
          location={this.dotsContainer.activeDot.name}
        />
      </>
    );
  }

  private calculateAndSetCenterOffset(): void {
    const canvasHalfWidth = this.renderer.domElement.offsetWidth / 2;
    const canvasHalfHeight = this.renderer.domElement.offsetHeight / 2;
    this.setState({
      centerLeftOffset: canvasHalfWidth + this.renderer.domElement.offsetLeft,
      centerTopOffset: canvasHalfHeight + this.renderer.domElement.offsetTop,
    });
  }

  private onClick(): void {
    // TODO : ORL :  Move this to an an outer 'current poi' store/state
    this.dotsContainer.activeDot.unblink();
    this.dotsContainer.nextActiveDot();
    this.dotsContainer.activeDot.blink();

    const timeLine = new TimelineLite();
    timeLine.timeScale(ANIMATION_SPEED);

    const singleAnimationDuration = 1;

    timeLine.add(
      TweenMax.to(this.popUpDivRef.current, singleAnimationDuration / 4, {
        scale: 0.2,
        autoAlpha: 0,
        transformOrigin: 'top left',
      }),
      0,
    );

    // Creates the zoom out - zoom in when transitioning between dots.
    timeLine.add(
      TweenMax.to(this.camera.position, singleAnimationDuration / 2, {
        z: CAMERA_POS * 1.25,
        ease: Power2.easeInOut,
        repeat: 1,
        yoyo: true,
      }),
      0,
    );

    // This tween is responsible for rotating the scene to the appropriate active dot.
    timeLine.add(
      TweenMax.to(this.scene.rotation, singleAnimationDuration, {
        x: -this.dotsContainer.activeDot.rotation.x,
        y: -this.dotsContainer.activeDot.rotation.y,
        z: 0,
        ease: Power2.easeInOut,
      }),
      0,
    );

    // Display the node data "pop up"
    timeLine.add(
      TweenMax.to(this.popUpDivRef.current, singleAnimationDuration / 4, {
        scale: 1,
        autoAlpha: 1,
      }),
    );

    // TODO : ORL : Ensure re-rendering with a better method.
    this.forceUpdate();
  }

  private onDocumentMouseMove(e: React.MouseEvent): void {
    this.mouse.x = (e.nativeEvent.offsetX / this.mount.clientWidth) * 2 - 1;
    this.mouse.y = -(e.nativeEvent.offsetY / this.mount.clientHeight) * 2 + 1;
  }

  private startAnimation() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(() => this.animate());
    }
  }

  private stopAnimation() {
    cancelAnimationFrame(this.frameId);
  }

  private handleHover(): void {
    // TODO : ORL : This does not seem to do anything, ask about it.
    raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      const newIntersectedObject = intersects[0].object;
      if (this.hoverdObject !== newIntersectedObject) {
        this.globe3D.handleHoverOut(this.hoverdObject);
      }
      this.hoverdObject = intersects[0].object;
      this.globe3D.handleHover(this.hoverdObject);
    } else {
      if (this.hoverdObject) {
        this.globe3D.handleHoverOut(this.hoverdObject);
      }
    }
  }

  private resizeRendererToDisplaySize(forceResize: boolean = false) {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    if (canvas.width !== width || forceResize) {
      this.renderer.setSize(width, width, false);
      this.composer.setSize();
      canvas.removeAttribute('style');
      this.camera.aspect = 1;
      this.camera.updateProjectionMatrix();

      // Calculates and sets the center of the canvas for the POI popup
      this.calculateAndSetCenterOffset();
    }
  }

  private animate() {
    // this.globe3D.animate();
    this.handleHover();
    this.resizeRendererToDisplaySize();

    this.composer.render(this.clock.getDelta());
    // this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(() => this.animate());
  }
}
