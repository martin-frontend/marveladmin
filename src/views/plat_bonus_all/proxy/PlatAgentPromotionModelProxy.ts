import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_bonus_all/setting";
import { MessageBox } from "element-ui";
import IPlatAgentPromotionModelProxy from "./IPlatAgentPromotionModelProxy";

export default class PlatAgentPromotionModelProxy extends AbstractProxy implements IPlatAgentPromotionModelProxy {
    static NAME = "PlatAgentPromotionModelProxy";

    /**进入页面时调用 */
    enter() {
        this.admin_plat_agent_promotion_model_table_columns();
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    /**表格相关数据 */
    tableData = {
        columns: {
            bonus_all_awaiting_gold: { name: "可领取金额", options: {} },
            bonus_all_received_gold: { name: "已领取金额", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            cur_bonus_all_level: { name: "等级", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            direct_stock_num: { name: "下级总股份数量", options: {} },
            end_date: { name: "结束日期", options: {} },
            group_water: { name: "团队业绩", options: {} },
            id: { name: "id", options: {} },
            invite_user_id: { name: "绑定上级ID", options: {} },
            is_need_recalculate_level: { name: "是否需要重新计算等级", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            plat_id: { name: "平台ID", options: {} },
            receive_at: { name: "领取时间", options: {} },
            self_water: { name: "自营业绩", options: {} },
            settlement_at: { name: "结算时间", options: {} },
            settlement_status: { name: "结算状态", options: {} },
            start_date: { name: "开始日期", options: {} },
            stock_gold: { name: "每股金额", options: {} },
            stock_num: { name: "总股份数量", options: {} },
            stock_per_num: { name: "每万占股", options: {} },
            updated_at: { name: "修改时间", options: {} },
            user_id: { name: "用户ID", options: {} },
            version: { name: "当前整盘分红配置版本", options: {} },
            version_lock_at: { name: "锁定时间", options: {} },
            version_sync: { name: "整盘分红配置版本同步状态", options: {} },
        },
        list: <any>[],
        bShow: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**玩家列表 查询条件 */
    listStockTableQuery: any = {
        page_count: 1,
        page_size: 20,
        plat_id: 0,
        channel_id: 0,
        start_date: "",
        end_date: "",
    };
    /**取表头 图片配置说明要数据app_type */
    admin_plat_agent_promotion_model_table_columns() {
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_table_columns);
    }

    /**设置表头数据 setTableColumns*/
    receive_admin_plat_agent_promotion_model_table_columns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /** 取玩家领取列表 表头  userReceiveLog*/
    admin_plat_bonus_all_stock_table_columns() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_table_columns);
    }
    /** 写入玩家领取列表 表头 setUserReceiveTableColumns*/
    receive_admin_plat_bonus_all_stock_table_columns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.admin_plat_bonus_all_stock_index();
    }

    /**写入查询条件 */
    setListQuery({ plat_id, start_date, channel_id, end_date }: any) {
        this.listStockTableQuery.plat_id = plat_id;
        this.listStockTableQuery.start_date = start_date;
        this.listStockTableQuery.channel_id = channel_id;
        this.listStockTableQuery.end_date = end_date;
    }
    /*玩家领取列表 查询 listQuery*/
    admin_plat_bonus_all_stock_index() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_index, objectRemoveNull(this.listStockTableQuery));
    }

    /**表格数据 setTableData*/
    receive_admin_plat_bonus_all_stock_index(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.bShow = true;
    }
}
