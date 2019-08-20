/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DigitalClock } from './DigitalClock';

const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ClockCircleContainer = styled.div`
  width: 100%;
`;

const clockSVG = (deg: number) => {
  const transform = `rotate(${deg}deg)`;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='100%'
      viewBox='0 0 211 211'
      style={{ transformOrigin: 'center', transform }}
    >
      <g fill='none' fillRule='evenodd' stroke='#FFF' strokeWidth='.25'>
        <path
          fill='#EEE'
          d='M20.893 168.612l4.601-3.34-.256-.349-.259-.351-4.641 3.288a122.333 122.333 0 0 0 .555.752zm-3.202-4.556l4.773-3.097a82.743 82.743 0 0 1-.478-.723l-4.807 3.04c.237.364.371.568.512.78zm-2.956-4.715l4.932-2.843c-.12-.203-.235-.401-.435-.751l-4.967 2.792c.15.26.306.525.47.802zm-2.7-4.856l5.076-2.59c-.187-.356-.293-.559-.4-.768l-5.104 2.533c.152.298.29.567.427.825zm-2.443-4.997l5.206-2.319c-.097-.213-.19-.423-.351-.792l-5.235 2.268a237.472 237.472 0 0 0 .38.843zm-2.17-5.109l5.322-2.053a73.65 73.65 0 0 1-.31-.805l-5.35 1.991a273.3 273.3 0 0 1 .338.867zm-1.901-5.22l5.425-1.77a52.709 52.709 0 0 1-.269-.824L5.23 138.28c.077.24.154.471.292.88zM3.9 133.853l5.516-1.49a70.715 70.715 0 0 1-.226-.831l-5.528 1.427a90.387 90.387 0 0 1 .117.447l.12.447zm-1.334-5.384l5.586-1.202a426.302 426.302 0 0 0-.181-.846l-5.598 1.146c.04.192.083.397.136.642l.057.26zm-1.043-5.442l5.637-.914a77.798 77.798 0 0 1-.133-.856l-5.655.852c.039.25.079.49.15.918zm-.762-5.495l5.682-.62a67.036 67.036 0 0 1-.087-.86l-5.693.558.049.46.05.462zm-.465-5.524l5.711-.327a65.427 65.427 0 0 1-.046-.865l-5.711.265c.019.412.031.668.046.927zm-.171-5.541l5.717-.034v-.858l-5.717-.034v.926zm.125-5.54l5.711.264a104.676 104.676 0 0 1 .046-.864l-5.71-.328c-.016.26-.028.516-.047.927zm.413-5.53l5.693.559c.035-.362.06-.612.087-.86l-5.682-.62-.049.46c-.026.245-.03.286-.05.461zm.709-5.499l5.655.853a77.392 77.392 0 0 0 .133-.856l-5.637-.914c-.072.428-.112.668-.151.917zm1.001-5.457l5.598 1.145a425.203 425.203 0 0 1 .18-.846l-5.585-1.202c-.092.421-.143.658-.193.903zm1.289-5.392l5.528 1.427c.082-.31.155-.576.226-.832L3.9 78.153c-.036.13-.074.27-.12.448-.026.094-.026.094-.05.19l-.068.257zm1.567-5.322l5.448 1.715c.123-.382.194-.6.269-.824L5.52 72.846c-.138.408-.215.639-.292.88zm1.855-5.233l5.35 1.991c.107-.283.209-.547.31-.804l-5.322-2.054a271.203 271.203 0 0 0-.338.867zm2.128-5.132l5.235 2.267c.161-.369.254-.578.351-.792l-5.206-2.318a236.16 236.16 0 0 1-.38.843zm2.395-5.015l5.105 2.533a55.99 55.99 0 0 1 .399-.769l-5.077-2.59c-.136.258-.275.528-.427.826zm2.658-4.88l4.967 2.793c.2-.35.315-.549.435-.751l-4.932-2.843c-.164.277-.32.541-.47.802zm2.914-4.737l4.807 3.04c.15-.228.305-.464.478-.722L17.69 47.95a67.009 67.009 0 0 0-.512.78zm3.159-4.584l4.641 3.289.259-.351.256-.35-4.6-3.34-.162.22-.118.158-.276.374zm3.402-4.413l4.458 3.525c.148-.183.294-.36.552-.673l-4.417-3.57-.256.31-.042.05-.295.358zm3.628-4.232l4.27 3.752.252-.276.042-.045.291-.32-4.225-3.797c-.296.319-.46.498-.63.686zm3.85-4.035l4.063 3.964c.204-.205.408-.407.616-.608l-4.017-4.01-.416.411-.246.243zm4.056-3.832l3.848 4.17a131.969 131.969 0 0 0 .649-.578l-3.801-4.214c-.192.168-.373.33-.696.622zm4.255-3.617l3.617 4.36c.317-.256.497-.4.683-.546l-3.572-4.4a154.97 154.97 0 0 0-.728.586zm4.438-3.394l3.383 4.54.71-.51-3.33-4.58a122.451 122.451 0 0 0-.763.55zm4.616-3.16l3.137 4.709c.263-.17.502-.325.734-.472l-3.08-4.743a89.33 89.33 0 0 0-.79.506zm4.777-2.918l2.88 4.867c.206-.12.407-.233.763-.431l-2.829-4.9a91.59 91.59 0 0 0-.814.464zm4.92-2.665l2.623 5.008a95.582 95.582 0 0 1 .78-.395l-2.565-5.036c-.303.15-.576.288-.838.423zm5.064-2.41l2.348 5.136c.217-.097.429-.188.804-.348l-2.297-5.165-.429.189-.028.012-.398.175zm5.175-2.142l2.08 5.25c.262-.1.53-.2.817-.307L69.4 6.993a278.735 278.735 0 0 1-.88.334zm5.288-1.877l1.794 5.352c.229-.074.45-.144.838-.266l-1.737-5.374a59.33 59.33 0 0 0-.895.288zm5.378-1.6l1.508 5.443c.26-.071.53-.143.846-.225l-1.445-5.453-.264.068-.192.049c-.18.046-.322.083-.453.119zm5.455-1.316l1.217 5.51a437.76 437.76 0 0 0 .86-.179l-1.16-5.522a58.04 58.04 0 0 0-.917.191zm-.175-.218zm5.689-.811l.926 5.56a80.083 80.083 0 0 1 .87-.132l-.863-5.578c-.254.039-.498.078-.933.15zM95.72.753l.629 5.605c.251-.027.506-.052.874-.087L96.66.656l-.47.048-.468.05zm5.597-.459l.331 5.633c.24-.014.472-.026.88-.045L102.26.248c-.418.019-.678.031-.942.046zm5.614-.169l.035 5.639h.873l.034-5.639h-.942z'
        />
        <path
          fill='#FFF'
          d='M111.394.13l-.263 5.606c.398.02.625.031.858.045l.325-5.605a74.295 74.295 0 0 0-.92-.046zm4.76.523l-.555 5.588c.358.034.607.06.853.086L117.07.75a686.982 686.982 0 0 0-.915-.097zm5.467.697l-.847 5.55a78.13 78.13 0 0 0 .85.13l.908-5.532c-.425-.071-.664-.11-.911-.148zm5.426.983l-1.138 5.495a429.606 429.606 0 0 1 .84.177l1.194-5.483a120.212 120.212 0 0 0-.896-.189zm5.361 1.266l-1.418 5.426c.308.081.572.152.826.222l1.48-5.415a33.23 33.23 0 0 0-.444-.117l-.188-.05-.256-.066zm5.291 1.54l-1.704 5.347c.379.12.595.19.817.263l1.76-5.325c-.405-.135-.634-.21-.873-.285zm5.202 1.822l-1.978 5.25c.28.106.543.206.798.305l2.04-5.224a273.355 273.355 0 0 0-.86-.331zm5.103 2.09l-2.252 5.138c.365.158.573.25.785.345l2.303-5.11a229.4 229.4 0 0 1-.39-.175l-.028-.012-.418-.186zm4.986 2.352l-2.516 5.011c.207.105.409.208.762.391l2.573-4.983c-.256-.133-.523-.27-.819-.419zm4.851 2.612l-2.774 4.875c.347.196.544.309.745.427l2.825-4.842c-.275-.161-.538-.313-.796-.46zm4.71 2.862l-3.02 4.719c.226.146.46.299.716.468l3.077-4.685c-.21-.139-.412-.27-.773-.502zm4.558 3.103l-3.268 4.556.348.252.347.252 3.318-4.516a121.613 121.613 0 0 1-.745-.544zm4.388 3.342l-3.503 4.376c.182.145.358.288.668.54l3.547-4.336-.306-.25-.05-.04-.356-.29zm4.207 3.563l-3.728 4.192a131.749 131.749 0 0 1 .635.573l3.773-4.148c-.315-.29-.493-.451-.68-.617zm4.013 3.782l-3.94 3.988c.203.2.403.4.603.604l3.984-3.944-.647-.648zm3.809 3.984l-4.144 3.778a131.412 131.412 0 0 0 .572.635l4.188-3.732a51.614 51.614 0 0 0-.616-.68zm3.596 4.18l-4.332 3.55c.252.31.396.487.54.669l4.372-3.507a153.971 153.971 0 0 0-.58-.713zm3.375 4.36l-4.512 3.32.252.348.252.348 4.552-3.271a121.603 121.603 0 0 0-.544-.746zm3.142 4.533l-4.68 3.08c.169.257.321.491.467.718l4.714-3.024a141.093 141.093 0 0 0-.501-.774zm2.9 4.693l-4.836 2.828c.118.2.23.398.426.745l4.87-2.777c-.147-.258-.298-.52-.46-.796zm2.65 4.833l-4.977 2.575a118.162 118.162 0 0 1 .39.763l5.006-2.519a57.57 57.57 0 0 0-.418-.82zm2.397 4.973l-5.105 2.306c.096.212.186.42.344.786l5.134-2.255a238.102 238.102 0 0 0-.373-.837zm2.13 5.084l-5.219 2.042c.1.256.199.518.304.8l5.245-1.98a273.848 273.848 0 0 1-.33-.862zm1.865 5.195l-5.32 1.761c.074.223.143.44.264.819l5.342-1.706c-.076-.24-.151-.469-.286-.874zm1.59 5.282l-5.409 1.481c.07.255.141.519.222.827l5.42-1.42a91.122 91.122 0 0 1-.066-.256l-.049-.189a33.324 33.324 0 0 0-.118-.443zm1.31 5.358l-5.478 1.195a432.204 432.204 0 0 0 .178.841l5.488-1.139c-.05-.244-.1-.479-.189-.897zm1.023 5.416l-5.528.91a78.5 78.5 0 0 1 .131.85l5.544-.847a56.813 56.813 0 0 0-.147-.913zm.747 5.47l-5.571.616c.026.246.051.496.086.855l5.581-.555a691.69 691.69 0 0 1-.048-.459l-.048-.458zm.456 5.497l-5.6.325a50.512 50.512 0 0 1 .046.86l5.6-.264c-.019-.408-.031-.663-.046-.921zm.168 5.515l-5.605.033v.854l5.605.033v-.92zm-.123 5.514l-5.6-.264a105.602 105.602 0 0 1-.044.86l5.599.325c.015-.258.027-.513.045-.92zm-.405 5.502l-5.581-.555c-.035.36-.06.609-.086.855l5.57.617c.02-.174.023-.215.049-.458l.048-.459zm-.696 5.473l-5.544-.847a78.334 78.334 0 0 0-.13.85l5.527.91c.07-.426.11-.665.147-.913zm-.982 5.432l-5.488-1.14a428.337 428.337 0 0 1-.178.842l5.477 1.195c.09-.418.14-.653.189-.897zm-1.265 5.367l-5.42-1.42a71.14 71.14 0 0 1-.222.827l5.41 1.481c.035-.128.071-.267.117-.443l.049-.19.066-.255zm-1.537 5.296l-5.342-1.706c-.12.38-.19.596-.263.819l5.319 1.761c.135-.405.21-.634.286-.874zm-1.82 5.208l-5.246-1.98c-.105.28-.205.543-.304.799l5.218 2.042a273.053 273.053 0 0 0 .331-.861zm-2.088 5.108l-5.134-2.255c-.158.366-.248.574-.344.786l5.105 2.306a237.506 237.506 0 0 1 .373-.837zm-2.35 4.99l-5.006-2.518c-.105.207-.208.41-.391.763l4.978 2.575c.133-.256.27-.523.418-.82zm-2.61 4.857l-4.87-2.777c-.195.347-.308.544-.426.745l4.837 2.828.46-.796zm-2.859 4.715l-4.714-3.024c-.146.227-.298.46-.467.717l4.68 3.08c.138-.21.27-.413.501-.773zm-3.1 4.562l-4.55-3.271-.253.348-.252.347 4.512 3.322a121.708 121.708 0 0 1 .544-.746zm-3.338 4.393l-4.371-3.507c-.145.182-.289.359-.541.668l4.332 3.552a154.221 154.221 0 0 1 .58-.713zm-3.56 4.211l-4.188-3.732a131.859 131.859 0 0 1-.572.635l4.144 3.778c.289-.316.45-.494.616-.68zm-3.778 4.017l-3.984-3.944c-.2.203-.4.404-.603.604l3.94 3.988.647-.648zm-3.98 3.813l-3.773-4.148a131.76 131.76 0 0 0-.635.573l3.728 4.192c.187-.166.365-.328.68-.617zm-4.175 3.6l-3.547-4.337c-.31.253-.486.396-.668.541l3.503 4.376a154.225 154.225 0 0 0 .712-.58zm-4.355 3.378l-3.318-4.516-.347.252-.348.252 3.268 4.556a121.396 121.396 0 0 0 .745-.544zm-4.53 3.145l-3.077-4.685c-.256.17-.49.322-.717.468l3.021 4.719c.36-.232.563-.363.773-.502zm-4.687 2.904l-2.825-4.842c-.201.118-.398.231-.745.427l2.774 4.875c.258-.147.52-.299.796-.46zm-4.828 2.653l-2.573-4.983c-.353.183-.555.286-.762.39l2.516 5.012c.296-.15.563-.286.819-.42zm-4.969 2.399l-2.303-5.111c-.212.096-.42.187-.785.345l2.252 5.138a238.128 238.128 0 0 0 .836-.372zm-5.078 2.13l-2.04-5.223c-.256.1-.518.199-.799.304l1.978 5.251a273.88 273.88 0 0 1 .86-.331zm-5.19 1.869l-1.76-5.325c-.222.073-.438.142-.817.263l1.704 5.347c.24-.075.468-.15.873-.285zm-5.277 1.592l-1.48-5.415c-.253.07-.517.141-.825.222l1.418 5.426.256-.067.188-.049c.177-.045.315-.082.443-.117zm-5.352 1.31l-1.194-5.483a427.47 427.47 0 0 0-.84.177l1.138 5.495a56.346 56.346 0 0 0 .896-.19zm-5.411 1.024l-.908-5.533a78.224 78.224 0 0 1-.85.13l.847 5.551c.247-.038.486-.077.91-.148zm-5.463.748l-.617-5.577c-.246.027-.495.052-.853.086l.555 5.588.457-.049.458-.048zm-5.492.457l-.325-5.606a50.398 50.398 0 0 1-.859.045l.264 5.606c.408-.018.662-.03.92-.045zm-5.51.168l-.033-5.611h-.852l-.034 5.611h.92zm-5.508-.123l.263-5.606c-.398-.019-.625-.03-.858-.045l-.325 5.606c.257.014.512.027.92.045zm-5.497-.405l.555-5.588c-.359-.034-.608-.06-.854-.086l-.616 5.577.457.048.458.049zm-5.467-.697l.846-5.55a78.193 78.193 0 0 0-.85-.13l-.907 5.532c.424.071.663.11.91.148zm-5.426-.983l1.138-5.495a428.253 428.253 0 0 1-.84-.177l-1.194 5.483c.417.09.652.14.896.189zm-5.362-1.266l1.419-5.426a70.94 70.94 0 0 1-.826-.222l-1.48 5.415a33.258 33.258 0 0 0 .632.166l.255.067zm-10.493-3.362l1.978-5.25c-.28-.106-.542-.206-.798-.305l-2.04 5.224a272.579 272.579 0 0 0 .86.331zm-5.103-2.09l2.253-5.138a49.802 49.802 0 0 1-.786-.345l-2.303 5.11a237.81 237.81 0 0 1 .836.373zm-4.986-2.352l2.517-5.011a55.98 55.98 0 0 1-.762-.391l-2.573 4.983c.255.133.522.27.818.419zm-4.85-2.612l2.774-4.875a48.141 48.141 0 0 1-.745-.427l-2.825 4.842c.275.161.537.313.795.46zm-4.71-2.862l3.02-4.719a82.45 82.45 0 0 1-.717-.468l-3.077 4.685c.21.139.413.27.773.502zm-8.946-6.445l3.502-4.376a84.576 84.576 0 0 1-.667-.54l-3.548 4.336a154.16 154.16 0 0 1 .713.58zm-4.208-3.563l3.728-4.192a131.936 131.936 0 0 1-.634-.573l-3.773 4.148c.315.29.493.451.68.617zm-4.012-3.782l3.94-3.988c-.204-.2-.404-.4-.604-.604l-3.984 3.944.242.241c.04.042.04.042.082.083l.324.324zm-3.81-3.984l4.144-3.778a131.168 131.168 0 0 0-.572-.635l-4.188 3.732c.166.187.328.365.617.68zm-3.933-3.954l4.332-3.551c-.252-.31-.396-.486-.54-.668l-4.372 3.506a154.024 154.024 0 0 0 .58.713zm49.76 33.466l1.705-5.347c-.38-.12-.595-.19-.818-.263l-1.76 5.325c.405.135.634.21.874.285zm-29.41-14.84l3.268-4.557-.198-.144-.496-.36-3.318 4.516a121.57 121.57 0 0 1 .744.544z'
        />
      </g>
    </svg>
  );
};

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const targetTime = Date.now() + HOUR * 14 + MINUTE * 45 + SECOND * 3;

export const Clock: React.FunctionComponent = () => {
  const [timeDiff, setTimeDiff] = useState(calcTimeDiff);

  useEffect(() => {
    const timerID = setInterval(() => setTimeDiff(calcTimeDiff()), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function calcTimeDiff() {
    let diff = targetTime - Date.now();
    const hours = Math.floor(diff / HOUR);
    diff = diff - hours * HOUR;
    const minutes = Math.floor(diff / MINUTE);
    diff = diff - minutes * MINUTE;
    const seconds = Math.floor(diff / SECOND);
    return { hours, minutes, seconds };
  }

  const deg = timeDiff.seconds * 5;
  return (
    <Root>
      <ClockCircleContainer>{clockSVG(deg)}</ClockCircleContainer>
      <DigitalClock hours={timeDiff.hours} minutes={timeDiff.minutes} seconds={timeDiff.seconds} />
    </Root>
  );
};
