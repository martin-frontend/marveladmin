import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/exchange_orders/setting";
import IExchangeOrdersProxy from "./IExchangeOrdersProxy";
import router from "@/router";
import { dateFormat } from "@/core/global/Functions";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";

export default class ExchangeOrdersProxy extends AbstractProxy implements IExchangeOrdersProxy {
    static NAME = "ExchangeOrdersProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_exchange_orders_table_columns);
        this.specialQuery();
        this.continueAutoReload();
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
        this.stopReload();
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            channel_id: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_ip: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            exchange_channel: { name: "", options: <any>{} },
            exchange_vendors_id: { name: "", options: <any>{} },
            fee: { name: "", options: {} },
            fee_rate: { name: "", options: {} },
            gold: { name: "", options: {} },
            id: { name: "", options: {} },
            money: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            order_no: { name: "", options: {} },
            payment_method: { name: "", options: <any>{} },
            payment_method_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            receive_payment_type: <any>{ name: "", options: {} },
            remark: { name: "", options: {} },
            status: { name: "", options: {} },
            third_order_no: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            user_id: { name: "", options: {} },
            username: { name: "", options: {} },
            plat_exchange_channel: { name: "", options: {} },
            is_coin_user_order: { name: "", options: {} },
            coin_user_id: { name: "", options: {} },
            coin_username: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
            block_network_id: { name: "", options: {} },
        },
        list: <any>[],
        message: {},
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        multipleSelection: <any>[],
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_at-{>}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        "updated_at-{>}": "",
        "updated_at-{<}": "",
        channel_id: "",
        exchange_channel: "",
        status: <any>"",
        type: "",
        user_id: "",
        username: "",
        order_no: "",
        third_order_no: "",
        receive_payment_type: "",
        exchange_vendors_id: "",
        "gold-{>=}": "",
        "gold-{<=}": "",
        coin_name_unique: "",
        block_network_id: "",
    };

    /**平台币商代付相关数据 */
    dispatchDialogData = {
        bShow: false,
        form: {
            id: "",
            plat_id: "",
            type: 1,
            coin_user_id: "",
        },
        formSource: null,
    };

    /**定时器 */
    IntervalObj = {
        default: "0",
        options: {
            "0": LangUtil("不自动刷新"),
            "30000": LangUtil("30秒自动刷新"),
            "60000": LangUtil("60秒自动刷新"),
            "180000": LangUtil("180秒自动刷新"),
        },
        timer: 0,
    };

    /**操作 */
    ctrlStr = {
        "1": LangUtil("关闭| 退回金币"), //关闭| 退回金币
        "2": LangUtil("关闭| 不退回金币"), //关闭| 不退回金币
        "3": LangUtil("审核通过"), //审核通过
        "4": LangUtil("平台已完成订单"), //平台已完成订单
        "5": LangUtil("更换兑换渠道"), //更换兑换渠道
        "6": LangUtil("冲正"), //冲正
        "7": LangUtil("订单失败[手动退款]"), //订单失败[手动退款]
    };

    /**更换通道弹窗 */
    changeDialogData = {
        bShow: false,
        form: <any>{
            exchange_channel: 0,
        },
        formSource: null,
    };

    /**备注弹窗相关数据 */
    remarkDialogData = {
        bShow: false,
        status: "",
        form: {
            id: "",
            type: "",
            remark: "",
            desc: "",
        },
        formSource: null,
    };
    /**显示备注弹窗 */
    showRemarkDialog(remark: any) {
        this.remarkDialogData.bShow = true;
        this.remarkDialogData.form.remark = remark;
    }
    /**隐藏备注弹窗 */
    hideRemarkDialog() {
        this.remarkDialogData.bShow = false;
    }

    showChangeDialog(data: any) {
        this.changeDialogData.bShow = true;
        this.changeDialogData.formSource = data;
        Object.assign(this.changeDialogData.form, data);
    }

    // 外部来的搜寻条件
    specialQuery() {
        const { order_no, flag } = router.currentRoute.query;
        if (order_no || flag) {
            this.resetListQuery();
            if (order_no) {
                // console.log(" // 订单");
                this.listQuery.order_no = order_no.toString();
            }
            if (flag) {
                // console.log("//待审核");
                this.listQuery.status = flag;
            }
            this.listQuery["created_at-{>}"] = "";
            this.listQuery["created_at-{<}"] = "";
        }
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.tableData.columns.plat_id.options = {
            ...this.tableData.columns.plat_id.options,
            "0": LangUtil("所有平台"),
        };
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        const {
            success_fee,
            success_total_gold,
            success_total_num,
            success_total_user_num,
            total_gold,
            total_num,
            total_user_num,
        } = data;
        Object.assign(this.tableData.message, {
            success_fee,
            success_total_gold,
            success_total_num,
            success_total_user_num,
            total_gold,
            total_num,
            total_user_num,
        });
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            "created_at-{>}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            "updated_at-{>}": "",
            "updated_at-{<}": "",
            channel_id: "",
            exchange_channel: "",
            status: "",
            type: "",
            user_id: "",
            username: "",
            order_no: "",
            third_order_no: "",
            receive_payment_type: "",
            exchange_vendors_id: "",
            "gold-{>=}": "",
            "gold-{<=}": "",
            coin_name_unique: "",
            block_network_id: "",
        });
    }

    /**查询 */
    onQuery(hideLoading: boolean = false) {
        const data: any = JSON.parse(JSON.stringify(this.listQuery));
        data.plat_id = data.plat_id === "0" ? "" : data.plat_id;
        data.hideLoading = hideLoading;
        this.sendNotification(HttpType.admin_exchange_orders_index, objectRemoveNull(data));
    }

    /**自动刷新 */
    autoReload() {
        this.stopReload();
        if (this.listQuery.page_count == 1) {
            this.IntervalObj.timer = setInterval(() => {
                if (this.IntervalObj.default == "0" || this.listQuery.page_count != 1) {
                    this.stopReload();
                } else {
                    this.onQuery(true);
                }
            }, parseInt(this.IntervalObj.default));
        } else {
            this.stopReload();
        }
    }

    stopReload() {
        clearInterval(this.IntervalObj.timer);
        console.log("stop reload");
    }

    /**更新数据 */
    onUpdate({ type, row }: any) {
        switch (type) {
            case "1":
                // 关闭退回金币
                this.sendNotification(
                    HttpType.admin_exchange_orders_close_order_return_gold,
                    objectRemoveNull({ id: row.id, remark: row.remark })
                );
                break;
            case "2":
                // 关闭不退回金币
                this.sendNotification(
                    HttpType.admin_exchange_orders_close_order,
                    objectRemoveNull({ id: row.id, remark: row.remark })
                );
                break;
            case "3":
                // 审核通过
                this.sendNotification(HttpType.admin_exchange_orders_approved, { id: row.id });
                break;
            case "4":
                // 平台已完成订单
                this.sendNotification(HttpType.admin_exchange_orders_finish_order, { id: row.id });
                break;
            case "6":
                // 冲正
                this.sendNotification(
                    HttpType.admin_exchange_orders_rush,
                    objectRemoveNull({ id: row.id, remark: row.remark })
                );
                break;
            case "7":
                // 订单失败[手动退款]
                this.sendNotification(
                    HttpType.admin_exchange_orders_manual_refund,
                    objectRemoveNull({ id: row.id, remark: row.remark })
                );
                break;
            default:
                console.error("更新数据 Error :");
                break;
        }
    }
    /**更新備註 */
    onUpdateReamrk() {
        this.sendNotification(HttpType.admin_exchange_orders_update_remark, {
            id: this.remarkDialogData.form.id,
            remark: this.remarkDialogData.form.remark,
        });
    }
    /**更换渠道 */
    onUpdateChannel() {
        const data: any = formCompared(this.changeDialogData.form, this.changeDialogData.formSource);
        if (Object.keys(data).length == 0) {
            this.changeDialogData.bShow = false;
            return;
        }
        data.id = this.changeDialogData.form.id;
        this.sendNotification(HttpType.admin_exchange_orders_update_channel, data);
    }

    /**返回项目后自动刷新 */
    continueAutoReload() {
        if (this.IntervalObj.default != "0" && this.listQuery.page_count == 1) {
            this.autoReload();
        }
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${router.currentRoute.name}-${plat_name}`;
        if (this.listQuery["created_at-{>}"] && this.listQuery["created_at-{>}"] != "") {
            name += `-${this.listQuery["created_at-{>}"]}～${this.listQuery["created_at-{<}"]}`;
        }
        return name;
    }

    /**取得所有资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        if (queryCopy.plat_id == "0") queryCopy.plat_id = null;
        this.facade.sendNotification(HttpType.admin_exchange_orders_index, objectRemoveNull(queryCopy));
    }

    /**导出excel */
    exportExcel(data: any) {
        //资料列表处理
        for (const item of data.list) {
            //@ts-ignore
            let str =
                this.tableData.columns["receive_payment_type"].name +
                ": " +
                this.tableData.columns["receive_payment_type"].options[item.receive_payment_type] +
                "\n";
            str += this.getAccessInfo(item);
            item.payment_method = str;
            item.exchange_channel = this.tableData.columns["exchange_channel"].options[item.exchange_channel];
            item.exchange_vendors_id = this.tableData.columns["exchange_vendors_id"].options[item.exchange_vendors_id];
        }

        this.tableData.isExportExcel = false;
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.tableData.columns),
            this.tableData.columns,
            data.list,
            ["status", "payment_method_id", "plat_id", "receive_payment_type", "auto_check_status"],
            [""]
        );
    }

    private getAccessInfo(data: any) {
        const options: any = this.tableData.columns.payment_method.options[data.receive_payment_type];
        let infoStr = "";
        if (options) {
            const keys = Object.keys(options);
            for (const key of keys) {
                infoStr += options[key] + "：";
                infoStr += data.payment_method[key] + "\n";
            }
        }
        return infoStr;
    }
    /**派发 */
    onDispatch() {
        this.sendNotification(HttpType.admin_exchange_orders_dispatch, objectRemoveNull(this.dispatchDialogData.form));
    }
    /**取消派发 */
    onDispatchCancel() {
        this.sendNotification(
            HttpType.admin_exchange_orders_dispatch_cancel,
            objectRemoveNull(this.dispatchDialogData.form)
        );
    }

    onBatchAccept() {
        const data = JSON.stringify(this.tableData.multipleSelection);
        this.sendNotification(HttpType.admin_exchange_orders_batch_accept, { order_ids: data });
    }

    onBatchCancel() {
        const data = JSON.stringify(this.tableData.multipleSelection);
        this.sendNotification(HttpType.admin_exchange_orders_batch_cancel_accept, { order_ids: data });
    }

    /**显示派发弹窗 */
    public showDispatchDialog() {
        this.dispatchDialogData.bShow = true;
    }
    /**隐藏派发弹窗 */
    public hideDispatchDialog() {
        this.dispatchDialogData.bShow = false;
    }
}
