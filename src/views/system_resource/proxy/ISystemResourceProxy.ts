import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface ISystemResourceProxy {
    /**表格相关数据 */
    tableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**查询条件 */
    listQuery: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean,
        status: string,
        form: any,
        formSource: any
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;
    /**隐藏弹窗 */
    hideDialog(): void;

    /**查询 */
    onQuery(): void;
    /**删除数据 */
    onDelete(id: any): void;

    /**图片批次处理弹窗相关数据 */
    imgBatchDialogData: any;
    /**显示批次处理弹窗 */
    showBatchDialog(status: string): void;
    /**隐藏批次处理弹窗 */
    hideBatchDialog(): void;
    /**批次上傳 */
    onBatchUpload(): void;
    /**批次删除 */
    onBatchDelete(): void;
    /** 上传图片变动 */
    fileChange(fileList: Object[]): void;
}
export enum BatchStatus {
    Upload = "图片上传中",
    BatchDelete = "图片删除中"
}
