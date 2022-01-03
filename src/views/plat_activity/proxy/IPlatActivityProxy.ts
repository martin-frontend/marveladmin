import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatActivityProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        orderData: string;
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
        activityModelList: any;
        fileList: any;
    };

    /**活动 数据 */
    activeModelData: any;

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**表格数据 */
    setTableData(data: any): void;

    /**详细数据 */
    setDetail(data: any): void;

    /**重置查询条件 */
    resetListQuery(): void;

    /**显示弹窗 */
    showDialog(status: string, data?: any): void;

    /**隐藏弹窗 */
    hideDialog(): void;

    /**重置弹窗表单 */
    resetDialogForm(): void;

    /**取活动规则 */
    getPlatActivityRule(): void;

    /**查询 */
    onQuery(): void;

    /**添加数据 */
    onAdd(): void;

    /**关闭该活动 */
    onCloseActive(): void;

    /**更新活动*/
    onUpdate(): void;

    /**取活动模版数据数据 */
    getActivityModel(data: any): void;

    /**写入活动模版数据数据 */
    setActivityModelList(data: any): void;

    /**取活动模版数 详细数据 */
    getModelDetail(id: any): void;

    /**写入活动模版数 详细数据 */
    setModelDetail(body: any): void;

    /**取规则 */
    setActivityRuleList(body: any): void;

    /**图片上传 */
    uploadImage(data: any): void;

    /**图片上传 写入图片url*/
    uploadSuccess(body: any): void;

    /**排序 */
    onOrderList(): void;
}
