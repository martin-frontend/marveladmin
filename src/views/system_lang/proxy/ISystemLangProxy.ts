import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ISystemLangProxy {
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
        status: string;
        form: any;
        formSource: any;
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
    /**获取全部翻译内容 */
    translate(): void;
    /**获取其他全部翻译内容 */
    translateAll(): void;
    /**语言包导入 */
    languageImport(): void;
    /**生成语言包，添加了翻译语言，手动调用此方法生成.json文件上传cdn */
    generate(): void;
}
