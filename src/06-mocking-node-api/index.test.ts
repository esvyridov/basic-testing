// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    const timeout = 500;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockFn, timeout);

    expect(setTimeoutSpy).toHaveBeenCalledWith(mockFn, timeout);
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    const timeout = 500;

    doStuffByTimeout(mockFn, timeout);

    jest.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockFn = jest.fn();
    const interval = 500;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockFn, interval);

    expect(setIntervalSpy).toHaveBeenCalledWith(mockFn, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFn = jest.fn();
    const interval = 100;

    doStuffByInterval(mockFn, interval);

    jest.advanceTimersByTime(500);

    expect(mockFn).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathToFile = 'pathToFile';
    const joinMock = jest.fn();

    (join as jest.Mock).mockImplementation(joinMock);

    await readFileAsynchronously(pathToFile);

    expect(joinMock).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'pathToFile';
    const joinMock = jest.fn();

    (join as jest.Mock).mockImplementation(joinMock);
    (existsSync as jest.Mock).mockReturnValue(false);

    expect(await readFileAsynchronously(pathToFile)).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'pathToFile';
    const joinMock = jest.fn();

    (join as jest.Mock).mockImplementation(joinMock);
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue('Hello!')

    expect(await readFileAsynchronously(pathToFile)).toBe('Hello!');
  });
});
