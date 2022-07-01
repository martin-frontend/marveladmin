import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_swap_price/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatSwapPriceProxy from "./IStatisticPlatSwapPriceProxy";

export default class StatisticPlatSwapPriceProxy extends AbstractProxy implements IStatisticPlatSwapPriceProxy {
    static NAME = "StatisticPlatSwapPriceProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_swap_price_table_columns);
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
            coin_a_amount: { name: "币种A成交量", options: {} },
            coin_a_b: { name: "交易对" },
            coin_a_b_price: { name: "价格", options: {} },
            coin_b_a: { name: "交易对" },
            coin_b_a_price: { name: "价格", options: {} },
            coin_b_amount: { name: "币种B成交量", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_time: { name: "时间", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            day: { name: "时间-日", options: {} },
            hour: { name: "时间-时", options: {} },
            id: { name: "编号", options: {} },
            month: { name: "时间-月", options: {} },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对", options: {} },
            updated_at: { name: "修改时间", options: {} },
            year: { name: "时间-年", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_time-{>=}": "",
        "created_time-{<=}": "",
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
            "created_time-{>=}": "",
            "created_time-{<=}": "",
            plat_swap_pair_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_swap_price_index, objectRemoveNull(this.listQuery));
    }
}
