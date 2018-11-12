import { isDefined, isPromise } from '../utils';

describe('util', () => {
  let promise: Promise<any>;

  beforeEach(() => {
    // 定义一个Promise
    promise = new Promise((resolve, reject) => {
      if (isDefined(1)) {
        resolve(1);
      } else {
        reject(Error('Test'));
      }
    });
  });

  // 测试 isDefined 方法
  describe('isDefined function', () => {
    it('已定义', () => {
      const value = '123';
      expect(isDefined(value)).toBe(true);
    });
  });

  // 测试 isPromise 方法
  describe('isPromise function', () => {
    it('number is not promise', () => {
      expect(isPromise(1)).toBe(false);
    });

    it('string is not promise', () => {
      expect(isPromise('1')).toBe(false);
    });

    it('boolean is not promise', () => {
      expect(isPromise(true)).toBe(false);
    });

    it('new Promise() is promise', () => {
      expect(isPromise(promise)).toEqual(true);
    });
  });
});
