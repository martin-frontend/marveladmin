import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/admin_user_login_record/setting";
import { MessageBox } from "element-ui";
import IAdminUserLoginRecordProxy from "./IAdminUserLoginRecordProxy";

export default class AdminUserLoginRecordProxy extends AbstractProxy implements IAdminUserLoginRecordProxy {
    static NAME = "AdminUserLoginRecordProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_admin_user_login_record_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            id: { name: "ID", options: [] },
            admin_user_id: { name: "账号ID", options: [] },
            admin_username: { name: "账户名称", options: [] },
            login_ip: { name: "登陆IP", options: [] },
            created_at: { name: "登陸時間", options: [] },
            updated_at: { name: "修改时间", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        admin_user_id: "",
        admin_username: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            admin_user_id: "",
            admin_username: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_admin_user_login_record_index, objectRemoveNull(this.listQuery));
    }
}
