import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatsWalletProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**查询 */
    onQuery(): void;

    /**更新数据 */
    onUpdate(): void;

    /**显示弹窗 */
    showDialog(): void;

    /**更新数据 */
    onUpdate(): void;

    /**删除数据 */
    onDelete(): void;

    /**新增数据 */
    onCreate(): void;

    /**隐藏弹窗 */
    hideDialog(): void;
}
