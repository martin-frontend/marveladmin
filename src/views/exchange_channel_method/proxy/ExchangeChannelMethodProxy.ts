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

    /**兑换渠道 数据 */
    tableData = {
        columns: {
            //exchange_channel/table_columns
            account: { name: "兑换厂商账号", options: {} },
            block_network_id: { name: "区块网络", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            coin_relations: { 30000: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            exchange_vendors_id: { name: "兑换厂商ID", options: {} },
            extend_params: { name: "扩展参数", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否删除", options: Array(2) },
            name: { name: "兑换渠道名称", options: {} },
            payment_method_detail: { name: "平台兑换方式", options: {} },
            payment_method_type: { name: "支持兑换方式", options: {} },
            plat_id: { name: "所属平台", options: {} },
            secret: { name: "兑换厂商密钥", options: {} },
            status: { name: "使用状态", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**兑换参数设置 数据 */
    methodTableData = {
        columns: {
            balance: { name: "最低保留余额", options: {} },
            block_network_id: { name: "链", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            coin_network_map: { options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            exchange_channel_id: { name: "平台兑换厂商ID", options: {} },
            explain: { name: "说明", options: {} },
            fee: { name: "手续费(单位百分比)", options: {} },
            free_time: { name: "每日免费次数", options: {} },
            id: { name: "主键", options: {} },
            max_gold: { name: "最高兑换额度", options: {} },
            min_fee: { name: "最低手续费", options: {} },
            min_gold: { name: "最低兑换额度", options: {} },
            payment_method_type: { name: "兑换收款方式", options: {} },
            plat_id: { name: "平台ID", options: {} },
            status: { name: "使用状态", options: {} },
            subtitle: { name: "标题", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
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

    /**兑换参数设置 查询条件*/
    methodQuery = {
        exchange_channel_id: "",
        page_count: 1,
        page_size: 20,
    };

    /**兑换参数设置弹窗 数据*/
    dialogDataChannelData: any = {
        row: {},
        bShow: false,
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            balance: "",
            exchange_channel_id: "",
            coin_name_unique: "", //币种
            block_network_id: "", //链
            min_gold: "",
            max_gold: "",
            free_time: "",
            fee: "",
            explain: "",
            status: "1",
            min_fee: "",
            payment_method_type: "",
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
    }
    /**写入兑换参数表头 */
    setMethodTableColumns(data: any) {
        Object.assign(this.methodTableData.columns, data);
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

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;

        if (status == DialogStatus.update) {
            data.status = data.status.toString();
            this.dialogData.formSource = data;
            data.block_network_id = data.block_network_id.toString();
            Object.assign(this.dialogData.form, data);
            // this.sendNotification(HttpType.admin_exchange_channel_method_show, { id: data.id });
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
            id: null,
            plat_id: "",
            balance: "",
            exchange_channel_id: "",
            coin_name_unique: "", //币种
            block_network_id: "", //链
            min_gold: "",
            max_gold: "",
            free_time: "",
            fee: "",
            explain: "",
            status: "1",
            min_fee: "",
            payment_method_type: "",
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
            min_gold,
            max_gold,
            free_time,
            fee,
            balance,
            coin_name_unique,
            block_network_id,
            explain,
            status,
            min_fee,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id: this.listQuery.plat_id,
            balance,
            exchange_channel_id,
            coin_name_unique,
            block_network_id,
            min_gold,
            max_gold,
            free_time,
            fee,
            explain,
            status,
            payment_method_type: "4",
            min_fee,
        };

        this.sendNotification(HttpType.admin_exchange_channel_method_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 添加主键
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_exchange_channel_method_update, formCopy);
    }
    /**删除数据 */
    onDelete() {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_exchange_channel_method_update, {
                    id: this.dialogData.form.id,
                    is_delete: 1,
                });
            })
            .catch(() => {});
    }
    /**get 显示参数设置 */
    api_admin_exchange_channel_method_index() {
        this.sendNotification(HttpType.admin_exchange_channel_method_index, this.methodQuery);
    }
    /**显示参数设置 弹窗 */
    set_exchange_channel_method_index(data: any) {
        this.dialogDataChannelData.list.length = 0;
        this.dialogDataChannelData.list.push(...data.list);
        Object.assign(this.dialogDataChannelData.pageInfo, data.pageInfo);
        this.dialogDataChannelData.bShow = true;
    }
}
