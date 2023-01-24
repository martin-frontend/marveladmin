import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull, getTodayOffset, dateFormat } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_credit/setting";
import { MessageBox } from "element-ui";
import IStatisticCreditProxy from "./IStatisticCreditProxy";
import i18n from "@/lang";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class StatisticCreditProxy extends AbstractProxy implements IStatisticCreditProxy {
    static NAME = "StatisticCreditProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_credit_table_columns);
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
            plat_id: { name: "", options: {} },
            record_count: { name: "", options: {} },
            bet_gold: { name: "", options: {} },
            win_gold: { name: "", options: {} },
            backwater_game: { name: "", options: {} },
            valid_bet_gold: { name: "", options: {} },
            back_water: { name: "", options: {} },
            back_water_except_user: { name: "", options: {} },
            agent_amount: { name: "", options: {} },
            plat_amount: { name: "", options: {} },
            credit_rate: { name: "", options: {} },
            user_id: { name: "", options: {} },
            username: { name: "", options: {} },
            searchtime: { name: "结算时间", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            vendor_type: { name: "游戏类型", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        bind_relation: "",
        bind_relation_username: "",
        info_head: {
            end_date: "",
            start_date: "",
            user_id: null,
        },
        agent: {
            user_id: "",
            username: "",
        },
        summary: {
            plat_id: "",
            record_count: null,
            bet_gold: "",
            win_gold: "",
            backwater_game: "",
            back_water: "",
            back_water_except_user: "",
            agent_amount: "",
            plat_amount: "",
            credit_rate: "",
            user_id: "-",
            valid_bet_gold: "",
        },
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        user_id: null,
        username: null,
        page_count: 1,
        page_size: 20,
        start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        coin_name_unique: "USDT",
        vendor_type: 0,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {},
        formSource: null, // 表单的原始数据
    };

    setSummaryData(data: any) {
        let sumData = JSON.parse(JSON.stringify(this.tableData.columns));
        sumData.plat_id = data.plat_id;
        sumData.user_id = <string>LangUtil("合计");
        sumData.username = "-";
        sumData.record_count = data.record_count;
        sumData.bet_gold = data.bet_gold;
        sumData.win_gold = data.win_gold;
        sumData.backwater_game = data.backwater_game;
        sumData.back_water = data.back_water; //back_water_except_user
        sumData.back_water_except_user = data.back_water_except_user;
        sumData.agent_amount = data.agent_amount;
        sumData.plat_amount = data.plat_amount;
        sumData.credit_rate = data.credit_rate;
        sumData.valid_bet_gold = data.valid_bet_gold;
        return sumData;
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            // this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        // if (data.list.length > 0)
        {
            //console.log("有数据，需要加表头");
            if (data.pageInfo.pageCurrent == 1) data.list.unshift(data.agent);
            let sumdata = this.setSummaryData(data.summary);
            data.list.unshift(sumdata);
        }
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.info_head, data.info_head);
        Object.assign(this.tableData.agent, data.agent);
        this.tableData.bind_relation = data.bind_relation;
        this.tableData.bind_relation_username = data.bind_relation_username;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, data, {
            password: "",
            password_verify: "",
        });
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            user_id: null,
            username: null,
            page_count: 1,
            page_size: 20,
            start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
            end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
            coin_name_unique: "USDT",
            vendor_type: 0,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, data, {
                password: "",
                password_verify: "",
            });
            //this.sendNotification(HttpType.admin_admin_user_show, { admin_user_id: data.admin_user_id });
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
    resetDialogForm() {}
    /**筛选渠道列表 */
    channelListFilter() {}

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("今日"),
                onClick(picker: any) {
                    const start = getTodayOffset();
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
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
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近60天"),
                onClick(picker: any) {
                    const start = getTodayOffset(-60);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_credit_index, objectRemoveNull(this.listQuery));
    }

    onQueryUser(user_id: any){
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            username: "",
        });
        this.listQuery.user_id = user_id;
        this.sendNotification(HttpType.admin_statistic_credit_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {}
    /**更新数据 */
    onUpdate() {}
    /**删除数据 */
    onDelete(admin_user_id: any) {}
    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
