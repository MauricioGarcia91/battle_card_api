import { SearchCardsParams } from './definitions.d';
import { Card } from './entity';

export interface Repository {
  create: (card: Card) => Promise<Card>;
  getById: (cardId: string) => Promise<Card | null>;
  delete: (cardId: string) => Promise<Card | null>;
  update: (cardId: string, card: Card) => Promise<Card | null>;
  search: ({
    q,
    limit,
    card_type,
    resistance,
    weakness
  }: SearchCardsParams) => Promise<Card[]>;
}
