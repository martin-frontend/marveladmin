import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IAdminRoleProxy {
    /**表格相关数据 */
    tableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**查询条件 */
    listQuery: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean,
        status: string,
        form: any,
        formSource: any
    };
    /**权限弹窗相关数据 */
    dialogSettingData: {
        bShow: boolean,
        /**搜索条件 */
        inputSearch: string,
        /**详细数据 */
        detail: any,
        /**已选择的权限 */
        detailPermission: any,
        /**权限树 */
        permissionData: any,
        /**默认选择 */
        defaultPermission: any,
    }

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

    /**显示权限设置弹窗 */
    showDialogSetting(data: any): void;
    /**隐藏权限设置弹窗 */
    hidedialogSetting(): void;

    /**查询 */
    onQuery(): void;
    /**添加数据 */
    onAdd(): void;
    /**更新数据 */
    onUpdate(): void;
    /**删除数据 */
    onDelete(id: any): void;

    /**获取个人详细信息，得到权限信息 */
    onMineInfo(): void;
    /**保存权限设置 */
    onSavePermission(permission_ids: any): void;
}
