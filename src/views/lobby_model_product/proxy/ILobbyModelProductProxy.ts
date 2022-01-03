import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ILobbyModelProductProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
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

    /**筛选 */
    listFilter: any;

    /**数据筛选 */
    tableDataFilter: any;

    /**产品类型 copy */
    vendorTypeOptions: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;

    /**添加数据 */
    onAdd(): void;

    /**更新数据 */
    onUpdate(): void;

    /**删除数据 */
    onDelete(lobby_model_product_id: any): void;

    /**产品厂商二级连动产品类型 */
    onGetVendor(): void;

    /**写入连动产品类型 */
    setVendor(value: any): void;

    /** 筛选显示表格类型*/
    onFilterTable(): void;
}
