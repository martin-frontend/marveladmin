import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatsNoticeProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        status: string;
        form: any;
        formSource: any;
    };

    /**图片预览 相关数据 */
    previewImageDialogData: {
        bShow: boolean;
        url: string;
    };

    /**表单操作 数据 */
    tableCtrlData: any;

    /**应用平台 类型 */
    appType: string;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**查询 */
    onQuery(): void;

    /**添加数据 */
    onAdd(): void;

    /**更新数据
     * param:from true: 来自表格的操作 false: 表单操作
     */
    onUpdate(from: boolean): void;

    /**删除数据 */
    onDelete(id: any): void;

    /**图片上传 */
    onUploadImage(data: any): void;

    /**图片上传 回传url*/
    setImageUrl(body: any): void;
}
