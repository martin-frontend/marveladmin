import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IAdminCronProxy {
    /**定时任务 表格相关数据 */
    cronTableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**运行日志 表格相关数据 */
    cronQueueTableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**定时任务 查询条件 */
    cronListQuery: any;

    /**运行日志 查询条件 */
    cronQueueListQuery: any;

    /**table 操作数据*/
    cronTableSwitch: {
        id: any;
        state: any;
        is_ordered_exec: any;
    };

    /**定时任务 弹窗相关数据 */
    cronDialogData: any;

    /**运行日志 批次数据 */
    cronQueueBatchDialogData: any;

    /**运行日志 查看数据 */
    cronQueuePreviewDialogData: any;

    /**cron:定时任务, cron_queue:运行日志*/
    tabsStatus: string;

    /**定时任务 设置表头数据 */
    setCronTableColumns(data: any): void;

    /**运行日志 设置表头数据 */
    setCronQueueCronTableColumns(data: any): void;

    /**定时任务 表格数据 */
    setCronTableData(data: any): void;

    /**运行日志 表格数据 */
    setCronQueueTableData(data: any): void;

    /**定时任务 重置查询条件 */
    resetCronListQuery(): void;

    /**运行日志 重置查询数据 */
    resetCronQueueListQuery(): void;

    /**重置table 操作数据 */
    restCronTableSwitch(): void;

    /**定时任务 显示弹窗 */
    showDialogCron(status: string, data?: any): void;

    /**运行日志 批次 */
    showDialogCronQueueBatch(status: string, data?: any): void;

    /**运行日志 查看 */
    showDialogCronQueuePreview(data: any): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**定时任务 查询 */
    onQueryCron(): void;

    /**运行日志 查询 */
    onQueryCronQueue(): void;

    /**定时任务 添加数据 */
    onAdd(): void;

    /**定时任务 更新数据 */
    onCronUpdate(fromTable: boolean): void;

    /**运行日志 更新数据 */
    onCronQueueUpdate(fromTable: boolean): void;

    /**定时任务 删除数据 */
    onDelete(id: any): void;

    /**tabs 切换 */
    onTabsChange(value: string): void;

    /**运行日志 数据 */
    getCronQueueData(): void;

    /**运行日志 重新执行 */
    onHandlerAgain(data: any): any;

    /**运行日志 批量更新 */
    onBatchUpdate(): any;
}
