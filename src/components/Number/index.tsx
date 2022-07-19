import React, { PropsWithChildren } from 'react';

export interface INumber {
  children?: number;
}

const Number = ({ children }: PropsWithChildren<INumber>) => {
  if (!children) {
    return <></>;
  }

  if (isNaN(children)) {
    throw new Error('Number component only accepts valid numbers');
  }

  const value = children?.toLocaleString(undefined, {
    minimumFractionDigits: 0,
  });

  return <>{value}</>;
};

export default Number;
