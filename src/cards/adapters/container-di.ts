import { AppDataSource } from '@/data-source';
import { Card } from '../domain/entity';
import { CardUseCases } from '../use-cases';
import { TypeOrmRepository } from './typeorm-repository';

import { cardTypeUseCases } from '@/card-types/adapters/container-di';

const typeOrmRepository = AppDataSource.getRepository(Card);
const cardRepository = new TypeOrmRepository(typeOrmRepository);

export const cardUseCases = new CardUseCases(cardRepository, cardTypeUseCases);
