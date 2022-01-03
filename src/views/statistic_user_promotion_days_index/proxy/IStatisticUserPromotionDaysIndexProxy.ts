import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IStatisticUserPromotionDaysIndexProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        userInfo: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**tabs 數據 */
    tabData: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**查询 */
    onQuery(): void;
}
