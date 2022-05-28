import { resolveColor } from '@utils/styles';
import resolveSize from '@utils/styles/resolveSize';
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
      className={classNames('progress', resolveSize(size), resolveColor(color))}
      max={max}
    >
      {percentage}
    </progress>
  );
};

export default ProgressBar;
