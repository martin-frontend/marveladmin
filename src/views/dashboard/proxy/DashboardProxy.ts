import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/dashboard/setting";
import { MessageBox } from "element-ui";
import IDashboardProxy from "./IDashboardProxy";
import i18n from "@/lang";

export default class DashboardProxy extends AbstractProxy implements IDashboardProxy {
    static NAME = "DashboardProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_index_statistic_table_columns);
    }

    /**离开页面时调用 */
    leave() { }

    /**表格相关数据 */
    tableData = {
        columns: {
            // TODO
            active_user: { name: "活跃用户", options: {} },
            backwater_gold: { name: "实时返水", options: {} },
            commission_gold: { name: "推广返佣", options: {} },
            gift_gold: { name: "平台赠送", options: {} },
            new_register: { name: "新增注册", options: {} },
            plat_id: { name: "所属平台", options: {} },
            recharge: { name: "充值金额", options: {} },
            win_loss: { name: "游戏输赢", options: {} },
        },
    };

    /**玩家充值(全部订单) */
    total_recharge = <any>[];

    /**玩家充值(普通订单) */
    non_vip_recharge = <any>[];

    /**玩家充值(VIP订单) */
    vip_recharge = <any>[];

    /**游戏输赢 */
    game_win_gold = <any>[];

    /**平台币种统计 */
    plat_coin_statistic = <any>[];

    /**查询条件 */
    listQuery = {
        plat_id: "",
        start_date: dateFormat(getTodayOffset(), "yyyy-MM-dd"),
        end_date: dateFormat(getTodayOffset(), "yyyy-MM-dd"),
    };

    /**昨天统计数据 */
    yesterdayStatistic = {
        new_register: "0",
        active_user: "0",
        recharge: "0",
        win_loss: "0",
    };

    /**今天统计数据 */
    todayStatistic = {
        new_register: "0",
        active_user: "0",
        recharge: "0",
        win_loss: "0",
    };

    /**曲线图文字 */
    textObj = {
        today: LangUtil("今日"),
        yesterday: LangUtil("昨日"),
    };

    /**曲线图数据 */
    chartData = {
        activeName: "first",
        options: {
            title: {},
            tooltip: {
                trigger: "axis",
            },
            color: ["#4668a7", "#2b9fd6"],
            legend: {
                data: [this.textObj.today, this.textObj.yesterday],
            },
            toolbox: {
                feature: {
                    magicType: { type: ["line", "bar"] },
                },
                showTitle: false,
            },
            xAxis: {
                data: this.getXAxisData,
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
            },
            yAxis: {},
            series: [
                {
                    name: this.textObj.today,
                    type: "line",
                    stack: this.textObj.today,
                    smooth: true, //true 为平滑曲线，false为直线
                    data: [],
                    // markPoint: {
                    //     data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
                    // },
                    markLine: {
                        data: [
                            // { type: "average", name: "平均值" },
                            [
                                {
                                    symbol: "none",
                                    x: "90%",
                                    yAxis: "max",
                                },
                                {
                                    symbol: "circle",
                                    label: {
                                        position: "start",
                                    },
                                    // type: "max",
                                    // name: "最高点",
                                },
                            ],
                        ],
                    },
                },
                {
                    name: this.textObj.yesterday,
                    type: "line",
                    stack: this.textObj.yesterday,
                    smooth: true, //true 为平滑曲线，false为直线
                    itemStyle: {},
                    data: [],
                    // markPoint: {
                    //     data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
                    // },
                    markLine: {
                        data: [
                            // { type: "average", name: "平均值" },
                            [
                                {
                                    symbol: "none",
                                    x: "90%",
                                    yAxis: "max",
                                },
                                {
                                    symbol: "circle",
                                    label: {
                                        position: "start",
                                    },
                                    // type: "max",
                                    // name: "最高点",
                                },
                            ],
                        ],
                    },
                },
            ],
        },
        number: 0,
    };

    /**日期快捷 */
    pickerOptions = {
        disabledDate(time: any) {
            return time.getTime() > Date.now();
        },
    };

    get getXAxisData() {
        let result = [];
        for (let index = 1; index <= 24; index++) {
            result.push(index);
        }
        return result;
    }

    /**顶部面板数据 */
    get panelData() {
        const arr: any = [];
        arr.push({
            name: this.tableData.columns.new_register.name,
            icon: "el-icon-user-solid",
            iconbg: "icon-shopping",
            today: this.todayStatistic.new_register,
            yesterday: this.yesterdayStatistic.new_register,
        });

        arr.push({
            name: this.tableData.columns.active_user.name,
            icon: "el-icon-s-custom",
            iconbg: "icon-shopping",
            today: this.todayStatistic.active_user,
            yesterday: this.yesterdayStatistic.active_user,
        });

        arr.push({
            name: this.tableData.columns.recharge.name,
            icon: "el-icon-coin",
            iconbg: "icon-shopping",
            today: this.todayStatistic.recharge,
            yesterday: this.yesterdayStatistic.recharge,
        });

        arr.push({
            name: this.tableData.columns.win_loss.name,
            icon: "el-icon-star-on",
            iconbg: "icon-shopping",
            today: this.todayStatistic.win_loss,
            yesterday: this.yesterdayStatistic.win_loss,
            vary: true,
        });
        return arr;
    }

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

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_index_statistic_today_statistic, objectRemoveNull(this.listQuery));
        this.sendNotification(HttpType.admin_index_statistic_yesterday_statistic, objectRemoveNull(this.listQuery));
        this.onQueryStats();
        this.showChart();
    }

    onQueryStats() {
        this.sendNotification(HttpType.admin_index_statistic_coin_statistic, objectRemoveNull(this.listQuery));
    }

    setStatistic(data: any) {
        const keys = Object.keys(data.total_recharge);
        const total_recharge = [];
        const non_vip_recharge = [];
        const vip_recharge = [];
        const game_win_gold = [];
        const plat_coin_statistic = [];
        for (const key of keys) {
            const item = data.total_recharge[key];
            total_recharge.push({
                coin_name_unique: key,
                total_recharge: data.total_recharge[key].total_recharge,
                user_num: data.total_recharge[key].user_num,
                total_recharge_count: data.total_recharge[key].total_recharge_count,
            });

            non_vip_recharge.push({
                coin_name_unique: key,
                non_vip_total_recharge: data.non_vip_recharge[key].non_vip_total_recharge,
                non_vip_user_num: data.non_vip_recharge[key].non_vip_user_num,
                non_vip_total_recharge_count: data.non_vip_recharge[key].non_vip_total_recharge_count,
            });
            vip_recharge.push({
                coin_name_unique: key,
                vip_total_recharge: data.vip_recharge[key].vip_total_recharge,
                vip_user_num: data.vip_recharge[key].vip_user_num,
                vip_total_recharge_count: data.vip_recharge[key].vip_total_recharge_count,
            });
            game_win_gold.push({
                coin_name_unique: key,
                win_gold_2: data.game_win_gold[key].win_gold_2,
                win_gold_4: data.game_win_gold[key].win_gold_4,
                win_gold_8: data.game_win_gold[key].win_gold_8,
                win_gold_16: data.game_win_gold[key].win_gold_16,
                win_gold_32: data.game_win_gold[key].win_gold_32,
                win_gold_64: data.game_win_gold[key].win_gold_64,
                win_gold_128: data.game_win_gold[key].win_gold_128,
            });
            plat_coin_statistic.push({
                coin_name_unique: key,
                recharge_amount: data.plat_coin_statistic[key].recharge_amount,
                exchange_amount: data.plat_coin_statistic[key].exchange_amount,
                commission_amount: data.plat_coin_statistic[key].commission_amount,
                backwater_amount: data.plat_coin_statistic[key].backwater_amount,
                mail_awards_amount: data.plat_coin_statistic[key].mail_awards_amount,
                activity_awards_amount: data.plat_coin_statistic[key].activity_awards_amount,
                manual_deduct_amount: data.plat_coin_statistic[key].manual_deduct_amount,
                win_loss_amount: data.plat_coin_statistic[key].win_loss_amount,
            });
        }
        this.total_recharge = total_recharge;
        this.non_vip_recharge = non_vip_recharge;
        this.vip_recharge = vip_recharge;
        this.game_win_gold = game_win_gold;
        this.plat_coin_statistic = plat_coin_statistic;
    }

    /**昨天统计数据 */
    setYesterdayStatistic(data: any) {
        this.yesterdayStatistic = data;
    }

    /**今天统计数据 */
    setTodayStatistic(data: any) {
        this.todayStatistic = data;
    }

    /**显示曲线图 */
    showChart() {
        if (this.chartData.activeName === "first") {
            this.getRecharge();
        } else {
            this.getExchange();
        }
    }
    /**取 平台充值 */
    getRecharge() {
        this.sendNotification(HttpType.admin_index_statistic_recharge_statistic, objectRemoveNull(this.listQuery));
    }
    /**写入 平台充值 */
    setRecharge(data: any) {
        Object.assign(this.chartData.options.series[0].data, data.today);
        Object.assign(this.chartData.options.series[1].data, data.yesterday);
        this.chartData.number++;
    }

    /**取 平台兑换 */
    getExchange() {
        this.sendNotification(HttpType.admin_index_statistic_exchange_statistic, objectRemoveNull(this.listQuery));
    }
    /**写入 平台兑换 */
    setExchange(data: any) {
        Object.assign(this.chartData.options.series[0].data, data.today);
        Object.assign(this.chartData.options.series[1].data, data.yesterday);
        this.chartData.number++;
    }
}
