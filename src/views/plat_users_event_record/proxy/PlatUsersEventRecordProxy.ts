import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_event_record/setting";
import { MessageBox } from "element-ui";
import IPlatUsersEventRecordProxy from "./IPlatUsersEventRecordProxy";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import { BaseInfo } from "@/components/vo/commonVo";

export default class PlatUsersEventRecordProxy extends AbstractProxy implements IPlatUsersEventRecordProxy {
    static NAME = "PlatUsersEventRecordProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_event_record_table_columns);
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
            // TODO
            bet_id: { name: "", options: {} },
            plat_id: { name: "所属平台", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            coin_name_unique: { name: '币种' },
            user_id: { name: "所属玩家ID", options: {} },
            username: { name: "所属玩家帐号", options: {} },
            event_type: { name: "事件类型", options: {} },
            event_status: { name: "是否发送给三方", options: {} },
            event_time: { name: "时间", options: {} },
            created_by: { name: "创建人", options: {} },
            created_at: { name: "创建时间", options: {} },
            gold: { name: '金额' },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        user_id: "",
        event_type: "",
        "event_time-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
        "event_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "plat_id",
            "channel_id",
            "user_id",
            "username",
            "event_type",
            "coin_name_unique",
            "gold",
            "event_time",
            "event_status"
        ],
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
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
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.channel_id_options = this.tableData.columns.channel_id.options[
                    this.listQuery.plat_id
                ];
                const channel_id_keys = Object.keys(this.tableData.columns.channel_id_options);
                channel_id_keys.forEach((key: any) => {
                    this.tableData.columns.channel_id_options[key] = key;
                });
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
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
            // TODO
            channel_id: "",
            user_id: "",
            event_type: "",
            "event_time-{>=}": dateFormat(getTodayOffset(0), "yyyy-MM-dd hh:mm:ss"),
            "event_time-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) { }

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
        this.sendNotification(HttpType.admin_plat_users_event_record_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() { }

    /**更新数据 */
    onUpdate() { }

    /**删除数据 */
    onDelete(id: any) { }


    /**取得excel 挡案名称 */
    getExcelOutputName() {
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil("事件统计")}-${plat_name}`;
        return name;
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        this.sendNotification(HttpType.admin_plat_users_event_record_index, objectRemoveNull(queryCopy));
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
        this.exportData.isExportExcel = true;
        const newData = JSON.parse(JSON.stringify(this.exportData.list));

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item)
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id", "event_type", "event_status"],
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

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }
}
