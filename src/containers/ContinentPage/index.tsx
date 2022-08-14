import React from 'react';
import Number from '@components/Number';
import Page from '@components/Page';

const POPULATION = 7800000000;
const CITIES = 2000;
const COUNTRIES = 252;
const LANGUAGES = 700;

const ContinentsPage = () => (
  <Page>
    <section>
      <div className='is-ancestor'>
        <div className='tile is-12'>
          <div className='tile is-vertical'>
            <div className='tile is-12'>
              <div className='tile is-parent is-3'>
                <article className='tile is-child box'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Population</p>
                      <p className='title'>
                        <Number>{POPULATION}</Number>
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className='tile is-parent is-3'>
                <article className='tile is-child box'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Countries</p>
                      <p className='title'>
                        <Number>{COUNTRIES}</Number>
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className='tile is-parent is-3'>
                <article className='tile is-child box'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Cities</p>
                      <p className='title'>
                        <Number>{CITIES}</Number>
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className='tile is-parent is-3'>
                <article className='tile is-child box'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Languages</p>
                      <p className='title'>
                        <Number>{LANGUAGES}</Number>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className='tile'></div>
          </div>
        </div>
      </div>
    </section>
  </Page>
);

export default ContinentsPage;
