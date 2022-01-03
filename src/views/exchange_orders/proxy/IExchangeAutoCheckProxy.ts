import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IExchangeOrdersProxy {
    // /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**重置 */
    resetDialogForm(): void;

    /**自动审核 弹窗 */
    onShowAutoCheckDialog(): void;

    /**確定平台是否在審核中 */
    checkVerify(): void;

    /**写入審核中 数据 */
    setVerify(body: any): void;

    /**自动审核 开始 */
    actionAutoCheck(): void;

    /**关闭弹窗 */
    hideDialog(): void;

    /**停止审核  */
    stopVerify(): void;
}
