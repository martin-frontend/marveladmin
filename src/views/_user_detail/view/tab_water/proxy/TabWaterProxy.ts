import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabWaterProxy from "./ITabWaterProxy";

export default class TabWaterProxy extends AbstractProxy implements ITabWaterProxy {
    static NAME = "TabWaterProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_user_days_table_columns);
        this.listQuery.user_id = getPageSetting().user_id;
    }

    /**离开页面时调用 */
    leave() {

    }

    /**表格相关数据 */
    tableData = {
        columns: {
            created_date: { name: "", options: {} },
            total_bet: { name: "", options: {} },
            bet_2: { name: "", options: {} },
            bet_4: { name: "", options: {} },
            bet_8: { name: "", options: {} },
            bet_16: { name: "", options: {} },
            bet_32: { name: "", options: {} },
            bet_64: { name: "", options: {} },
            bet_128: { name: "", options: {} },
            total_water: { name: "", options: {} },
            water_2: { name: "", options: {} },
            water_4: { name: "", options: {} },
            water_8: { name: "", options: {} },
            water_16: { name: "", options: {} },
            water_32: { name: "", options: {} },
            water_64: { name: "", options: {} },
            water_128: { name: "", options: {} },
            total_win_loss: { name: "", options: {} },
            win_loss_2: { name: "", options: {} },
            win_loss_4: { name: "", options: {} },
            win_loss_8: { name: "", options: {} },
            win_loss_16: { name: "", options: {} },
            win_loss_32: { name: "", options: {} },
            win_loss_64: { name: "", options: {} },
            win_loss_128: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
    };

    /**查询条件 */
    listQuery = {
        user_id: 0,
        "created_date-{>=}": dateFormat(getTodayOffset(-10, 1), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        page_count: 1,
        page_size: 10
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**重置查询数据 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_date-{>=}": dateFormat(getTodayOffset(-10, 1), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        });
    }
    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_user_days_index, objectRemoveNull(this.listQuery));
    }
}
