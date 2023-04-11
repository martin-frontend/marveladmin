import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_user_days/setting";
import { MessageBox } from "element-ui";
import IStatisticUserDaysProxy from "./IStatisticUserDaysProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class StatisticUserDaysProxy extends AbstractProxy implements IStatisticUserDaysProxy {
    static NAME = "StatisticUserDaysProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_user_days_table_columns);
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
            backwater_gold: { name: "游戏挖矿", options: {} },
            backwater_2: { name: "棋牌挖矿", options: {} },
            backwater_4: { name: "彩票挖矿", options: {} },
            backwater_8: { name: "捕鱼挖矿", options: {} },
            backwater_16: { name: "电子挖矿", options: {} },
            backwater_32: { name: "真人挖矿", options: {} },
            backwater_64: { name: "体育电竞挖矿", options: {} },
            backwater_128: { name: "链游挖矿", options: {} },
            bet_2: { name: "棋牌投注", options: {} },
            bet_4: { name: "彩票投注", options: {} },
            bet_8: { name: "捕鱼投注", options: {} },
            bet_16: { name: "电子投注", options: {} },
            bet_32: { name: "真人投注", options: {} },
            bet_64: { name: "体育投注", options: {} },
            bet_128: { name: "电竞投注", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            commission: { name: "结算佣金", options: {} },
            commission_2: { name: "棋牌佣金", options: {} },
            commission_4: { name: "彩票佣金", options: {} },
            commission_8: { name: "捕鱼佣金", options: {} },
            commission_16: { name: "电子佣金", options: {} },
            commission_32: { name: "真人佣金", options: {} },
            commission_64: { name: "体育电竞佣金", options: {} },
            commission_128: { name: "链游佣金", options: {} },
            created_date: { name: "统计日期", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            directly_users: { name: "新增直属", options: {} },
            exchange: { name: "兑换金额", options: {} },
            exchange_count: { name: "兑换次数", options: {} },
            gift_gold: { name: "平台赠送", options: {} },
            id: { name: "用户统计ID", options: {} },
            is_first_recharge: { name: "是否首充", options: {} },
            is_credit_user: { name: "用户类型", options: {} },
            keep_time: "30",
            nick_name: { name: "用户昵称", options: {} },
            plat_id: { name: "平台", options: {} },
            recharge: { name: "充值金额", options: {} },
            recharge_count: { name: "充值笔数", options: {} },
            total_bet: { name: "总投注", options: {} },
            total_water: { name: "总流水", options: {} },
            total_win_loss: { name: "总输赢", options: {} },
            update_time: "4:00-6:00",
            user_id: { name: "用户ID", options: {} },
            username: { name: "用户账号", options: {} },
            water_2: { name: "棋牌流水", options: {} },
            water_4: { name: "彩票流水", options: {} },
            water_8: { name: "捕鱼流水", options: {} },
            water_16: { name: "电子流水", options: {} },
            water_32: { name: "真人流水", options: {} },
            water_64: { name: "体育流水", options: {} },
            water_128: { name: "电竞流水", options: {} },
            win_loss_2: { name: "棋牌输赢", options: {} },
            win_loss_4: { name: "彩票输赢", options: {} },
            win_loss_8: { name: "捕鱼输赢", options: {} },
            win_loss_16: { name: "电子输赢", options: {} },
            win_loss_32: { name: "真人输赢", options: {} },
            win_loss_64: { name: "体育输赢", options: {} },
            win_loss_128: { name: "电竞输赢", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_date-{>=}": dateFormat(getTodayOffset(-1), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(0, 1), "yyyy-MM-dd hh:mm:ss"),
        channel_id: "",
        username: "",
        nick_name: "",
        user_id: "",
        is_credit_user: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.splice(0, 0, data.summary);
        data.summary.display = true;
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
            channel_id: "",
            username: "",
            nick_name: "",
            user_id: "",
            is_credit_user: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_user_days_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    onShowUserDetail(user_id: any) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
