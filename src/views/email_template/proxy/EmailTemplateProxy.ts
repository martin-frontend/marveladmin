import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { MessageBox } from "element-ui";
import i18n from "@/lang";
import IEmailTemplateProxy from "./IEmailTemplateProxy";
import { HttpType } from "../setting";
export default class EmailTemplateProxy extends AbstractProxy implements IEmailTemplateProxy {
    static NAME = "EmailTemplateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_email_template_table_columns);
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
            id: { name: "", options: {} },
            name: { name: "", options: {} },
            type: { name: "", options: {} },
            subject: { name: "", options: {} },
            content: { name: "", options: {} },
            replaceable_text: { name: "", options: {} },
            created_by: { name: "", options: {} },
            created_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            plat_id: { name: "平台ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            name: "",
            type: null,
            subject: "",
            content: "",
            replaceable_text: "",
            plat_id: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableCoulmns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEY = Object.keys(this.tableData.columns["plat_id"].options);
        if (PLAT_ID_OPTIONS_KEY.length > 0) {
            if (!PLAT_ID_OPTIONS_KEY.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEY[0];
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
            this.dialogData.form.id = data.id;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.type = data.type.toString();
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
            id: "",
            name: "",
            type: "",
            subject: "",
            content: "",
            replaceable_text: "",
            plat_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_email_template_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = this.dialogData.form;

        this.sendNotification(HttpType.admin_email_template_store, objectRemoveNull(formCopy));
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
        formCopy.email_vender_id = this.dialogData.form.id;

        // 发送消息
        this.sendNotification(HttpType.admin_email_template_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_email_template_update, { email_vender_id: id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
