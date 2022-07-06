import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/exchange_channel/setting";
import { MessageBox } from "element-ui";
import IExchangeChannelProxy from "./IExchangeChannelProxy";
import i18n from "@/lang";
export default class ExchangeChannelProxy extends AbstractProxy implements IExchangeChannelProxy {
    static NAME = "ExchangeChannelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_exchange_channel_table_columns);
        this.sendNotification(HttpType.admin_exchange_channel_method_table_columns);
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
            account: { name: "兑换厂商账号", options: {} },
            block_network_id: { name: "区块网络", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            coin_relations: <any>{},
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            exchange_vendors_id: { name: "兑换厂商ID", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否删除", options: {} },
            name: { name: "兑换渠道名称", options: {} },
            payment_method_detail: { name: "平台兑换方式", options: {} },
            payment_method_type: { name: "支持兑换方式", options: {} },
            plat_id: { name: "平台ID", options: {} },
            secret: { name: "兑换厂商密钥", options: {} },
            status: { name: "使用状态", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        exchange_vendors_id: "",
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
            exchange_vendors_id: "",
            payment_method_type: "",
            payment_method_detail: [],
            name: "",
            account: "",
            secret: "",
            status: 1,
            //以下数据在coin_relations
            coin_name_unique: "",
            block_network_id: "",
            extend_params: "{}",
        },
        formSource: null, // 表单的原始数据
        platAllOptions: {},
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.dialogData.platAllOptions = JSON.parse(JSON.stringify(this.tableData.columns.plat_id.options));
        Object.assign(this.dialogData.platAllOptions, {
            "0": <string>i18n.t("recharge_channels.allPlat"),
        });
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
        this.tableData.list.forEach((element: any) => {
            element.status = element.status === 1 ? true : false;
        });
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        this.dialogData.form.block_network_id = this.dialogData.form.block_network_id.toString();
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "0",
            exchange_vendors_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            const copyData = JSON.parse(JSON.stringify(data));
            this.dialogData.formSource = copyData;
            copyData.extend_params = jsonToObject(copyData.extend_params);
            copyData.status = copyData.status - 0;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(copyData)));

            // this.sendNotification(HttpType.admin_exchange_channel_show, { id: data.id });
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
            exchange_vendors_id: "",
            payment_method_type: "",
            payment_method_detail: [],
            name: "",
            account: "",
            secret: "",
            status: 1,
            //以下数据在coin_relations
            coin_name_unique: "",
            block_network_id: "",
            extend_params: {},
        });
    }

    /**查询 */
    onQuery() {
        const data: any = JSON.parse(JSON.stringify(this.listQuery));
        data.plat_id = data.plat_id === "0" ? "" : data.plat_id;
        this.sendNotification(HttpType.admin_exchange_channel_index, objectRemoveNull(data));
    }
    /**添加数据 */
    onAdd() {
        const form = Object.assign({}, this.dialogData.form);
        const { plat_id, exchange_vendors_id, name, account, secret, status, extend_params } = form;
        const formCopy: any = {
            plat_id,
            exchange_vendors_id,
            name,
            account,
            secret,
            status,
            extend_params,
        };
        this.sendNotification(HttpType.admin_exchange_channel_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const copyExtendParams = JSON.parse(JSON.stringify(this.dialogData.form.extend_params));
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        delete formCopy.english_name;
        delete formCopy.payment_method_type;
        delete formCopy.payment_method_detail;
        delete formCopy.vendor_name;
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.form.extend_params = copyExtendParams;
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_exchange_channel_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_exchange_channel_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**更新使用狀態 */
    updateStatus(data: any) {
        this.sendNotification(HttpType.admin_exchange_channel_update, {
            id: data.id,
            status: data.status === true ? 1 : 98,
        });
    }
    /**兑换方式配置数据 */
    payMethodDialogData = {
        bShow: false,
        status: DialogStatus.create,
        columns: {},
        form: {
            id: "",
            plat_id: "",
            exchange_vendors_id: "",
            exchange_channel_id: "",
            payment_method_type: "",
            min_gold: "100",
            max_gold: "100000",
            free_time: "3",
            fee: "1",
            min_fee: "1",
            balance: "10",
            subtitle: "",
            status: 1,
        },
        formSource: null, // 表单的原始数据
    };
    /**显示兑换方式配置弹窗 */
    showPayMethodDialog(status: string, data?: any) {
        this.payMethodDialogData.bShow = true;
        this.payMethodDialogData.status = status;
        this.resetPayMethodDialogForm();
        Object.assign(this.payMethodDialogData.form, {
            plat_id: data.row.plat_id,
            exchange_vendors_id: data.row.exchange_vendors_id,
            exchange_channel_id: data.row.id,
            payment_method_type: data.type,
        });
        if (status == DialogStatus.update) {
            data.detail.status - data.detail.status.toString();
            this.payMethodDialogData.formSource = data.detail;
            Object.assign(this.payMethodDialogData.form, JSON.parse(JSON.stringify(data.detail)));
            // this.sendNotification(HttpType.admin_exchange_channel_method_show, { id: data.id });
        } else {
            this.payMethodDialogData.formSource = null;
        }
    }
    /**隱藏兑换方式配置弹窗 */
    hidePayMethodDialog() {
        this.payMethodDialogData.bShow = false;
    }
    /**重置兑换方式配置弹窗表单 */
    resetPayMethodDialogForm() {
        Object.assign(this.payMethodDialogData.form, {
            id: "",
            plat_id: "",
            exchange_vendors_id: "",
            exchange_channel_id: "",
            payment_method_type: "",
            min_gold: "100",
            max_gold: "100000",
            free_time: "3",
            fee: "1",
            min_fee: "1",
            balance: "10",
            subtitle: "",
            status: 1,
        });
    }
    /**设置兑换方式表头数据 */
    setPayMethodTableColumns(data: any) {
        Object.assign(this.payMethodDialogData.columns, data);
    }
    /**添加兑换方式数据 */
    onAddPayMethod() {
        const {
            plat_id,
            exchange_channel_id,
            payment_method_type,
            min_gold,
            max_gold,
            free_time,
            fee,
            min_fee,
            balance,
            subtitle,
            status,
        } = this.payMethodDialogData.form;
        const formCopy = {
            plat_id,
            exchange_channel_id,
            payment_method_type,
            min_gold,
            max_gold,
            free_time,
            fee,
            min_fee,
            balance,
            subtitle,
            status,
        };
        this.facade.sendNotification(HttpType.admin_exchange_channel_method_store, objectRemoveNull(formCopy));
    }
    /**更新兑换方式数据 */
    onUpdatePayMethod() {
        const formCopy: any = formCompared(this.payMethodDialogData.form, this.payMethodDialogData.formSource);
        delete formCopy.exchange_vendors_id;
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.payMethodDialogData.form.id;
        // 发送消息
        this.facade.sendNotification(HttpType.admin_exchange_channel_method_update, objectRemoveNull(formCopy));
    }
}
