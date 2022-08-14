import React, { PropsWithChildren } from 'react';
import Number from '@components/Number';

export interface IArea {
  children?: number;
}

const Area = ({ children }: PropsWithChildren<IArea>) => {
  if (!children) {
    return <></>;
  }

  return (
    <>
      <Number>{children}</Number>
      <span>
        {' '}
        km<sup>2</sup>
      </span>
    </>
  );
};

export default Area;
