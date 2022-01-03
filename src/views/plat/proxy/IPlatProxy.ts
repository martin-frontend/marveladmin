import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatProxy {
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
        formSource: any,
        initPromotion_floor: any,
        initWater_config: any
    };

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**详细数据 */
    setDetail(data: any): void;
    /**设置配置初始数据 */
    setInitConfig(): void;
    /**设置推广配置数据 */
    setPromotionModel(data: any[]): void;

    /**重置查询条件 */
    resetListQuery(): void;

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
    /**更新数据 */
    onUpdate(): void;
    /**删除数据 */
    onDelete(id: any): void;

    /**Vip Model弹窗相关数据 */
    vipModelDialogData: {
        bShow: boolean,
        form: any,
        formSource: any, // 表单的原始数据
    };
    /**顯示Vip Model弹窗 */
    showVipModelDialog(data: any): void;
    /**隱藏Vip Model弹窗 */
    hideVipModelDialog(): void;
    /**更新Vip数据 */
    onUpdateVipModel(): void;

    /**Backwater Model弹窗相关数据 */
    backwaterModelDialogData: {
        bShow: boolean,
        form: any,
        formSource: any, // 表单的原始数据
    }
    /**顯示Backwater Model弹窗 */
    showBackwaterModelDialog(data: any): void;
    /**隱藏Vip Model弹窗 */
    hideBackwaterModelDialog(): void;
    /**更新Vip数据 */
    onUpdateBackwaterModel(): void;

    /**Promotion Model弹窗相关数据 */
    promotionModelDialogData: {
        bShow: boolean,
        form: any,
        formSource: any, // 表单的原始数据
        promotionModelList: any
    }
    /**顯示Promotion Model弹窗 */
    showPromotionModelDialog(data: any): void;
    /**隱藏Promotion Model弹窗 */
    hidePromotionModelDialog(): void;
    /**更新Vip数据 */
    onUpdatePromotionModel(): void;

    /**取得推廣配置 */
    getPromotionModelById(id: any): void;
}
export interface IWaterConfig {
    type: string,
    rate: number
}
