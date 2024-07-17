import express from 'express';
import { AppDataSource } from '../../data-source';
import { Card } from '../domain/entity';
import { UseCases } from '../use-cases';
import { CardSchema } from './schema';
import { Controller } from './controller';
import { TypeOrmRepository } from './typeorm-repository';
import { Validator } from '../../shared/validator';

const typeOrmRepository = AppDataSource.getRepository(Card);
const cardRepository = new TypeOrmRepository(typeOrmRepository);

const useCases = new UseCases(cardRepository);
const validator = new Validator(CardSchema);

const controller = new Controller(useCases, validator);

export const router = express.Router();

router.post('/', controller.create);

router.get('/', controller.search);

router.get('/:id', controller.getById);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

router.post('/battle', controller.simulateBattle);
