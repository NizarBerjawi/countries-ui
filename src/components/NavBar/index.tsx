import NavBarBurger from '@components/NavBarBurger';
import NavBarItem from '@components/NavBarItem';
import React, { PropsWithChildren } from 'react';

interface INavBar {
  hasBrand?: boolean;
}

const NavBar = (props: PropsWithChildren<INavBar>) => (
  <nav className='navbar' role='navigation' aria-label='main navigation'>
    {props.hasBrand && (
      <div className='navbar-brand'>
        <NavBarItem path='https://bulma.io' isBrand>
          <img
            src='https://bulma.io/images/bulma-logo.png'
            width='112'
            height='28'
          />
        </NavBarItem>

        <NavBarBurger />
      </div>
    )}

    <div className='navbar-menu'>
      <div className='navbar-start'>
        <NavBarItem path='/home' label='Home' />
        <NavBarItem path='/continents' label='Continents' />
        <NavBarItem path='/countries' label='Countries' />
        <NavBarItem path='/langauges' label='Languages' />
        <NavBarItem path='/currencies' label='Currencies' />
        <NavBarItem path='/timeZones' label='Time Zones' />

        <NavBarItem hasDropdown isHoverable label='More'>
          <NavBarItem path='/statistics' label='Statistics' />
        </NavBarItem>
      </div>
    </div>
  </nav>
);

export default NavBar;
