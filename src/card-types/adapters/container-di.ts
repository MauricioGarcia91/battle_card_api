import { AppDataSource } from '@/data-source';
import { TypeOrmRepository } from './typeorm-repository';

import { CardType } from '../domain/entity';
import { CardTypeUseCases } from '../use-cases';

const typeOrmRepository = AppDataSource.getRepository(CardType);
const cardTypeRepository = new TypeOrmRepository(typeOrmRepository);

export const cardTypeUseCases = new CardTypeUseCases(cardTypeRepository);
