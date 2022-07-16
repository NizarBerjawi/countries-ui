import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

export interface IPagination {
  hasPrev?: boolean;
  hasMore?: boolean;
  onPrev?: MouseEventHandler;
  onNext?: MouseEventHandler;
}

const Pagination = ({ hasPrev, hasMore, onPrev, onNext }: IPagination) => {
  if (!hasMore && !hasPrev) {
    return <></>;
  }
  return (
    <nav
      className='pagination is-centered'
      role='navigation'
      aria-label='pagination'
    >
      <ul className='pagination-list'>
        <li>
          <a
            onClick={onPrev}
            className={classNames('pagination-link', {
              'is-disabled': !hasPrev,
            })}
          >
            Previous
          </a>
        </li>
        <li>
          <a
            onClick={onNext}
            className={classNames('pagination-link', {
              'is-disabled': !hasMore,
            })}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
