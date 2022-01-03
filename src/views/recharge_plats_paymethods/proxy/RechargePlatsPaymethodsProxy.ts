import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/recharge_plats_paymethods/setting";
import { MessageBox } from "element-ui";
import IRechargePlatsPaymethodsProxy from "./IRechargePlatsPaymethodsProxy";

export default class RechargePlatsPaymethodsProxy extends AbstractProxy implements IRechargePlatsPaymethodsProxy {
    static NAME = "RechargePlatsPaymethodsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_recharge_plats_paymethods_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            gift_rate: { name: "", options: {}, tips: "" },
            id: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            paymethod_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            sort: { name: "", options: {} },
            status: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            fee_rate: { name: "", options: {} },
        },
        list: <any>[],
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
    };

    /**更新列表資料 */
    listDate = {
        status: "",
        id: "",
        gift_rate: 0,
        fee_rate: 0,
    };
    /**排序列表資料 */
    sortableDate = {
        sortable: false,
        obj: {
            id: "",
            next_id: "",
            opt: 11,
        },
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
        this.tableData.list = [];
        this.tableData.list = data;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_recharge_plats_paymethods_index, objectRemoveNull(this.listQuery));
    }

    /**更新数据 */
    onUpdate(sortable?: any) {
        let data: any = sortable ? Object.assign({}, this.sortableDate.obj) : Object.assign({}, this.listDate);
        this.sendNotification(HttpType.admin_recharge_plats_paymethods_update, objectRemoveNull(data));
    }
}
