import React from 'react';
import styled from 'styled-components';

interface IProps {
  src: string;
  className?: string;
}

const AvatarDiv = styled('div')<{ src: string }>(props => ({
  backgroundImage: `url(${props.src})`,
  backgroundSize: 'cover',
  height: 40,
  width: 40,
  borderRadius: '50%',
}));

export const Avatar: React.FC<IProps> = (props: IProps) => {
  const { src, className } = props;

  return <AvatarDiv src={src} className={className} />;
};
