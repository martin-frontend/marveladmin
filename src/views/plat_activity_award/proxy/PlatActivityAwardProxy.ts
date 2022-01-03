import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_activity_award/setting";
import { MessageBox } from "element-ui";
import IPlatActivityAwardProxy from "./IPlatActivityAwardProxy";

export default class PlatActivityAwardProxy extends AbstractProxy implements IPlatActivityAwardProxy {
    static NAME = "PlatActivityAwardProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_award_table_columns);
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
            plat_id: { name: "", options: {} },
            id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            activity_id: { name: "", options: {} },
            settlement_type: { name: "", options: {} },
            award_type: { name: "", options: {} },
            settlement_time_at: { name: "", options: {} },
            award_status: { name: "", options: {} },
            child_rule_num: { name: "", options: {} },
            activity_name: { name: "", options: {} },
            award_content: { name: "", options: {} },
            award_time_at: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            award_type_map: { name: "", options: {} },
            award_timing_at: { name: "", options: {} },
            award_num: { name: "", options: {} },
            award_yes_num: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            award_num: "",
            award_yes_num: ""
        },
        multipleSelection: []
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        id: "",
        user_id: "",
        activity_id: "",
        settlement_type: "",
        award_type: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        award_status: "",
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
        Object.assign(this.tableData.summary, data.summary);
        console.error(this.tableData.summary);

        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            id: "",
            user_id: "",
            activity_id: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            award_type: "",
            settlement_time_at: "",
            award_status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_activity_award_show, { id: data.id });
        }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_award_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情页 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**派送奖励 */
    onSendAward(data: any) {
        this.sendNotification(HttpType.admin_plat_activity_award_send_by_hand, data)
    }
}
