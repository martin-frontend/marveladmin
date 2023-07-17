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
            channel_id: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            award_num: "",
            award_yes_num: "",
        },
        multipleSelection: [],
        isExportExcel: false,
        // cur_summary: <any>[], //总计值
        cur_summary: {
            award_num: <any>[],
            award_yes_num: <any>[],
        },
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
        channel_id: "",
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
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**设置总计的值 */
    setSumData(data: any) {
        this.tableData.cur_summary = <any>[];
        this.tableData.cur_summary.award_num = <any>[];
        {
            const award_num = data.award_num;
            const keys = Object.keys(award_num);
            for (let index = 0; index < keys.length; index++) {
                const item = {
                    coin_name_unique: keys[index],
                    value: award_num[keys[index]],
                };
                this.tableData.cur_summary.award_num.push(item);
            }
        }
        this.tableData.cur_summary.award_yes_num = <any>[];
        {
            const award_num = data.award_yes_num;
            const keys = Object.keys(award_num);
            for (let index = 0; index < keys.length; index++) {
                const item = {
                    coin_name_unique: keys[index],
                    value: award_num[keys[index]],
                };
                this.tableData.cur_summary.award_yes_num.push(item);
            }
        }
        console.log("总计数据", this.tableData.cur_summary);
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.summary, data.summary);
        this.setSumData(data.summary);
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
            channel_id: "",
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
    onQuery_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_plat_activity_award_index, objectRemoveNull(obj));
    }
    /**打开用户详情页 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**派送奖励 */
    onSendAward(data: any) {
        this.sendNotification(HttpType.admin_plat_activity_award_send_by_hand, data);
    }

    /**取消派獎 */
    onCancelAward(data: any) {
        this.sendNotification(HttpType.admin_plat_activity_award_cancel, data);
    }

    resetTabdata(data: any) {
        const award_num = data.summary.award_num;
        const award_yes_num = data.summary.award_yes_num;

        {
            const list = <any>[];
            const keys = Object.keys(award_yes_num);
            for (let index = 0; index < keys.length; index++) {
                const item = {
                    user_id: this.tableData.columns.award_yes_num.name,
                    activity_id: 0,
                    child_rule_num: keys[index],
                    activity_name: award_num[keys[index]] + "",
                };
                list.push(item);
            }
            data.list.unshift(...list);
        }

        {
            const list = <any>[];
            const keys = Object.keys(award_num);
            for (let index = 0; index < keys.length; index++) {
                const item = {
                    user_id: this.tableData.columns.award_num.name,
                    activity_id: 0,
                    child_rule_num: keys[index],
                    activity_name: award_num[keys[index]] + "",
                };
                list.push(item);
            }
            data.list.unshift(...list);
        }
    }
    _userList = [
        "id",
        "user_id",
        "activity_id",
        "child_rule_num",
        "activity_name",
        "award_content",
        "settlement_type",
        "settlement_time_at",
        "award_type",
        "award_timing_at",
        "award_status",
        "plat_id",
        "channel_id"
    ];
    myExportPagedata = <any>{};
    /**导出excel */
    exportExcel(data: any) {
        if (data && data.list) {
            this.resetTabdata(data);
        }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
}
