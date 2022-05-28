import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { MessageBox } from "element-ui";
import IPlatEmailVendorProxy, { SmsStatusType } from "./IPlatEmailVendorProxy";
import i18n from "@/lang";
import { HttpType } from "../setting";

export default class PlatEmailVendorProxy extends AbstractProxy implements IPlatEmailVendorProxy {
    static NAME = "PlatEmailVendorProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_email_vendor_table_columns);
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
    tableData: any = {
        columns: {
            id: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            email_vendor_id: { name: "", options: {} },
            status: { name: "", options: {} },
            extends: { name: "", options: {} },
            created_by: { name: "", options: {} },
            created_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            type: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        balance: "", // 短信余量
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        sms_id: "",
        sms_api_uname: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            data_belong: "",
            plat_id: "",
            email_vendor_id: "",
            status: 1,
            extends: "",
            created_by: "",
            created_at: "",
            updated_by: "",
            updated_at: "",
            type: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.tableData.columns.platAll = JSON.parse(JSON.stringify(this.tableData.columns.plat_id));
        this.tableData.columns.platAll.options["0"] = i18n.t("recharge_channels.allPlat");
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
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            sms_id: "",
            sms_api_uname: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.form.email_vender_id = data.email_vendor_id;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.extends = jsonToObject(data.extends);
            // this.sendNotification(HttpType.admin_plat_email_vendor_show, { id: data.id });
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
            data_belong: "",
            plat_id: "",
            email_vendor_id: "",
            status: 1,
            extends: {},
            created_by: "",
            created_at: "",
            updated_by: "",
            updated_at: "",
            type: "",
        });
    }

    /**查询 */
    onQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_email_vendor_index, objectRemoveNull(queryCopy));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = this.dialogData.form;
        formCopy.extends = JSON.stringify(JSON.parse(formCopy.extends));
        this.sendNotification(HttpType.admin_plat_email_vendor_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_email_vendor_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_email_vendor_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**讯息测试弹窗数据 */
    messageDialogData = {
        bShow: false,
        form: {
            id: "",
            mobile: "",
        },
    };
    /**显示简讯弹窗 */
    showMessageDialog(data: any) {
        this.messageDialogData.form.id = data.id;
        this.messageDialogData.bShow = true;
    }
    /**隐藏简讯弹窗 */
    hideMessageDialog() {
        this.messageDialogData.bShow = false;
    }
    /**测试简讯 */
    sendMessage() {
        this.facade.sendNotification(HttpType.admin_plat_email_vendor_test_send, this.messageDialogData.form);
    }
    /**启用 */
    onActivate(id: number) {
        this.facade.sendNotification(HttpType.admin_plat_email_vendor_update, { id: id, status: SmsStatusType.Activate });
    }
    /**停用 */
    onDisactivate(id: number) {
        this.facade.sendNotification(HttpType.admin_plat_email_vendor_update, { id: id, status: SmsStatusType.Disactivate });
    }
    /**查看短信余量 */
    getBalance(id: number) {
        // this.tableData.balance = i18n.t("plat_sms.loading");
        // this.facade.sendNotification(HttpType.admin_plat_sms_getBalance, { id: id, hideLoading: true });
    }
}
