import { Request, Response, NextFunction } from 'express';
import { CardUseCases } from '../use-cases';
import { Validator } from '@/shared/validator';
import { BadRequestError } from '@/shared/errors';

import { CardInput } from '../domain/definitions.d';

export class CardController {
  constructor(
    private cardUseCases: CardUseCases,
    private validator: Validator
  ) {
    this.cardUseCases = cardUseCases;
    this.validator = validator;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const { data, error } = await this.validator.validateSchema(input);

      if (error) {
        throw new BadRequestError(JSON.stringify(error));
      }

      const card = await this.cardUseCases.create(data as CardInput);

      res.status(201).json(card);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const card = await this.cardUseCases.getById(id);

      res.status(200).json(card);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const { id } = req.params;

      const { data, error } = await this.validator.validatePartialSchema(input);

      if (error) {
        throw new BadRequestError(JSON.stringify(error));
      }

      const cardUpdated = await this.cardUseCases.update(id, data);

      res.status(200).json(cardUpdated);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const cardRemoved = await this.cardUseCases.delete(id);

      res.status(200).json(cardRemoved);
    } catch (err) {
      next(err);
    }
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q, limit, card_type, resistance, weakness } = req.query as Record<
        string,
        string
      >;

      const cards = await this.cardUseCases.search({
        q,
        limit,
        card_type,
        resistance,
        weakness
      });

      res.status(200).json(cards);
    } catch (err) {
      next(err);
    }
  };

  simulateBattle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { attacker_id, defender_id } = req.body;

      const result = await this.cardUseCases.simulateBattle({
        attacker_id,
        defender_id
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
