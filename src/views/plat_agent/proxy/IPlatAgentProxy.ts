import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatAgentProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        // 是否编辑状态
        isEdit: boolean;
        // 最高等级
        maxlevels: any;
        // 平台数据详情
        detail: any;
        // 平台数据详情 源
        detail_source: any;
        // 推广配置模板
        promotionModel: any;
        // 当前选择的标签页
        activeName: string;
        // 更新
        update: number;
    };

    /**查询条件 */
    listQuery: any;

    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        form: any;
        formSource: any;
        // 当前操作的项
        currentKey: string;
        // 活动项
        activeKey: string;
        // 更新
        update: number;
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**详细数据 */
    setDetail(value: any): void;
    /**Promotion 数据 */
    setPromotionModel(value: any): void;

    /**显示弹窗 */
    showDialog(): void;
    /**隐藏弹窗 */
    hideDialog(): void;

    /**查询 */
    onQuery(): void;

    /**图片更换 */
    onHandleChange(data: any): void;

    /**图片更换完成 */
    onUploadSuccess(data: any): void;

    /**banner 确认 */
    onSetBanner(): void;

    /**初始化系统模板 */
    onInitModel(): void;

    /**确定保存 */
    onSave(): void;
    /**取消编辑, 恢复数据 */
    onCancel(): void;
    /**更改最高等级 */
    onLevelChange(type: string): void;
}
