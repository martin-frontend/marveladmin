import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
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
    tableData = {
        columns: {
            actual_gold: { name: "到账金额", options: {} },
            agent_pay_account_id: { name: "代理支付账号", options: {} },
            agent_pay_type: { name: "代理支付方式", options: {} },
            callback_gold: { name: "回调金额", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extend_column_1: { name: "扩展字段1", options: {} },
            extend_column_2: { name: "扩展字段2", options: {} },
            from_ip: { name: "来源IP", options: {} },
            gift_gold: { name: "充值赠送金币", options: {} },
            gold: { name: "订单金额", options: {} },
            id: { name: "ID", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            order_no: { name: "订单号", options: {} },
            paychannel_id: { name: "充值渠道", options: {} },
            paymethod_id: { name: "支付方式", options: <any>{} },
            paytime: { name: "支付时间", options: {} },
            plat_id: { name: "所属平台", options: {} },
            remark: { name: "备注", options: {} },
            serial_no: { name: "流水号", options: {} },
            status: { name: "订单状态", options: {} },
            third_order_no: { name: "第三方订单号", options: {} },
            total_gold: { name: "实际到账金币(包含赠送)", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            user_id: { name: "用户ID", options: {} },
            user_remark: { name: "用户备注", options: {} },
            username: { name: "用户账号", options: {} },
            vendor_id: { name: "充值厂商", options: <any>{} },
            fee: { name: "", options: {} },
            fee_rate: { name: "", options: {} },
            third_id: { name: "", options: {} },
            third_name: { name: "", options: {} },
            block_network_id: { name: "链名", options: {} },
            coin_name_unique: { name: "币种", options: {} },
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
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
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

    /**查询条件 */
    listQuery: any = {
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
        console.log("data=====", data);

        this.sendNotification(HttpType.admin_recharge_orders_index, objectRemoveNull(data));
    }

    /**更新数据 */
    onUpdate({ type, row }: any) {
        if (type && row) {
            console.log("更新 传入了 新的值");
        } else {
            const data = {
                id: this.dialogData.form.id,
                actual_gold: this.dialogData.form.actual_gold,
            };
            // 发送消息
            this.sendNotification(HttpType.admin_recharge_orders_update_complete, data);
        }
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
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        if (queryCopy.plat_id == "0") queryCopy.plat_id = null;
        this.facade.sendNotification(HttpType.admin_recharge_orders_index, objectRemoveNull(queryCopy));
    }

    /**导出excel */
    exportExcel(data: any) {
        //资料列表处理
        for (const item of data.list) {
            // 支付方式
            item.paymethod_id = this.tableData.columns["paymethod_id"].options[item.paymethod_id];
            // 充值厂商
            item.vendor_id = this.tableData.columns["vendor_id"].options[item.vendor_id];
        }
        this.tableData.isExportExcel = false;

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.tableData.columns),
            this.tableData.columns,
            data.list,
            [],
            []
        );
    }
}
