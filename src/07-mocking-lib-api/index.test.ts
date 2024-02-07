// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('should create instance with provided base url', async () => {
    const getMock = jest.fn().mockResolvedValue({});
    const createMock = jest.fn().mockReturnValue({
      get: getMock,
    });

    (axios.create as jest.Mock).mockImplementation(createMock);

    const getDataFromApi = throttledGetDataFromApi('relativePath');

    jest.advanceTimersByTime(THROTTLE_TIME);

    await getDataFromApi;

    expect(createMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getMock = jest.fn().mockResolvedValue({});
    const createMock = jest.fn().mockReturnValue({
      get: getMock,
    });
    const relativePath = 'relativePath';

    (axios.create as jest.Mock).mockImplementation(createMock);

    const getDataFromApi = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    await getDataFromApi;

    expect(getMock).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const getMock = jest.fn().mockResolvedValue({
      data: 'Hello!'
    });
    const createMock = jest.fn().mockReturnValue({
      get: getMock,
    });
    const relativePath = 'relativePath';

    (axios.create as jest.Mock).mockImplementation(createMock);

    const getDataFromApi = throttledGetDataFromApi(relativePath);

    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(await getDataFromApi).toBe('Hello!');
  });
});
