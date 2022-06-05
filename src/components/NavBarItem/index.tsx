import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

interface INavBarItem {
  path?: HTMLAnchorElement['href'];
  label?: HTMLAnchorElement['text'];
  hasDropdown?: boolean;
  isBrand?: boolean;
  isHoverable?: boolean;
}

const NavBarItem = (props: PropsWithChildren<INavBarItem>) => {
  const { path, label, hasDropdown, isBrand, isHoverable, children } = props;
  if (hasDropdown) {
    return (
      <div
        className={classNames('navbar-item', {
          'has-dropdown': !!hasDropdown,
          'is-hoverable': !!isHoverable,
        })}
      >
        <a className='navbar-link'>{label}</a>

        <div className='navbar-dropdown'>{children}</div>
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
