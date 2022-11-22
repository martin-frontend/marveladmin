import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IStatisticBetPlatDaysProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;
    /**查询条件  平台游戏统计*/
    platListQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**增加合计数据 */
    addSummary(data: any): void;

    /**重置游戏统计查询条件 */
    resetListQuery(): void;
    /**重置平台游戏统计查询条件 */
    resetPlatListQuery(): void;

    /**查询 */
    onQuery(): void;
    /**取得所有资料 */
    onQueryAll(): void;

    /**平台游戏统计栏位导出顺序 */
    _platKeyList: Array<string>;
    /**游戏统计栏位导出顺序 */
    _gameKeyList: Array<string>;
    /**导出excel */
    exportExcel(data: any): void;
}

// 统计标签
export enum StatisticTab {
    Plat = "1",
    Game = "2",
}
