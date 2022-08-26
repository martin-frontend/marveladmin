import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plats_wallet_log/setting";
import { MessageBox } from "element-ui";
import IPlatsWalletLogProxy from "./IPlatsWalletLogProxy";
import i18n from "@/lang";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";

export default class PlatsWalletLogProxy extends AbstractProxy implements IPlatsWalletLogProxy {
    static NAME = "PlatsWalletLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_wallet_log_table_columns);
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
            admin_username: {name: "账户名称", options: []},
            amount: {name: "资产变化的值", options: []},
            amount_before: {name: "资产变化前的值", options: []},
            balance: {name: "账户余额", options: []},
            coin_name_unique: {name: "币种", options: {}},
            created_at: {name: "创建时间", options: []},
            created_by: {name: "创建人", options: []},
            data_belong: {name: "数据归属标记", options: []},
            id: {name: "编号", options: []},
            plat_id: {name: "平台ID", options: {}},
            relation_ids: {name: "关联记录IDS", options: []},
            remark: {name: "备注"},
            type: {name: "资产变化类型",options: []},
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        coin_name_unique: "",
        id: "",
        admin_username: "",
        type: "",
        "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    get defaultDate() {
        let d1 = new Date();
        d1.setTime(d1.getTime() - 24 * 60 * 60 * 1000);
        return d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns["plat_id"].options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
    }

    /**查询 */
    onQuery() {
        this.facade.sendNotification(HttpType.admin_plats_wallet_log_index, objectRemoveNull(this.listQuery));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            coin_name_unique: "",
            id: "",
            admin_username: "",
            "created_at-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
            "created_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        });
    }
}
