import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_user_keep_days/setting";
import { MessageBox } from "element-ui";
import IStatisticUserKeepDaysProxy, { StatisticTab } from "./IStatisticUserKeepDaysProxy";
export default class StatisticUserKeepDaysProxy extends AbstractProxy implements IStatisticUserKeepDaysProxy {
    static NAME = "StatisticUserKeepDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_user_keep_days_table_columns);
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
            channel_id: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_date: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            day_1: { name: "", options: {} },
            day_2: { name: "", options: {} },
            day_3: { name: "", options: {} },
            day_4: { name: "", options: {} },
            day_5: { name: "", options: {} },
            day_6: { name: "", options: {} },
            day_7: { name: "", options: {} },
            day_14: { name: "", options: {} },
            day_30: { name: "", options: {} },
            id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            type: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            user_count: { name: "", options: {} },
            user_all_count: { name: "", options: {} },
        },
        list: <any>[],
        summary: <any>{
            user_all_count: 0,
            user_count: 0,
        },
        isExportExcel: false,
        activeName: StatisticTab.User,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        type: this.tableData.activeName,
        channel_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        page_count: 1,
        page_size: 20,
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
        Object.assign(this.tableData.summary, data.summary);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            channel_id: "",
            "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        });
    }
    myExportPagedata = <any>{};
    /**查询 */
    onQuery() {
        this.listQuery.type = this.tableData.activeName;
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        if (obj.coin_name_unique == "-") {
            obj.coin_name_unique = "";
        }
        this.sendNotification(HttpType.admin_statistic_user_keep_days_index, objectRemoveNull(obj));
    }
    onQuery_export(pageInfo: any) {
        this.listQuery.type = this.tableData.activeName;
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        if (obj.coin_name_unique == "-") {
            obj.coin_name_unique = "";
        }
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_statistic_user_keep_days_index, objectRemoveNull(obj));
    }

    /**是否为平台游戏 */
    get isUser() {
        return this.tableData.activeName === StatisticTab.User;
    }
    _userList = [
        "created_date",
        "plat_id",
        "user_count",
        "day_1",
        "day_2",
        "day_3",
        "day_4",
        "day_5",
        "day_6",
        "day_7",
        "day_14",
        "day_30",
    ];
    /**导出excel */
    exportExcel(data: any) {
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
}
