import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/admin_cron/setting";
import { MessageBox } from "element-ui";
import IAdminCronProxy from "./IAdminCronProxy";
import i18n from "@/lang";
export default class AdminCronProxy extends AbstractProxy implements IAdminCronProxy {
    static NAME = "AdminCronProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_admin_cron_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.cronTableData.list = [];
        Object.assign(this.cronTableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
        this.cronQueueTableData.list = [];
        Object.assign(this.cronQueueTableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    /**定时任务 表格相关数据 */
    cronTableData = {
        columns: {
            // TODO
            chatInfo: { name: "telegram群组信息", options: {} },
            content: { name: "任务内容", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            desc: { name: "任务描述", options: {} },
            frequency: { name: "任务频率", options: {} },
            id: { name: "ID", options: {} },
            is_message: { name: "失败是否通知", options: {} },
            is_ordered_exec: { name: "是否有序执行", options: {} },
            name: { name: "任务名称", options: {} },
            status: { name: "是否开启", options: {} },
            timeout: { name: "超时时间", options: {} },
            next_run_date: { name: "预计执行时间", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**运行日志 表格相关数据 */
    cronQueueTableData = {
        columns: {
            created_at: { name: "创建时间", options: {} },
            cron_id: { name: "任务名称", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "ID", options: {} },
            is_ordered_exec: { name: "是否有序执行", options: {} },
            next_run_date: { name: "预计执行时间", options: {} },
            result: { name: "运行结果", options: {} },
            runtime: { name: "运行时长(秒)", options: {} },
            run_times: {name: "执行次数", options: {}},
            status: { name: "运行状态", options: {} },
            timeout: { name: "超时时长(秒)", options: {} },
            unique: { name: "唯一标记", options: {} },
            unique_log_id: { name: "运行LOG日志标记", options: {} },
            updated_at: { name: "更新时间", options: {} },
            worker_id: { name: "运行work_id", options: {} },
            num_rows: { name: "执行数量", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**定时任务 查询条件 */
    cronListQuery = {
        page_count: 1,
        page_size: 20,
        name: "",
        status: "",
        type: "",
    };

    /**运行日志 查询条件 */
    cronQueueListQuery = {
        page_count: 1,
        page_size: 20,
        cron_id: "",
        unique: "",
        unique_log_id: "",
        status: "",
        "next_run_date-{>=}": "",
        "next_run_date-{<=}": "",
    };

    /**table 操作数据*/
    cronTableSwitch = <any>{
        id: "",
        state: "",
        is_ordered_exec: "",
    };

    /**定时任务 弹窗相关数据 */
    cronDialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            frequency: "",
            name: "",
            content: "",
            timeout: "",
            desc: "",
            is_ordered_exec: "0",
            status: "0",
        },
        formSource: null, // 表单的原始数据
    };

    /**运行日志 批次数据 */
    cronQueueBatchDialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            cron_id: "",
            num_rows: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**运行日志 查看数据 */
    cronQueuePreviewDialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            worker_id: "",
            cron_id: "",
            unique: "",
            runtime: "",
            timeout: "",
            status: "",
            result: "",
            created_at: "",
            updated_at: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**cron:定时任务, cron_queue:运行日志*/
    tabsStatus = "cron";

    /**定时任务 设置表头数据 */
    setCronTableColumns(data: any) {
        Object.assign(this.cronTableData.columns, data);
        this.cronTableData.columns.status.options = Object.assign({}, this.cronTableData.columns.status.options);
        this.onQueryCron();
    }
    /**运行日志 设置表头数据 */
    setCronQueueCronTableColumns(data: any) {
        Object.assign(this.cronQueueTableData.columns, data);
        this.cronQueueTableData.columns.status.options = Object.assign(
            {},
            this.cronQueueTableData.columns.status.options
        );
        this.onQueryCronQueue();
    }

    /**定时任务 表格数据 */
    setCronTableData(data: any) {
        this.cronTableData.list.length = 0;
        this.cronTableData.list.push(...data.list);
        Object.assign(this.cronTableData.pageInfo, data.pageInfo);
    }
    /**运行日志 表格数据 */
    setCronQueueTableData(data: any) {
        this.cronQueueTableData.list.length = 0;
        this.cronQueueTableData.list.push(...data.list);
        Object.assign(this.cronQueueTableData.pageInfo, data.pageInfo);
    }

    /**定时任务 重置查询条件 */
    resetCronListQuery() {
        Object.assign(this.cronListQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            name: "",
            status: "",
            type: ""
        });
    }
    /**运行日志 重置查询数据 */
    resetCronQueueListQuery() {
        Object.assign(this.cronQueueListQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            cron_id: "",
            unique: "",
            unique_log_id: "",
            status: "",
            "next_run_date-{>=}": "",
            "next_run_date-{<=}": "",
        });
    }

    /**重置table 操作数据 */
    restCronTableSwitch() {
        this.cronTableSwitch = {
            id: "",
            state: "",
            is_ordered_exec: "",
        };
    }

    /**定时任务 显示弹窗 */
    showDialogCron(status: string, data?: any) {
        this.cronDialogData.bShow = true;
        this.cronDialogData.status = status;
        if (status == DialogStatus.update) {
            this.cronDialogData.formSource = data;
            Object.assign(this.cronDialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetDialogForm();
            this.cronDialogData.formSource = null;
        }
    }

    /**运行日志 批次 */
    showDialogCronQueueBatch(status: string, data?: any) {
        this.cronQueueBatchDialogData.bShow = true;
        this.resetDialogForm();
    }

    /**运行日志 查看 */
    showDialogCronQueuePreview(data: any) {
        this.cronQueuePreviewDialogData.bShow = true;
        Object.assign(this.cronQueuePreviewDialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.cronDialogData.bShow = false;
        this.cronQueueBatchDialogData.bShow = false;
        this.cronQueuePreviewDialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.cronDialogData.form, {
            // TODO
            id: null,
            frequency: "",
            name: "",
            content: "",
            timeout: "",
            desc: "",
            is_ordered_exec: 1,
            status: 1,
        });
        Object.assign(this.cronQueueBatchDialogData.form, {
            // TODO
            id: null,
            cron_id: "",
            num_rows: "",
        });
        Object.assign(this.cronQueuePreviewDialogData.form, {
            // TODO
            id: null,
            worker_id: "",
            cron_id: "",
            unique: "",
            runtime: "",
            timeout: "",
            status: "",
            result: "",
            created_at: "",
            updated_at: "",
        });
    }

    /**定时任务 查询 */
    onQueryCron() {
        this.sendNotification(HttpType.admin_admin_cron_index, objectRemoveNull(this.cronListQuery));
    }
    /**运行日志 查询 */
    onQueryCronQueue() {
        this.sendNotification(HttpType.admin_admin_cron_queue_index, objectRemoveNull(this.cronQueueListQuery));
    }

    /**定时任务 添加数据 */
    onAdd() {
        const { frequency, name, content, timeout, desc, is_ordered_exec, status } = this.cronDialogData.form;
        const formCopy: any = {
            // TODO
            frequency,
            name,
            content,
            timeout,
            desc,
            is_ordered_exec,
            status,
        };
        this.sendNotification(HttpType.admin_admin_cron_store, objectRemoveNull(formCopy));
    }

    /**定时任务 更新数据 */
    onCronUpdate(fromTable = false) {
        let formCopy: any = {};
        if (fromTable) {
            formCopy = JSON.parse(JSON.stringify(objectRemoveNull(this.cronTableSwitch)));
            this.restCronTableSwitch();
        } else {
            // 删除多余无法去除的参数
            formCopy = formCompared(this.cronDialogData.form, this.cronDialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(formCopy).length == 0) {
                this.cronDialogData.bShow = false;
                return false;
            }
            // 添加必填参数
            formCopy.id = this.cronDialogData.form.id;
        }
        // 发送消息
        this.sendNotification(HttpType.admin_admin_cron_update, formCopy);
    }

    /**运行日志 更新数据 */
    onCronQueueUpdate(fromTable = false) {
        let formCopy: any = {};
        if (fromTable) {
            formCopy = JSON.parse(JSON.stringify(objectRemoveNull(this.cronTableSwitch)));
            this.restCronTableSwitch();
        } else {
            // 删除多余无法去除的参数
            formCopy = formCompared(this.cronDialogData.form, this.cronDialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(formCopy).length == 0) {
                this.cronDialogData.bShow = false;
                return false;
            }
            // 添加必填参数
            formCopy.id = this.cronDialogData.form.id;
        }
        // 发送消息
        this.sendNotification(HttpType.admin_admin_cron_queue_update, formCopy);
    }

    /**定时任务 删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string> i18n.t("common.deleteConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_admin_cron_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**tabs 切换 */
    onTabsChange(value: string = "cron") {
        this.tabsStatus = value;
    }

    /**运行日志 数据 */
    getCronQueueData() {
        this.sendNotification(HttpType.admin_admin_cron_queue_table_columns);
    }

    /**运行日志 重新执行 */
    onHandlerAgain(data: any) {
        this.sendNotification(HttpType.admin_admin_cron_queue_update, data);
    }

    /**运行日志 批量更新 */
    onBatchUpdate() {
        let sandData: any = {
            "conditions[0][field]": "cron_id",
            "conditions[0][operator]": "=",
            "conditions[0][value]": this.cronQueueBatchDialogData.form.cron_id, //cron_id
            "conditions[1][field]": "status",
            "conditions[1][operator]": "=",
            "conditions[1][value]": 3,
            "attribute[status]": 0,
            "order_by[next_run_date]": "DESC",
            num_rows: this.cronQueueBatchDialogData.form.num_rows,
        };
        this.sendNotification(HttpType.admin_admin_cron_queue_update_batch, sandData);
    }
}
