import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatVipProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**查询条件 */
    listQuery: any;

    /**平台下拉选单 */
    selectOptions: any;

    /**vip 叙述 */
    vipModeDesc: any;

    /**vip 数据 */
    vipData: any;

    /**备份 初始化vip */
    copyVipData: any;

    /**最高等级 options */
    levelOptions: any;

    /**最高等级*/
    maxLevel: any;

    /**存党用id */
    saveId: any;

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

    /**vip model 叙述 */
    setVipModel(value: any): void;

    /**初始化模版 */
    onInitModel(): void;

    /**最高等级切换 */
    onLevelChange(e: any): any;
}
