import { formatter } from '../authority';

describe('utils >> authority', () => {
  describe('formatter', () => {
    it('formatter([]) => []', () => {
      expect(formatter([])).toEqual([]);
    });

    it('单个路由', () => {
      const routes = [
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard'
        }
      ];
      expect(formatter(routes)).toEqual([
        {
          path: '/dashboard',
          name: null, // formatMessage 无返回值
          icon: 'dashboard',
          auth: 'on',
          locale: 'menu.dashboard'
        }
      ]);
    });

    it('单个路由-存在子路由', () => {
      const routes = [
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'analysis'
            }
          ]
        }
      ];
      expect(formatter(routes)).toEqual([
        {
          path: '/dashboard',
          name: null, // formatMessage 无返回值
          icon: 'dashboard',
          auth: 'on',
          locale: 'menu.dashboard',
          children: [
            {
              path: '/dashboard/analysis',
              name: null,
              auth: 'on',
              locale: 'menu.dashboard.analysis'
            }
          ]
        }
      ]);
    });

    it('多个路由', () => {
      const routes = [
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard'
        },
        {
          path: '/dashboard1',
          name: 'dashboard1',
          icon: 'dashboard1'
        }
      ];
      expect(formatter(routes)).toEqual([
        {
          path: '/dashboard',
          name: null, // formatMessage 无返回值
          icon: 'dashboard',
          auth: 'on',
          locale: 'menu.dashboard'
        },
        {
          path: '/dashboard1',
          name: null, // formatMessage 无返回值
          icon: 'dashboard1',
          auth: 'on',
          locale: 'menu.dashboard1'
        }
      ]);
    });

    it('关闭权限', () => {
      const routes = [
        {
          path: '/dashboard',
          name: 'dashboard',
          icon: 'dashboard',
          auth: 'off',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'analysis'
            }
          ]
        }
      ];
      expect(formatter(routes)).toEqual([
        {
          path: '/dashboard',
          name: null, // formatMessage 无返回值
          icon: 'dashboard',
          auth: 'off',
          locale: 'menu.dashboard',
          children: [
            {
              path: '/dashboard/analysis',
              name: null,
              auth: 'off',
              locale: 'menu.dashboard.analysis'
            }
          ]
        }
      ]);
    });
  });
});
