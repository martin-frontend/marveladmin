import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatAssetWalletProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;

    /**查询 */
    onQuery(): void;
}
