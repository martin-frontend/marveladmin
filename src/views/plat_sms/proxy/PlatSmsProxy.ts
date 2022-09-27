import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_sms/setting";
import { MessageBox } from "element-ui";
import IPlatSmsProxy, { SmsStatusType } from "./IPlatSmsProxy";
import i18n from "@/lang";

export default class PlatSmsProxy extends AbstractProxy implements IPlatSmsProxy {
    static NAME = "PlatSmsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_sms_table_columns);
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
            sms_id: { name: "", options: {} },
            head_sign: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            status: { name: "", options: {} },
            sms_api_key: { name: "", options: {} },
            sms_api_uname: { name: "", options: {} },
            tpl_id: { name: "", options: {} },
            template: { name: "", options: {} },
            type: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            platAll: { name: "", options: <any>{} },
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
            plat_id: "",
            type: "",
            sms_api_key: "",
            sms_api_uname: "",
            sms_id: "",
            status: 1,
            tpl_id: "",
            head_sign: "",
            template: "",
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
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_sms_show, { id: data.id });
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
            plat_id: "",
            type: "",
            sms_api_key: "",
            sms_api_uname: "",
            sms_id: "",
            status: 1,
            tpl_id: "",
            head_sign: "",
            template: "",
        });
    }

    /**查询 */
    onQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plat_sms_index, objectRemoveNull(queryCopy));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, type, sms_api_key, sms_api_uname, sms_id, status, tpl_id, head_sign } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            type,
            sms_api_key,
            sms_api_uname,
            sms_id,
            status,
            tpl_id,
            head_sign,
        };
        this.sendNotification(HttpType.admin_plat_sms_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_plat_sms_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_sms_update, { id, is_delete: 1 });
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
        this.facade.sendNotification(HttpType.admin_plat_sms_send, this.messageDialogData.form);
    }
    /**启用 */
    onActivate(id: number) {
        this.facade.sendNotification(HttpType.admin_plat_sms_update, { id: id, status: SmsStatusType.Activate });
    }
    /**停用 */
    onDisactivate(id: number) {
        this.facade.sendNotification(HttpType.admin_plat_sms_update, { id: id, status: SmsStatusType.Disactivate });
    }
    /**查看短信余量 */
    getBalance(id: number) {
        this.tableData.balance = i18n.t("plat_sms.loading");
        this.facade.sendNotification(HttpType.admin_plat_sms_getBalance, { id: id, hideLoading: true });
    }
}
