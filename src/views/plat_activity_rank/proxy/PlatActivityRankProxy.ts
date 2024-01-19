import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity_rank/setting";
import { MessageBox } from "element-ui";
import IPlatActivityRankProxy from "./IPlatActivityRankProxy";

export default class PlatActivityRankProxy extends AbstractProxy implements IPlatActivityRankProxy {
    static NAME = "PlatActivityRankProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_rank_list_table_columns);
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
        columns: <any>{
            activity_name: { name: '活动名称', options: {} },
            created_at: { name: '创建时间', options: {} },
            created_by: { name: '创建人', options: {} },
            end_status: { name: '结束状态', options: {} },
            end_time: { name: '结束时间' },
            extend_status: { name: '历史排行', options: {} },
            id: { name: '活动ID', options: {} },
            model_type: { name: '模型类型', options: {} },
            num: { name: '排行榜人数', options: {} },
            plat_id: { name: '所属平台', options: {} },
            process_status: { name: '流程状态', options: {} },
            rank_type: { name: '排行榜类型', options: {} },
            start_time: { name: '开始时间' },
            updated_at: { name: '更新时间', options: {} },
            updated_by: { name: '更新人', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    userTable = {
        columns: <any>{
            award_status: { name: '派奖状态', options: {} },
            nick_name: { name: '用户昵称' },
            process_status: { name: '流程状态', options: {} },
            rank: { name: '排名' },
            rank_award: { name: '排名奖励' },
            reach_data: { name: '排行数据' },
            reach_num: { name: '达成数量' },
            user_id: { name: '用户ID' },
            username: { name: '用户账号' },
        },
        list: <any>[],
        activity: { rank_type: 1 },
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        process_status: "",
        "start_time-{<=}": "",
        "end_time-{>=}": "",
    };

    listUserQuery = {
        page_count: 1,
        page_size: 20,
        activity_id: "",
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
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }

    /**设置表头数据 */
    setUserTableColumns(data: any) {
        Object.assign(this.userTable.columns, data);
        this.onQueryUser();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    setUserTableData(data: any) {
        this.userTable.list.length = 0;
        this.userTable.list.push(...data.list);
        Object.assign(this.userTable.activity, data.activity);
        Object.assign(this.userTable.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            process_status: "",
            "start_time-{<=}": "",
            "end_time-{>=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            // this.dialogData.formSource = data;
            // Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_activity_rank_list_user_table_columns);
            this.listUserQuery.activity_id = data.id;
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_rank_list_index, objectRemoveNull(this.listQuery));
    }

    onQueryUser() {
        this.sendNotification(HttpType.admin_plat_activity_rank_list_user_index, objectRemoveNull(this.listUserQuery));
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        // TODO
        // 发送消息
        this.sendNotification(HttpType.admin_plat_activity_rank_list_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) { }

    onUpdateStatus(id: any, status: any) {
        this.sendNotification(HttpType.admin_plat_activity_rank_list_update, {
            id: id,
            extend_status: status,
        });
    }
}
