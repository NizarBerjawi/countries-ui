import React, { PropsWithChildren } from 'react';

const NavBarBurger = () => (
  <a
    role='button'
    className='navbar-burger'
    aria-label='menu'
    aria-expanded='false'
  >
    <span aria-hidden='true'></span>
    <span aria-hidden='true'></span>
    <span aria-hidden='true'></span>
  </a>
);

export default NavBarBurger;
