import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatSwapLiquidityProxy {
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

    /**更新设置 数据 */
    dialogSetting: {
        bShow: false;
        source: string;
        form: any;
    };

    /**更新流动性 */
    dialogLiquidity: {
        bShow: false;
        source: null;
        form: any;
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**更新流动性 */
    showLiquidity(row: any, type: any): void;

    /**显示设置弹窗 */
    showSettingDialog(value?: any): void;

    /**查询 */
    onQuery(): void;

    /**更新设置 */
    onSetting(): void;
    /**更新流动性 */
    onLiquidity(): void;
}
