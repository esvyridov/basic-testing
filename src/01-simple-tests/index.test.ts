// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({
        a: 999,
        b: 1,
        action: Action.Add,
      }),
    ).toBe(1000);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({
        a: 999,
        b: 1,
        action: Action.Subtract,
      }),
    ).toBe(998);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({
        a: 500,
        b: 3,
        action: Action.Multiply,
      }),
    ).toBe(1500);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({
        a: 999,
        b: 3,
        action: Action.Divide,
      }),
    ).toBe(333);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({
        a: 3,
        b: 3,
        action: Action.Exponentiate,
      }),
    ).toBe(27);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({
        a: 5,
        b: 2,
        action: '//',
      }),
    ).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({
        a: '5',
        b: '2',
        action: Action.Multiply,
      }),
    ).toBe(null);
  });
});
