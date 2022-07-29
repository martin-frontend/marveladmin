import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_coin_days/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatCoinDaysProxy from "./IStatisticPlatCoinDaysProxy";
import { exportJson2Excel } from "@/core/global/Excel";
import i18n from "@/lang";

export default class StatisticPlatCoinDaysProxy extends AbstractProxy implements IStatisticPlatCoinDaysProxy {
    static NAME = "StatisticPlatCoinDaysProxy";

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
            created_date: { name: "日期", options: {}, display: true },
            plat_id: { name: "所属平台", options: {}, display: true },
            coin_name_unique: { name: "币种", options: {}, display: true },
            recharge: { name: "充值", options: {}, display: true },
            recharge_fee: { name: "充值手续费", options: {}, display: true },
            exchange: { name: "提现", options: {}, display: true },
            exchange_fee: { name: "提现手续费", options: {}, display: true },
            swap: { name: "SWAP交易", options: {}, display: true },
            swap_fee: { name: "SWAP交易手续费", options: {}, display: true },
            commission_gold: { name: "推广返佣", options: {}, display: true },
            backwater_gold: { name: "游戏挖矿", options: {}, display: true },
            stake_bonus: { name: "质押分红", options: {}, display: true },
            mail_awards: { name: "邮件奖励（人工）", options: {}, display: true },
            activity_awards: { name: "活动奖励", options: {}, display: true },
            win_loss: { name: "win_loss", options: {}, display: true },
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
        channel_id: "",
        coin_name_unique: "USDT", 
        "created_date-{>=}": this.defaultDate,
        "created_date-{<=}": this.defaultDate,
    };

    /**合计 相关数据 */
    summaryData = {
        created_date: "合計",
        plat_id:"",
        coin_name_unique:"",
        recharge:"",
        recharge_fee:"",
        exchange:"",
        exchange_fee:"",
        swap:"",
        swap_fee:"",
        commission_gold:"",
        backwater_gold:"",
        stake_bonus:"",
        mail_awards:"",
        activity_awards:"",
        win_loss:"",
    };

    /**导出 相关数据 */
    exportData = {
        fieldOrder: [
            "created_date",
            "plat_id",
            "channel_id",
            "new_user",
            "new_register",
            "active_user",
            "recharge",
            "recharge_user",
            "new_recharge_user",
            "exchange",
            "exchange_user",
            "new_exchange_user",
            "gift_gold",
            "backwater_gold",
            "commission_gold",
            "win_loss",
            "water",
        ],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        this.tableData.columnKeys = Object.keys(this.tableData.columns);
        if (plat_id_options_keys.length > 0 && this.tableData.columnKeys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }

            // 预设栏位都显示
            this.tableData.columnKeys.forEach((key: any) => {
                this.tableData.columns[key]["display"] = true;
            });

            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;

        data.list.forEach((listData: any) => {
            this.tableData.list.push(...listData)
        });
        
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.keys(this.summaryData).forEach(key => {
            if(key === 'created_date') return;
            // @ts-ignore
            this.summaryData[key] = data.summary[key] ?? '-'
        })
        console.warn(this.tableData.list);
        
        
        
        // this.summaryData["plat_id"] = <any>i18n.t("common.total");
        // this.summaryData["coin_name_unique"] = "--";
        // this.summaryData["recharge"] = "--";
        // this.summaryData["recharge_fee"] = "--";
        // this.summaryData["exchange"] = data.summary.exchange;
        // this.summaryData["new_exchange_user"] =
        //     data.summary.new_exchange_user === 0 ? "0" : data.summary.new_exchange_user;
        // this.summaryData["new_recharge_user"] =
        //     data.summary.new_recharge_user === 0 ? "0" : data.summary.new_recharge_user;
        // this.summaryData["new_register"] = data.summary.new_register;
        // this.summaryData["new_user"] = data.summary.new_user;
        // this.summaryData["recharge"] = data.summary.recharge;
        // this.summaryData["water"] = data.summary.water;
        // this.summaryData["win_loss"] = data.summary.win_loss;
        // this.summaryData["gift_gold"] = data.summary.gift_gold;
        // this.summaryData["backwater_gold"] = data.summary.backwater_gold;
        // this.summaryData["commission_gold"] = data.summary.commission_gold;
        // this.summaryData["agent_bonus_gold"] = data.summary.agent_bonus_gold;
        // 把summaryData 插入第一笔
        this.tableData.list.splice(0, 0, this.summaryData);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            channel_id: "",
            "created_date-{>=}": this.lastWeekDate,
            "created_date-{<=}": this.defaultDate,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_coin_days_index, objectRemoveNull(this.listQuery));
    }

    get lastWeekDate() {
        let d1 = new Date();
        d1.setTime(d1.getTime() - 24 * 60 * 60 * 1000 * 7);
        return d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    }

    get defaultDate() {
        let d1 = new Date();
        d1.setTime(d1.getTime() - 24 * 60 * 60 * 1000);
        return d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    }

    /**字段配置筛选 */
    filterTable() {
        this.tableData.columnKeys.forEach((key: any) => {
            this.tableData.columns[key].display = true;
        });
        this.tableData.hideColumns = [];

        if (this.tableData.hideColumns.length > 0) {
            this.tableData.hideColumns.forEach((item: any) => {
                this.tableData.columns[item].display = false;
            });
        }
        // 强制刷新
        this.tableData.updateNum++;
    }

    /**取导出资料 */
    onExportExcel() {
        this.listQuery.page_size = 100000;
        this.onQuery();
    }

    /**导出 Excel */
    onSetExcelData(body: any) {
        let data = JSON.parse(JSON.stringify(body));
        // 删除不需要的栏位
        data.list.forEach((list: any) => {
            delete data.list.id;
            delete data.list.data_belong;
        });
        // 要导出的栏位
        let exportColumn = this.getArrDifference(this.exportData.fieldOrder, this.tableData.hideColumns);
        // 栏位中文名称
        let exportHeader = <any>[];
        exportColumn.forEach((column: any) => {
            exportHeader.push(this.tableData.columns[column].name);
        });
        // 导出资料
        let exportData = this.dataMatching(exportColumn, data.list);
        // 合计
        let summary: any = this.getExportSummary(exportColumn, this.summaryData);
        exportData.splice(0, 0, summary);
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
        return listData.map((data: any) =>
            filterKeys.map((key: string) => {
                if (key === "plat_id") {
                    return this.tableData.columns["plat_id"].options[data.plat_id];
                }
                return data[key];
            })
        );
    }

    /**导出合计 */
    getExportSummary(filterKeys: any, summary: any) {
        let result: any = ["", ""];
        filterKeys.forEach((key: any) => {
            if (summary[key] !== undefined) {
                result.push(summary[key]);
            } else {
                console.log("key", key);
            }
        });
        return result;
    }

    // 导出挡案名
    get getFileName() {
        let fileFirstName: any = "";
        let fileLastName: any = "";
        if (this.listQuery["created_date-{<=}"]) {
            fileLastName = `-[${this.listQuery["created_date-{>=}"].split(" ")[0]}-${this.listQuery["created_date-{<=}"].split(" ")[0]
                }]`;
        }
        if (this.listQuery.plat_id !== "0") {
            let str: any =
                this.listQuery.plat_id == "0"
                    ? i18n.t("common.platIdAll")
                    : this.tableData.columns["plat_id"].options[this.listQuery.plat_id];
            // fileFirstName = `平台每日统计[${str}]`;
            fileFirstName = i18n.t("exportFileNamePart1.exportFileName", { "0": str });
        } else {
            fileFirstName = i18n.t("statistic_plat_days.exportFileName");
        }
        return `${fileFirstName}${fileLastName}`;
    }

    objectSpanMethod(options: {row: any, column:any, rowIndex:any, columnIndex:any }) {
        const { columnIndex, rowIndex } = options;
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
}
