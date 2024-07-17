import { CardType } from './entity';

export interface Repository {
  search: () => Promise<CardType[]>;
}
