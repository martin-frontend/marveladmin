import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICommonLangProxy {
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

    /**获取全部翻译内容 */
    translate(): void;

    /**根据key查询数据库是否有该key的翻译 */
    translateLangCheck(): void;
}
