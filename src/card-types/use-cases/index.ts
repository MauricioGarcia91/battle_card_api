import { Repository } from '../domain/repository';

export class UseCases {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  search = async () => {
    try {
      return await this.repository.search();
    } catch (err) {
      throw `[CARD_TYPES-USECASES] [search] ${err}`;
    }
  };
}
