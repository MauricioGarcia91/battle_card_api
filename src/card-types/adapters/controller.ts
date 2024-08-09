import { Request, Response, NextFunction } from 'express';
import { CardTypeUseCases } from '../use-cases';

export class CardTypeController {
  constructor(private cardTypeUseCases: CardTypeUseCases) {
    this.cardTypeUseCases = cardTypeUseCases;
  }

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = await this.cardTypeUseCases.search();

      res.json(types);
    } catch (err) {
      next(err);
    }
  };
}
