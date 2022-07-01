import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_swap_orders/setting";
import { MessageBox } from "element-ui";
import IPlatSwapOrdersProxy from "./IPlatSwapOrdersProxy";

export default class PlatSwapOrdersProxy extends AbstractProxy implements IPlatSwapOrdersProxy {
    static NAME = "PlatSwapOrdersProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_swap_orders_table_columns);
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
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "编号", options: {} },
            min_coin_b_amount: { name: "币种B最小获取数量", options: {} },
            nick_name: { name: "昵称" },
            order_no: { name: "交易ID", options: {} },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对", options: {} },
            remark: { name: "备注", options: {} },
            swap_coin: { name: "手续费币种", options: {} },
            swap_coin_fee: { name: "手续费数量", options: {} },
            tolerance: { name: "容差", options: {} },
            trade_status: { name: "交易状态", options: {} },
            trade_time: { name: "交易时间", options: {} },
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

        "trade_time-{>=}": "",
        "trade_time-{<=}": "",
        user_id: "",
        plat_swap_pair_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
        },
        formSource: null, // 表单的原始数据
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
            page_count: 1,
            page_size: 20,
            plat_id: "",
            user_id: "",
            plat_swap_pair_id: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_swap_orders_index, objectRemoveNull(this.listQuery));
    }
}
