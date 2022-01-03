import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_message/setting";
import { MessageBox } from "element-ui";
import IPlatMessageProxy from "./IPlatMessageProxy";

export default class PlatMessageProxy extends AbstractProxy implements IPlatMessageProxy {
    static NAME = "PlatMessageProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_message_table_columns);
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
            type: { name: "", options: {} },
            content: { name: "", options: {} },
            operator: { name: "", options: {} },
            is_read: { name: "", options: {} },
            created_at: { name: "", options: {} }
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        type: "",
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
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            type: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_message_index, objectRemoveNull(this.listQuery));
    }
}
