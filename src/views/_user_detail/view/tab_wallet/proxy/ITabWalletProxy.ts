export default interface ITabWalletProxy {
    /**表头信息 */
    tableColumns: any;
    /**用户详情 */
    userInfo: any;
    /**是否正在刷新 */
    refreshing: boolean;
    /**扣款页面数据 */
    dialogDeductGoldData: {
        bShow: boolean,
        gold: string
    }
    /**打开扣款弹窗 */
    showDialog(coin_name_unique:string): void;
    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**设置用户信息 */
    setUserInfo(data: any): void;
    /**获取金币详情 */
    getGoldInfo(user_id: number): void;
    /**扣除金币 */
    onUpdateGold(gold: number, coin_name_unique:string): void;
    /**提取厂商金币 */
    withdrawVendor(coin_name_unique:string, vendor_id?: number): void;
    /**提取保险箱 */
    withdrawSafeBox():void;
}
