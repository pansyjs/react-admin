import { AuthorityConfigFun } from 'umi';
import { Action, PolicyData, Statement } from '@pansy/policy';

const separator = ':';

/**
 * 提供Policy相关配置，可与后端约定相关数据结构进行修改
 * 具体请查看
 *   https://github.com/alitajs/umi-plugins/tree/master/packages/umi-plugin-authority
 *   https://github.com/pansyjs/utils/tree/master/packages/policy
 * @param initialState
 */
const authorityConfig: AuthorityConfigFun = (initialState: { currentUser?: API.CurrentUser } = {}) => {
  const { currentUser } = initialState;

  const access = currentUser?.access || [];
  const permissionCodes = currentUser?.permissionCodes || [];

  const allActions: Action[] = [];
  const policies: PolicyData[] = [];

  permissionCodes.forEach(({ actions = [], group }) => {
    if (group && typeof group === 'string') {
      allActions.push(...actions.map(value => ({ module: group, action: value })));
    }
  });

  access.forEach(({ actions = [], group }) => {
    let statementAction: Statement['action'] = [];
    if (group && typeof group === 'string') {
      if (actions === '*') {
        statementAction = [`${group}${separator}*`]
      } else {
        statementAction = actions.map(item => `${group}${separator}${item}`);
      }
    }
    policies.push({
      version: 1,
      statement: [
        {
          effect: 'allow',
          action: statementAction
        }
      ]
    });
  });

  return {
    actions: allActions,
    policies,
    separator
  };
}

export default authorityConfig;
