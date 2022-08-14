import React from 'react';
import Page from '@components/Page';
import { ContinentTable } from './Table';

const ContinentsPage = () => (
  <Page>
    <section className='section'>
      <div className='is-ancestor'>
        <div className='tile is-12'>
          <div className='tile is-parent'>
            <article className='tile is-child box'>
              <p className='title'>Continents</p>
              <ContinentTable />
            </article>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

export default ContinentsPage;
