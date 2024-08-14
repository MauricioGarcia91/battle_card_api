import { cardController, cardRepository } from './mocks/container/cards';

import { CARDS_MOCK } from './mocks/data/cards';

describe('[ROUTER / CARDS]', () => {
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: any;

  beforeEach(() => {
    mockRequest = { query: {} };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  it('should return a cards list', async () => {
    cardRepository.search = jest.fn().mockResolvedValue(CARDS_MOCK);

    await cardController.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalledWith(CARDS_MOCK);
  });

  it('should return a cards list filter by name geodude', async () => {
    const geodudeCard = CARDS_MOCK.find(
      (card) => card.name.toLowerCase() === 'geodude'
    );
    cardRepository.search = jest.fn().mockResolvedValue(geodudeCard);
    mockRequest.query = { q: 'geodu' };

    await cardController.search(mockRequest, mockResponse, mockNext);

    expect(cardRepository.search).toHaveBeenCalledWith({ q: 'geodu' });
    expect(mockResponse.json).toHaveBeenCalledWith(geodudeCard);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return a cards list with limit 1', async () => {
    const card = CARDS_MOCK[0];
    cardRepository.search = jest.fn().mockResolvedValue(card);

    mockRequest.query = { limit: '1' };

    await cardController.search(mockRequest, mockResponse, mockNext);

    expect(cardRepository.search).toHaveBeenCalledWith({ limit: '1' });
    expect(mockResponse.json).toHaveBeenCalledWith(card);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should return a card based on id', async () => {
    const card = CARDS_MOCK[0];
    cardRepository.getById = jest.fn().mockResolvedValue(card);

    mockRequest.params = { id: '6c947984-d739-40d6-9222-552a5103d1bb' };

    await cardController.getById(mockRequest, mockResponse, mockNext);

    expect(cardRepository.getById).toHaveBeenCalledWith(card.id);
    expect(mockResponse.json).toHaveBeenCalledWith(card);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  it('should handle errors and return 500 status', async () => {
    const expectedError = new Error('Database error');
    cardRepository.search = jest.fn().mockRejectedValue(expectedError);

    await cardController.search(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(
      '[CARD-USECASES] [search] Error: Database error'
    );
  });
});
