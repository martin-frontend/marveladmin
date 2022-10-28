import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_users_gold_log/setting";
import { MessageBox } from "element-ui";
import IPlatUsersGoldLogProxy from "./IPlatUsersGoldLogProxy";

export default class PlatUsersGoldLogProxy extends AbstractProxy implements IPlatUsersGoldLogProxy {
    static NAME = "PlatUsersGoldLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_gold_log_table_columns);
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
            plat_id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            type: { name: "", options: {} },
            gold_before: { name: "", options: {} },
            gold: { name: "", options: {} },
            balance: { name: "", options: {} },
            remark: { name: "", options: {} },
            created_at: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
            username: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "created_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        type: "",
        user_id: "",
        nick_name: "",
        page_count: 1,
        page_size: 20,
        coin_name_unique: "",
        username: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
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
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            type: "",
            user_id: "",
            nick_name: "",
            coin_name_unique: "",
            username: "",
        });
    }

    /**查询 */
    onQuery() {
        console.log("coin_name_unique===   ", this.listQuery);

        this.sendNotification(HttpType.admin_plat_users_gold_log_index, objectRemoveNull(this.listQuery));
    }

    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
