import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/email_vendor/setting";
import { MessageBox } from "element-ui";
import i18n from "@/lang";
import ISystemEmailProxy from "./ISystemEmailProxy";
export default class SystemEmailProxy extends AbstractProxy implements ISystemEmailProxy {
    static NAME = "SystemEmailProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_email_vendor_table_columns);
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
            email_vendor_id: { name: "", options: {} },
            email_vendor_name: { name: "", options: {} },
            email_vendor_name_unique: { name: "", options: {} },
            status: { name: "", options: {} },
            email_vendor_desc: { name: "", options: {} },
            extends: { name: "", options: {} },
            created_by: { name: "", options: {} },
            created_at:{ name: "", options: {} },
            updated_by:{ name: "", options: {} },
            updated_at:{ name: "", options: {} },

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
            email_vendor_id: "",
            email_vendor_name: "",
            email_vendor_name_unique: "",
            status: 1,
            email_vendor_desc: 1,
            extends: {},
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
        data.extends = jsonToObject(data.extends);
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
            this.dialogData.form.email_vender_id = data.email_vendor_id;
            Object.assign(this.dialogData.form, data);
            //如果弹窗要展示的内容比较详细，列表中不全，需要获取详情信息，本模块不需要
            // this.sendNotification(HttpType.admin_email_vendor_show, { email_vender_id: data.email_vendor_id });
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
            email_vendor_id: "",
            email_vendor_name: "",
            email_vendor_name_unique: "",
            status: 1,
            email_vendor_desc: 1,
            extends: {},
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_email_vendor_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, status } = this.dialogData.form;
        const formCopy: any = { name, status };
        let extendsStr: any = "{}";
            if (Object.keys(formCopy.extends).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(formCopy.extends));
            }
            formCopy.extends = extendsStr;
        this.sendNotification(HttpType.admin_email_vendor_store, objectRemoveNull(formCopy));
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
        formCopy.email_vender_id = this.dialogData.form.email_vender_id;
        formCopy.extends = JSON.parse(formCopy.extends);
        // 发送消息
        this.sendNotification(HttpType.admin_email_vendor_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_email_vendor_update, { system_email_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
