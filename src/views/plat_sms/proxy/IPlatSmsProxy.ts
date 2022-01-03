import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatSmsProxy {
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

    /**讯息测试弹窗数据 */
    messageDialogData: {
        bShow: boolean,
        form: any
    }
    /**显示简讯弹窗 */
    showMessageDialog(data: any): void;
    /**隐藏简讯弹窗 */
    hideMessageDialog(): void;
    /**测试简讯 */
    sendMessage(): void;
    /**启用 */
    onActivate(id: number): void;
    /**停用 */
    onDisactivate(id: number): void;
    /**查看短信余量 */
    getBalance(id: number): void;
}
// 98:未启用 1:启用
export enum SmsStatusType {
    Activate = 1,
    Disactivate = 98,
}
