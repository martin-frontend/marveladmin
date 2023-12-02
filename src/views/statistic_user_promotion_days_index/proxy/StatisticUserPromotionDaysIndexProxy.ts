import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
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
        columns: <any>{
            coin_name_unique: { name: '币种', options: {} },
            created_date: { name: "统计日期", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            directly_activity_coin_get: { name: '活动任务', options: {} },
            directly_activity_gift_gold: { name: '活动赠送', options: {} },
            directly_activity_gold_exchange: { name: '任务币转换', options: {} },
            directly_backwater_2: { name: "棋牌挖矿", options: [] },
            directly_backwater_4: { name: "彩票挖矿", options: [] },
            directly_backwater_8: { name: "捕鱼挖矿", options: [] },
            directly_backwater_16: { name: "电子挖矿", options: [] },
            directly_backwater_32: { name: "真人挖矿", options: [] },
            directly_backwater_64: { name: "体育电竞挖矿", options: [] },
            directly_backwater_128: { name: "链游挖矿", options: [] },
            directly_backwater_gold: { name: "实时返水", options: [] },
            directly_bet_2: { name: "棋牌投注", options: [] },
            directly_bet_4: { name: "彩票投注", options: [] },
            directly_bet_8: { name: "捕鱼投注", options: [] },
            directly_bet_16: { name: "电子投注", options: [] },
            directly_bet_32: { name: "真人投注", options: [] },
            directly_bet_64: { name: "体育电竞投注", options: [] },
            directly_bet_128: { name: "链游投注", options: [] },
            directly_bonus_pool: { name: "奖池分红", options: [] },
            directly_bonus_pool_2: { name: "棋牌奖池", options: [] },
            directly_bonus_pool_4: { name: "彩票奖池", options: [] },
            directly_bonus_pool_8: { name: "捕鱼奖池", options: [] },
            directly_bonus_pool_16: { name: "电子奖池", options: [] },
            directly_bonus_pool_32: { name: "真人奖池", options: [] },
            directly_bonus_pool_64: { name: "体育电竞奖池", options: [] },
            directly_bonus_pool_128: { name: "链游奖池", options: [] },
            directly_commission: { name: "推广佣金", options: [] },
            directly_commission_2: { name: "棋牌返佣", options: [] },
            directly_commission_4: { name: "彩票返佣", options: [] },
            directly_commission_8: { name: "捕鱼返佣", options: [] },
            directly_commission_16: { name: "电子返佣", options: [] },
            directly_commission_32: { name: "真人返佣", options: [] },
            directly_commission_64: { name: "体育电竞返佣", options: [] },
            directly_commission_128: { name: "链游返佣", options: [] },
            directly_exchange: { name: "兑换金额", options: [] },
            directly_exchange_count: { name: "兑换笔数", options: [] },
            directly_exchange_fee: { name: "兑换手续费", options: [] },
            directly_first_recharge_count: { name: "首充人数", options: [] },
            directly_recharge_user: { name: "充值人数", options: [] },
            directly_gift_gold: { name: "活动福利", options: [], tips: "玩家在活动、平台赠送中获得的金额" },
            directly_mail_gift_gold: { name: '邮件赠送', options: {} },
            directly_profit: { name: "总盈利", options: [], tips: "游戏总输赢-平台赠送-推广返佣-游戏挖矿" },
            directly_recharge: { name: "充值金额", options: [] },
            directly_recharge_count: { name: "充值笔数", options: [] },
            directly_recharge_fee: { name: "充值手续费", options: [] },
            directly_total_activity_coin_bet: { name: "活动币总投注", options: [] },
            directly_total_activity_coin_win_loss: { name: "活动币总输赢", options: [] },
            directly_total_bet: { name: "总投注", options: [] },
            directly_total_water: { name: "总流水", options: [] },
            directly_total_win_loss: { name: "总输赢", options: [] },
            directly_users: { name: "新增", options: [] },
            directly_water_2: { name: "棋牌流水", options: [] },
            directly_water_4: { name: "彩票流水", options: [] },
            directly_water_8: { name: "捕鱼流水", options: [] },
            directly_water_16: { name: "电子流水", options: [] },
            directly_water_32: { name: "真人流水", options: [] },
            directly_water_64: { name: "体育电竞流水", options: [] },
            directly_water_128: { name: "链游流水", options: [] },
            directly_win_loss_2: { name: "棋牌输赢", options: [] },
            directly_win_loss_4: { name: "彩票输赢", options: [] },
            directly_win_loss_8: { name: "捕鱼输赢", options: [] },
            directly_win_loss_16: { name: "电子输赢", options: [] },
            directly_win_loss_32: { name: "真人输赢", options: [] },
            directly_win_loss_64: { name: "体育电竞输赢", options: [] },
            directly_win_loss_128: { name: "链游输赢", options: [] },
            group_activity_coin_get: { name: '活动任务', options: {} },
            group_activity_gift_gold: { name: '活动赠送', options: {} },
            group_activity_gold_exchange: { name: '任务币转换', options: {} },
            group_backwater_2: { name: "棋牌挖矿", options: [] },
            group_backwater_4: { name: "彩票挖矿", options: [] },
            group_backwater_8: { name: "捕鱼挖矿", options: [] },
            group_backwater_16: { name: "电子挖矿", options: [] },
            group_backwater_32: { name: "真人挖矿", options: [] },
            group_backwater_64: { name: "体育电竞挖矿", options: [] },
            group_backwater_128: { name: "链游挖矿", options: [] },
            group_backwater_gold: { name: "实时返水", options: [] },
            group_bet_2: { name: "棋牌投注", options: [] },
            group_bet_4: { name: "彩票投注", options: [] },
            group_bet_8: { name: "捕鱼投注", options: [] },
            group_bet_16: { name: "电子投注", options: [] },
            group_bet_32: { name: "真人投注", options: [] },
            group_bet_64: { name: "体育电竞投注", options: [] },
            group_bet_128: { name: "链游投注", options: [] },
            group_bonus_pool: { name: "奖池分红", options: [] },
            group_bonus_pool_2: { name: "棋牌奖池", options: [] },
            group_bonus_pool_4: { name: "彩票奖池", options: [] },
            group_bonus_pool_8: { name: "捕鱼奖池", options: [] },
            group_bonus_pool_16: { name: "电子奖池", options: [] },
            group_bonus_pool_32: { name: "真人奖池", options: [] },
            group_bonus_pool_64: { name: "体育电竞奖池", options: [] },
            group_bonus_pool_128: { name: "链游奖池", options: [] },
            group_commission: { name: "推广佣金", options: [] },
            group_commission_2: { name: "棋牌返佣", options: [] },
            group_commission_4: { name: "彩票返佣", options: [] },
            group_commission_8: { name: "捕鱼返佣", options: [] },
            group_commission_16: { name: "电子返佣", options: [] },
            group_commission_32: { name: "真人返佣", options: [] },
            group_commission_64: { name: "体育电竞返佣", options: [] },
            group_commission_128: { name: "链游返佣", options: [] },
            group_exchange: { name: "兑换金额", options: [] },
            group_exchange_count: { name: "兑换笔数", options: [] },
            group_exchange_fee: { name: "兑换手续费", options: [] },
            group_first_recharge_count: { name: "首充人数", options: [] },
            group_gift_gold: { name: "活动福利", options: [], tips: "玩家在活动、平台赠送中获得的金额" },
            group_mail_gift_gold: { name: '邮件赠送', options: {} },
            group_profit: { name: "总盈利", options: [], tips: "游戏总输赢-平台赠送-推广返佣-游戏挖矿" },
            group_recharge: { name: "充值金额", options: [] },
            group_recharge_count: { name: "充值笔数", options: [] },
            group_recharge_fee: { name: "充值手续费", options: [] },
            group_recharge_user: { name: "充值人数", options: [] },
            roup_all_mail_gift_gold: { name: '邮件赠送', options: {} },
            group_all_activity_coin_get: { name: '活动任务', options: {} },
            group_all_activity_gift_gold: { name: '活动赠送', options: {} },
            group_all_activity_gold_exchange: { name: '任务币转换', options: {} },
            group_all_recharge_user: { name: "充值人数", options: [] },
            group_all_total_activity_coin_bet: { name: "活动币总投注", options: [] },
            group_all_total_activity_coin_win_loss: { name: "活动币总输赢", options: [] },
            group_total_bet: { name: "总投注", options: [] },
            group_total_water: { name: "总流水", options: [] },
            group_total_win_loss: { name: "总输赢", options: [] },
            group_total_activity_coin_bet: { name: "活动币总投注", options: [] },
            group_total_activity_coin_win_loss: { name: "活动币总输赢", options: [] },
            group_users: { name: "新增", options: [] },
            group_water_2: { name: "棋牌流水", options: [] },
            group_water_4: { name: "彩票流水", options: [] },
            group_water_8: { name: "捕鱼流水", options: [] },
            group_water_16: { name: "电子流水", options: [] },
            group_water_32: { name: "真人流水", options: [] },
            group_water_64: { name: "体育电竞流水", options: [] },
            group_water_128: { name: "链游流水", options: [] },
            group_win_loss_2: { name: "棋牌输赢", options: [] },
            group_win_loss_4: { name: "彩票输赢", options: [] },
            group_win_loss_8: { name: "捕鱼输赢", options: [] },
            group_win_loss_16: { name: "电子输赢", options: [] },
            group_win_loss_32: { name: "真人输赢", options: [] },
            group_win_loss_64: { name: "体育电竞输赢", options: [] },
            group_win_loss_128: { name: "链游输赢", options: [] },
            id: { name: "编号", options: [] },
            keep_time: "",
            plat_id: { name: "平台ID", options: {} },
            status: { name: "状态", options: {} },
            total_directly_users: { name: "人数", options: [] },
            total_group_users: { name: "人数", options: [] },
            update_time: "",
            user_id: { name: "平台用户ID", options: [] },
            username: { name: "用户账号", options: [] },
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
        "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
        "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        username: "",
        user_id: "",
        coin_name_unique: "",
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
                if (!this.listQuery.plat_id) {
                    this.listQuery.plat_id = plat_id_options_keys[0];
                    this.listQuery.user_id = "";
                }
            }
        }
        if (this.listQuery.plat_id && this.listQuery.user_id) {
            //@ts-ignore
            this.tableData.columns.coin_name_unique_option = this.tableData.columns.coin_name_unique.options[this.listQuery.plat_id];
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.splice(0, 0, { created_date: LangUtil("合计"), ...data.summary });
        this.tableData.userInfo = data.user_info;
        this.tableData.userInfo.startTime = this.listQuery["created_date-{>=}"].split(" ")[0];
        this.tableData.userInfo.endTime = this.listQuery["created_date-{<=}"].split(" ")[0];
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            page_count: 1,
            page_size: 20,
            "created_date-{>=}": dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss"),
            "created_date-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            username: "",
            user_id: "",
            coin_name_unique: "",
        });
    }

    /**查询 */
    onQuery() {
        if (
            !this.listQuery["created_date-{<=}"] ||
            !this.listQuery["created_date-{<=}"].trim() ||
            !this.listQuery["created_date-{>=}"] ||
            !this.listQuery["created_date-{>=}"].trim()
        ) {
            MessageBox.alert(<any>LangUtil("时间必须选择"));

            return;
        }
        this.sendNotification(HttpType.admin_statistic_user_promotion_days_index, objectRemoveNull(this.listQuery));
    }
}
