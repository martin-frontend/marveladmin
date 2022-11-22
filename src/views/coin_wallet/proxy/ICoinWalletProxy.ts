import { BaseInfo } from "@/components/vo/commonVo";
import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ICoinWalletProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;
    /**记录查询条件 */
    logListQuery: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        status: string;
        form: any;
        formSource: any;
    };
    /**上下分相关数据 */
    depositData: {
        bShow: boolean;
        form: any;
    };
    /**记录查询数据 */
    logDialogData: {
        bShow: boolean;
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**设置记录表头数据 */
    setLogTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**记录数据 */
    setLogData(data: any): void;
    /**重置查询条件 */
    resetListQuery(): void;
    /**重置记录查询条件 */
    resetLogQuery(): void;

    /**显示记录查询弹窗 */
    showLog(admin_user_id: string): void;
    /**显示上分弹窗 */
    showDeposit(data?: any): void;
    /**隐藏上分弹窗 */
    hideDeposit(): void;
    /**显示下分弹窗 */
    showWithdraw(data?: any): void;
    /**隐藏下分弹窗 */
    hideWithdraw(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;
    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;

    /**上分 */
    onDeposit(data: any): void;
    /**下分 */
    onWithdraw(data: any): void;
    /**记录查询 */
    onLogQuery(): void;
}
