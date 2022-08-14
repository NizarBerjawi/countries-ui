import React from 'react';
import Page from '@components/Page';
import { CountryTable } from './Table';

const CountriesPage = () => (
  <Page>
    <section>
      <div className='is-ancestor'>
        <div className='tile is-12'>
          <div className='tile'>
            <div className='tile is-parent'>
              <article className='tile is-child box'>
                <p className='title'>Countries</p>
                <CountryTable />
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

export default CountriesPage;
