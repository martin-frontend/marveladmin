import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, getTodayOffset, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/recharge_orders/setting";
import IRechargeOrdersProxy from "./IRechargeOrdersProxy";
import { dateFormat } from "@/core/global/Functions";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";
import router from "@/router";

export default class RechargeOrdersProxy extends AbstractProxy implements IRechargeOrdersProxy {
    static NAME = "RechargeOrdersProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_recharge_orders_table_columns);
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
    tableData: any = {
        columns: {
            id: { name: "ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "所属平台", options: {} },
            order_no: { name: "订单号", options: [] },
            third_order_no: { name: "第三方订单号", options: [] },
            serial_no: { name: "流水号", options: [] },
            user_id: { name: "用户ID", options: [] },
            channel_id: { name: "所属渠道", options: {} },
            gold: { name: "资产数量", options: [] },
            actual_gold: { name: "到账资产", options: [] },
            actual_gold_scale: { name: "到账金额[换算后]", options: [] },
            total_gold: { name: "实际到账资产(包含赠送,手续费)", options: [] },
            gift_gold: { name: "充值赠送资产", options: [] },
            fee: { name: "手续费", options: [] },
            fee_rate: { name: "手续费比例", options: [] },
            currency_type: { name: "结算方式", options: [] },
            currency_num: { name: "结算资产", options: [] },
            callback_gold: { name: "回调资产", options: [] },
            paymethod_id: { name: "支付方式", options: {} },
            paychannel_id: { name: "充值渠道", options: [] },
            from_ip: { name: "来源ip", options: [] },
            status: { name: "订单状态", options: [] },
            paytime: { name: "支付时间", options: [] },
            block_network_id: { name: "链名", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            remark: { name: "备注", options: [] },
            bonus_multiple: { name: "提现流水倍数", options: [] },
            agent_pay_type: { name: "代理支付方式", options: [] },
            agent_pay_account_id: { name: "代理支付账号", options: [] },
            third_id: { name: "第三方编号", options: [] },
            third_name: { name: "第三方名称", options: [] },
            is_internal: { name: "是否内部转账", options: [] },
            extends: { name: "扩展信息", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            updated_at: { name: "修改时间", options: [] },
            vendor_id: { name: "充值厂商", options: {} },
            nick_name: { name: "用户昵称", options: [] },
            username: { name: "用户账号", options: [] },
            gold_scale: { name: "代币汇率", options: [] },
            user_remark: { name: "用户备注" },
            coin_user_id: { options: {} },
            user_created_at: { name: LangUtil("账号创建时间"), options: [] },
            is_first_recharge: { name: "是否首充", options: [] },
            invite_user_id: { name: "直属代理ID", options: [] },
            grant_agent_id: { name: "代理ID", options: [] },
            user_tag: { name: "用户标签", options: {} },
        },
        list: <any>[],
        message: {
            success_total_gold: "",
            success_total_num: "",
            success_total_user_num: "",
            total_gold: "",
            total_num: "",
            total_user_num: "",
            total_fee: "",
            total_gift_gold: "",
        },
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
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

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "channel_id",
            "user_id",
            "nick_name",
            "user_remark",
            "user_created_at",
            "user_tag",
            "order_no",
            "third_order_no",
            "third_name",
            "status",
            "is_first_recharge",
            "coin_name_unique",
            "block_network_id",
            "vendor_id",
            "paymethod_id",
            "third_id",
            "extends",
            "gold",
            "callback_gold",
            "actual_gold",
            "total_gold",
            "gift_gold",
            "fee",
            "fee_rate",
            "created_at",
            "paytime",
            "remark",
        ],
    };

    exportData = {
        exportCount: 1,
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**查询条件 */
    listQuery: any = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
        "created_at-{>}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        "paytime-{>}": "",
        "paytime-{<}": "",
        channel_id: "",
        status: "",
        paymethod_id: "",
        user_id: "",
        username: "",
        order_no: "",
        third_order_no: "",
        vendor_id: "",
        "gold-{>=}": "",
        "gold-{<=}": "",
        coin_name_unique: "",
        block_network_id: "",
        is_first_recharge: "",
        invite_user_id: "",
        grant_agent_id: "",
        user_remark: "",
        user_tag: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
            order_no: "",
            gold: "",
            actual_gold: "",
        },
        formSource: null, // 表单的原始数据
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
    showRemarkDialog() {
        this.remarkDialogData.bShow = true;
    }
    /**隐藏备注弹窗 */
    hideRemarkDialog() {
        this.remarkDialogData.bShow = false;
    }
    /**更新備註 */
    onUpdateReamrk() {
        this.sendNotification(HttpType.admin_recharge_orders_update_remark, {
            id: this.remarkDialogData.form.id,
            remark: this.remarkDialogData.form.remark,
        });
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        // this.tableData.columns.plat_id.options = {
        //     ...this.tableData.columns.plat_id.options,
        //     "0": LangUtil("所有平台"),
        // };
        delete this.tableData.columns.is_first_recharge.options[0];
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        for (const item of data.list) {
            const newArr: any = [];
            if (item.user_tag) {
                const arr = item.user_tag.split(",");
                // @ts-ignore
                arr.forEach(tag => {
                    if (this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]) {
                        newArr.push(Number(tag));
                    }
                });
            }
            item.user_tag = newArr;
        }
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.message = {
            success_total_gold: data.success_total_gold,
            success_total_num: data.success_total_num,
            success_total_user_num: data.success_total_user_num,
            total_gold: data.total_gold,
            total_num: data.total_num,
            total_user_num: data.total_user_num,
            total_fee: data.total_fee,
            total_gift_gold: data.total_gift_gold,
        };
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
            page_count: 1,
            page_size: 20,
            plat_id: "",
            "created_at-{>}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            "paytime-{>}": "",
            "paytime-{<}": "",
            channel_id: "",
            status: "",
            paymethod_id: "",
            user_id: "",
            username: "",
            order_no: "",
            third_order_no: "",
            vendor_id: "",
            "gold-{>=}": "",
            "gold-{<=}": "",
            coin_name_unique: "",
            block_network_id: "",
            is_first_recharge: "",
            invite_user_id: "",
            grant_agent_id: "",
            user_remark: "",
            user_tag: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.resetDialogForm();
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        const { id, order_no, gold } = JSON.parse(JSON.stringify(data));
        Object.assign(this.dialogData.form, { id, order_no, gold });
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            id: null,
            order_no: "",
            gold: "",
            actual_gold: "",
        });
    }

    /**查询 */
    onQuery(hideLoading: boolean = false) {
        const data: any = JSON.parse(JSON.stringify(this.listQuery));
        data.plat_id = data.plat_id === "0" ? "" : data.plat_id;
        data.hideLoading = hideLoading;

        this.sendNotification(HttpType.admin_recharge_orders_index, objectRemoveNull(data));
    }

    /**更新数据 */
    onUpdate() {
        const data = {
            id: this.dialogData.form.id,
            actual_gold: this.dialogData.form.actual_gold,
        };
        // 发送消息
        this.sendNotification(HttpType.admin_recharge_orders_update_complete, data);
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

    /**返回项目后自动刷新 */
    continueAutoReload() {
        if (this.IntervalObj.default != "0" || this.listQuery.page_count == 1) {
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
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
        this.sendNotification(HttpType.admin_recharge_orders_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent % 20 == 0) {
            this.exportExcel();
            this.exportData.list = [];
            ++this.exportData.exportCount;
            this.onQueryExportData();
        } else if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));
        //资料列表处理
        // for (const item of newData) {
        //     // 支付方式
        //     item.paymethod_id = this.tableData.columns["paymethod_id"].options[item.paymethod_id];
        //     // 充值厂商
        //     item.vendor_id = this.tableData.columns["vendor_id"].options[item.vendor_id];
        // }
        // console.warn(newData);
        // @ts-ignore
        newData.forEach(element => {
            if (element.extends && element.paymethod_id == 9 && element.extends.length != 0) {
                element.extends = jsonStringify(element.extends);
            } else {
                element.extends = "-";
            }

            if (element.user_tag) {
                const arr = element.user_tag.split(",");
                const newArr: any = [];
                // @ts-ignore
                arr.forEach(tag => {
                    if (this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]) {
                        newArr.push(this.tableData.columns.user_tag.options[this.listQuery.plat_id][Number(tag)]);
                    }
                });
                element.user_tag = newArr.join();
            }
        });

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            exportField,
            this.tableData.columns,
            newData,
            [
                "plat_id",
                "paymethod_id",
                "vendor_id",
                "status",
                "block_network_id",
                "status",
                "is_internal",
                "is_first_recharge",
            ],
            []
        );
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            this.exportData.exportCount = 1;
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }
}
