import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatActivityModelProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };
    /**查询条件 */
    listQuery: any;
    /**预设弹窗数据*/
    defaultForm: any;
    /**弹窗相关数据 */
    dialogData: {
        bShow: boolean;
        status: string;
        form: any;
        formSource: any;
    };
    /**條件规则 */
    conditionRule: any;
    /**活动规则 */
    activityRules: any;

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

    /**平台数据 */
    platOptions: any;
    /**活动模型平台授权 */
    platSettingDialogData: any;
    /** 活动规则数据 */
    activityRuleList: any;
    /**取得平台与活动规则数据 */
    onGetPlatData(): void;
    /**平台数据 */
    setPlatList(data: any): void;
    /**显示活动模型平台授权弹窗 */
    showPlatSettingDialog(id: string): void;
    /**隐藏活动模型平台授权弹窗 */
    hidePlatSettingDialog(): void;
    /**设置活动模型平台授权 */
    setPlatSetting(data: any): void;
    /**更新活动模型平台授权数据 */
    onUpdatePlatSetting(): void;
    /** 增加规则 */
    addRule(): void;
    /** 设置活动规则数据 */
    setActivityRuleList(data: any): void;
    /** 显示复制模版 */
    showCopyDialog(status: string, data?: any): void;
}
