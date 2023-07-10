import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_agent_keep_days/setting";
import { MessageBox } from "element-ui";
import IStatisticAgentKeepDaysProxy from "./IStatisticAgentKeepDaysProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class StatisticAgentKeepDaysProxy extends AbstractProxy implements IStatisticAgentKeepDaysProxy {
    static NAME = "StatisticAgentKeepDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_agent_keep_days_table_columns);
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
            id: { name: "ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            created_date: { name: "统计日期", options: [] },
            type: { name: "类型", options: {} },
            agent_type: { name: "类型", options: {} },
            plat_id: { name: "平台ID", options: {} },
            user_id: { name: "代理ID", options: [] },
            user_ids: { name: "用户编号集合", options: [] },
            user_all_count: { name: "用户总数", options: [] },
            user_count: { name: "新增", options: [] },
            day_1: { name: "次日", options: [] },
            day_2: { name: "3天", options: [] },
            day_3: { name: "4天", options: [] },
            day_4: { name: "5天", options: [] },
            day_5: { name: "6天", options: [] },
            day_6: { name: "7天", options: [] },
            day_7: { name: "8天", options: [] },
            day_14: { name: "15天", options: [] },
            day_30: { name: "30天", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_at: { name: "修改时间", options: [] },
            username: { name: "代理账号" },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isNeedId: true,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd"),
        "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
        user_id: "", //30001606
        agent_type: "1",
    };

    /**tabs 數據 */
    tabData = {
        activeName: "group",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                if (!this.listQuery.plat_id) {
                    this.listQuery.plat_id = plat_id_options_keys[0];
                    // this.listQuery.user_id = "";
                }
            }
        }
        if (this.listQuery.plat_id && this.listQuery.user_id) {
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isNeedId = false;
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            user_id: "",
        });
    }

    /**查询 */
    onQuery() {
        if (!this.listQuery.user_id) {
            this.tableData.isNeedId = true;
            return;
        }
        this.sendNotification(HttpType.admin_statistic_agent_keep_days_index, objectRemoveNull(this.listQuery));
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
