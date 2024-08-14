import {
  cardTypeController,
  cardTypeRepository
} from './mocks/container/card-types';

import { CARD_TYPES_MOCK } from './mocks/data/card-types';

describe('[ROUTER / CARD-TYPES]', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  it('should return a card types list', async () => {
    cardTypeRepository.search = jest.fn().mockResolvedValue(CARD_TYPES_MOCK);

    await cardTypeController.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(CARD_TYPES_MOCK);
  });

  it('should handle errors and return 500 status', async () => {
    const expectedError = new Error('Database error');
    cardTypeRepository.search = jest.fn().mockRejectedValue(expectedError);

    await cardTypeController.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(
      '[CARD_TYPE-USECASES] [search] Error: Database error'
    );
  });
});
