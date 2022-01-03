import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/recharge_channels/setting";
import { MessageBox } from "element-ui";
import IRechargeChannelsProxy from "./IRechargeChannelsProxy";
import i18n from "@/lang";
export default class RechargeChannelsProxy extends AbstractProxy implements IRechargeChannelsProxy {
    static NAME = "RechargeChannelsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_recharge_channels_table_columns);
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
            plat_id: { name: "", options: <any>{} },
            name: { name: "", options: {} },
            vendor_id: { name: "", options: {}, options_key: {} },
            secret: { name: "", options: {} },
            account: { name: "", options: {} },
            support_paymethods: { name: "", options: {} },
            status: { name: "", options: {} },
            extend_params:{ name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        vendor_id: "",
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
            vendor_id: "",
            name: "",
            account: "",
            secret: "",
            status: 1,
            support_paymethods: [],
            extend_params:{}
        },
        formSource: null, // 表单的原始数据
        platOptions:{},
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.dialogData.platOptions = JSON.parse(JSON.stringify(this.tableData.columns.plat_id.options));
        this.tableData.columns.plat_id.options["0"] = i18n.t("common.platIdAll");
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
        data.extend_params = jsonToObject(data.extend_params);
        data.plat_id = data.plat_id.toString();
        data.vendor_id = data.vendor_id.toString();
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            vendor_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            data.plat_id = data.plat_id.toString();
            data.vendor_id = data.vendor_id.toString();
            data.extend_params = jsonToObject(data.extend_params);
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_recharge_channels_show, { id: data.id });
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
            vendor_id: "",
            name: "",
            account: "",
            secret: "",
            status: 1,
            support_paymethods: [],
            extend_params:{}
        });
    }

    /**查询 */
    onQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_recharge_channels_index, objectRemoveNull(queryCopy));
    }
    /**添加数据 */
    onAdd() {
        const {
            id,
            plat_id,
            vendor_id,
            name,
            account,
            secret,
            status,
            support_paymethods,
            extend_params
        } = this.dialogData.form;
        const formCopy: any = {
            id,
            plat_id,
            vendor_id,
            name,
            account,
            secret,
            status,
            support_paymethods,
            extend_params
        };
        formCopy.support_paymethods = JSON.stringify(formCopy.support_paymethods);
        // formCopy.extend_params = JSON.stringify(formCopy.extend_params);
        this.sendNotification(HttpType.admin_recharge_channels_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            delete formCopy.type;
            formCopy.extend_params = JSON.parse(formCopy.extend_params);
            const temp = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }

            let extendsStr: any = "{}";
            if (temp.extend_params) {
                if (Object.keys(temp.extend_params).length > 0) {
                    extendsStr = JSON.stringify(JSON.parse(temp.extend_params));
                }
                temp.extend_params = extendsStr;
            }

            temp.id = this.dialogData.form.id;
             // 发送消息
            this.sendNotification(HttpType.admin_recharge_channels_update, temp);
        } catch (error) {
            MessageBox.alert(<string> i18n.t("common.jsonError"));
        }
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string> i18n.t("common.deleteConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_recharge_channels_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
