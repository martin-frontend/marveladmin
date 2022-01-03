import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IExchangeOrdersProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**定时器 */
    IntervalObj: any;

    /**操作 */
    ctrlStr: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**查询 */
    onQuery(): void;

    /**更新数据 */
    onUpdate({ type, row }: any): void;

    /**外部来的搜寻条件 */
    specialQuery(): void;

    /**自动刷新 */
    autoReload(): void;

    /**停止自动刷新 */
    stopReload(): void;

    /**返回项目后自动刷新 */
    continueAutoReload(): void;

    /**取得excel 挡案名称 */
    getExcelOutputName(): void;

    /**取得所有资料 */
    onQueryAll(): void;

    /**导出excel */
    exportExcel(data: any): void;
}
