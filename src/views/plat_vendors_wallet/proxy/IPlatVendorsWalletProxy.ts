import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatVendorsWalletProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        platInfo: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**记录 查询条件 */
    logListQuery: any;

    /**表格操作弹窗 相关数据 */
    vendorDialogData: {
        setting: any;
        log: any;
        wallet: any;
        limit: any;
        create: any;
    };

    /**公共钱包弹窗 相关数据 */
    logData: {
        columns: any;
        list: any;
        pageInfo: any;
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**设置记录 表头数据 */
    setLogTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**设置记录 表格数据 */
    setLogTableData(data: any): void;

    /**重置紀錄 查询条件 */
    resetLogListQuery(): void;

    /**重置 搜寻条件 */
    resetListQuery(): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;

    /**记录查询 */
    onLogQuery(): void;

    /**添加钱包 */
    onAdd(): void;

    /**操作-> 设这数据 */
    onSettingDialog(row: any): void;

    /**操作-> 设这 存挡 */
    onSettingUpdate(): void;

    /**记录 */
    onLog(row: any): void;

    /**操作-> 上下分弹窗 */
    onShowVenderWalletDialog(): void;

    /**操作-> 上下分存挡 */
    onVenderWalletUpdate(): void;

    /**操作-> 额度设置弹窗 */
    onShowVendorLimitDialog(): void;

    /**操作-> 额度设置存挡 */
    onVenderLimitUpdate(): void;

    /**新增钱包 数据 */
    onCreateWallet(): void;

    /**新增钱包 数据存挡 */
    setCreateData(data: any): void;

    /**公共钱包 记录查询 */
    onPublicLog(): void;

    /**公共钱包 上下分弹窗 */
    showPublicWalletDialog(): void;

    /**公共钱包 上下分存挡 */
    onPublicWalletUpdate(): void;
}
