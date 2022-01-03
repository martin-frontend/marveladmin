export interface UserInfoVO {
    /**后台用户ID*/
    admin_user_id: number;
    /**用户名*/
    admin_username: string;
    /**真实姓名*/
    rel_name: string;
    /**头像*/
    avatar: string;
    /**用户类型:1-超级管理员|2-管理用户|4-普通用户|8-渠道用户|32-币商*/
    type: number;
    /**用户分类:1-系统用户|2-平台用户|3-厂商用户*/
    cate: number;
    /**状态:1-正常|98-禁用*/
    status: number;
    /**手机号*/
    phone: string;
    /**用户认证token*/
    token: string;
    /**用户已授权的平台*/
    user_plats: any;
    /**用户已授权的厂商*/
    vendor_ids: any;

    /**用户权限导航栏 */
    sidebar: [];
    /**用户的权限树 */
    permission: [];
    /**用户权限节点名称标记 */
    permissions_unique: string[];

    /**用户餘額 */
    coin_user_gold: string;

    /**币商 */
    coin_user: any;

    /**新消息数量 */
    message_amount: number;
    /**新消息数量细节
     * {
        "1": 10,
        "2": 2,
        "3": 0
    }
     */
    message_info: any;
}
