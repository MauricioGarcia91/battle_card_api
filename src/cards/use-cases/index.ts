import { CardRepository } from '../domain/repository';
import { Card } from '../domain/entity';

import { CardTypeUseCases } from '@/card-types/use-cases';

import {
  BattleParams,
  BattleResult,
  CardInput,
  SearchCardsParams
} from '@/cards/domain/definitions.d';

import { CustomError, NotFoundError } from '@/shared/errors';
export class CardUseCases {
  constructor(
    private repository: CardRepository,
    private cardTypeUseCases: CardTypeUseCases
  ) {
    this.repository = repository;
    this.cardTypeUseCases = cardTypeUseCases;
  }

  create = async (input: CardInput) => {
    try {
      const [type, weakness, resistance] = await Promise.all([
        this.cardTypeUseCases.getById(input.type),
        this.cardTypeUseCases.getById(input.weakness),
        this.cardTypeUseCases.getById(input.resistance)
      ]);

      if (!type || !weakness || !resistance) {
        throw new NotFoundError('Some card type not found');
      }

      const card = new Card();
      Object.assign(card, input);

      return await this.repository.create(card);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw err;
      }

      throw new CustomError(500, `[CARDS-USECASES] [create] ${err}`);
    }
  };

  getById = async (cardId: string) => {
    try {
      return await this.repository.getById(cardId);
    } catch (err) {
      throw `[CARDS-USECASES] [getById] ${err}`;
    }
  };

  update = async (cardId: string, input: any) => {
    try {
      const card = new Card();
      Object.assign(card, input);

      return await this.repository.update(cardId, card);
    } catch (err) {
      throw `[CARDS-USECASES] [update] ${err}`;
    }
  };

  delete = async (cardId: string) => {
    try {
      return await this.repository.delete(cardId);
    } catch (err) {
      throw `[CARDS-USECASES] [delete] ${err}`;
    }
  };

  search = async (params: SearchCardsParams) => {
    try {
      return await this.repository.search(params);
    } catch (err) {
      throw `[CARDS-USECASES] [search] ${err}`;
    }
  };

  simulateBattle = async ({
    attacker_id,
    defender_id
  }: BattleParams): Promise<BattleResult | null> => {
    try {
      const [attacker, defender] = await Promise.all([
        this.getById(attacker_id),
        this.getById(defender_id)
      ]);

      if (!attacker || !defender) {
        throw new NotFoundError('Some card not found');
      }

      let damage = attacker.attack_power;

      if (attacker.type.id === defender.weakness.id) {
        damage *= defender.weakness_point;
      } else if (attacker.type.id === defender.resistance.id) {
        damage -= defender.resistance_point;
      }

      const remaining_hp = defender.hp - damage;
      const win = remaining_hp <= 0;

      return {
        attacker_id,
        defender_id,
        attacker_initial_power: attacker.attack_power,
        attacker_power_damage: damage,
        defender_hp: defender.hp,
        defender_remaining_hp: remaining_hp,
        win
      };
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw err;
      }

      throw new CustomError(500, `[CARDS-USECASES] [simulateBattle] ${err}`);
    }
  };
}
