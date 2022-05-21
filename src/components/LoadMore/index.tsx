import { resolveColor } from '@utils/styles';
import resolveSize from '@utils/styles/resolveSize';
import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';
import { Color, TagSize } from 'src/types/styles';

interface ILoadMoreProps {
  onClick: MouseEventHandler;
  label: string;
  size?: TagSize;
  color?: Color;
}

const LoadMore = ({ size, color, label, onClick }: ILoadMoreProps) => {
  return (
    <div className='is-flex is-flex-direction-row is-justify-content-center'>
      <span
        className={classNames(
          'tag',
          'is-clickable',
          resolveSize(size),
          resolveColor(color),
        )}
        onClick={onClick}
      >
        {label}
      </span>
    </div>
  );
};

export default LoadMore;
