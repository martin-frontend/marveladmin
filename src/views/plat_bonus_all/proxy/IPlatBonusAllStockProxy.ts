import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatBonusAllStockProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        form: any;
        formSource: any; // 表单的原始数据
        formModel: null;
        templateBShow: false;
    };

    /*显示配置梯度模版 */
    openTemplateSetting(): void;
    /**没有 all_bonus_model_id 就写入原本的数据 */
    setOriginalTemplateData(body: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**关闭弹窗 */
    hideDialog(): void;
    /*更新梯度模版 */
    admin_plat_update(plat_id: any): void;
    /**写入梯度模版数据 */
    receive_admin_plat_show(body: any): void;
    /**初始化模板 */
    initTemplate(model: any): void;
}
