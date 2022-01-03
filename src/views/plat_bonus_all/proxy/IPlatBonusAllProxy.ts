import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatBonusAllProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;
    /**图片弹窗相关数据 */
    dialogImgData: any;
    /**分红金额 弹窗数据 */
    dividendDialogData: any;
    /**取得表头数据 */
    admin_plat_bonus_all_stock_set_table_columns(): void;
    /**设置表头数据 */
    receive_admin_plat_bonus_all_stock_set_table_columns(data: any): void;
    /**表格数据 */
    receive_admin_plat_bonus_all_stock_set_index(data: any): void;
    /**关闭弹窗 */
    hideDialog(): void;
    /**取plat 数据 */
    admin_plat_show(): void;
    /**写入plat 数据 */
    receive_admin_plat_show(data: any): void;
    /**写数平台模版说明*/
    receive_admin_plat_bonus_all_stock_model_show(body: any): void;
    /**配置说明图片*/
    showBannerDialog(): void;
    /**查询 */
    admin_plat_bonus_all_stock_set_index(): void;
    /**图片更换 */
    admin_resource_upload(data: any): void;
    /**配置图片确认 */
    admin_plat_update(): void;
    /**图片更换完成 */
    onBannerUploadSuccess(data: any): void;
    /**显示整盘分红金额 弹窗 */
    onShowDividendDialog(data: any): void;
    /**整盘分红金额 更新数据 */
    admin_plat_bonus_all_stock_set_update(): void;
}
