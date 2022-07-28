import React, { PropsWithChildren } from 'react';
import { INavBarItem } from '@components/NavBarItem';
import NavBar from '@components/NavBar';

const LINKS: INavBarItem[] = [
  { to: '/', label: 'Home' },
  { to: '/continents', label: 'Continents' },
  { to: '/countries', label: 'Countries' },
  { to: '/languages', label: 'Languages' },
  { to: '/currencies', label: 'Currencies' },
  { to: '/timeZones', label: 'Time Zones' },
  { to: '/statistics', label: 'Statistics' },
];

const Page = (props: PropsWithChildren) => (
  <>
    <NavBar hasBrand links={LINKS} />

    <section className='hero'>
      <div className='hero-body'>
        <div className='container'>{props.children}</div>
      </div>
    </section>
  </>
);

export default Page;
