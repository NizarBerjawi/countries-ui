import { BulmaProgressSize, BulmaTagSize } from 'src/types/bulma';
import { ProgressSize, TagSize } from 'src/types/styles';

const resolveSize = (
  size: TagSize | ProgressSize,
): BulmaTagSize | BulmaProgressSize => {
  switch (size) {
    case 'small':
      return 'is-small';
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
