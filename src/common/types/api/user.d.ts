declare namespace API {
  export interface UserInfo {
    id: string;
    /**
     * 用户名
     */
    username: string;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 手机号
     */
    mobile: string;
    /**
     * 用户邮箱
     */
    email?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 修改时间
     */
    updateTime: number;
  }
}
