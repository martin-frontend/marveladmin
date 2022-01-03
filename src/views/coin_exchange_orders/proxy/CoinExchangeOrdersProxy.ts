import { BaseInfo } from "@/components/vo/commonVo";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import SelfModel from "@/core/model/SelfModel";
import i18n from "@/lang";
import router from "@/router";
import { HttpType } from "@/views/coin_exchange_orders/setting";
import { MessageBox } from "element-ui";
import ICoinExchangeOrdersProxy from "./ICoinExchangeOrdersProxy";

export default class CoinExchangeOrdersProxy extends AbstractProxy implements ICoinExchangeOrdersProxy {
    static NAME = "CoinExchangeOrdersProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_coin_exchange_orders_table_columns);
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
        this.stopAutoReload();
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            auto_check_at: { name: '', options: {} },
            auto_check_status: { name: '', options: {} },
            auto_check_times: { name: '', options: {} },
            channel_id: { name: '', options: {} },
            coin_user_id: { name: '', options: {} },
            coin_username: { name: '', options: {} },
            created_at: { name: '', options: {} },
            created_ip: { name: '', options: {} },
            currency_num: { name: '', options: {} },
            currency_type: { name: '', options: {} },
            data_belong: { name: '', options: {} },
            exchange_channel: { name: '', options: {} },
            exchange_vendors_id: { name: '', options: {} },
            fee: { name: '', options: {} },
            fee_rate: { name: '', options: {} },
            gold: { name: '', options: {} },
            id: { name: '', options: {} },
            is_coin_user_order: { name: '', options: {} },
            money: { name: '', options: {} },
            nick_name: { name: '', options: {} },
            order_no: { name: '', options: {} },
            payment_method: { name: '', options: <any>{} },
            payment_method_id: { name: '', options: {} },
            plat_exchange_channel: { name: "", options: {} },
            plat_id: { name: '', options: {} },
            receive_payment_type: { name: '', options: {} },
            remark: { name: '', options: {} },
            status: { name: '', options: <any>{} },
            third_order_no: { name: '', options: {} },
            updated_at: { name: '', options: {} },
            updated_by: { name: '', options: {} },
            user_id: { name: '', options: {} },
            user_remark: { name: '', options: {} },
            username: { name: '', options: {} },
            updated_id: { name: '', options: {} },
        },
        total_gold: "",// 兑换总金额
        total_num: "", //兑换订单数
        success_total_gold: "", //兑换成功金额
        success_total_num: "",// 兑换成功订单数
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "created_at-{>}": "",
        "created_at-{<}": "",
        "updated_at-{>}": "",
        "updated_at-{<}": "",
        user_id: "",
        order_no: "",
        status: "",
        coin_user_id: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            order_no: "",
            receive_payment_type: "",
            payment_method: {
                account: "",
                account_bank: "",
                account_name: "",
                bank: "",
            },
            money: "",
            remark: "",
        },
        formSource: null, // 表单的原始数据
    };
    /**自动刷新相关 */
    reloadData = {
        autoTime: "0",
        options: {
            0: i18n.t("common.notAutoRefresh"),
            30000: i18n.t("common.autoRefresh30"),
            60000: i18n.t("common.autoRefresh60"),
            180000: i18n.t("common.autoRefresh180"),
        },
        timer: <any>null,
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
        if (selfModel.isCoinUser) {
            this.tableData.columns.plat_id.options = { "0": i18n.t("common.platIdAll") };
        } else {
            this.tableData.columns.plat_id.options = {
                ...this.tableData.columns.plat_id.options,
                "0": i18n.t("common.platIdAll"),
            };
        }
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
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.success_total_gold = data.success_total_gold;
        this.tableData.success_total_num = data.success_total_num;
        this.tableData.total_gold = data.total_gold;
        this.tableData.total_num = data.total_num;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**显示弹窗 */
    showDialog(data: any) {
        this.dialogData.bShow = true;
        Object.assign(this.dialogData.form, data);
    }
    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_at-{>}": "",
            "created_at-{<}": "",
            "updated_at-{>}": "",
            "updated_at-{<}": "",
            user_id: "",
            order_no: "",
            status: "",
            coin_user_id: "",
            page_count: 1,
            page_size: 20,
        });
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }
    /**查询 */
    onQuery() {
        const data: any = JSON.parse(JSON.stringify(this.listQuery));
        data.plat_id = data.plat_id === "0" ? "" : data.plat_id;
        this.sendNotification(HttpType.admin_coin_exchange_orders_index, objectRemoveNull(data));
    }
    /**取得所有资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        this.facade.sendNotification(HttpType.admin_coin_exchange_orders_index, objectRemoveNull(queryCopy));
    }

    /**完成订单 */
    onFinishOrder(id: string) {
        this.sendNotification(HttpType.admin_coin_exchange_orders_finish_order, objectRemoveNull({ id: id, remark: this.dialogData.form.remark }));
    }
    /**关闭订单 退还金币 */
    onReturn(id: string) {
        this.sendNotification(HttpType.admin_coin_exchange_orders_close_order_return_gold, objectRemoveNull({ id: id, remark: this.dialogData.form.remark }));
    }
    /**关闭订单 不退还金币 */
    onUnreturn(id: string) {
        this.sendNotification(HttpType.admin_coin_exchange_orders_close_order, objectRemoveNull({ id: id, remark: this.dialogData.form.remark }));
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

    /**统计栏位导出顺序 */
    _KeyList = [
        "coin_username",
        "order_no",
        "payment_method",
        "gold",
        "status",
        "created_at",
        "updated_at",
        "updated_by",
        "remark",
    ];
    _columns = {
        coin_username: { name: '', options: {} },
        order_no: { name: '', options: {} },
        payment_method: { name: '', options: {} },
        gold: { name: '', options: {} },
        status: { name: '', options: {} },
        created_at: { name: '', options: {} },
        updated_at: { name: '', options: {} },
        updated_by: { name: '', options: {} },
        remark: { name: '', options: {} },
    }

    /**导出excel */
    exportExcel(data: any) {
        //处理payment_method
        for (const item of data.list) {
            item.payment_method = this.getAccessInfo(item);
            item.status = this.tableData.columns["status"].options[item.status];
        }

        this.tableData.isExportExcel = false;
        Object.assign(this._columns, this.tableData.columns)

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            this._KeyList,
            this._columns,
            data.list,
            [],
            []
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

    /**停止刷新 */
    stopAutoReload() {
        // console.log("停止刷新");
        clearInterval(this.reloadData.timer);
    }

    /**返回项目后自动刷新 */
    continueAutoReload() {
        if (this.reloadData.autoTime != "0" && this.listQuery.page_count == 1) {
            this.autoReload();
        }
    }

    /**自动刷新 */
    autoReload() {
        this.stopAutoReload();
        if (this.reloadData.autoTime != "0") {
            const time = Number(this.reloadData.autoTime);
            const pageInfo = this.tableData.pageInfo;
            this.reloadData.timer = setInterval(() => {
                if (pageInfo.pageCurrent == 1) {
                    // console.log("autoReload", time);
                    this.onQuery();
                }
            }, time);
        }
    }
}
