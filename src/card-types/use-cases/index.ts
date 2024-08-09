import { CardTypeRepository } from '../domain/repository';

export class CardTypeUseCases {
  constructor(private cardTypeRepository: CardTypeRepository) {
    this.cardTypeRepository = cardTypeRepository;
  }

  search = async () => {
    try {
      return await this.cardTypeRepository.search();
    } catch (err) {
      throw `[CARD_TYPE-USECASES] [search] ${err}`;
    }
  };

  getById = async (cardTypeId: string) => {
    try {
      return await this.cardTypeRepository.getById(cardTypeId);
    } catch (err) {
      throw `[CARD_TYPE-USECASES] [getById] ${err}`;
    }
  };
}
