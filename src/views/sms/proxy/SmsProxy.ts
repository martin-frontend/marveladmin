import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/sms/setting";
import { MessageBox } from "element-ui";
import ISmsProxy from "./ISmsProxy";
import i18n from "@/lang";
export default class SmsProxy extends AbstractProxy implements ISmsProxy {
    static NAME = "SmsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_sms_table_columns);
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
            sms_id: { name: "", options: {} },
            name: { name: "", options: {} },
            status: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            created_by: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            proxy_status: { name: "", options: {} },
            area_code:{ name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            sms_id: "",
            name: "",
            status: 1,
            proxy_status: 1,
            area_code:""
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableCoulmns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, data);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, data);
            this.sendNotification(HttpType.admin_sms_show, { sms_id: data.sms_id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            sms_id: null,
            name: "",
            status: 1,
            proxy_status: 1,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_sms_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, status } = this.dialogData.form;
        const formCopy: any = { name, status };
        this.sendNotification(HttpType.admin_sms_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 一些需要特殊处理的参数
        // TODO
        // 删除多余无法去除的参数
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // TODO
        // 添加主键
        formCopy.sms_id = this.dialogData.form.sms_id;
        // 发送消息
        this.sendNotification(HttpType.admin_sms_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_sms_update, { sms_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
