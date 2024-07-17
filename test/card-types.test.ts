import { Controller } from '../src/card-types/adapters/controller';
import { Repository } from '../src/card-types/domain/repository';
import { UseCases } from '../src/card-types/use-cases';
import { CARD_TYPES_MOCK } from './mocks/card-types';

describe('[ROUTER / CARD-TYPES]', () => {
  let repository: Repository;
  let useCases: UseCases;
  let controller: Controller;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    repository = {
      search: jest.fn()
    };
    useCases = new UseCases(repository);
    controller = new Controller(useCases);
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  it('should return a card types list', async () => {
    repository.search = jest.fn().mockResolvedValue(CARD_TYPES_MOCK);

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(CARD_TYPES_MOCK);
  });

  it('should handle errors and return 500 status', async () => {
    const expectedError = new Error('Database error');
    repository.search = jest.fn().mockRejectedValue(expectedError);

    await controller.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(
      '[CARD_TYPES-USECASES] [search] Error: Database error'
    );
  });
});
