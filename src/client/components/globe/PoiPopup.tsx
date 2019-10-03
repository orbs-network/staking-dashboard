import React, { forwardRef } from 'react';

interface IProps {
  name: string;
  top: number;
  left: number;
}

type Ref = HTMLDivElement;

const height = 100;
const width = 200;

export const PoiPopup = forwardRef<Ref, IProps>((props, ref) => {
  return (
    <div
      style={{
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        height,
        width,
        alignContent: 'center',
        alignItems: 'center',
        opacity: 0,

        left: props.left,
        top: props.top - height - 5,
      }}
      ref={ref}
    >
      <h1 style={{ color: 'red', textAlign: 'center' }}>Cool data about node - {props.name}</h1>
    </div>
  );
});
