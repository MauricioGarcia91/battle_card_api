import express from 'express';

import { CardTypeController } from './controller';
import { cardTypeUseCases } from './container-di';

const cardTypeController = new CardTypeController(cardTypeUseCases);

export const router = express.Router();

router.get('/', cardTypeController.search);
