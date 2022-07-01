import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_swap_orders/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatSwapOrdersProxy from "./IStatisticPlatSwapOrdersProxy";

export default class StatisticPlatSwapOrdersProxy extends AbstractProxy implements IStatisticPlatSwapOrdersProxy {
    static NAME = "StatisticPlatSwapOrdersProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_swap_orders_table_columns);
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
            coin_a: { name: "交易币种", options: {} },
            coin_a_amount: { name: "交易币种数量", options: {} },
            coin_b: { name: "兑换币种", options: {} },
            coin_b_amount: { name: "兑换币种数量", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_date: { name: "日期", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "编号", options: {} },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对", options: {} },
            swap_coin: { name: "手续费币种", options: {} },
            system_swap_coin_fee: { name: "手续费数量(系统)", options: {} },
            updated_at: { name: "修改时间", options: {} },
            user_swap_coin_fee: { name: "手续费数量(用户)", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_date-{>=}": "",
        "created_date-{<=}": "",
        plat_swap_pair_id: "",
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
            "created_date-{>=}": "",
            "created_date-{<=}": "",
            plat_swap_pair_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_swap_orders_index, objectRemoveNull(this.listQuery));
    }
}
