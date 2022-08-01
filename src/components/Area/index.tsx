import Number from '@components/Number';
import React, { PropsWithChildren } from 'react';

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
        km<span className='sup'>2</span>
      </span>
    </>
  );
};

export default Area;
