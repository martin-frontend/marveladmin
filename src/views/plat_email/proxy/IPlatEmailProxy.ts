import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatEmailProxy {
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
    /**添加数据 */
    onAdd(): void;
    /**删除数据 */
    onDelete(id: any): void;

    /**用户邮件表格相关数据 */
    platUserTableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**用戶郵件查询条件 */
    userListQuery: any;
    /**设置用户邮件表头 */
    setPlatUserTableColumns(data?: any): void;
    /**用户邮件列表查询 */
    onUserQuery(): void;
    /**重置用户邮件查询 */
    resetUserListQuery(): void;
    /**设置用户邮件列表数据 */
    setUserTableData(data: any): void;

    /**错误讯息弹窗数据 */
    alertDialogData: {
        bShow: boolean,
        form: any,
    }
    /**显示发送错误弹窗 */
    showAlertDialog(data: any): void;
    /**隐藏发送错误弹窗 */
    hideAlertDialog(): void;
}
// 郵件列表標籤
export enum EmailTab {
    Plat = "平台邮件列表",
    User = "用户邮件列表",
}
//郵件狀態
export enum EmailStatus {
    Sended = 1, //發送
    Revoked = 99,//撤銷
}
//邮件类型
export enum EmailType {
    AllPlatWithNew = "1",
    AllPlat = "2",  //全平台
    Group = "3",    //群发
}
//獎勵類型
export enum BonusType {
    gold = "gold",
    score = "score",
}
//有無附件
export enum EmailAttachmentType {
    NoAttach = 1,
    BonusAttach = 11,
}
