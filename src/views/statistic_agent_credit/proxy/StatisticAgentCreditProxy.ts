import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull, getTodayOffset, dateFormat } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_agent_credit/setting";
import { MessageBox } from "element-ui";
import IStatisticAgentCreditProxy from "./IStatisticAgentCreditProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";

export default class StatisticAgentCreditProxy extends AbstractProxy implements IStatisticAgentCreditProxy {
    static NAME = "StatisticAgentCreditProxy";

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
            back_water: { name: "", options: {} },
            back_water_except_user: { name: "", options: {} },
            agent_amount: { name: "", options: {} },
            plat_amount: { name: "", options: {} },
            credit_rate: { name: "", options: {} },
            user_id: { name: "", options: {} },
            username: { name: "", options: {} },
            searchtime: { name: "结算时间", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            remark: { name: "备注", options: {} },
            valid_bet_gold: { name: "备注", options: {} },
            vendor_type: { name: "游戏类型", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            agent_amount: "",
            back_water: "",
            back_water_except_user: "",
            bet_gold: "",
            plat_amount: "",
            record_count: "",
            valid_bet_gold: "",
            win_gold: "",
        },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
        start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        coin_name_unique: "USDT",
        vendor_type: 0,
        order_by: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            formCopy: <any>{},
            show: <any>[],
            options: <any>{},
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
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
        if (data.list.length > 0) {
            let sumdata = this.setSummaryData(data.summary);
            data.list.unshift(sumdata);
        }
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    setSummaryData(data: any) {
        let sumData = JSON.parse(JSON.stringify(this.tableData.columns));
        sumData.plat_id = this.listQuery.plat_id;
        sumData.user_id = <string>LangUtil("合计");
        sumData.username = "-";
        sumData.credit_rate = "-";
        sumData.remark = "-";
        sumData.agent_amount = data.agent_amount.toString();
        sumData.back_water = data.back_water.toString();
        sumData.back_water_except_user = data.back_water_except_user.toString();
        sumData.bet_gold = data.bet_gold.toString();
        sumData.plat_amount = data.plat_amount.toString();
        sumData.record_count = data.record_count;
        sumData.valid_bet_gold = data.valid_bet_gold.toString();
        sumData.win_gold = data.win_gold.toString();
        return sumData;
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.form.show = [];
        this.dialogData.form.formCopy = {};
        this.dialogData.form.options = {};
        Object.assign(this.dialogData.form.formCopy, data);
        Object.assign(this.dialogData.form.options, data);
        for (const key in this.dialogData.form.options) {
            if (this.dialogData.form.options[key].show == 1) {
                this.dialogData.form.show.push(key);
            }
            this.dialogData.form.options[key] = key + '(' + this.dialogData.form.options[key].username + ')';
        }
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
            end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
            coin_name_unique: "USDT",
            vendor_type: 0,
        });
    }

    /**显示弹窗 */
    showDialog() {
        this.dialogData.bShow = true;
        this.sendNotification(HttpType.admin_statistic_agent_credit_user_show, { plat_id: this.listQuery.plat_id });
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
        this.sendNotification(HttpType.admin_statistic_agent_credit_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() {
        let formCopy: any = {};
        formCopy = JSON.parse(JSON.stringify(objectRemoveNull(this.dialogData.form.options)));
        for (const key in this.dialogData.form.options) {
            if (this.dialogData.form.show.includes(key)) {
                formCopy[key] = 1;
            } else {
                formCopy[key] = 98;
            }
        }
        for (const key in formCopy) {
            if (formCopy[key] == this.dialogData.form.formCopy[key].show) {
                delete formCopy[key];
            }
        }
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        this.sendNotification(HttpType.admin_statistic_agent_credit_user_update, { plat_id: this.listQuery.plat_id, user_ids: JSON.stringify(formCopy) });
    }

    /**删除数据 */
    onDelete(id: any) { }

    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
