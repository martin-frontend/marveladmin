import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatUsersPaymentMethodProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**用户详情 ID */
    userDetailId: number;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**查询 */
    onQuery(): void;

    /**处理列表内容栏位 */
    // contentFormat(list: any, type: any): string;
}