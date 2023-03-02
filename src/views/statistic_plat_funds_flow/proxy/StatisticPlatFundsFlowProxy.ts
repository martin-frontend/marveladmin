import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_funds_flow/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatFundsFlowProxy from "./IStatisticPlatFundsFlowProxy";

export default class StatisticPlatFundsFlowProxy extends AbstractProxy implements IStatisticPlatFundsFlowProxy {
    static NAME = "StatisticPlatFundsFlowProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_funds_flow_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.data = {};
        this.tableData.bShowInfo = false;
    }

    /**表格相关数据 */
    tableData = <any>{
        columns: {
            // TODO
            created_date: { name: "" },
            plat_id: { name: "", options: {} },
            directly_user_id: { name: "" },
            team_user_id: { name: "" },
            user_id: { name: "" },
            plat_deposit: { name: "" },
            online_deposit: { name: "" },
            manual_deposit: { name: "" },
            plat_withdraw: { name: "" },
            online_withdraw: { name: "" },
            profit: { name: "" },
            deposit_summary: { name: "" },
            withdraw_summary: { name: "" },
            coin_name_unique: { name: "", options: {} },
            coin_name_unique_option: {},
        },
        data: <any>{
            plat_deposit: "",
            plat_deposit_count: 0,
            online_deposit: "",
            online_deposit_count: 0,
            manual_deposit: "",
            manual_deposit_count: 0,
            plat_withdraw: "",
            plat_withdraw_count: 0,
            online_withdraw: "",
            online_withdraw_count: 0,
            profit: "",
        },
        bShowInfo: false,
        format: "yyyy-MM-dd hh:mm:ss",
        watchNumber: 0,
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(), this.tableData.format),
        "created_date-{<=}": dateFormat(getTodayOffset(1, 1), this.tableData.format),
        directly_user_id: "",
        team_user_id: "",
        user_id: "",
        coin_name_unique: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            if (this.listQuery.plat_id) {
                //@ts-ignore
                this.tableData.columns.coin_name_unique_option = this.tableData.columns.coin_name_unique.options[
                    this.listQuery.plat_id
                ];
                const coin_name_unique_options_keys = Object.keys(this.tableData.columns.coin_name_unique_option);
                this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
            }
            this.onQuery();
        }
    }

    /**详细数据 */
    setDetail(data: any) {
        Object.assign(this.tableData.data, data);
        this.tableData.watchNumber++;
        setTimeout(() => {
            this.tableData.bShowInfo = true;
        }, 500);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_date-{>=}": dateFormat(getTodayOffset(), this.tableData.format),
            "created_date-{<=}": dateFormat(getTodayOffset(1, 1), this.tableData.format),
            directly_user_id: "",
            team_user_id: "",
            user_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_funds_flow_show, objectRemoveNull(this.listQuery));
    }
}
