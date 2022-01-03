import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_agent_bonus/setting";
import { MessageBox } from "element-ui";
import IPlatAgentBonusProxy from "./IPlatAgentBonusProxy";

export default class PlatAgentBonusProxy extends AbstractProxy implements IPlatAgentBonusProxy {
    static NAME = "PlatAgentBonusProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_bonus_table_columns);
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
            agent_bonus_rate: { name: "", options: {} },
            bonus_awaiting_num: { name: "", options: {} },
            bonus_received_num: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            end_time: { name: "", options: {} },
            group_profit: { name: "", options: {} },
            id: { name: "", options: {} },
            plat_cost: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            receive_status: { name: "", options: {} },
            settlement_at: { name: "", options: {} },
            settlement_status: { name: "", options: {} },
            start_time: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            user_id: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bonus_awaiting_num: "",
            bonus_received_num: "",
            group_profit: "",
            plat_cost: "",
        }
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        "start_time-{<=}": "",
        "end_time-{>=}": "",
        user_id: "",
        settlement_status: "",
        receive_status: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null
            // TODO
        },
        formSource: null, // 表单的原始数据
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
        Object.assign(this.tableData.summary, data.summary);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_agent_bonus_index, objectRemoveNull(this.listQuery));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "start_time-{>=}": "",
            "end_time-{<=}": "",
            user_id: "",
            settlement_status: "",
            receive_status: "",
            page_count: 1,
            page_size: 20,
        });
    }

}
