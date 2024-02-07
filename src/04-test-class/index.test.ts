// Uncomment the code below and write your tests
import { SynchronizationFailedError, getBankAccount } from '.';
import { random } from 'lodash';

jest.mock('lodash');

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);

    expect(() => bankAccount.withdraw(2000)).toThrow(`Insufficient funds: cannot withdraw more than ${initialBalance}`);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 1000;
    const bankAccount = getBankAccount(initialBalance);
    const anotherBankAccount = getBankAccount(0);

    expect(() => bankAccount.transfer(2000, anotherBankAccount)).toThrow(`Insufficient funds: cannot withdraw more than ${initialBalance}`);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(1000);

    expect(() => bankAccount.transfer(100, bankAccount)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.deposit(100).getBalance()).toBe(1100);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);

    expect(bankAccount.withdraw(100).getBalance()).toBe(900);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    const anotherBankAccount = getBankAccount(0);

    expect(bankAccount.transfer(100, anotherBankAccount).getBalance()).toBe(900);
    expect(anotherBankAccount.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValue(1);

    const bankAccount = getBankAccount(1000);
    const balance = await bankAccount.fetchBalance();

    expect(balance).toBe(1);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (random as jest.Mock).mockReturnValue(1);

    const bankAccount = getBankAccount(1000);

    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValue(0);

    const bankAccount = getBankAccount(1000);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(new SynchronizationFailedError());
  });
});
