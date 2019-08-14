/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import * as React from 'react';
import styled from 'styled-components';
import { TweenMax, TimelineLite, Power2, Elastic, Bounce, Back } from 'gsap';

const Root = styled.div`
  position: relative;
`;

export class Blockchain extends React.Component {
  private blockRefs = [];
  private timerId;

  public componentWillMount() {
    this.timerId = setInterval(() => this.animateNewBlock(), 3_000);
  }

  public componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  public render() {
    return (
      <Root>
        <svg
          onClick={() => this.animateNewBlock()}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 300 200'
          width='100%'
          height='200'
        >
          <defs>
            <line id='vline' x1='0' x2='0' y1='0' y2='300' stroke='#161616' strokeDasharray='2,2' strokeWidth='1.5' />
          </defs>
          <rect width='300' height='200' fill='#000' />
          {this.renderVLines()}
          {this.renderBlocks()}
        </svg>
      </Root>
    );
  }

  private animateNewBlock() {
    this.resetBlocks();
    const timeLine = new TimelineLite();
    const lastBlockX1 = this.blockRefs[14].getAttribute('x1');
    const lastBlockX2 = this.blockRefs[14].getAttribute('x2');
    const lastBlockY1 = this.blockRefs[14].getAttribute('y1');
    const lastBlockY2 = this.blockRefs[14].getAttribute('y2');
    timeLine.timeScale(1);
    timeLine.add(TweenMax.to(this.blockRefs[0], 0.25, { attr: { 'stroke-opacity': 0 }, ease: Back.easeOut }), 0);
    for (let i = 1; i < 15; i++) {
      const prevBlockRef = this.blockRefs[i - 1];
      const x1 = prevBlockRef.getAttribute('x1');
      const x2 = prevBlockRef.getAttribute('x2');
      const y1 = prevBlockRef.getAttribute('y1');
      const y2 = prevBlockRef.getAttribute('y2');
      timeLine.add(TweenMax.to(this.blockRefs[i], 0.5, { attr: { x1, x2, y1, y2 }, ease: Back.easeOut }), 0.04 * i);
    }
    timeLine.add(
      TweenMax.to(this.blockRefs[0], 0, {
        attr: { x1: lastBlockX1, x2: lastBlockX2, y1: lastBlockY1, y2: lastBlockY2 },
        ease: Back.easeOut,
      }),
    );
    timeLine.add(
      TweenMax.to(this.blockRefs[0], 0.5, {
        attr: { 'stroke-opacity': 1, 'stroke-width': 8, stroke: '#5e5a73' },
        ease: Back.easeOut,
      }),
    );
    timeLine.add(TweenMax.to(this.blockRefs[0], 0.5, { attr: { 'stroke-width': 4, stroke: '#383644'  }, ease: Back.easeOut }));
  }

  private renderVLines() {
    const result = [];
    for (let i = 0; i < 8; i++) {
      result.push(<use key={i} x={i * 44} y='0' xlinkHref='#vline' />);
    }
    return result;
  }

  private resetBlocks() {
    for (let i = 0; i < 15; i++) {
      const x = i * 22;
      const y = Math.sin(i) * 30 + 70;
      const blockRef = this.blockRefs[i];
      blockRef.setAttribute('x1', x);
      blockRef.setAttribute('x2', x);
      blockRef.setAttribute('y1', y);
      blockRef.setAttribute('y2', y + 40);
    }
  }

  private renderBlocks() {
    const result = [];
    for (let i = 0; i < 15; i++) {
      const x = i * 22;
      const y = Math.sin(i) * 30 + 70;
      result.push(
        <line
          key={i}
          x1={x}
          x2={x}
          y1={y}
          y2={y + 40}
          strokeOpacity='1'
          stroke='#383644'
          strokeWidth='4'
          strokeLinecap='round'
          ref={ref => (this.blockRefs[i] = ref)}
        />,
      );
    }
    return result;
  }
}
