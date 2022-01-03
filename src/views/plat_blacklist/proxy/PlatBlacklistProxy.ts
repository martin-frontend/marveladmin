import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_blacklist/setting";
import { MessageBox } from "element-ui";
import IPlatBlacklistProxy from "./IPlatBlacklistProxy";
import i18n from "@/lang";
export default class PlatBlacklistProxy extends AbstractProxy implements IPlatBlacklistProxy {
    static NAME = "PlatBlacklistProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_blacklist_table_columns);
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
            // TODO
            black_content: { name: "黑名单内容", options: {} },
            black_type: { name: "黑名单类型", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "黑名单ID", options: {} },
            is_delete: { name: "是否删除", options: {} },
            limit_type: { name: "限制类型", options: {} },
            plat_id: { name: "平台ID", options: {} },
            remark: { name: "备注", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        multipleSelection: <any>[],
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        black_content: "",
        black_type: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
            black_contents: "",
            black_type: null,
            limit_type: [],
            plat_id: null,
            remark: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns.plat_id.options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
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

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.resetDialogForm();
        this.dialogData.formSource = null;
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
            black_contents: null,
            black_type: null,
            limit_type: [],
            plat_id: null,
            remark: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plats_blacklist_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        let { black_contents, black_type, limit_type, plat_id, remark } = this.dialogData.form;
        let formCopy: any = {
            black_contents,
            black_type,
            limit_type,
            plat_id,
            remark,
        };
        formCopy.limit_type = JSON.stringify(limit_type);
        formCopy.black_contents = JSON.stringify(black_contents);
        this.sendNotification(HttpType.admin_plats_blacklist_store, objectRemoveNull(formCopy));
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string> i18n.t("common.deleteConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plats_blacklist_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**批次删除数据 */
    onDeleteBatch() {
        MessageBox.confirm(<string> i18n.t("common.batchRemoveConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                const data = JSON.stringify(this.tableData.multipleSelection);
                this.sendNotification(HttpType.admin_plats_blacklist_delete_batch, { ids: data });
            })
            .catch(() => {});
    }
}
