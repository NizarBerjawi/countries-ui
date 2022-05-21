import React from 'react';
import { Continent } from 'src/types/app';

interface IContinentCardProps {
  continent: Continent;
}

const ContinentCard = ({ continent }: IContinentCardProps) => (
  <div className='column is-one-third'>
    <div className='card is-clickable'>
      <div className='card-content'>
        <p className='title'>{continent.name}</p>
      </div>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img
            src='https://bulma.io/images/placeholders/1280x960.png'
            alt='Placeholder image'
          />
        </figure>
      </div>
    </div>
  </div>
);

export default ContinentCard;
