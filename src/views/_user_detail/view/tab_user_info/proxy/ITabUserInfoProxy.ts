export default interface ITabUserInfoProxy {
    /**表头信息 */
    tableColumns: any;
    /**用户详情 */
    userInfo: any;
    /**代理关系链 */
    relationChain: string[];
    /**弹窗数据 */
    dialogData: any;
    /**
     * 打开弹窗
     * @param filed 要修改的属性
     */
    showDialog(filed: string): void;
    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**设置用户信息 */
    setUserInfo(data: any): void;
    /**设置关系链 */
    setRelationChain(data: any): void;
    /**获取用户详情及关系链 */
    getUserDetail(user_id: any): void;
    /**修改 */
    onEdit(filed: string, filedValue: string): void;
    /**获取手机号 */
    onGetPhone(): void;
    /**打开用户详情页 */
    onShowDetail(user_id: number): void;
}
