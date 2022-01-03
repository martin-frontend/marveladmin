import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IDashboardProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
    };

    /**查询条件 */
    listQuery: any;

    /**昨天统计数据 */
    yesterdayStatistic: {
        new_register: string;
        active_user: string;
        recharge: string;
        win_loss: string;
    };

    /**今天统计数据 */
    todayStatistic: {
        new_register: string;
        active_user: string;
        recharge: string;
        win_loss: string;
    };

    /**曲线图数据 */
    chartData: any;

    /**顶部面板数据 */
    panelData(): any[];

    /**设置表头数据 */
    setTableColumns(data: any): void;

    /**查询 */
    onQuery(): void;

    /**昨天统计数据 */
    setYesterdayStatistic(data: any): void;

    /**今天统计数据 */
    setTodayStatistic(data: any): void;

    /**取 平台充值 */
    getRecharge(): void;

    /**写入 平台充值 */
    setRecharge(data: any): void;

    /**取 平台兑换 */
    getExchange(): void;

    /**写入 平台兑换 */
    setExchange(data: any): void;
}
