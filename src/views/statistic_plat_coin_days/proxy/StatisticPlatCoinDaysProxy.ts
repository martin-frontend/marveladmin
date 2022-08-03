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
            recharge_amount: { name: "充值", options: {}, display: true },
            recharge_fee_amount: { name: "充值手续费", options: {}, display: true },
            exchange_amount: { name: "提现", options: {}, display: true },
            exchange_fee_amount: { name: "提现手续费", options: {}, display: true },
            swap_amount: { name: "SWAP交易", options: {}, display: true },
            swap_fee_amount: { name: "SWAP交易手续费", options: {}, display: true },
            commission_amount: { name: "推广返佣", options: {}, display: true },
            backwater_amount: { name: "游戏挖矿", options: {}, display: true },
            stake_bonus_amount: { name: "质押分红", options: {}, display: true },
            mail_awards_amount: { name: "邮件奖励（人工）", options: {}, display: true },
            activity_awards_amount: { name: "活动奖励", options: {}, display: true },
            win_loss_amount: { name: "游戏输赢", options: {}, display: true },

            commission_received_amount: {name: '推广赚钱已领', options: {}, display: true },
            data_belong: {name: '数据归属标记', options: {}, display: true },
            mail_awards_received_amount: {name: '邮件奖励(人工)已领', options: {}, display: true },
            stake_bonus_fee_amount: {name: '解质押手续费', options: {}, display: true },
            stake_bonus_received_amount: {name: '质押分红已领', options: {}, display: true },

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
        "created_date-{>=}": this.lastWeekDate,
        "created_date-{<=}": this.defaultDate,
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
            "exchange_amount",
            "exchange_fee_amount",
            "swap_amount",
            "swap_fee_amount",
            "commission_amount",
            "backwater_amount",
            "stake_bonus_amount",
            "mail_awards_amount",
            "activity_awards_amount",
            "win_loss_amount",
        ],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        this.tableData.columnKeys = Object.keys(this.tableData.columns);
        if (plat_id_options_keys.length > 0 && this.tableData.columnKeys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                // this.listQuery.plat_id = plat_id_options_keys[0];
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
        this.summaryData.length = 0;
        const newTableData = <any>[];

        data.list.forEach((listData: any) => {
            listData.detail.forEach((detailData: any, index: number) => {
                const newData = { rowNum: 0 , ...detailData  };

                // 合并的行数数值，只需要取子循环的第一个数赋值待合并的行数即可
                if(index == 0) {
                    newData.rowNum = listData.detail.length;
                }
    
                newTableData.push(newData);
            })
        });

        Object.assign(this.tableData.pageInfo, data.pageInfo);

        data.summary.forEach((sumData: any, index: number) => {
            const newData = { plat_id: '合计', rowNum: 0, ...sumData };

            if(index == 0) {
                newData.rowNum = data.summary.length;
            }

            this.summaryData.push(newData)
        });

        // 把summaryData 插入
        this.tableData.list.push(...this.summaryData, ...newTableData);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            coin_name_unique: "",
            "created_date-{>=}": this.lastWeekDate,
            "created_date-{<=}": this.defaultDate,
            plat_id: ""
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

        const excelData = <any>[];

        excelData.push(...data.summary)

        data.list.forEach((listData: any)=> {
            excelData.push(...listData.detail)
        })

        // 要导出的栏位
        let exportColumn = this.getArrDifference(this.exportData.fieldOrder, this.tableData.hideColumns);
        // 栏位中文名称
        let exportHeader = <any>[];
        exportColumn.forEach((column: any) => {
            exportHeader.push(this.tableData.columns[column].name);
        });
        // 导出资料
        let exportData = this.dataMatching(exportColumn, excelData);

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
                    return data.plat_id? this.tableData.columns["plat_id"].options[data.plat_id] : '合计';
                }
                return data[key];
            })
        );
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
}
