import classNames from 'classnames';
import React, { PropsWithChildren, MouseEventHandler } from 'react';

export interface INavBarItem {
  path?: HTMLAnchorElement['href'];
  label?: HTMLAnchorElement['text'];
  hasDropdown?: boolean;
  isBrand?: boolean;
  isActive?: boolean;
}

const NavBarItem = (props: PropsWithChildren<INavBarItem>) => {
  const { path, label, hasDropdown, isBrand, isActive, children } =
    props;

  if (hasDropdown) {
    return (
      <div
        className={classNames('navbar-item', {
          'has-dropdown': !!hasDropdown,
          'is-active': isActive,
        })}
      >
        <a className='navbar-link'>{label}</a>

        {isActive && <div className='navbar-dropdown'>{children}</div>}
      </div>
    );
  }

  return (
    <a href={path} className='navbar-item'>
      {isBrand ? children : label}
    </a>
  );
};

export default NavBarItem;
