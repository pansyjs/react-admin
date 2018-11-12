import { isDefined, isPromise } from '../utils';

describe('util', () => {
  // 测试 isDefined 方法
  describe('isDefined function', () => {
    it('已定义', () => {
      const value = '123';
      expect(isDefined(value)).toBe(true);
    });
  });

  // 测试 isPromise 方法
  describe('isPromise function', () => {});
});
