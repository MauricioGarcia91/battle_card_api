import express from 'express';
import { CardSchema } from './schema';
import { CardController } from './controller';

import { cardUseCases } from './container-di';

import { Validator } from '@/shared/validator';

const validator = new Validator(CardSchema);

const cardController = new CardController(cardUseCases, validator);

export const router = express.Router();

router.post('/', cardController.create);

router.get('/', cardController.search);

router.get('/:id', cardController.getById);

router.put('/:id', cardController.update);

router.delete('/:id', cardController.delete);

router.post('/battle', cardController.simulateBattle);
