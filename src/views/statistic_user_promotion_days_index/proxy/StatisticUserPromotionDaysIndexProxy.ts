import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_user_promotion_days_index/setting";
import { MessageBox } from "element-ui";
import IStatisticUserPromotionDaysIndexProxy from "./IStatisticUserPromotionDaysIndexProxy";
import i18n from "@/lang";

export default class StatisticUserPromotionDaysIndexProxy extends AbstractProxy
    implements IStatisticUserPromotionDaysIndexProxy {
    static NAME = "StatisticUserPromotionDaysIndexProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_user_promotion_days_table_columns);
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
            // TODO
            created_date: { name: "统计日期", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            directly_backwater_gold: { name: "实时返水", options: {} },
            directly_commission: { name: "推广佣金", options: {} },
            directly_exchange: { name: "兑换金额", options: {} },
            directly_exchange_count: { name: "兑换笔数", options: {} },
            directly_first_recharge_count: { name: "首充人数", options: {} },
            directly_gift_gold: { name: "平台赠送", options: {}, tips: "" },
            directly_profit: { name: "总盈利", options: {}, tips: "" },
            directly_recharge: { name: "充值总额", options: {} },
            directly_recharge_count: { name: "充值笔数", options: {} },
            directly_total_bet: { name: "游戏总投注", options: {} },
            directly_total_water: { name: "游戏总流水", options: {} },
            directly_total_win_loss: { name: "游戏总输赢", options: {} },
            directly_users: { name: "新增", options: {} },
            group_backwater_gold: { name: "实时返水", options: {} },
            group_commission: { name: "推广佣金", options: {} },
            group_exchange: { name: "兑换金额", options: {} },
            group_exchange_count: { name: "兑换笔数", options: {} },
            group_first_recharge_count: { name: "首充人数", options: {} },
            group_gift_gold: { name: "平台赠送", options: {}, tips: "" },
            group_profit: { name: "总盈利", options: {}, tips: "" },
            group_recharge: { name: "充值总额", options: {} },
            group_recharge_count: { name: "充值笔数", options: {} },
            group_total_bet: { name: "游戏总投注", options: {} },
            group_total_water: { name: "游戏总流水", options: {} },
            group_total_win_loss: { name: "游戏总输赢", options: {} },
            group_users: { name: "新增", options: {} },
            id: { name: "ID", options: {} },
            keep_time: "30",
            plat_id: { name: "平台ID", options: {} },
            status: { name: "状态", options: {} },
            total_directly_users: { name: "人数", options: {} },
            total_group_users: { name: "人数", options: {} },
            update_time: "6:00-9:00",
            user_id: { name: "用户ID", options: {} },
            username: { name: "用户账号", options: {} },
        },
        list: <any>[],
        userInfo: {
            startTime: "",
            endTime: "",
            channel_id: "",
            nick_name: "",
            user_id: 0,
            username: "",
        },
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_date-{>=}": "",
        "created_date-{<=}": "",
        username: "",
        user_id: "",
    };

    /**tabs 數據 */
    tabData = {
        activeName: "group",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.splice(0, 0, { created_date: i18n.t("common.total"), ...data.summary });
        this.tableData.userInfo = data.user_info;
        this.tableData.userInfo.startTime = this.listQuery["created_date-{>=}"].split(" ")[0];
        this.tableData.userInfo.endTime = this.listQuery["created_date-{<=}"].split(" ")[0];
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            "created_date-{>=}": "",
            "created_date-{<=}": "",
            username: "",
            user_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_user_promotion_days_index, objectRemoveNull(this.listQuery));
    }
}
