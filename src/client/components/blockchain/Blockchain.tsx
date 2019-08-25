/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { Back, TimelineLite, TweenMax } from 'gsap';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: relative;
`;

interface IProps {
  blockHeight: number;
}

export const Blockchain: React.FunctionComponent<IProps> = ({ blockHeight }) => {
  const blockRefs = [];
  for (let i = 0; i < 15; i++) {
    blockRefs.push(useRef(null));
  }
  useEffect(animateNewBlock);

  return (
    <Root>
      <svg
        onClick={animateNewBlock}
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 300 200'
        width='100%'
      >
        <defs>
          <line id='vline' x1='0' x2='0' y1='0' y2='300' stroke='#161616' strokeDasharray='2,2' strokeWidth='1.5' />
        </defs>
        <rect width='300' height='200' fill='#000' />
        {renderVLines()}
        {renderBlocks()}
      </svg>
    </Root>
  );

  function animateNewBlock() {
    resetBlocks();
    const timeLine = new TimelineLite();
    const lastBlockX1 = blockRefs[14].current.getAttribute('x1');
    const lastBlockX2 = blockRefs[14].current.getAttribute('x2');
    const lastBlockY1 = blockRefs[14].current.getAttribute('y1');
    const lastBlockY2 = blockRefs[14].current.getAttribute('y2');
    timeLine.timeScale(1);
    timeLine.add(TweenMax.to(blockRefs[0].current, 0.25, { attr: { 'stroke-opacity': 0 }, ease: Back.easeOut }), 0);
    for (let i = 1; i < 15; i++) {
      const prevBlockRef = blockRefs[i - 1];
      const x1 = prevBlockRef.current.getAttribute('x1');
      const x2 = prevBlockRef.current.getAttribute('x2');
      const y1 = prevBlockRef.current.getAttribute('y1');
      const y2 = prevBlockRef.current.getAttribute('y2');
      timeLine.add(TweenMax.to(blockRefs[i].current, 0.5, { attr: { x1, x2, y1, y2 }, ease: Back.easeOut }), 0.04 * i);
    }
    timeLine.add(
      TweenMax.to(blockRefs[0].current, 0, {
        attr: { x1: lastBlockX1, x2: lastBlockX2, y1: lastBlockY1, y2: lastBlockY2 },
        ease: Back.easeOut,
      }),
    );
    timeLine.add(
      TweenMax.to(blockRefs[0].current, 0.5, {
        attr: { 'stroke-opacity': 1, 'stroke-width': 8, stroke: '#5e5a73' },
        ease: Back.easeOut,
      }),
    );
    timeLine.add(
      TweenMax.to(blockRefs[0].current, 0.5, { attr: { 'stroke-width': 4, stroke: '#383644' }, ease: Back.easeOut }),
    );
  }

  function renderVLines() {
    const result = [];
    for (let i = 0; i < 8; i++) {
      result.push(<use key={i} x={i * 44} y='0' xlinkHref='#vline' />);
    }
    return result;
  }

  function resetBlocks() {
    for (let i = 0; i < 15; i++) {
      const x = i * 22;
      const y = Math.sin(i) * 30 + 70;
      const blockRef = blockRefs[i];
      blockRef.current.setAttribute('x1', x);
      blockRef.current.setAttribute('x2', x);
      blockRef.current.setAttribute('y1', y);
      blockRef.current.setAttribute('y2', y + 40);
    }
  }

  function renderBlocks() {
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
          ref={blockRefs[i]}
        />,
      );
    }
    return result;
  }
};
