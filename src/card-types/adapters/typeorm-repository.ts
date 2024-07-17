import { Repository } from 'typeorm';
import { Repository as ICardTypeRepository } from '../domain/repository';

import { CardType } from '../domain/entity';

export class TypeOrmRepository implements ICardTypeRepository {
  private repository: Repository<CardType>;

  constructor(repository: Repository<CardType>) {
    this.repository = repository;
  }

  search = async () => {
    try {
      return await this.repository.find();
    } catch (err) {
      throw `[CARD_TYPES-REPOSITORY] [search] ${err}`;
    }
  };
}
