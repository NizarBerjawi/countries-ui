import NavBarBurger from '@components/NavBarBurger';
import NavBarItem, { INavBarItem } from '@components/NavBarItem';
import classNames from 'classnames';
import React, { MouseEventHandler, PropsWithChildren, useState } from 'react';

export interface INavBar {
  links: INavBarItem[];
  hasBrand?: boolean;
}

const NavBar = (props: PropsWithChildren<INavBar>) => {
  const [open, setOpen] = useState(false);

  const { links, hasBrand } = props;

  const handleBurgerClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setOpen(!open);
  };

  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      {hasBrand && (
        <div className='navbar-brand'>
          <NavBarItem to='/' isBrand>
            <img
              src='https://bulma.io/images/bulma-logo.png'
              width='112'
              height='28'
            />
          </NavBarItem>

          <NavBarBurger isActive={open} onClick={handleBurgerClick} />
        </div>
      )}

      <div
        className={classNames('navbar-menu', {
          'is-active': open,
        })}
      >
        <div className='navbar-start'>
          {links.map((item: INavBarItem, index) => (
            <NavBarItem key={index} to={item.to} label={item.label} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
