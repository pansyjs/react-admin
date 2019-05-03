import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

export interface IModuleAction {
  [module: string]: string[]
}

export interface IAction {
  module: string;
  name: string;
}

export interface IStatement {
  // 授权效力 allow: 允许 deny: 禁止
  effect: 'allow' | 'deny';
  // 操作列表
  action: '*' | string[];
}

export interface IPolicyData {
  version: string | number;
  statement: IStatement[]
}

class Policy {
  public moduleMap: IModuleAction = {};
  public allowActions: string[];
  public denyActions: string[];

  constructor(
    private actions: IAction[]
  ) {
    // 模块的操作集合
    this.moduleMap = this.getModuleMap(actions);
    // 允许的操作
    this.allowActions = [];
    // 拒绝的操作
    this.denyActions = [];
  }

  getModuleMap = (actions: IAction[]) => {
    const moduleMap = {};

    if (actions && actions.length) {
      actions.forEach(item => {
        const moduleName = item.module;
        const policyAction = `${item.module}/${item.name}`;
        if (!moduleMap[moduleName]) {
          moduleMap[moduleName] = [policyAction];
        } else {
          moduleMap[moduleName].push(policyAction);
        }
      })
    }

    return moduleMap;
  };

  // 验证Action
  verifyAction = (actions: string | string[]): boolean => {
    if (isString(actions)) {
      return this.oneActionVerify(actions);
    }

    if (isArray(actions)) {
      for(let i = 0, len = actions.length; i < len; i++) {
        const result = this.oneActionVerify(actions[i]);
        if (!result) {
          return false;
        }
      }

      return true;
    }
  };

  oneActionVerify = (action) => {
    // 表示任何用户皆可以访问
    if (action === '*') {
      return true;
    } else {
      // 命中不允许使用的权限
      if (this.denyActions.includes(action)) {
        return false;
      }
      if (this.allowActions.includes(action)) {
        return true;
      }
    }

    // 默认不允许访问
    return false;
  };

  addPolicy = (policy: IPolicyData) => {
    if (!policy) return;
    const { statement } = policy;

    if (statement && statement.length) {
      statement.forEach((item) => {
        const { effect, action } = item;

        let actions = [];

        if (isString(action)) {
          actions = this.parseAction(action);
        }

        if (isArray(action)) {
          action.forEach(item => {
            actions = actions.concat(this.parseAction(item));
          });
        }

        if (effect === 'allow') {
          this.allowActions = this.allowActions.concat(actions);
          return;
        }

        if (effect === 'deny') {
          this.denyActions = this.denyActions.concat(actions);
          return;
        }
      })
    }
  };

  // 解析Action
  parseAction = (action: string): string[] => {
    const actions = this.getAllAction();
    let result = [];

    if (action === '*') {
      result = actions;
    } else {
      const list = action.split('/');
      if (list.length === 2 && actions.length) {
        const moduleName = list[0];
        const actionName = list[1];
        if (actionName === '*') {
          result = this.moduleMap[moduleName];
        } else {
          result = [action];
        }
      }
    }
    return result;
  };

  // 获取所有的Action
  getAllAction = () => {
    let actions = [];
    const modules = Object.keys(this.moduleMap);

    modules.forEach((key) => {
      actions = actions.concat(this.moduleMap[key]);
    });

    return actions;
  };
}

export default Policy;
