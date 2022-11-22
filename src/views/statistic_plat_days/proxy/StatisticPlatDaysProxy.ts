import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysProxy from "./IStatisticPlatDaysProxy";
import { exportJson2Excel } from "@/core/global/Excel";

export default class StatisticPlatDaysProxy extends AbstractProxy implements IStatisticPlatDaysProxy {
    static NAME = "StatisticPlatDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_table_columns);
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
            active_user: { name: "活跃用户", options: {}, display: true },
            backwater_gold: { name: "实时返水", options: {}, tips: "玩家在实时返水中获得的金额", display: true },
            channel_id: { name: "所属渠道", options: {}, display: true },
            commission_gold: { name: "推广返佣", options: {}, tips: "玩家在推广赚钱中获得的返佣金额", display: true },
            created_date: { name: "日期", options: {}, display: true },
            data_belong: { name: "数据归属标记", options: {}, display: true },
            exchange: { name: "兑换金额", options: {}, display: true },
            exchange_user: { name: "总兑换人数", options: {}, display: true },
            gift_gold: { name: "平台赠送", options: {}, tips: "玩家在活动、平台赠送中获得的金额", display: true },
            id: { name: "平台统计ID", options: {}, display: true },
            new_exchange_user: { name: "新增兑换人数", options: {}, display: true },
            new_recharge_user: { name: "新增充值人数", options: {}, display: true },
            new_register: { name: "新增注册", options: {}, display: true },
            plat_id: { name: "所属平台", options: {}, display: true },
            recharge: { name: "充值金额", options: {}, display: true },
            recharge_user: { name: "充值人数", options: {}, display: true },
            water: { name: "游戏流水", options: {}, display: true },
            win_loss: { name: "游戏输赢", options: {}, display: true },
            new_user: { name: "新增登入" },
            agent_bonus_gold: { name: "", options: {} },
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
        "created_date-{>=}": this.defaultDate,
        "created_date-{<=}": this.defaultDate,
    };

    /**弹窗 相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: [
            {
                category: "player",
                title: LangUtil("玩家数据"),
                options: {
                    new_register: {
                        name: this.tableData.columns.new_register.name,
                        checked: true,
                    },
                    active_user: {
                        name: this.tableData.columns.active_user.name,
                        checked: true,
                    },
                    gift_gold: {
                        name: this.tableData.columns.gift_gold.name,
                        checked: true,
                    },
                    backwater_gold: {
                        name: this.tableData.columns.backwater_gold.name,
                        checked: true,
                    },
                    commission_gold: {
                        name: this.tableData.columns.commission_gold.name,
                        checked: true,
                    },
                },
            },
            {
                category: "recharge",
                title: LangUtil("充值兑换数据"),
                options: {
                    recharge: {
                        name: this.tableData.columns.recharge.name,
                        checked: true,
                    },
                    recharge_user: {
                        name: this.tableData.columns.recharge_user.name,
                        checked: true,
                    },
                    new_recharge_user: {
                        name: this.tableData.columns.new_recharge_user.name,
                        checked: true,
                    },
                    exchange: {
                        name: this.tableData.columns.exchange.name,
                        checked: true,
                    },
                    exchange_user: {
                        name: this.tableData.columns.exchange_user.name,
                        checked: true,
                    },
                    new_exchange_user: {
                        name: this.tableData.columns.new_exchange_user.name,
                        checked: true,
                    },
                },
            },
            {
                category: "game",
                title: LangUtil("游戏数据"),
                options: {
                    win_loss: {
                        name: this.tableData.columns.win_loss.name,
                        checked: true,
                    },
                    water: {
                        name: this.tableData.columns.water.name,
                        checked: true,
                    },
                },
            },
        ],
        formSource: null, // 表单的原始数据
    };

    /**合计 相关数据 */
    summaryData = {
        plat_id: "",
        active_user: "",
        recharge_user: "",
        exchange_user: "",
        exchange: "",
        new_exchange_user: "",
        new_recharge_user: "",
        new_register: "",
        recharge: "",
        water: "",
        win_loss: "",
        gift_gold: "",
        backwater_gold: "",
        commission_gold: "",
        new_user: "",
        agent_bonus_gold: "",
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
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.summaryData["plat_id"] = <any>LangUtil("合计");
        this.summaryData["active_user"] = "--";
        this.summaryData["recharge_user"] = "--";
        this.summaryData["exchange_user"] = "--";
        this.summaryData["exchange"] = data.summary.exchange;
        this.summaryData["new_exchange_user"] =
            data.summary.new_exchange_user === 0 ? "0" : data.summary.new_exchange_user;
        this.summaryData["new_recharge_user"] =
            data.summary.new_recharge_user === 0 ? "0" : data.summary.new_recharge_user;
        this.summaryData["new_register"] = data.summary.new_register;
        this.summaryData["new_user"] = data.summary.new_user;
        this.summaryData["recharge"] = data.summary.recharge;
        this.summaryData["water"] = data.summary.water;
        this.summaryData["win_loss"] = data.summary.win_loss;
        this.summaryData["gift_gold"] = data.summary.gift_gold;
        this.summaryData["backwater_gold"] = data.summary.backwater_gold;
        this.summaryData["commission_gold"] = data.summary.commission_gold;
        this.summaryData["agent_bonus_gold"] = data.summary.agent_bonus_gold;
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
            "created_date-{>=}": this.defaultDate,
            "created_date-{<=}": this.defaultDate,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        // 这功能先不做 code 还是先放的 怕之后又要了XD
        // this.resetDialogForm();
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        this.dialogData.form = [
            {
                category: "player",
                title: LangUtil("玩家数据"),
                options: {
                    new_register: {
                        name: this.tableData.columns.new_register.name,
                        checked: true,
                    },
                    active_user: {
                        name: this.tableData.columns.active_user.name,
                        checked: true,
                    },
                    gift_gold: {
                        name: this.tableData.columns.gift_gold.name,
                        checked: true,
                    },
                    backwater_gold: {
                        name: this.tableData.columns.backwater_gold.name,
                        checked: true,
                    },
                    commission_gold: {
                        name: this.tableData.columns.commission_gold.name,
                        checked: true,
                    },
                },
            },
            {
                category: "recharge",
                title: LangUtil("充值兑换数据"),
                options: {
                    recharge: {
                        name: this.tableData.columns.recharge.name,
                        checked: true,
                    },
                    recharge_user: {
                        name: this.tableData.columns.recharge_user.name,
                        checked: true,
                    },
                    new_recharge_user: {
                        name: this.tableData.columns.new_recharge_user.name,
                        checked: true,
                    },
                    exchange: {
                        name: this.tableData.columns.exchange.name,
                        checked: true,
                    },
                    exchange_user: {
                        name: this.tableData.columns.exchange_user.name,
                        checked: true,
                    },
                    new_exchange_user: {
                        name: this.tableData.columns.new_exchange_user.name,
                        checked: true,
                    },
                },
            },
            {
                category: "game",
                title: LangUtil("游戏数据"),
                options: {
                    win_loss: {
                        name: this.tableData.columns.win_loss.name,
                        checked: true,
                    },
                    water: {
                        name: this.tableData.columns.water.name,
                        checked: true,
                    },
                },
            },
        ];
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_days_index, objectRemoveNull(this.listQuery));
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
        this.dialogData.form.forEach((item: any) => {
            Object.keys(item.options).forEach((key: any) => {
                if (item.options[key].checked === false) {
                    this.tableData.hideColumns.push(key);
                }
            });
        });

        if (this.tableData.hideColumns.length > 0) {
            this.tableData.hideColumns.forEach((item: any) => {
                this.tableData.columns[item].display = false;
            });
        }
        // 强制刷新
        this.tableData.updateNum++;
        this.hideDialog();
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
        return arr1.concat(arr2).filter(function(v: any, i: any, arr: any) {
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
            fileLastName = `-[${this.listQuery["created_date-{>=}"].split(" ")[0]}-${
                this.listQuery["created_date-{<=}"].split(" ")[0]
            }]`;
        }
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
