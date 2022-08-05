import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IStatisticPlatCoinDaysProxy {
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

    /**查询 */
    onQuery(): void;

    /**取出没被字串配置过滤的columns */
    getArrDifference(arr1: any, arr2: any): void;

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any): void;
}
