import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatBackwaterProxy {
    /**表格相关数据 */
    tableData: {
        columns: any,
        list: any,
        pageInfo: PageInfoVO
    };
    /**查询条件 */
    listQuery: any;
    /**弹窗相关数据 */
    backWaterData: {
        /**列表 */
        vendor_type_options: any,
        /**平台下拉选单 */
        selectOptions: any,
        /**backWater 叙述 */
        backWaterModeDesc: any,
        /**备份 初始化backWater */
        copybackWaterData: any,
        /**数据编辑 */
        isEdit: boolean,
        /**存党用id */
        saveId: any,
        /**是否显示返水列表 */
        showBackWater: boolean,
        backWaterConfig: any,
    }

    /**设置表头数据 */
    setTableColumns(data: any): void;
    /**表格数据 */
    setTableData(data: any): void;
    /**详细数据 */
    setDetail(data: any): void;
    /**查询 */
    onQuery(): void;
    /**更新数据 */
    onUpdate(): void;
    updateSuccess(): void;
    onEdit(): void;
    /**backwater model 叙述 */
    setBackWaterModel(value: any): void;
     /**初始化模版 */
     onInitModel(): void;
     checkRate(obj: any): boolean;
}
