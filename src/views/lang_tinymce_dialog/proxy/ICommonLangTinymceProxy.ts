import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICommonLangTinymceProxy {
    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**添加数据 */
    onAdd(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;
    /**重置弹窗表单 */
    resetDialogForm(): void;
}
