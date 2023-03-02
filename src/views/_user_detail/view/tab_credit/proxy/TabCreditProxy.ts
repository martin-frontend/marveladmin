import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import TabUserInfoProxy from "@/views/_user_detail/view/tab_user_info/proxy/TabUserInfoProxy";

export default class TabCreditProxy extends TabUserInfoProxy {
    static NAME = "TabCreditProxy";
    /**进入页面时调用 */
    enter() {
        super.enter();
        this.onQuery();
    }

    /**設置表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    getLogTableColumns() {
        this.sendNotification(HttpType.admin_plat_users_credit_log_table_columns);
    }

    setLogTableData(data: any) {
        Object.assign(this.logDialogData.columns, data);
        this.getLog();
    }

    tableData = {
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
    };

    listQuery = {
        invite_user_id: 0,
        plat_id: 0,
        page_count: 1,
        page_size: 10,
    };

    logDialogData = {
        bShow: false,
        columns: {
            id: { name: "编号", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "平台ID", options: [] },
            user_id: { name: "平台用户ID", options: [] },
            credit_rate: { name: "我的占比", options: [] },
            credit_rate_invited: { name: "上级占比", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "更新人", options: [] },
            updated_at: { name: "修改时间", options: [] },
        },
        list: <any>[],
        form: <any>{},
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        query: {
            page_count: 1,
            page_size: 10,
        },
    };

    dialogData = {
        bShow: false,
        filed: "",
        filedValue: "",
        filedValue1: "",
        form: <any>{
            credit_rate_invited: "",
            credit_rate: "",
        },
    };

    /**查询 */
    onQuery() {
        this.listQuery.invite_user_id = getPageSetting().user_id;
        this.listQuery.plat_id = getPageSetting().plat_id;
        this.sendNotification(HttpType.admin_plat_user_direct_users, objectRemoveNull(this.listQuery));
    }

    getLog() {
        const { user_id } = this.logDialogData.form;
        this.sendNotification(HttpType.admin_plat_users_credit_log_index, { user_id });
    }

    setLogData(data: any) {
        this.logDialogData.list.length = 0;
        this.logDialogData.list.push(...data.list);
        Object.assign(this.logDialogData.pageInfo, data.pageInfo);
        this.showLogDialog();
    }

    showLogDialog() {
        this.logDialogData.bShow = true;
    }

    /**修改 */
    onEdit(filed: string, filedValue: string) {
        if (filed == "credit_rate_invited") {
            const { user_id, credit_rate_invited, credit_rate } = this.dialogData.form;
            this.sendNotification(HttpType.admin_plat_user_update, {
                user_id,
                credit_rate_invited,
                credit_rate,
            });
        } else {
            super.onEdit(filed, filedValue);
        }
    }
}
