import { Controller } from '../src/cards/adapters/controller';
import { CardSchema } from '../src/cards/adapters/schema';
import { Repository } from '../src/cards/domain/repository';
import { UseCases } from '../src/cards/use-cases';
import { Validator } from '../src/shared/validator';
import { CARDS_MOCK } from './mocks/cards';

describe('[ROUTER / CARDS]', () => {
  let repository: Repository;
  let useCases: UseCases;
  let validator: Validator;
  let controller: Controller;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    repository = {
      search: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn()
    };

    useCases = new UseCases(repository);
    validator = new Validator(CardSchema);
    controller = new Controller(useCases, validator);
    mockRequest = { query: {} };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  it('should return a cards list', async () => {
    repository.search = jest.fn().mockResolvedValue(CARDS_MOCK);

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(CARDS_MOCK);
  });

  it('should return a cards list filter by name geodude', async () => {
    const geodudeCard = CARDS_MOCK.find(
      (card) => card.name.toLowerCase() === 'geodude'
    );
    repository.search = jest.fn().mockResolvedValue(geodudeCard);
    mockRequest.query = { q: 'geodu' };

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(repository.search).toHaveBeenCalledWith({ q: 'geodu' });
    expect(mockResponse.json).toHaveBeenCalledWith(geodudeCard);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return a cards list with limit 1', async () => {
    const card = CARDS_MOCK[0];
    repository.search = jest.fn().mockResolvedValue(card);

    mockRequest.query = { limit: '1' };

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(repository.search).toHaveBeenCalledWith({ limit: '1' });
    expect(mockResponse.json).toHaveBeenCalledWith(card);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return a card based on id', async () => {
    const card = CARDS_MOCK[0];
    repository.getById = jest.fn().mockResolvedValue(card);

    mockRequest.params = { id: '6c947984-d739-40d6-9222-552a5103d1bb' };

    await controller.getById(mockRequest, mockResponse, mockNext);

    expect(repository.getById).toHaveBeenCalledWith(card.id);
    expect(mockResponse.json).toHaveBeenCalledWith(card);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should handle errors and return 500 status', async () => {
    const expectedError = new Error('Database error');
    repository.search = jest.fn().mockRejectedValue(expectedError);

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(
      '[CARDS-USECASES] [search] Error: Database error'
    );
  });
});
