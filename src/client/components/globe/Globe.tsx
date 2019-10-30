/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Power2, TimelineLite, TweenMax } from 'gsap';
import styled from 'styled-components';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import { AmbientLight, Clock, DirectionalLight, PerspectiveCamera, Raycaster, Scene, WebGLRenderer } from 'three';
import { observer } from 'mobx-react';

import { DotsContainer3D } from './DotsContainer3D';
import { Globe3D } from './Globe3D';
import { generateStarField } from './StarField';
import { PoiPopup } from './poiCard/PoiPopup';
import { usePoiStore } from '../../store/storeHooks';
import { useTheme } from '../base/themeHooks';

const CAMERA_POS = 35;
const ANIMATION_SPEED = 0.8;

const MountDiv = styled('div')({
  position: 'relative', // Ensures that we can center the pop up with HTML
  width: '100%',
});

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

  // Adding all of the scene effects, post processing and static 3d assets.
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

    // Add the starfield
    const starField = generateStarField(130, 200);
    scene.add(starField);
  }, [scene, composer]);

  return {
    clock,
    rayCaster,
    scene,
    renderer,
    composer,
    camera,
  };
};

export const GlobeFc = observer(() => {
  // Mobx stores
  const poiStore = usePoiStore();

  // Theme
  const theme = useTheme();

  // Dom elements refs
  const mountRef = useRef<HTMLDivElement>(null);
  const popUpDivRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const animationFrameRef = useRef<number>(null);
  const animationTimelineRef = useRef<TimelineLite>(null);

  // Builds the 3d dots container
  const dotsContainer: DotsContainer3D = useMemo(() => new DotsContainer3D(poiStore.pointsOfInterest, 10), [
    poiStore.pointsOfInterest,
  ]);

  // Gets the Globe animations objects
  const { renderer, composer, camera, clock, scene } = useGlobeAnimation();

  /**
   * Fits the renderer and the camera to the actual display size + recalculates the center offsets.
   */
  const resizeRendererToDisplaySize = useCallback(
    (forceResize: boolean = false) => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;

      if (canvas.width !== width || forceResize) {
        renderer.setSize(width, width, false);
        composer.setSize();
        canvas.removeAttribute('style');
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    },
    [renderer, composer, camera, renderer.domElement, composer],
  );

  /**
   * Calls all relevant animations functions and sets the animation for the next frame.
   */
  const animate = useCallback(() => {
    resizeRendererToDisplaySize();

    // Apply post-processing
    composer.render(clock.getDelta());

    // Continue the animation in the next frame & keep reference to the frame id
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [clock, composer, animationFrameRef, resizeRendererToDisplaySize]);

  /**
   * Performs all of the required animations for the given location
   */
  const animateGlobeAndPopUpDisplay = useCallback(
    (poiRotation: { xRotation: number; yRotation: number }, onPopUpHidden?: () => void) => {
      const timeLine = new TimelineLite();
      timeLine.timeScale(ANIMATION_SPEED);

      const singleAnimationDuration = 1;

      animationTimelineRef.current = timeLine;

      // Shrinks and hides the pop up.
      const popUpHidingTween = TweenMax.to(popUpDivRef.current, singleAnimationDuration / 4, {
        scale: 0.2,
        autoAlpha: 0,
        transformOrigin: `center -${theme.cardTheme.paddingInEm}em`,
        ease: Power2.easeIn,
      });

      // Do we have a on hidden callback ?
      if (onPopUpHidden) {
        popUpHidingTween.eventCallback('onComplete', () => onPopUpHidden());
      }

      timeLine.add(popUpHidingTween, 0);

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
          x: -poiRotation.xRotation,
          y: -poiRotation.yRotation,
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
          ease: Power2.easeOut,
        }),
      );

      return timeLine;
    },
    [camera, scene, popUpDivRef.current, theme.cardTheme.paddingInEm],
  );

  /**
   * Performs all of the animations required for the transition between POIs.
   */
  const animateGlobeAndPopUpDisplayForNextPoi = useCallback(
    (onPopUpHidden?: () => void) => {
      return animateGlobeAndPopUpDisplay(
        {
          xRotation: poiStore.nextPoi.xRotation,
          yRotation: poiStore.nextPoi.yRotation,
        },
        onPopUpHidden,
      );
    },
    [poiStore.nextPoi],
  );

  /**
   * Handles both store updates and animations for the transitioning to the next POI.
   */
  const performTransitionToNextPoi = useCallback(() => {
    // Start animating to the next POI
    animateGlobeAndPopUpDisplayForNextPoi(() => poiStore.nextCurrentPoi());

    // Activates the relevant poi-dot
    dotsContainer.setActiveDotById(poiStore.nextPoi.id);

    // Actually switch to the next POI
  }, [animateGlobeAndPopUpDisplayForNextPoi, dotsContainer, poiStore]);

  /**
   * Animates transition to next point
   */
  const onGlobClickHandler = useCallback(() => {
    // Prevents multi-clicking until the current animation timeline is done.
    if (animationTimelineRef.current && animationTimelineRef.current.isActive()) {
      return;
    }

    // Perform the transition to the next POI
    performTransitionToNextPoi();
  }, [performTransitionToNextPoi]);

  // Add the dots
  useEffect(() => {
    scene.add(dotsContainer);
  }, [scene, dotsContainer]);

  // Appends the renderer DOM element to its proper div
  useEffect(() => {
    mountRef.current.appendChild(renderer.domElement);
  }, [renderer.domElement, mountRef.current]);

  // Adjusts camera aspect and renderer size
  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    camera.aspect = width / height;
    renderer.setSize(width, height, false);

    resizeRendererToDisplaySize(true);
  }, [mountRef.current, camera, renderer]);

  // Initiate Animation
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  // First time animating to first poi
  useEffect(() => {
    const currentPoi = poiStore.currentPoi;

    // Animate to the initial POI
    animateGlobeAndPopUpDisplay({ xRotation: currentPoi.xRotation, yRotation: currentPoi.yRotation });

    // Activates the poi dot
    dotsContainer.setActiveDotById(currentPoi.id);
  }, []);

  return (
    <>
      <MountDiv id='mount' onClick={onGlobClickHandler} ref={mountRef}>
        <PoiPopup ref={popUpDivRef} location={poiStore.currentPoi.name} />
      </MountDiv>
    </>
  );
});
