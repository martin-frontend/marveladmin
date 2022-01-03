import { PageInfoVO } from "@/core/vo/PageInfoVO";

export default interface IPlatAgentPromotionModelProxy {
    /**表格相关数据 */
    tableData: {
        columns: any;
        list: any;
        pageInfo: PageInfoVO;
    };

    /**玩家列表 查询条件 */
    listStockTableQuery: {
        page_count: number;
        page_size: number;
        plat_id: number;
        channel_id: number;
        start_date: string;
        end_date: string;
    };

    /**设置表头数据 */
    receive_admin_plat_agent_promotion_model_table_columns(data: any): void;
    /** 玩家领取列表  */
    admin_plat_bonus_all_stock_table_columns(data: any): void;
    /** 取玩家领取列表 表头  userReceiveLog*/
    admin_plat_bonus_all_stock_table_columns(): void;
    /** 玩家领取列表 表头 */
    receive_admin_plat_bonus_all_stock_table_columns(data: any): void;
    /**写入查询条件 */
    setListQuery(data: any): void;
    /*玩家领取列表 查询 */
    admin_plat_bonus_all_stock_index(): void;
    /**表格数据 */
    receive_admin_plat_bonus_all_stock_index(data: any): void;
}
