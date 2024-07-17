import { Request, Response, NextFunction } from 'express';
import { UseCases } from '../use-cases';

export class Controller {
  private useCases: UseCases;

  constructor(useCases: UseCases) {
    this.useCases = useCases;
  }

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const types = await this.useCases.search();

      res.json(types);
    } catch (err) {
      next(err);
    }
  };
}
