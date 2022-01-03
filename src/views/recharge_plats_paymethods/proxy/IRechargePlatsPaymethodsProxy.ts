import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IRechargePlatsPaymethodsProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
    };

    /**查询条件 */
    listQuery: any;

    /**更新列表資料 */
    listDate: any;

    /**排序列表資料 */
    sortableDate: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**查询 */
    onQuery(): void;

    /**更新数据 */
    onUpdate(sortable?: any): void;
}
