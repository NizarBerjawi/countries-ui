import { BulmaTagSize } from 'src/types/bulma';
import { TagSize } from 'src/types/styles';

const resolveSize = (size?: TagSize): BulmaTagSize => {
  switch (size) {
    case 'normal':
      return 'is-normal';
    case 'medium':
      return 'is-medium';
    case 'large':
      return 'is-large';
    default:
      return 'is-normal';
  }
};

export default resolveSize;
