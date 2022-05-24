import React, { useEffect } from 'react';
import feather from 'feather-icons';

interface IIconProps {
  name: string;
}

const Icon = (props: IIconProps) => {
  useEffect(() => {
    feather.replace();
  });

  return <i data-feather={props.name} />;
};

export default Icon;
