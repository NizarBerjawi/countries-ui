import { replace } from 'feather-icons';
import React, { useEffect } from 'react';

interface IIconProps {
  name: string;
}

const Icon = (props: IIconProps) => {
  useEffect(() => {
    replace();
  });

  return <i data-feather={props.name} />;
};

export default Icon;
