import {CardBase} from './card';
import {CardDivider} from './cardDivider';
import {CardTitle} from './cardTitle';

const Card = Object.assign(CardBase, {
  Divider: CardDivider,
  Title: CardTitle,
});

export default Card;
