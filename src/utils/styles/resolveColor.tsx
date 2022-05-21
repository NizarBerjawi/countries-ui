import { BulmaColor } from 'src/types/bulma';
import { Color } from 'src/types/styles';

const resolveColor = (color?: Color): BulmaColor => {
  switch (color) {
    case 'black':
      return 'is-black';
    case 'dark':
      return 'is-dark';
    case 'light':
      return 'is-light';
    case 'white':
      return 'is-white';
    case 'primary':
      return 'is-primary';
    case 'link':
      return 'is-link';
    case 'info':
      return 'is-info';
    case 'success':
      return 'is-success';
    case 'warning':
      return 'is-warning';
    case 'danger':
      return 'is-danger';
    default:
      return 'is-primary';
  }
};

export default resolveColor;
