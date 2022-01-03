import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IStatisticPlatDaysProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
        columnKeys: any;
        hideColumns: any;
        updateNum: number;
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

    /**合计 相关数据 */
    summaryData: any;

    /**导出 相关数据 */
    exportData: any;

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

    /**字段配置筛选 */
    filterTable(): any;

    /**取出没被字串配置过滤的columns */
    getArrDifference(arr1: any, arr2: any): void;

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any): void;

    // 导出合计
    getExportSummary(filterKeys: any, summary: any): void;
}
