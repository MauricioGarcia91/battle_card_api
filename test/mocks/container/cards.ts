import { CardController } from '@/cards/adapters/controller';
import { CardSchema } from '@/cards/adapters/schema';
import { CardRepository } from '@/cards/domain/repository';
import { CardUseCases } from '@/cards/use-cases';
import { Validator } from '@/shared/validator';
import { cardTypeUseCases } from './card-types';

export const cardRepository: CardRepository = {
  create: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  search: jest.fn(),
  update: jest.fn()
};

export const cardUseCases = new CardUseCases(cardRepository, cardTypeUseCases);
const validator = new Validator(CardSchema);

export const cardController = new CardController(cardUseCases, validator);
