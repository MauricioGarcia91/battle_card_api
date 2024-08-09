import { Repository } from 'typeorm';
import { CardTypeRepository } from '../domain/repository';

import { CardType } from '../domain/entity';

export class TypeOrmRepository implements CardTypeRepository {
  private repository: Repository<CardType>;

  constructor(repository: Repository<CardType>) {
    this.repository = repository;
  }

  getById = async (cardTypeId: string) => {
    try {
      return await this.repository.findOne({
        where: {
          id: cardTypeId
        }
      });
    } catch (err) {
      throw `[CARD_TYPE-REPOSITORY] [getById] ${err}`;
    }
  };

  search = async () => {
    try {
      return await this.repository.find();
    } catch (err) {
      throw `[CARD_TYPE-REPOSITORY] [search] ${err}`;
    }
  };
}
