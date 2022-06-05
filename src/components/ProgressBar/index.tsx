import classNames from 'classnames';
import React from 'react';
import { Color, ProgressSize } from 'src/types/styles';

interface IProgressBarProps {
  max?: string;
  percentage: string;
  size: ProgressSize;
  color: Color;
}

const ProgressBar = ({ size, color, percentage, max }: IProgressBarProps) => {
  return (
    <progress
      className={classNames({
        progress: true,
        [`is-${size}`]: !!size,
        [`is-${color}`]: !!color,
      })}
      max={max}
    >
      {percentage}
    </progress>
  );
};

export default ProgressBar;
