import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface ICardListProps {
  centered?: boolean;
}

const CardList = ({
  centered,
  children,
}: PropsWithChildren<ICardListProps>) => (
  <div
    className={classNames('columns', 'is-widescreen', 'is-multiline', {
      'is-centered': centered,
    })}
  >
    {children}
  </div>
);

export default CardList;
