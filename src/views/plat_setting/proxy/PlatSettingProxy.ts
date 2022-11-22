import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_setting/setting";
import { MessageBox } from "element-ui";
import IPlatSettingProxy from "./IPlatSettingProxy";
import i18n from "@/lang";

export default class PlatSettingProxy extends AbstractProxy implements IPlatSettingProxy {
    static NAME = "PlatSettingProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_setting_table_columns);
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
            plat_id: { name: LangUtil("平台"), options: {} },
            vendor_type: {
                name: "",
                options: {
                    2: "",
                    4: "",
                    8: "",
                    16: "",
                    32: "",
                    64: "",
                    128: "",
                },
                options_rate: [],
                options_type: [],
            },
            water_config: { name: "", tips: "" },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
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
        this.tableData.list.push(data.water_config);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_setting_show, objectRemoveNull(this.listQuery));
    }
}
