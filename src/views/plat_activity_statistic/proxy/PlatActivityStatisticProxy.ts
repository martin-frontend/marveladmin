import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity_statistic/setting";
import { MessageBox } from "element-ui";
import IPlatActivityStatisticProxy from "./IPlatActivityStatisticProxy";
import LangUtil from "@/core/global/LangUtil";
import { BaseInfo } from "@/components/vo/commonVo";
type ExportType = "platAcititvyStatistic" | "platAcititvyStatisticUser";
export default class PlatActivityStatisticProxy extends AbstractProxy implements IPlatActivityStatisticProxy {
    static NAME = "PlatActivityStatisticProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_statistic_table_columns);
        this.sendNotification(HttpType.admin_plat_activity_statistic_user_table_columns);
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
    activityStatisticColumns = {
        plat_id: { name: "平台id", options: {} },
        channel_id: { name: "渠道id", options: [] },
        activity_id: { name: "活动ID", options: [] },
        data_belong: { name: "数据归属标记", options: [] },
        created_date: { name: "统计日期", options: [] },
        join_num: { name: "参与人数", options: [] },
        award_amount: { name: "奖励总额", options: [] },
        receive_award_amount: { name: "领取奖励总额", options: [] },
        receive_award_num: { name: "领取奖励人数", options: [] },
        created_at: { name: "创建时间", options: [] },
        updated_at: { name: "更新时间", options: [] },
    };
    activityStatisticUserColumns = {
        user_id: { name: "玩家ID", options: [] },
        receive_award_amount: { name: "实际领取奖励", options: [] },
        plat_id: { name: "所属平台", options: {} },
    };
    /**表格相关数据 */
    tableData = {
        columns: <any>{ ...this.activityStatisticUserColumns, ...this.activityStatisticColumns },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        activity_id: "",
        "created_date-{>=}": "",
        "created_date-{<=}": "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        formSource: null, // 表单的原始数据
        query: {
            page_count: 1,
            page_size: 20,
            user_id: "",
            activity_id: "",
            plat_id: "",
            channel_id: "",
        },
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

    setUserTableColumns(data: any) {
        delete data.plat_id;
        Object.assign(this.tableData.columns, data);
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    setUserTableData(data: any) {
        this.dialogData.list.length = 0;
        this.dialogData.list.push(...data.list);
        Object.assign(this.dialogData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            channel_id: "",
            activity_id: "",
            "created_date-{>=}": "",
            "created_date-{<=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(data: any) {
        const { activity_id, plat_id, channel_id, created_date } = data;
        Object.assign(this.dialogData.query, {
            created_date,
            activity_id,
            plat_id,
            channel_id,
            user_id: "",
        });
        this.dialogData.bShow = true;
        this.onUserQuery();
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
        this.sendNotification(HttpType.admin_plat_activity_statistic_index, objectRemoveNull(this.listQuery));
    }

    onUserQuery() {
        this.sendNotification(
            HttpType.admin_plat_activity_statistic_user_index,
            objectRemoveNull(this.dialogData.query)
        );
    }
    /**添加数据 */
    onAdd() {
        // const formCopy: any = {
        //     // TODO
        // };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        // const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // // 删除多余无法去除的参数
        // // TODO
        // // 如果没有修改，就直接关闭弹窗
        // if (Object.keys(formCopy).length == 0) {
        //     this.dialogData.bShow = false;
        //     return;
        // }
        // // 添加必填参数
        // // TODO
        // // 发送消息
        // this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        // MessageBox.confirm("您是否删除该记录", "提示", {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     type: "warning",
        // })
        //     .then(() => {
        //         this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
        //     })
        //     .catch(() => {});
    }

    platAcititvyStatisticFieldOptions = [
        "created_date",
        "plat_id",
        "channel_id",
        "activity_id",
        "join_num",
        "award_amount",
        "receive_award_amount",
        "receive_award_num",
    ];

    platAcititvyStatisticUserFieldOptions = ["plat_id", "user_id", "receive_award_amount"];

    fieldSelectionData = {
        bShow: false,
        fieldOptions: <any>[],
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        type: <ExportType>"platAcititvyStatistic",
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = this.exportData.type == "platAcititvyStatistic" ? LangUtil("活动统计") : LangUtil("参与玩家");
        name += `-${plat_name}`;
        if (this.listQuery["created_date-{>=}"] && this.listQuery["created_date-{<=}"] != "") {
            name += `-${this.listQuery["created_date-{>=}"]}～${this.listQuery["created_date-{<=}"]}`;
        }
        return name;
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        if (this.exportData.type == "platAcititvyStatistic") {
            queryCopy = JSON.parse(JSON.stringify(this.listQuery));
            const { pageSize, pageCurrent } = this.exportData.pageInfo;
            queryCopy.page_size = pageSize;
            queryCopy.page_count = Number(pageCurrent) + 1;
            queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
            this.sendNotification(HttpType.admin_plat_activity_statistic_index, objectRemoveNull(queryCopy));
        } else {
            const { pageSize, pageCurrent } = this.exportData.pageInfo;
            queryCopy = JSON.parse(JSON.stringify(this.dialogData.query));
            queryCopy.page_size = pageSize;
            queryCopy.page_count = Number(pageCurrent) + 1;
            queryCopy.plat_id = this.dialogData.query.plat_id === "0" ? "" : queryCopy.plat_id;
            this.sendNotification(HttpType.admin_plat_activity_statistic_user_index, objectRemoveNull(queryCopy));
        }
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));

        const exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            // this.curKeyList,
            exportField,
            this.tableData.columns,
            // summary,
            newData,
            ["plat_id"],
            []
        );
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog(type: ExportType) {
        this.exportData.type = type;
        this.fieldSelectionData.fieldOptions =
            type == "platAcititvyStatistic"
                ? [...this.platAcititvyStatisticFieldOptions]
                : [...this.platAcititvyStatisticUserFieldOptions];
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
        this.fieldSelectionData.bShow = true;
    }
}
