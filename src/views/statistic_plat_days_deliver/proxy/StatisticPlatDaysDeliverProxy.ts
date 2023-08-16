import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days_deliver/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysDeliverProxy from "./IStatisticPlatDaysDeliverProxy";
import { BaseInfo } from "@/components/vo/commonVo";
import LangUtil from "@/core/global/LangUtil";

export default class StatisticPlatDaysDeliverProxy extends AbstractProxy implements IStatisticPlatDaysDeliverProxy {
    static NAME = "StatisticPlatDaysDeliverProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_table_columns);
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
            id: { name: "平台统计ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            created_date: { name: "日期", options: [] },
            plat_id: { name: "所属平台", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            new_register: { name: "当天注册人数", options: [] },
            active_user: { name: "活跃用户", options: [] },
            recharge: { name: "充值金额", options: [] },
            recharge_count: { name: "充值次数", options: [] },
            recharge_user: { name: "充值人数", options: [] },
            new_recharge_user: { name: "首充人数", options: [] },
            repeat_recharge_user: { name: "重复充值人数", options: [] },
            exchange: { name: "兑换金额", options: [] },
            exchange_user: { name: "总兑换人数", options: [] },
            new_exchange_user: { name: "首兑人数", options: [] },
            win_loss: { name: "游戏输赢", options: [] },
            water: { name: "游戏流水", options: [] },
            gift_gold: { name: "平台赠送", options: [] },
            backwater_gold: { name: "游戏挖矿", options: [] },
            agent_bonus_gold: { name: "质押分红", options: [] },
            commission_gold: { name: "推广赚钱", options: [] },
            new_register_device: { name: "当天注册设备", options: [] },
            new_user_recharge: { name: "首充金额", options: [] },
            old_user_recharge: { name: "非首充金额", options: [] },
            new_register_water: { name: "新用户游戏流水", options: [] },
            active_user_week: { name: "周活跃用户", options: [] },
            active_user_month: { name: "月活跃用户", options: [] },
            active_recharge_user: { name: "活跃充值人数", options: [] },
            active_user_recharge: { name: "活跃充值金额", options: [] },
            rech_amt: { name: "人均首存金额", options: [] },
            new_reg_first_rech_count: { name: "当天注册充值人数", options: [] },
            exch_amt: { name: "当天注册兑换总金额", options: [] },
            new_exch_count: { name: "当天注册兑换人数", options: [] },
            p_user_rech: { name: "ARPU%(登录用户)", options: [] },
            p_rech_per_user: { name: "ARPPU%(登录用户)", options: [] },
            net_rech: { name: "充-兑", options: [] },
            dau: { name: "DAU登录人数", options: [] },
            new_user_arpu: { name: "新增用户ARPU", options: [] },
            new_user_arppu: { name: "新增用户ARPPU", options: [] },
            d_exch_amt_per_user: { name: "当天人均提现", options: [] },
            d_user_cont_per_user: { name: "当天用户人均贡献", options: [] },
            d_exch_amt_per_dau: { name: "人均提现", options: [] },
            user_cont_per_user: { name: "人均贡献", options: [] },
            effective_new_rate: { name: "有效新增率%", options: [] },
            new_recharge_rate: { name: "新增充值率%", options: [] },
            recharge_seep_rate: { name: "充值渗透率%", options: [] },
            arpu_rate: { name: "ARPU", options: [] },
            arppu_rate: { name: "ARPPU", options: [] },
            deliver_use: { name: "投放消耗", options: [] },
            recharge_diff_exchange: { name: "充值-兑换", options: [] },
            device_cost: { name: "当日新增设备成本", options: [], tips: "" },
            register_cost: { name: "当日注册成本", options: [], tips: "" },
            register_recharge_rate: { name: "当日注册充值转化率", options: [] },
            register_pay_cost: { name: "当日注册付费成本", options: [], tips: "" },
            new_reg_rech_total: { name: "当天注册充值总金额", options: [], tips: "" },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd"),
        "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            deliver_use: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        data.list = this.addSummary(data);
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
            channel_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd"),
            "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            if (data.deliver_use.includes("$")) {
                this.dialogData.form.deliver_use = Number(data.deliver_use.substring(1));
            }
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
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        // const formCopy: any = {
        //     // TODO
        // };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = {
            channel_id: this.dialogData.form.channel_id,
            plat_id: this.dialogData.form.plat_id,
            created_date: this.dialogData.form.created_date,
            deliver_use: Number(this.dialogData.form.deliver_use),
        };
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_edit_deliver_use, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        // MessageBox.confirm("您是否删除该记录", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning",
        // })
        //     .then(() => {
        //         this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
        //     })
        //     .catch(() => {});
    }

    /**增加合计数据 */
    addSummary(data: any) {
        Object.assign(data.summary, {
            created_date: "",
            plat_id: LangUtil("合计"),
            channel_id: "",
            deliver_use: LangUtil("投放消耗汇总"),
        });
        data.list.unshift(data.summary);
        return data.list;
    }

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
        data: <any>{},
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "created_date",
            "plat_id",
            "channel_id",
            "deliver_use",
            "recharge",
            "exchange",
            "recharge_diff_exchange",
            "recharge_count",
            "recharge_user",
            "new_register_device",
            "device_cost",
            "new_register",
            "register_cost",
            "new_reg_rech_total",
            "new_reg_first_rech_count",
            "register_recharge_rate",
            "register_pay_cost",
        ],
    };

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("投放日报")}-${plat_name}`;
        if (this.listQuery["created_date-{>=}"] && this.listQuery["created_date-{<=}"]) {
            name += `-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{<=}"]}`;
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
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.data = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出excel */
    exportExcel() {
        this.exportData.list = this.addSummary(this.exportData.data);
        this.exportData.list[0].channel_id = LangUtil("合计");
        const newData = JSON.parse(JSON.stringify(this.exportData.list));
        const exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            // this.curKeyList,
            exportField,
            this.tableData.columns,
            // summary,
            newData,
            ["plat_id"],
            []
        );
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
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
