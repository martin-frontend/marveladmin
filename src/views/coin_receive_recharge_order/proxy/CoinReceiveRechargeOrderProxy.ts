import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/coin_receive_recharge_order/setting";
import { MessageBox, TimelineItem } from "element-ui";
import ICoinReceiveRechargeOrderProxy from "./ICoinReceiveRechargeOrderProxy";
import i18n from "@/lang";
import router from "@/router";
import { BaseInfo } from "@/components/vo/commonVo";
import SelfModel from "@/core/model/SelfModel";

export default class CoinReceiveRechargeOrderProxy extends AbstractProxy implements ICoinReceiveRechargeOrderProxy {
    static NAME = "CoinReceiveRechargeOrderProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_coin_receive_recharge_order_table_columns);
        this.autoReload();
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
            actual_gold: { name: "实际到帐金额", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extend_column_1: { name: "扩展字段1", options: {} },
            extend_column_2: { name: "扩展字段2", options: {} },
            from_ip: { name: "来源ip", options: {} },
            gold: { name: "订单充值金额", options: {} },
            id: { name: "币商订单ID", options: {} },
            nick_name: { name: "昵称", options: {} },
            order_no: { name: "币商订单号", options: {} },
            ori_order_no: { name: "原始订单号", options: {} },
            pay_time: { name: "支付时间", options: {} },
            payment_channel_id: { name: "币商充值渠道ID", options: {} },
            payment_method: { name: "币商充值账号信息", options: <any>{} },
            plat_id: { name: "平台ID", options: {} },
            receive_name: { name: "收款人姓名", options: {} },
            remark: { name: "备注", options: {} },
            status: { name: "状态", options: {} },
            type: { name: "充值方式", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            updated_id: { name: "管理员ID", options: {} },
            user_id: { name: "用户ID", options: {} },
            user_recharge_certificate: { name: "用户支付凭证", options: {} },
            user_recharge_certificate_type: { name: "用户支付凭证类型", options: {} },
            user_remark: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        success_total_gold: "", //充值成功金额
        success_total_num: 0, //充值成功订单数
        total_gold: "", //充值总金额
        total_num: 0, //充值订单数
        total_user_num: 0, //充值人数
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "created_at-{>=}": "",
        "created_at-{<}": "",
        "pay_time-{>=}": "",
        "pay_time-{<}": "",
        user_id: "",
        order_no: "",
        status: 3,
        type: "",
        payment_channel_id: "",
        "gold-{>=}": "",
        "gold-{<=}": "",
        user_recharge_certificate: "",
        updated_by: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: {
            id: null,
            remark: null,
            actual_gold: 0,
        },
        formSource: <any>null, // 表单的原始数据
    };
    /**当前账号持有金币 */
    coinWallet = 0;
    /**自动刷新相关 */
    reloadData = {
        autoTime: "0",
        options: {
            0: LangUtil("不自动刷新"),
            30000: LangUtil("30秒自动刷新"),
            60000: LangUtil("60秒自动刷新"),
            180000: LangUtil("180秒自动刷新"),
        },
        timer: <any>null,
    };

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

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
        if (selfModel.isCoinUser) {
            this.tableData.columns.plat_id.options = { "0": LangUtil("所有平台") };
        } else {
            this.tableData.columns.plat_id.options = {
                ...this.tableData.columns.plat_id.options,
                "0": LangUtil("所有平台"),
            };
        }
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
        this.onWallet();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.success_total_gold = data.success_total_gold;
        this.tableData.success_total_num = data.success_total_num;
        this.tableData.total_gold = data.total_gold;
        this.tableData.total_num = data.total_num;
        this.tableData.total_user_num = data.total_user_num;
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
            "created_at-{>=}": "",
            "created_at-{<}": "",
            "pay_time-{>=}": "",
            "pay_time-{<}": "",
            user_id: "",
            order_no: "",
            status: 3,
            type: "",
            payment_channel_id: "",
            "gold-{>=}": "",
            "gold-{<=}": "",
            updated_by: "",
        });
    }

    /**显示弹窗 */
    showDialog(data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        this.dialogData.form.actual_gold = data.gold;
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
        const listQueryCopy = objectRemoveNull(this.listQuery);
        this.sendNotification(HttpType.admin_coin_receive_recharge_order_index, listQueryCopy);
        this.onWallet();
    }

    /**确认订单 */
    onOrderConfirm() {
        const { id, actual_gold, remark } = this.dialogData.form;
        this.sendNotification(
            HttpType.admin_coin_receive_recharge_order_confirm,
            objectRemoveNull({ id, actual_gold, remark })
        );
    }
    /**关闭订单 */
    onOrderClose(data: any) {
        const { id, user_id, nick_name, gold } = data;
        MessageBox.confirm(<string>LangUtil("undefined"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_coin_receive_recharge_order_close, { id });
            })
            .catch(() => {});
    }
    /**获取账号当前持有金币 */
    onWallet() {
        const { plat_id } = this.listQuery;
        this.sendNotification(HttpType.admin_coin_wallet_wallet, { plat_id });
    }
    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${router.currentRoute.name}-${plat_name}`;
        if (this.listQuery["created_at-{<}"] && this.listQuery["created_at-{<}"] != "") {
            name += `-${this.listQuery["created_at-{>=}"]}～${this.listQuery["created_at-{<}"]}`;
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
        this.facade.sendNotification(HttpType.admin_coin_receive_recharge_order_index, objectRemoveNull(queryCopy));
    }

    /**导出excel */
    exportExcel(data: any) {
        //处理payment_method
        for (const item of data.list) {
            let str = LangUtil("收款通道ID") + ": " + item.payment_channel_id + "\n";
            str += this.getAccessInfo(item);
            item.payment_method = str;
        }

        this.tableData.isExportExcel = false;
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.tableData.columns),
            this.tableData.columns,
            data.list,
            ["status", "type", "plat_id", "user_recharge_certificate_type"],
            []
        );
    }

    private getAccessInfo(data: any) {
        const options: any = this.tableData.columns.payment_method.options[data.type];
        let infoStr = "";
        if (options) {
            const keys = options;
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data.payment_method[key] + "\n";
            }
        }
        return infoStr;
    }
}
