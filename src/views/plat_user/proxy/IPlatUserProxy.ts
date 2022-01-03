import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatUserProxy {
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
        form: any;
        formSource: any;
    };
    // 输赢参数
    // total_win: string;

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;
    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;
    /**打开用户详情页 */
    onShowDetail(user_id: number): void;
    /**刷新金币 */
    onRefrushGold(user_id: number): void;
    /**扣款 */
    onDeductGold(): void;
    /**状态切换 */
    onToggleStatus(user_id: number, status: number): void;
    /**输赢切换 */
    // onUpdateTotalWin(value: string): void;
}
