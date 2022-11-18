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
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
        start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        coin_name_unique: "USDT",
    };
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
            start_date: dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
            end_date: dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
            coin_name_unique: "USDT",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {}

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
                text: i18n.t("common.today"),
                onClick(picker: any) {
                    const start = getTodayOffset();
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.yesterday"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.lastWeek"),
                onClick(picker: any) {
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.lastMonth"),
                onClick(picker: any) {
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: i18n.t("common.last3Month"),
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
    onAdd() {}

    /**更新数据 */
    onUpdate() {}

    /**删除数据 */
    onDelete(id: any) {}

    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
