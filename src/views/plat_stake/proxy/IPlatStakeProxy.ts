import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatStakeProxy {
    /**表格相关数据 */
    stakeLogtableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**查询条件 */
    listQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**显示弹窗 */
    showUserLogDialog(status: string, data?: any): void;

    /**查询 */
    onQuery(): void;
}
