import moment from 'moment';
import { mock } from 'better-mock';
import { Request, Response } from 'express';
import { packResult } from './utils';

let actions: API.PermissionActionData[] = [];

for (let i = 0; i < 11; i++) {
  actions.push(
    mock({
      id: '@guid',
      module: 'permission',
      code: '@string(8)',
      name: '@ctitle(4)',
      remark: '@cparagraph(1)',
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
    }),
  );
}

const fetchActionList = (req: Request, res: Response) => {
  const { page = 1, size = 20 } = req.query;

  const pageList = actions.filter((item, index) => {
    return index < +size * +page && index >= +size * (+page - 1);
  });

  return res.json(
    packResult({
      data: {
        list: pageList,
        total: actions.length
      }
    })
  );
}

export default {
  'GET  /api/permission/action/list': fetchActionList,
};
