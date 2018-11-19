import { urlToList } from '../pathTools';

describe('utils >> pathTools', () => {
  it('A Path', () => {
    expect(urlToList('/userInfo')).toEqual(['/userInfo']);
  });

  it('Secondary path', () => {
    expect(urlToList('/userInfo/798')).toEqual(['/userInfo', '/userInfo/798']);
  });

  it('Three paths', () => {
    expect(urlToList('/userInfo/798/role')).toEqual([
      '/userInfo',
      '/userInfo/798',
      '/userInfo/798/role'
    ]);
  });
});
