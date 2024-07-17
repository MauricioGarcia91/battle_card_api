import { ILike, Repository } from 'typeorm';

import { Repository as ICardRepository } from '../domain/repository';
import { Card } from '../domain/entity';

import { SearchCardsParams } from '../domain/definitions.d';

export class TypeOrmRepository implements ICardRepository {
  private repository: Repository<Card>;

  constructor(repository: Repository<Card>) {
    this.repository = repository;
  }

  create = async (card: Card) => {
    try {
      return await this.repository.save(card);
    } catch (err) {
      throw `[CARDS-REPOSITORY] [create] ${err}`;
    }
  };

  getById = async (cardId: string) => {
    try {
      return await this.repository.findOne({
        where: { id: cardId },
        relations: {
          resistance: true,
          weakness: true,
          type: true
        }
      });
    } catch (err) {
      throw `[CARDS-REPOSITORY] [getById] ${err}`;
    }
  };

  update = async (cardId: string, card: Card) => {
    try {
      const cardToUpdate = await this.repository.findOneBy({
        id: cardId
      });

      if (cardToUpdate === null) {
        return null;
      }

      Object.assign(cardToUpdate, card);

      return await this.repository.save(cardToUpdate);
    } catch (err) {
      throw `[CARDS-REPOSITORY] [update] ${err}`;
    }
  };

  delete = async (cardId: string) => {
    try {
      const cardToRemove = await this.repository.findOneBy({
        id: cardId
      });

      if (cardToRemove === null) {
        return null;
      }

      return await this.repository.remove(cardToRemove);
    } catch (err) {
      throw `[CARDS-REPOSITORY] [delete] ${err}`;
    }
  };

  search = async ({
    q = '',
    limit = '5',
    card_type,
    resistance,
    weakness
  }: SearchCardsParams) => {
    try {
      const whereConditions: any = { name: ILike(`%${q}%`) };

      if (card_type) {
        whereConditions.type = {
          id: card_type
        };
      }

      if (resistance) {
        whereConditions.resistance = {
          id: resistance
        };
      }

      if (weakness) {
        whereConditions.weakness = {
          id: weakness
        };
      }

      return await this.repository.find({
        where: [whereConditions],
        take: parseInt(limit),
        relations: {
          resistance: true,
          weakness: true,
          type: true
        }
      });
    } catch (err) {
      throw `[CARDS-REPOSITORY] [search] ${err}`;
    }
  };
}
