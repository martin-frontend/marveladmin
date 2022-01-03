import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabGoldProxy from "./ITabGoldProxy";

export default class TabGoldProxy extends AbstractProxy implements ITabGoldProxy {
    static NAME = "TabGoldProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_gold_log_table_columns);
        this.listQuery.user_id = getPageSetting().user_id;
    }

    /**离开页面时调用 */
    leave() {

    }

    /**表格相关数据 */
    tableData = {
        columns: {
            id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            type: { name: "", options: {} },
            gold_before: { name: "", options: {} },
            gold: { name: "", options: {} },
            balance: { name: "", options: {} },
            remark: { name: "", options: {} },
            created_at: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
    }
    /**查詢数据 */
    listQuery = {
        "created_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        type: "",
        user_id: 0,
        page_count: 1,
        page_size: 10,
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /**設置表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**重置查询 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            type: "",
        })
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_gold_log_index, objectRemoveNull(this.listQuery));
    }
}
