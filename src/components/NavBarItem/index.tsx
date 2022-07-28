import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface INavBarItem extends LinkProps {
  label?: HTMLAnchorElement['text'];
  hasDropdown?: boolean;
  isBrand?: boolean;
  isActive?: boolean;
}

const NavBarItem = (props: PropsWithChildren<INavBarItem>) => {
  const { to, label, hasDropdown, isBrand, isActive, children, ...other } =
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
    <Link to={to} className='navbar-item' {...other}>
      {isBrand ? children : label}
    </Link>
  );
};

export default NavBarItem;
