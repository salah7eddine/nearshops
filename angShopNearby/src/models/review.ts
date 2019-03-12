import { User } from './user';
import { Shop } from './shop';

export class Review {
  idReview: string = null;
  shop: Shop = null;
  user: User = null;
  like: boolean;
  dislike: boolean;
  timeDislike: Date;

  constructor() {
  }
}
