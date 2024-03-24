// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 20, b: 2, action: Action.Divide, expected: 10 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 20, b: 2, action: Action.Exponentiate, expected: 400 },
  { a: 10, b: 2, action: '//', expected: null },
  { a: 20, b: 2, action: '**', expected: null },
  { a: '4', b: '2', action: Action.Exponentiate, expected: null },
  { a: '10', b: 2, action: Action.Exponentiate, expected: null },
  { a: 20, b: '2', action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b should return $expected',
    ({ a, b, action, expected }) => {
      expect(
        simpleCalculator({
          a,
          b,
          action,
        }),
      ).toBe(expected);
    },
  );
});
