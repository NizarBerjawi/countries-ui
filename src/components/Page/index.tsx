import React, { PropsWithChildren } from 'react';
import { INavBarItem } from '@components/NavBarItem';
import NavBar from '@components/NavBar';

const LINKS: INavBarItem[] = [
  { path: '/', label: 'Home' },
  { path: '/continents', label: 'Continents' },
  { path: '/countries', label: 'Countries' },
  { path: '/languages', label: 'Languages' },
  { path: '/currencies', label: 'Currencies' },
  { path: '/timeZones', label: 'Time Zones' },
  { path: '/statistics', label: 'Statistics' },
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
