import { AuthorityConfigFun } from 'umi';
import { Action, IPolicyData, Statement } from '@pansy/policy';

const separator = ':';

const authorityConfig: AuthorityConfigFun = (initialState: { currentUser?: API.CurrentUser } = {}) => {
  const { currentUser } = initialState;

  const access = currentUser?.access || [];
  const permissionCodes = currentUser?.permissionCodes || [];

  const allActions: Action[] = [];
  const policies: IPolicyData[] = [];

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

  console.log(allActions);
  console.log(policies);

  return {
    actions: allActions,
    policies,
    separator
  };
}

export default authorityConfig;
