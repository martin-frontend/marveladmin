import LangUtil from "@/core/global/LangUtil";
import { BaseInfo } from "@/components/vo/commonVo";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_bet_plat_days/setting";
import { MessageBox } from "element-ui";
import IStatisticBetPlatDaysProxy, { StatisticTab } from "./IStatisticBetPlatDaysProxy";
import i18n from "@/lang";

export default class StatisticBetPlatDaysProxy extends AbstractProxy implements IStatisticBetPlatDaysProxy {
    static NAME = "StatisticBetPlatDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_bet_plat_days_table_columns);
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
            id: { name: "", options: {} },
            created_date: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_type: { name: "", options: {} },
            vendor_product_id: { name: "", options: <any>{} },
            bet_gold: { name: "", options: {} },
            type: { name: "", options: <any>{} },
            valid_bet_gold: { name: "", options: {} },
            win_gold: { name: "", options: {} },
            water: { name: "", options: {} },
            time_type: { name: "", options: {} },
            time_region_hour_interval: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bet_gold: "",
            valid_bet_gold: "",
            win_gold: "",
            water: "",
        },
        activeName: StatisticTab.Plat,
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    };
    /**查询条件  游戏统计*/
    listQuery = {
        plat_id: "",
        order_by: "",
        vendor_id: "",
        vendor_type: "",
        vendor_product_id: "",
        type: this.tableData.activeName,
        "created_date-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd hh:mm:ss"),
        time_type: "1",
        time_region_hour_interval: "0",
        page_count: 1,
        page_size: 20,
        coin_name_unique: "",
    };
    /**查询条件  平台游戏统计*/
    platListQuery = {
        plat_id: "",
        vendor_id: "",
        type: this.tableData.activeName,
        "created_date-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd hh:mm:ss"),
        time_type: "1",
        time_region_hour_interval: "0",
        page_count: 1,
        page_size: 20,
        coin_name_unique: "",
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
        data.list.forEach((element: any) => {
            let name: string = element.vendor_product_name;
            if (!name || name == "") {
                let product_id: string = element.vendor_product_id;
                if (product_id) {
                    try {
                        name = this.tableData.columns.vendor_product_id.options[element.vendor_id][
                            Number(element.vendor_type)
                        ][Number(product_id)];
                    } catch (e) {
                        console.log("找不到产品名称");
                    }
                }
            }
            element.vendor_product_name = name;
        });
        data.list = this.addSummary(data);
        this.tableData.list.length = 0;
        //this.tableData.list.push(...data.list);
        this.tableData.list.push(...this.resetTabdata(data.list));
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    resetTabdata(data: any, isexport: boolean = false) {
        const newdata = [];
        //将数据中的 表格数据重组
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            element._myTable_id = index;
            if (element.list) {
                for (let n = 0; n < element.list.length; n++) {
                    const obj = JSON.parse(JSON.stringify(element));
                    if (isexport) {
                        obj.list = [];
                    }
                    const keys = Object.keys(obj.list[n]);
                    for (let p = 0; p < keys.length; p++) {
                        obj[keys[p]] = obj.list[n][keys[p]];
                    }
                    newdata.push(obj);
                }
            } else {
                newdata.push(element);
            }
        }
        return newdata;
    }

    /**增加合计数据 */
    addSummary(data: any) {
        let summary = {
            id: "",
            plat_id: "",
            created_date: LangUtil("合计"),
            type: "",
            vendor_id: "",
            vendor_product_id: "",
            vendor_type: "",
            vendor_product_name: "",
            bet_gold: data.summary.bet_gold,
            valid_bet_gold: data.summary.valid_bet_gold,
            win_gold: data.summary.win_gold,
            water: data.summary.water,
            list: JSON.parse(JSON.stringify(data.summary)),
        };
        data.list.unshift(summary);
        return data.list;
    }

    /**重置游戏统计查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            vendor_id: "",
            vendor_type: "",
            vendor_product_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd hh:mm:ss"),
            time_region_hour_interval: "0",
            coin_name_unique: "",
        });
    }
    /**重置平台游戏统计查询条件 */
    resetPlatListQuery() {
        Object.assign(this.platListQuery, {
            vendor_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd hh:mm:ss"),
            time_region_hour_interval: "0",
            coin_name_unique: "",
        });
    }

    /**查询 */
    onQuery() {
        this.listQuery.type = this.tableData.activeName;
        this.platListQuery.type = this.tableData.activeName;
        let obj;
        if (this.isPlat) {
            obj = JSON.parse(JSON.stringify(this.platListQuery));
        } else {
            obj = JSON.parse(JSON.stringify(this.listQuery));
        }

        if (obj.coin_name_unique == "-") {
            obj.coin_name_unique = "";
        }
        if (!obj.plat_id)
        {
            obj.plat_id="0";
        }
        this.sendNotification(HttpType.admin_statistic_bet_plat_days_index, objectRemoveNull(obj));
    }
    

    /**取得所有资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = {};
        if (this.isPlat) {
            queryCopy = JSON.parse(JSON.stringify(this.platListQuery));
        } else {
            queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        }
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        if (queryCopy.coin_name_unique == "-") {
            queryCopy.coin_name_unique = "";
        }
        //this.fieldSelectionData.exportOption = <any>[];
        this.fieldSelectionData.exportOption.length = 0 ;
        //设置导出的筛选
        for (let index = 0; index < this.fieldSelectionData.baseData.length; index++) {
            const element = this.fieldSelectionData.baseData[index];
            if (this.fieldSelectionData.fieldOptions.includes(element))
            {
                this.fieldSelectionData.exportOption.push(element);
            }
        }
        this.facade.sendNotification(HttpType.admin_statistic_bet_plat_days_index, objectRemoveNull(queryCopy));
    }
    fieldSelectionData = {
        bShow: false,
        baseData: [],
        fieldOptions: <any>[],
        exportOption:<any>[],
    };
    /**打开导出选择弹框 */
    openDialogFieldSelection() {
        if (this.isPlat) {
            this.fieldSelectionData.baseData = JSON.parse(JSON.stringify(this._platKeyList));
        } else {
            this.fieldSelectionData.baseData = JSON.parse(JSON.stringify(this._gameKeyList));
        }
        this.fieldSelectionData.fieldOptions = JSON.parse(JSON.stringify(this.fieldSelectionData.baseData));
        this.fieldSelectionData.bShow = true;
    }

    /**平台游戏统计栏位导出顺序 */
    _platKeyList = [
        "created_date",
        "plat_id",
        "vendor_id",
        "coin_name_unique",
        "bet_gold",
        "valid_bet_gold",
        "win_gold",
        "water",
    ];
    /**游戏统计栏位导出顺序 */
    _gameKeyList = [
        "created_date",
        "plat_id",
        "vendor_id",
        "vendor_type",
        "vendor_product_name",
        "coin_name_unique",
        "bet_gold",
        "valid_bet_gold",
        "win_gold",
        "water",
    ];

    /**是否为平台游戏 */
    get isPlat() {
        return this.tableData.activeName === StatisticTab.Plat;
    }
    /**取得游戏列表 */
    get gameOptions() {
        if (this.listQuery.vendor_id == "") {
            return {};
        }
        let list: { [key: number]: string } = {};
        Object.keys(this.tableData.columns.vendor_product_id.options[this.listQuery.vendor_id]).map((key: string) => {
            let options: { [key: number]: string } = {};
            options = this.tableData.columns.vendor_product_id.options[this.listQuery.vendor_id][Number(key)];
            Object.keys(options).map((key: string) => {
                list[Number(key)] = options[Number(key)];
            });
        });
        return list;
    }
    /**取得excel 挡案名称 */
    get getExcelOutputName() {
        let name: string = this.tableData.columns.type.options[this.tableData.activeName] + LangUtil("每日数据");
        if (this.isPlat) {
            return `${name}-${this.platListQuery["created_date-{>=}"]}～${this.platListQuery["created_date-{>=}"]}`;
        } else {
            return `${name}-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{>=}"]}`;
        }
    }
    /**取得当前页签导出栏位顺序 */
    get curKeyList() {
        if (this.isPlat) {
            return this._platKeyList;
        }
        return this._gameKeyList;
    }

    /**导出excel */
    exportExcel(data: any) {
        this.tableData.isExportExcel = false;
        let summary = this.addSummary(data);
        summary = this.resetTabdata(summary);

        summary.map((element: any) => {
            element.win_gold = Number(element.win_gold) > 0 ? `+${element.win_gold}` : element.win_gold;
        });

        new BaseInfo.ExportExcel(
            `${this.getExcelOutputName}`,
            this.fieldSelectionData.exportOption,
            this.tableData.columns,
            summary,
            ["plat_id", "type", "vendor_id", "vendor_type"],
            ["id", "data_belong", "vendor_product_id"]
        );
    }
}
