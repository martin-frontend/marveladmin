export default interface IStatisticPlatFundsFlowProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        data: any;
        bShowInfo: boolean;
        format: string;
    };

    /**查询条件 */
    listQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**详细数据 */
    setDetail(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**查询 */
    onQuery(): void;
}
