import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_swap_liquidity_log/setting";
import { MessageBox } from "element-ui";
import IPlatSwapLiquidityLogProxy from "./IPlatSwapLiquidityLogProxy";

export default class PlatSwapLiquidityLogProxy extends AbstractProxy implements IPlatSwapLiquidityLogProxy {
    static NAME = "PlatSwapLiquidityLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_swap_liquidity_log_table_columns);
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
            coin_a_amount: { name: "币种A数量", options: {} },
            coin_b_amount: { name: "币种B数量", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "编号", options: {} },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对编号", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_id: { name: "用户ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
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
            "created_at-{>=}": "",
            "created_at-{<=}": "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_swap_liquidity_log_index, objectRemoveNull(this.listQuery));
    }
}
