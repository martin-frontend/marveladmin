import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days_deliver_channel/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysDeliverChannelProxy from "./IStatisticPlatDaysDeliverChannelProxy";
import LangUtil from "@/core/global/LangUtil";
import { BaseInfo } from "@/components/vo/commonVo";

type TagName = "group" | "channel";

export default class StatisticPlatDaysDeliverChannelProxy extends AbstractProxy
    implements IStatisticPlatDaysDeliverChannelProxy {
    static NAME = "StatisticPlatDaysDeliverChannelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_channel_table_columns);
        this.sendNotification(HttpType.admin_statistic_plat_days_deliver_group_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
        this.tabName = "channel";
    }

    tabName: TagName = "channel";

    channelColumns = {
        id: { name: "平台统计ID", options: [] },
        data_belong: { name: "数据归属标记", options: [] },
        created_date: { name: "日期", options: [] },
        plat_id: { name: "所属平台", options: {} },
        channel_id: { name: "所属渠道", options: {} },
        new_register: { name: "当天注册人数", options: [], tips: "【当天】新增注册人数" },
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
        new_reg_first_rech_count: {
            name: "当天注册充值人数",
            options: [],
            tips: "【当天】新增注册人数并且充值的人数",
        },
        exch_amt: { name: "当天注册兑换总金额", options: [], tips: "当天注册的用户并且兑换的总金额" },
        new_exch_count: { name: "当天注册兑换人数", options: [] },
        p_user_rech: { name: "ARPU%(登录用户)", options: [] },
        p_rech_per_user: { name: "ARPPU%(登录用户)", options: [] },
        net_rech: { name: "充-兑", options: [] },
        dau: { name: "DAU登录人数", options: [] },
        new_user_arpu: { name: "新增用户ARPU", options: [], tips: "当天注册充值金额/当天注册人数" },
        new_user_arppu: { name: "新增用户ARPPU", options: [], tips: "当天注册充值金额/当天注册充值人数" },
        d_exch_amt_per_user: { name: "当天人均提现", options: [] },
        d_user_cont_per_user: { name: "当天用户人均贡献", options: [] },
        d_exch_amt_per_dau: { name: "人均提现", options: [], tips: "当天注册兑换金额/当天注册人数" },
        user_cont_per_user: { name: "人均贡献", options: [], tips: "新增用户ARPU-人均提现" },
        effective_new_rate: { name: "有效新增率%", options: [] },
        new_recharge_rate: { name: "新增充值率%", options: [] },
        recharge_seep_rate: { name: "充值渗透率%", options: [] },
        arpu_rate: { name: "ARPU", options: [] },
        arppu_rate: { name: "ARPPU", options: [] },
        deliver_name: { name: "投放名称", options: [] },
        deliver_use: { name: "投放消耗", options: [] },
        recharge_diff_exchange: { name: "充值-兑换", options: [] },
        device_cost: { name: "当日新增设备成本", options: [], tips: "投放消耗/新增设备数" },
        register_cost: { name: "当日注册成本", options: [], tips: "投放消耗/新增注册用户数" },
        register_recharge_rate: { name: "当日注册充值转化率", options: [] },
        register_pay_cost: { name: "当日注册付费成本", options: [], tips: "投放消耗/当天注册充值人数" },
        channel_profit: {
            name: "渠道毛利",
            options: [],
            tips: "渠道充值金额-渠道提现-游戏输赢*0.15-充值金额1%-投放消耗。",
        },
        new_reg_rech_total: { name: "当天注册充值总金额", options: [], tips: "当天注册的用户并且充值的总金额" },
    };
    groupColumns = {
        id: { name: "ID", options: [] },
        data_belong: { name: "数据归属标记", options: [] },
        created_date: { name: "统计日期", options: [] },
        plat_id: { name: "平台ID", options: {} },
        channel_id: { name: "渠道ID", options: {} },
        user_id: { name: "团队ID", options: [], tips: "当用户的【团队投放】为开状态时，在该用户ID为 团队ID" },
        group_name: { name: "团队名称", options: [], tips: "团队ID" },
        recharge: {
            name: "充值金额",
            options: [],
            tips:
                "在查询时间范围，平台下所有用户的【状态】为“充值成功”的金额，vip充值金额+vip补单+第三方充值金额+手动补单金额",
        },
        exchange: {
            name: "兑换金额",
            options: [],
            tips: "在查询时间范围，平台下所有用户的【状态】为“提款成功”的金额，vip充值通道+普通充值通道",
        },
        nor_exchange: { name: "普通玩家兑换金额", options: [], tips: "团队兑换金额-博主兑换金额" },
        blog_exchange: { name: "博主兑换金额", options: [], tips: "统计该团队ID下的所有博主兑换金额" },
        win_loss: { name: "游戏输赢", options: [], tips: "已结算订单的输赢统计,以平台角度展示" },
        dau: { name: "DAU登录人数", options: [], tips: "登录人数(去重)" },
        recharge_user: {
            name: "充值人数",
            options: [],
            tips: "平台下 充值成功【状态】的用户人数总人数，包含新老用户的充值人数",
        },
        new_register: { name: "新增注册人数", options: [], tips: "当前日期新增注册人数" },
        new_reg_first_rech_count: { name: "当天注册充值人数", options: [], tips: "当前日期新增注册人数" },
        new_reg_rech_total: {
            name: "当天注册充值总金额",
            options: [],
            tips: "是当日注册的用户的充值总金额。比如当日 注册用户A , 他成功充值三次 ， 这个三次的金额都需要统计。",
        },
        new_exch_count: {
            name: "当天注册兑换人数",
            options: [],
            tips: "是当日注册而且兑换成功的用户。这里注意同一个用户需要去重",
        },
        exch_amt: { name: "当天注册兑换总金额", options: [], tips: "当天注册的用户并且兑换的总金额" },
        new_user_arpu: { name: "新增用户ARPU", options: [], tips: "当天注册充值金额/当天注册人数" },
        new_user_arppu: { name: "新增用户ARPPU", options: [], tips: "当天注册充值金额/当天注册充值人数" },
        d_exch_amt_per_user: { name: "当天人均提现", options: [], tips: "当天注册兑换总金额/当天注册人数" },
        d_user_cont_per_user: { name: "当天用户人均贡献", options: [], tips: "新增用户ARPU-当天人均提现" },
        d_user_cost: {
            name: "当天註冊用户成本",
            options: [],
            tips: "博主兑换金额/所有博主整条代理线当天注册用户数",
        },
        channel_profit: {
            name: "渠道毛利",
            options: [],
            tips: "渠道充值金额-渠道提现-游戏输赢*0.15-充值金额1%-投放消耗",
        },
    };

    /**表格相关数据 */
    tableData = {
        columns: {
            ...this.groupColumns,
            ...this.channelColumns,
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery: any = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        user_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd"),
        "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            channel_id: "",
            user_id: "",
            plat_id: "",
            created_date: "",
            deliver_name: "",
            group_name: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据(by channel) */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        Object.assign(this.channelColumns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    setTableColumnsByGroyp(data: any) {
        Object.assign(this.groupColumns, data);
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
            user_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd"),
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
            // this.sendNotification(HttpType.undefined, { id: data.id });
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
            channel_id: "",
            user_id: "",
            plat_id: "",
            created_date: "",
            deliver_name: "",
            group_name: "",
        });
    }

    /**查询 */
    onQuery() {
        const query = { ...this.listQuery };
        if (this.tabName == "channel") {
            delete query.user_id;
            this.sendNotification(
                HttpType.admin_statistic_plat_days_deliver_channel_index,
                objectRemoveNull(this.listQuery)
            );
        } else {
            delete query.channel_id;
            this.sendNotification(
                HttpType.admin_statistic_plat_days_deliver_group_index,
                objectRemoveNull(this.listQuery)
            );
        }
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
        if (this.tabName == "channel") {
            const formCopy: any = {
                channel_id: this.dialogData.form.channel_id,
                plat_id: this.dialogData.form.plat_id,
                created_date: this.dialogData.form.created_date,
                deliver_name: this.dialogData.form.deliver_name,
            };
            this.sendNotification(HttpType.admin_statistic_plat_days_deliver_edit_deliver_name, formCopy);
        } else {
            const formCopy: any = {
                user_id: this.dialogData.form.user_id,
                group_name: this.dialogData.form.group_name,
            };
            this.sendNotification(HttpType.admin_statistic_plat_days_deliver_group_edit_group_name, formCopy);
        }
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
        if (this.tabName == "channel") {
            Object.assign(data.summary, {
                created_date: LangUtil("合计"),
                plat_id: this.listQuery.plat_id,
                channel_id: this.listQuery.channel_id || LangUtil("全部渠道"),
                deliver_name: "/",
            });
        } else {
            Object.assign(data.summary, {
                created_date: LangUtil("合计"),
                plat_id: this.listQuery.plat_id,
                user_id: this.listQuery.user_id || LangUtil("全部团队"),
                group_name: "/",
            });
        }
        if(this.exportData.isExportExcel) {
            this.exportData.list.unshift(data.summary);
        } else {
            data.list.unshift(data.summary);
            return data.list;
        }
    }
    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
        data: <any>{},
    };

    channelFieldOptions = [
        "created_date",
        "plat_id",
        "channel_id",
        "deliver_name",
        "recharge",
        "exchange",
        "win_loss",
        "channel_profit",
        "deliver_use",
        "dau",
        "recharge_user",
        "new_register",
        "new_reg_first_rech_count",
        "new_reg_rech_total",
        "exch_amt",
        "new_user_arpu",
        "new_user_arppu",
        "d_exch_amt_per_user",
        "d_user_cont_per_user",
        "register_cost",
    ];
    groupFieldOptions = [
        "created_date",
        "plat_id",
        "user_id",
        "group_name",
        "recharge",
        "exchange",
        "nor_exchange",
        "blog_exchange",
        "win_loss",
        "channel_profit",
        "dau",
        "recharge_user",
        "new_register",
        "new_reg_first_rech_count",
        "new_reg_rech_total",
        "exch_amt",
        "new_user_arpu",
        "new_user_arppu",
        "d_exch_amt_per_user",
        "d_user_cont_per_user",
        // "register_cost",
    ];

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [...this.channelFieldOptions],
    };

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("投放统计")}`;
        name += this.tabName == "channel" ? `(${LangUtil("按渠道")})` : `(${LangUtil("按团队")})`;
        name += `-${plat_name}`;
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
        const name =
            this.tabName == "channel"
                ? HttpType.admin_statistic_plat_days_deliver_channel_index
                : HttpType.admin_statistic_plat_days_deliver_group_index;
        this.sendNotification(name, objectRemoveNull(queryCopy));
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
        this.addSummary(this.exportData.data);
        // this.exportData.list[0].channel_id = LangUtil("合计");
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

    onChangeTab() {
        this.fieldSelectionData.fieldOptions.length = 0;
        if (this.tabName == "channel") {
            Object.assign(this.tableData.columns, JSON.parse(JSON.stringify(this.channelColumns)));
            this.fieldSelectionData.fieldOptions.push(...this.channelFieldOptions);
        } else {
            Object.assign(this.tableData.columns, JSON.parse(JSON.stringify(this.groupColumns)));
            this.fieldSelectionData.fieldOptions.push(...this.groupFieldOptions);
        }
        this.listQuery.page_count = 1;
        this.onQuery();
    }
}
