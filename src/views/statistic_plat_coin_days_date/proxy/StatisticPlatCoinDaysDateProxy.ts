import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_coin_days_date/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatCoinDaysDateProxy from "./IStatisticPlatCoinDaysDateProxy";
import { exportJson2Excel } from "@/core/global/Excel";

export default class StatisticPlatCoinDaysDateProxy extends AbstractProxy implements IStatisticPlatCoinDaysDateProxy {
    static NAME = "StatisticPlatCoinDaysDateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_coin_days_table_columns);
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
            created_date: { name: "日期", options: {} },
            plat_id: { name: "所属平台", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            recharge_amount: { name: "充值", options: {} },
            recharge_fee_amount: { name: "充值手续费", options: {} },
            recharge_third_fee_amount: { name: "充值三方手续费", options: {} },
            exchange_amount: { name: "提现", options: {} },
            exchange_fee_amount: { name: "提现手续费", options: {} },
            exchange_third_fee_amount: { name: "提现三方手续费", options: {} },
            swap_amount: { name: "SWAP交易", options: {} },
            swap_fee_amount: { name: "SWAP交易手续费", options: {} },
            commission_amount: { name: "推广返佣", options: {} },
            commission_received_amount: { name: "推广赚钱已领", options: {} },
            backwater_amount: { name: "游戏挖矿", options: {} },
            stake_bonus_amount: { name: "质押分红", options: {} },
            stake_bonus_fee_amount: { name: "解质押手续费", options: {} },
            stake_bonus_pool_amount: { name: "质押奖池", options: {} },
            stake_bonus_received_amount: { name: "质押分红已领", options: {} },
            mail_awards_amount: { name: "邮件奖励（人工）", options: {} },
            mail_awards_received_amount: { name: "邮件奖励(人工)已领", options: {} },
            activity_awards_amount: { name: "活动奖励", options: {} },
            activity_awards_received_amount: { name: "活动奖励已领", options: {} },
            manual_deduct_amount: { name: "人工扣款", options: {} },
            win_loss_amount: { name: "游戏输赢", options: {} },
            // data_belong: {name: '数据归属标记', options: {}, display: true },
        },
        list: <any>[],
        columnKeys: <any>[],
        hideColumns: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        updateNum: 0,
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        coin_name_unique: "",
    };

    /**合计 相关数据 */
    summaryData = <any>[];

    /**导出 相关数据 */
    exportData = {
        fieldOrder: [
            "created_date",
            "plat_id",
            "coin_name_unique",
            "recharge_amount",
            "recharge_fee_amount",
            "recharge_third_fee_amount",
            "exchange_amount",
            "exchange_fee_amount",
            "exchange_third_fee_amount",
            "swap_amount",
            "swap_fee_amount",
            "commission_amount",
            "commission_received_amount",
            "backwater_amount",
            "stake_bonus_amount",
            "stake_bonus_fee_amount",
            "stake_bonus_pool_amount",
            "stake_bonus_received_amount",
            "mail_awards_amount",
            "mail_awards_received_amount",
            "activity_awards_amount",
            "activity_awards_received_amount",
            "manual_deduct_amount",
            "win_loss_amount",
        ],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);

        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            coin_name_unique: "",
            plat_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(
            HttpType.admin_statistic_plat_coin_days_statistic_by_date,
            objectRemoveNull(this.listQuery)
        );
    }

    /**取导出资料 */
    onExportExcel() {
        this.listQuery.page_size = 100000;
        this.onQuery();
    }

    /**导出 Excel */
    onSetExcelData(body: any) {
        let data = JSON.parse(JSON.stringify(body));

        // 要导出的栏位
        let exportColumn = this.getArrDifference(this.exportData.fieldOrder, this.tableData.hideColumns);
        // 栏位中文名称
        let exportHeader = <any>[];
        exportColumn.forEach((column: any) => {
            exportHeader.push(this.tableData.columns[column].name);
        });
        console.log(data);
        // 导出资料
        let exportData = this.dataMatching(exportColumn, data);

        exportJson2Excel(exportHeader, exportData, this.getFileName, undefined, undefined);
        // 改回来page size
        this.listQuery.page_size = 20;
    }

    /**取出没被字串配置过滤的columns */
    getArrDifference(arr1: any, arr2: any) {
        return arr1.concat(arr2).filter(function (v: any, i: any, arr: any) {
            return arr.indexOf(v) === arr.lastIndexOf(v);
        });
    }

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any) {
        console.log(listData);
        return listData.map((data: any) =>
            filterKeys.map((key: string) => {
                if (key === "plat_id") {
                    return data.plat_id ? this.tableData.columns["plat_id"].options[data.plat_id] : "合计";
                }
                return data[key];
            })
        );
    }

    // 导出挡案名
    get getFileName() {
        let fileFirstName: any = "";
        let fileLastName: any = "";
        if (this.listQuery.plat_id !== "0") {
            let str: any =
                this.listQuery.plat_id == "0"
                    ? LangUtil("所有平台")
                    : this.tableData.columns["plat_id"].options[this.listQuery.plat_id];
            // fileFirstName = `平台每日统计[${str}]`;
            fileFirstName = LangUtil("平台每日统计[{0}]", str);
        } else {
            fileFirstName = LangUtil("平台每日统计[所有平台]");
        }
        return `${fileFirstName}${fileLastName}`;
    }
}
