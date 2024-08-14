import { CardTypeController } from '@/card-types/adapters/controller';
import { CardTypeRepository } from '@/card-types/domain/repository';
import { CardTypeUseCases } from '@/card-types/use-cases';

export const cardTypeRepository: CardTypeRepository = {
  getById: jest.fn(),
  search: jest.fn()
};

export const cardTypeUseCases = new CardTypeUseCases(cardTypeRepository);
export const cardTypeController = new CardTypeController(cardTypeUseCases);
