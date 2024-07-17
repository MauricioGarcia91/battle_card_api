import express from 'express';

import { AppDataSource } from '../../data-source';
import { Controller } from './controller';
import { TypeOrmRepository } from './typeorm-repository';

import { CardType } from '../domain/entity';
import { UseCases } from '../use-cases';

const typeOrmRepository = AppDataSource.getRepository(CardType);
const cardTypeRepository = new TypeOrmRepository(typeOrmRepository);
const useCases = new UseCases(cardTypeRepository);
const controller = new Controller(useCases);

export const router = express.Router();

router.get('/', controller.search);
