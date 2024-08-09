import { CardType } from './entity';

export interface CardTypeRepository {
  getById: (cardTypeId: string) => Promise<CardType | null>;
  search: () => Promise<CardType[]>;
}
