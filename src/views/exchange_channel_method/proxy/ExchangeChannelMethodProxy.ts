import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/exchange_channel_method/setting";
import { MessageBox } from "element-ui";
import IExchangeChannelMethodProxy from "./IExchangeChannelMethodProxy";
import i18n from "@/lang";

export default class ExchangeChannelMethodProxy extends AbstractProxy implements IExchangeChannelMethodProxy {
    static NAME = "ExchangeChannelMethodProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_exchange_channel_table_columns);
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
            plat_id: { name: "", options: {} },
            name: { name: "", options: {} },
            vendor_name: { name: "", options: {} },
            payment_method_type: { name: "", options: {} },
        },
        methodColumns: {
            plat_id: { name: "", options: {} },
            exchange_channel_id: { name: "", options: {} },
            payment_method_type: { name: "", options: {} },
            min_gold: { name: "", options: {} },
            max_gold: { name: "", options: {} },
            free_time: { name: "", options: {} },
            fee: { name: "", options: {} },
            min_fee: { name: "", options: {} },
            balance: { name: "", options: {} },
            subtitle: { name: "", options: {} },
            status: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        status: 1,
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            exchange_channel_id: "",
            plat_id: "",
            payment_method_type: "",
            min_gold: "100",
            max_gold: "100000",
            free_time: "3",
            fee: "1",
            min_fee: "1",
            balance: "10",
            subtitle: "",
            status: "1",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
        this.sendNotification(HttpType.admin_exchange_channel_method_table_columns);
    }
    setMethodTableColumns(data: any) {
        Object.assign(this.tableData.methodColumns, data);
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
            exchange_channel_id: "",
            plat_id: "",
            payment_method_type: "",
            min_gold: "100",
            max_gold: "100000",
            free_time: "3",
            fee: "1",
            min_fee: "1",
            balance: "10",
            subtitle: "",
            status: "1",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        data.status = data.status.toString();
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, data);
            // this.sendNotification(HttpType.admin_exchange_channel_method_show, { id: data.id });
        } else {
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
            exchange_channel_id: "",
            payment_method_type: "",
            min_gold: "100",
            max_gold: "100000",
            free_time: "3",
            fee: "1",
            min_fee: "1",
            balance: "10",
            subtitle: "",
            status: "1",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_exchange_channel_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
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
        } = this.dialogData.form;
        const formCopy: any = {
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
        this.sendNotification(HttpType.admin_exchange_channel_method_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 一些需要特殊处理的参数
        // TODO
        // 删除多余无法去除的参数
        // TODO
        // 添加主键
        formCopy.id = this.dialogData.form.id;
        // TODO
        // 发送消息
        this.sendNotification(HttpType.admin_exchange_channel_method_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_exchange_channel_method_update, {
                    exchange_channel_id: id,
                    is_delete: 1,
                });
            })
            .catch(() => {});
    }
}
