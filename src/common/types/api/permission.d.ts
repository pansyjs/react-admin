declare namespace API {
  export interface PermissionActionData {
    /**
     * 唯一表示
     */
    id: string;
    /**
     * 所属模块
     */
    module: string;
    /**
     * 操作标识
     */
    code: string;
    /**
     * 显示名称
     */
    name: string;
    /**
     * 类型
     */
    type: 0 | 1;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 创建时间
     */
    createdAt?: number;
    /**
     * 修改时间
     */
    updatedAt?: number;
  }

  export interface PermissionData {
    id: string;
  }
}
