import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity_statistic_ball/setting";
import { MessageBox } from "element-ui";
import IPlatActivityStatisticBallProxy from "./IPlatActivityStatisticBallProxy";

export default class PlatActivityStatisticBallProxy extends AbstractProxy implements IPlatActivityStatisticBallProxy {
    static NAME = "PlatActivityStatisticBallProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_statistic_ball_table_columns);
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
            activity_id: { name: "活动Id", options: {} },
            current_cycle: { name: "期号", options: {} },
            start_time: { name: "开始时间", options: {} },
            end_time: { name: "结束时间", options: {} },
            cycle_status: { name: "状态", options: {} },
            prize_pool_amount: { name: "奖池金额", options: {} },
            activity_name: { name: "活动名称", options: {} },
            coin_unique: { name: "活动币种", options: {} },
            init_user_num: { name: "重置人数", options: {} },
            join_user_num: { name: "参与人数", options: {} },
            total_award: { name: "总赠送奖励", options: {} },

            user_id: { name: "玩家Id", options: {} },
            lottery_code: { name: "中奖号码", options: {} },
            total_cons: { name: "总消耗", options: {} },
            lottery_num: { name: "已抽奖次数", options: {} },
            lottery_award: { name: "抽奖奖励", options: {} },
            rank_award: { name: "排名奖励", options: {} },
            award_rank: { name: "排名", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        activity_id: "",
        "start_time-{<=}": "",
        "end_time-{>=}": "",
    };

    /**表格相关数据 */
    tableData_ball_user = {
        columns: {
            id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            user_id: { name: "玩家Id", options: {} },
            lottery_code: { name: "中奖号码", options: {} },
            total_cons: { name: "总消耗", options: {} },
            lottery_num: { name: "已抽奖次数", options: {} },
            lottery_award: { name: "抽奖奖励", options: {} },
            rank_award: { name: "排名奖励", options: {} },
            award_rank: { name: "排名", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false,
    };
    /**查询条件 */
    listQuery_ball_user = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        activity_id: "",
        current_cycle: "",
        user_id: "",
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
    /**设置表头数据 */
    setTableColumns_ball_user(data: any) {
        Object.assign(this.tableData_ball_user.columns, data);
        Object.assign(this.tableData.columns, data);
        this.onQuery_ball_user();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**表格数据 */
    setTableData_ball_user(data: any) {
        this.tableData_ball_user.list.length = 0;
        this.tableData_ball_user.list.push(...data.list);
        Object.assign(this.tableData_ball_user.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            activity_id: "",
            "start_time-{<=}": "",
            "end_time-{>=}": "",
        });
    }

    /**重置查询条件 */
    resetListQuery_ball_user() {
        Object.assign(this.listQuery_ball_user, {
            user_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.resetListQuery_ball_user();
        this.admin_plat_activity_statistic_ball_user_table_columns();

        this.listQuery_ball_user.plat_id = data.plat_id + "";
        this.listQuery_ball_user.activity_id = data.activity_id;
        this.listQuery_ball_user.current_cycle = data.current_cycle;
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        // console.warn("请求的数据22222",this.listQuery_ball_user);
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            // this.sendNotification(HttpType.undefined, { id: data.id });
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
        this.sendNotification(HttpType.admin_plat_activity_statistic_ball_index, objectRemoveNull(this.listQuery));
    }
    /**查询 */
    onQuery_ball_user() {
        // console.warn("请求的数据",this.listQuery_ball_user);
        this.sendNotification(
            HttpType.admin_plat_activity_statistic_ball_user_index,
            objectRemoveNull(this.listQuery_ball_user)
        );
    }
    admin_plat_activity_statistic_ball_user_table_columns() {
        this.sendNotification(HttpType.admin_plat_activity_statistic_ball_user_table_columns);
    }
    /**添加数据 */
    onAdd() {}
    /**更新数据 */
    onUpdate() {}
    /**删除数据 */
    onDelete(id: any) {}
    _userList = [
        "plat_id",
        "activity_id",
        "activity_name",
        "current_cycle",
        "start_time",
        "end_time",
        "coin_unique",
        "prize_pool_amount",
        "join_user_num",
        "init_user_num",
        "total_cons",
        "total_award",
        "cycle_status",
    ];
    _userList_ball_user = [
        "plat_id",
        "activity_id",
        "user_id",
        "lottery_num",
        "lottery_code",
        "total_cons",
        "lottery_award",
        "rank_award",
        "award_rank",
    ];
    onQuery_export_ball_user(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery_ball_user));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_plat_activity_statistic_ball_user_index, objectRemoveNull(obj));
    }

    onQuery_export(pageInfo: any) {
        const obj = JSON.parse(JSON.stringify(this.listQuery));
        obj.page_count = pageInfo.pageCount;
        obj.page_size = pageInfo.page_size;
        this.sendNotification(HttpType.admin_plat_activity_statistic_ball_index, objectRemoveNull(obj));
    }
    myExportPagedata = <any>{};
    /**导出excel */
    exportExcel(data: any) {
        // if (data && data.list) {
        //     data.list = this.resetTabdata(data.list);
        // }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
    /**导出excel */
    exportExcel_ball_user(data: any) {
        // if (data && data.list) {
        //     data.list = this.resetTabdata(data.list);
        // }
        this.myExportPagedata = JSON.parse(JSON.stringify(data));
    }
}
