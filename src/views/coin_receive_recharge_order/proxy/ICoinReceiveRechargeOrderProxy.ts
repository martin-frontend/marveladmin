import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICoinReceiveRechargeOrderProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        form: any;
        formSource: any;
    };
    /**当前账号持有金币 */
    coinWallet: number;
    /**自动刷新相关 */
    reloadData: {
        /**当前选择 */
        autoTime: string;
        /**选项 */
        options: any;
        /**计时器 */
        timer: any;
    };
    /**自动刷新 */
    autoReload(): void;
    /**停止刷新 */
    stopAutoReload(): void;

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;
    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;
    /**确认订单 */
    onOrderConfirm(): void;
    /**关闭订单 */
    onOrderClose(data: any): void;
    /**获取账号当前持有金币 */
    onWallet(): void;
    /**返回项目后自动刷新 */
    continueAutoReload(): void;
}
