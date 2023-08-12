import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_agent_manage_bind/setting";
import { MessageBox } from "element-ui";
import IPlatAgentManageBindProxy from "./IPlatAgentManageBindProxy";
import { BaseInfo } from "@/components/vo/commonVo";

export default class PlatAgentManageBindProxy extends AbstractProxy implements IPlatAgentManageBindProxy {
    static NAME = "PlatAgentManageBindProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_manage_bind_table_columns);
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
        columns: <any>{
            // TODO
            agent_user_id: { name: "代理ID", options: {} },
            binded_at: { name: "绑定时间", options: {} },
            bonus_ratio: { name: "分红统计比例" },
            channel_id: <any>{ name: "所属渠道", options: {} },
            commission_awaiting_num: { name: "当前可领取佣金", options: {} },
            commission_received_num: { name: "已领取佣金总额", options: {} },
            directly_users: { name: "直属代理人数", options: {} },
            total_group_all_users: { name: "团队人数", options: {} },
            invite_user_id: { name: "绑定上级ID", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            parent_nick_name: { name: "绑定上级昵称", options: {} },
            plat_id: { name: "所属平台", options: {} },
            promotion_floor: { name: "保底设定", options: {} },
            user_id: { name: "用户ID", options: {} },
            vendor_type_0: { name: "所有-每万返佣保底", options: {} },
            vendor_type_2: { name: "棋牌-每万返佣保底", options: {} },
            vendor_type_4: { name: "彩票-每万返佣保底", options: {} },
            vendor_type_8: { name: "捕鱼-每万返佣保底", options: {} },
            vendor_type_16: { name: "电子-每万返佣保底", options: {} },
            vendor_type_32: { name: "真人-每万返佣保底", options: {} },
            vendor_type_64: { name: "体育-每万返佣保底", options: {} },
            vendor_type_128: { name: "电竞-每万返佣保底", options: {} },
            version: { name: "推广配置版本", options: {} },
            is_agent_bonus: { name: "", options: {} },
            agent_bonus_rate: { name: "", options: {} },
            channel_id_option: {},
            username: { name: "", options: {} },
            bind_depth: { name: "", options: {} },
            group_all_bet_count: { name: "团队投注笔数" },
            group_all_bet: { name: "团队投注金额" },
            group_all_valid_bet: { name: "团队有效投注金额" },
            group_all_win_gold: { name: "团队游戏输赢金额" },
            group_all_recharge: { name: "团队充值" },
            group_all_exchange: { name: "团队兑换" },
            group_all_total_water: { name: "团队流水" },
            directly_bet_count: { name: "直属投注笔数" },
            directly_bet: { name: "直属投注金额" },
            directly_valid_bet: { name: "直属有效投注金额" },
            directly_win_gold: { name: "直属游戏输赢金额" },
            directly_recharge: { name: "直属充值" },
            directly_exchange: { name: "直属兑换" },
            directly_total_water: { name: "直属流水" },
            commission_total: { name: "", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            remark: { name: "备注", options: {} },
            user_remark: { name: "备注", options: {} },
            group_users: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        extra_info: {
            show_is_agent_bonus: false,
        },
    };
    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "channel_id",
            "user_id",
            "nick_name",
            "binded_at",
            "user_remark",
            "remark",
            "invite_user_id",
            "parent_nick_name",
            "bind_depth",
            "total_group_all_users",
            "group_all_recharge",
            "group_all_exchange",
            "group_all_total_water",
            "group_all_bet_count",
            "group_all_bet",
            "group_all_win_gold",
            "group_all_valid_bet",
            "directly_users",
            "directly_total_water",
            "directly_recharge",
            "directly_exchange",
            "directly_bet_count",
            "directly_bet",
            "directly_win_gold",
            "directly_valid_bet",
            "commission_awaiting_num",
            "commission_received_num",
            "commission_total",
            "bonus_ratio",
            "promotion_floor",
        ],
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**查询条件 */
    listQuery = {
        agent_user_id: "",
        page_count: 1,
        page_size: 20,
        plat_id: "",
        binded_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd 00:00:00"),
        binded_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd 23:59:59"),
        channel_id: "",
        nick_name: "",
        user_id: "",
        invite_user_id: "",
        max_promotion_floor: "",
        min_promotion_floor: "",
        username: "",
        settlement_date_start: "",
        settlement_date_end: "",
        bind_depth: "",
        remark: "",
        user_remark: "",
    };

    /**备注弹窗相关数据 */
    remarkDialogData = {
        bShow: false,
        status: "",
        form: {
            user_id: "",
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
        const { user_id, remark, type } = this.remarkDialogData.form;
        const api = type == "agent" ? HttpType.admin_plat_agent_bind_update : HttpType.admin_plat_user_update;
        this.sendNotification(api, {
            user_id: user_id,
            remark: remark,
        });
    }

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.channel_id_options = this.tableData.columns.channel_id.options[
                    this.listQuery.plat_id
                ];
                const channel_id_keys = Object.keys(this.tableData.columns.channel_id_options);
                channel_id_keys.forEach((key: any) => {
                    this.tableData.columns.channel_id_options[key] = key;
                });
            }
            this.onQuery();
        }
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
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        Object.assign(this.tableData.extra_info, data.extra_info);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            agent_user_id: "",
            page_count: 1,
            page_size: 20,
            binded_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd 00:00:00"),
            binded_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd 23:59:59"),
            channel_id: "",
            nick_name: "",
            user_id: "",
            invite_user_id: "",
            promotion_floor: "",
            max_promotion_floor: "",
            min_promotion_floor: "",
            username: "",
            settlement_date_start: "",
            settlement_date_end: "",
            bind_depth: "",
            remark: "",
            user_remark: "",
        });
    }

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("昨日"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-7);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-31);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

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
        this.sendNotification(HttpType.admin_plat_agent_manage_bind_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    onShowUserDetail(user_id: any) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("代理用户")}-${plat_name}`;

        if (this.listQuery["settlement_date_start"] && this.listQuery["settlement_date_end"] != "") {
            name += `-${this.listQuery["settlement_date_start"]}～${this.listQuery["settlement_date_end"]}`;
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
        this.sendNotification(HttpType.admin_plat_agent_manage_bind_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
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
        const newData = JSON.parse(JSON.stringify(this.exportData.list));

        const exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }
        // @ts-ignore
        // newData.forEach(element => {
        //     if (element.group_all_recharge && element.group_all_recharge.length != 0) {
        //         element.group_all_recharge = jsonStringify(element.group_all_recharge);
        //     } else {
        //         element.group_all_recharge = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.group_all_exchange && element.group_all_exchange.length != 0) {
        //         element.group_all_exchange = jsonStringify(element.group_all_exchange);
        //     } else {
        //         element.group_all_exchange = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.group_all_total_water && element.group_all_total_water.length != 0) {
        //         element.group_all_total_water = jsonStringify(element.group_all_total_water);
        //     } else {
        //         element.group_all_total_water = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.group_all_bet && element.group_all_bet.length != 0) {
        //         element.group_all_bet = jsonStringify(element.group_all_bet);
        //     } else {
        //         element.group_all_bet = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.group_all_win_gold && element.group_all_win_gold.length != 0) {
        //         element.group_all_win_gold = jsonStringify(element.group_all_win_gold);
        //     } else {
        //         element.group_all_win_gold = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.directly_total_water && element.directly_total_water.length != 0) {
        //         element.directly_total_water = jsonStringify(element.directly_total_water);
        //     } else {
        //         element.directly_total_water = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.directly_recharge && element.directly_recharge.length != 0) {
        //         element.directly_recharge = jsonStringify(element.directly_recharge);
        //     } else {
        //         element.directly_recharge = "-";
        //     }
        // });
        // // 直属兑换
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.directly_exchange && element.directly_exchange.length != 0) {
        //         element.directly_exchange = jsonStringify(element.directly_exchange);
        //     } else {
        //         element.directly_exchange = "-";
        //     }
        // });
        // // 直属投注额
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.directly_bet && element.directly_bet.length != 0) {
        //         element.directly_bet = jsonStringify(element.directly_bet);
        //     } else {
        //         element.directly_bet = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.directly_win_gold && element.directly_win_gold.length != 0) {
        //         element.directly_win_gold = jsonStringify(element.directly_win_gold);
        //     } else {
        //         element.directly_win_gold = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.commission_awaiting_num && element.commission_awaiting_num.length != 0) {
        //         element.commission_awaiting_num = jsonStringify(element.commission_awaiting_num);
        //     } else {
        //         element.commission_awaiting_num = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.commission_received_num && element.commission_received_num.length != 0) {
        //         element.commission_received_num = jsonStringify(element.commission_received_num);
        //     } else {
        //         element.commission_received_num = "-";
        //     }
        // });
        // // @ts-ignore
        // newData.forEach(element => {
        //     if (element.commission_total && element.commission_total.length != 0) {
        //         element.commission_total = jsonStringify(element.commission_total);
        //     } else {
        //         element.commission_total = "-";
        //     }
        // });

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
