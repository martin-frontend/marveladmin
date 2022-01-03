import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatAgentBindProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**保底 弹窗相关数据 */
    promotionFloorDialogData: {
        bShow: boolean;
        status: string;
        form: any;
        user_id: any;
        range: any;
        formSource: any;
    };

    /**绑定 弹窗相关数据 */
    bindDialogData: {
        bShow: any;
        form: any;
        user_id: any;
        formSource: any;
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**详细数据 */
    setDetail(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;

    /**更新代理保底数据 */
    onFloorUpdate(): void;

    /**保底设定 弹窗 */
    showSettingDialog(data?: any): void;

    /**保底设定范围 */
    setFloorRange(data: any): void;

    /**绑定 */
    onBind(): void;

    /**打开用户详情 */
    onShowUserDetail(user_id: any): void;
}
