import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/admin_user_log_user/setting";
import { MessageBox } from "element-ui";
import IAdminUserLogUserProxy from "./IAdminUserLogUserProxy";

export default class AdminUserLogUserProxy extends AbstractProxy implements IAdminUserLogUserProxy {
    static NAME = "AdminUserLogUserProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_admin_user_log_user_table_columns);
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
            admin_user_id: { name: "", options: {} },
            admin_username: { name: "", options: {} },
            cate: { name: "", options: {} },
            content: { name: "", options: {} },
            created_at: { name: "", options: {} },
            id: { name: "", options: {} },
            permission_id: { name: "", options: {} },
            plat_id: { name: "", options: <any>{} },
            type: { name: "", options: {}, options_key: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        admin_username: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        permission_id: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            admin_user_id: "",
            admin_username: "",
            cate: "",
            created_at: "",
            data_belong: "",
            id: "",
            permission_id: "",
            plat_id: "",
            type: "",
            content: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        data.content = JSON.parse(data.content);
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            admin_username: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            permission_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_admin_user_log_user_show, { id: data.id });
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_admin_user_log_user_index, objectRemoveNull(this.listQuery));
    }
}
