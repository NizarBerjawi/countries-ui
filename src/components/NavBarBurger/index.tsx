import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

export interface INavBarBurger {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const NavBarBurger = ({ isActive, onClick }: INavBarBurger) => (
  <a
    role='button'
    className={classNames('navbar-burger', {
      'is-active': isActive,
    })}
    aria-label='menu'
    aria-expanded='false'
    onClick={onClick}
  >
    <span aria-hidden='true'></span>
    <span aria-hidden='true'></span>
    <span aria-hidden='true'></span>
  </a>
);

export default NavBarBurger;
