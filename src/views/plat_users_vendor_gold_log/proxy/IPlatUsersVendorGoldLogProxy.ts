import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatUsersVendorGoldLogProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**操作数据 */
    confirmData: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**查询 */
    onQuery(): void;

    /**更新数据 */
    onUpdate(): void;

    /**用户详情 */
    onShowUserDetail(user_id: number): void;
}
