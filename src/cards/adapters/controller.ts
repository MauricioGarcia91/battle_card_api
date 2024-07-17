import { Request, Response, NextFunction } from 'express';
import { UseCases } from '../use-cases';
import { Validator } from '../../shared/validator';

export class Controller {
  private useCases: UseCases;
  private validator: Validator;

  constructor(useCases: UseCases, validator: Validator) {
    this.useCases = useCases;
    this.validator = validator;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const input = req.body;
      const { data, error } = await this.validator.validateSchema(input);

      if (error) {
        return res.status(400).json({ error });
      }

      const card = await this.useCases.create(data);

      res.status(201).json(card);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const card = await this.useCases.getById(id);

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
        return res.status(400).json(error);
      }

      const cardUpdated = await this.useCases.update(id, data);

      res.status(200).json(cardUpdated);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const cardRemoved = await this.useCases.delete(id);

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

      const cards = await this.useCases.search({
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

      const result = await this.useCases.simulateBattle({
        attacker_id,
        defender_id
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}
