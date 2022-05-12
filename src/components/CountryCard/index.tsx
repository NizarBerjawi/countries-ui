import React, { ReactElement } from 'react';

interface CountryCard {
  countryName: string;
  countryCode: string;
}

const CountryCard = ({
  countryName,
  countryCode,
}: CountryCard): ReactElement => {
  return (
    <div className='card'>
      <div className='card-content'>
        <p className='title'>{countryName}</p>
        <p className='subtitle'>{countryCode}</p>
      </div>
      <footer className='card-footer'>
        <p className='card-footer-item'>
          <span>View</span>
        </p>
      </footer>
    </div>
  );
};

export default CountryCard;
