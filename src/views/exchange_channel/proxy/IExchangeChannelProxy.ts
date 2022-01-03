import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IExchangeChannelProxy {
    /**表格相关数据 */
    tableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**查询条件 */
    listQuery: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean,
        status: string,
        form: any,
        formSource: any
    };

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
    /**添加数据 */
    onAdd(): void;
    /**更新数据 */
    onUpdate(): void;
    /**删除数据 */
    onDelete(id: any): void;

    /**更新使用狀態 */
    updateStatus(data: any): void;
    /**兑换方式配置数据 */
    payMethodDialogData: {
        bShow: boolean,
        status: string,
        form: any,
        formSource: any
    };
    /**显示兑换方式配置弹窗 */
    showPayMethodDialog(status: string, data?: any): void;
    /**隱藏兑换方式配置弹窗 */
    hidePayMethodDialog(): void;
    /**重置兑换方式配置弹窗表单 */
    resetPayMethodDialogForm(): void;
    /**设置兑换方式表头数据 */
    setPayMethodTableColumns(data: any): void;
    /**添加兑换方式数据 */
    onAddPayMethod(): void;
    /**更新兑换方式数据 */
    onUpdatePayMethod(): void;
}
