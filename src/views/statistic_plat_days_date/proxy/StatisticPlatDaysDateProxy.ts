import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days_date/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysDateProxy from "./IStatisticPlatDaysDateProxy";
import LangUtil from "@/core/global/LangUtil";

export default class StatisticPlatDaysDateProxy extends AbstractProxy implements IStatisticPlatDaysDateProxy {
    static NAME = "StatisticPlatDaysDateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_table_columns);
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
            id: { name: "平台统计ID", options: [], display: true },
            data_belong: { name: "数据归属标记", options: [], display: true },
            created_date: { name: "日期", options: [], display: true },
            plat_id: { name: "所属平台", options: {}, display: true },
            channel_id: { name: "所属渠道", options: {}, display: true },
            new_register: { name: "当天注册人数", options: [], display: true, tips: "当前日期新增注册人数" },
            active_user: { name: "活跃用户", options: [], display: true, tips: "(DAU)活跃用户" },
            recharge: {
                name: "充值金额",
                options: [],
                display: true,
                tips:
                    "在查询时间范围，平台下所有用户的【状态】为“充值成功”的金额，vip充值金额+vip补单+第三方充值金额+手动补单金额",
            },
            recharge_user: {
                name: "充值人数",
                options: [],
                display: true,
                tips: "平台下 充值成功【状态】的用户人数总人数，包含新老用户的充值人数",
            },
            new_recharge_user: {
                name: "首充人数",
                options: [],
                display: true,
                tips: "第一次充值成功的总人数 ，也就是首充总人数",
            },
            repeat_recharge_user: { name: "重复充值人数", options: [], display: true },
            exchange: {
                name: "兑换金额",
                options: [],
                display: true,
                tips: "在查询时间范围，平台下所有用户的【状态】为“提款成功”的金额，vip充值通道+普通充值通道",
            },
            exchange_user: {
                name: "总兑换人数",
                options: [],
                display: true,
                tips: "平台下 兑换成功【状态】的用户人数总数",
            },
            new_exchange_user: { name: "首兑人数", options: [], display: true },
            win_loss: { name: "游戏输赢", options: [], display: true, tips: "已结算订单的输赢统计,以平台角度展示" },
            water: {
                name: "游戏流水",
                options: [],
                display: true,
                tips: "各种不同游戏类型可以分别设置流水比例, 已结算订单的输赢金额 乘以设置的流水比例 就是游戏流水",
            },
            gift_gold: { name: "平台赠送", options: [], display: true, tips: "玩家在活动、平台赠送中获得的金额" },
            backwater_gold: { name: "游戏挖矿", options: [], display: true, tips: "玩家在游戏挖矿中获得的金额" },
            agent_bonus_gold: { name: "质押分红", options: [], display: true },
            commission_gold: { name: "推广赚钱", options: [], display: true, tips: "玩家在推广赚钱中获得的返佣金额" },
            new_register_device: {
                name: "当天注册设备",
                options: [],
                display: true,
                tips: "当日新注册且为新设备的用户，机器码为唯一。",
            },
            new_user_recharge: {
                name: "首充金额",
                options: [],
                display: true,
                tips: "平台第一次充值成功的总金额 ，也就是首充总金额",
            },
            old_user_recharge: {
                name: "非首充金额",
                options: [],
                display: true,
                tips: "当日老用户充值成功的金额，非首充的总金额",
            },
            new_register_water: {
                name: "新用户游戏流水",
                options: [],
                display: true,
                tips: "统计当日新增的用户的游戏流水",
            },
            active_user_week: {
                name: "周活跃用户",
                options: [],
                display: true,
                tips: "周活跃人数（是指当前日期七天前数据的累积）",
            },
            active_user_month: {
                name: "月活跃用户",
                options: [],
                display: true,
                tips: "月活跃人数（是指当前日期30天数据的累积）",
            },
            active_recharge_user: {
                name: "活跃充值人数",
                options: [],
                display: true,
                tips: "当日活跃且充值的用户人数",
            },
            active_user_recharge: { name: "活跃充值金额", options: [], display: true, tips: "当日活跃人数的充值金额" },
            effective_new_rate: {
                name: "有效新增率%",
                options: [],
                display: true,
                tips: "【当天】注册设备/【当天】注册人数",
            },
            new_recharge_rate: { name: "新增充值率", options: [], display: true, tips: "新增充值人数/新增注册人数" },
            recharge_seep_rate: { name: "充值渗透率", options: [], display: true, tips: "活跃充值人数/活跃用户" },
            arpu_rate: { name: "ARPU", options: [], display: true, tips: "活跃充值金额/活跃用户" },
            arppu_rate: { name: "ARPPU", options: [], display: true, tips: "活跃充值金额/活跃充值人数" },
            rech_amt: { name: "人均首存金额", options: [], display: true, tips: "首充金额/首充人数" },
            new_reg_rech_total: {
                name: "当天注册充值总金额",
                options: [],
                display: true,
                tips: "是当日注册的用户的充值总金额。比如当日 注册用户A , 他成功充值三次 ， 这个三次的金额都需要统计。",
            },
            new_reg_first_rech_count: {
                name: "当天注册充值人数",
                options: [],
                display: true,
                tips: "是当日注册而且充值成功的用户。这里注意同一个用户需要去重",
            },
            exch_amt: {
                name: "当天注册兑换总金额",
                options: [],
                display: true,
                tips: "是当日注册的用户的兑换总金额。比如当日 注册用户A , 他成功兑换三次 ， 这个三次的金额都需要统计。",
            },
            new_exch_count: {
                name: "当天注册兑换人数",
                options: [],
                display: true,
                tips: "是当日注册而且兑换成功的用户。这里注意同一个用户需要去重",
            },
            p_user_rech: { name: "ARPU%(登录用户)", options: [], display: true, tips: "充值金额/注册人数" },
            p_rech_per_user: {
                name: "ARPPU%(登录用户)",
                options: [],
                display: true,
                tips: "充值金额/充值人数",
            },
            net_rech: { name: "充-兑", options: [], display: true, tips: "充值金额-兑换金额" },
            dau: { name: "DAU", options: [], display: true, tips: "登录人数(去重)" },
            new_user_arpu: {
                name: "新增用户ARPU",
                options: [],
                display: true,
                tips: "当天注册充值总金额/当天注册人数",
            },
            new_user_arppu: {
                name: "新增用户ARPPU",
                options: [],
                display: true,
                tips: "当天注册充值总金额/当天注册充值人数",
            },
            d_exch_amt_per_user: {
                name: "当天人均提现",
                options: [],
                display: true,
                tips: "当天注册兑换总金额/当天注册人数",
            },
            d_user_cont_per_user: {
                name: "当天用户人均贡献",
                options: [],
                display: true,
                tips: "新增用户ARPU-当天人均提现",
            },
            d_exch_amt_per_dau: {
                name: "人均提现",
                options: [],
                display: true,
                tips: "兑换金额/DAU",
            },
            user_cont_per_user: {
                name: "人均贡献",
                options: [],
                display: true,
                tips: "ARPU%(登录用户)-人均提现",
            },
            cost_per_user: {
                name: "投放新增用户成本/人",
                options: [],
                tips: "投放消耗/当天注册人数 也就是分渠道报表里面的新增注册成本",
            },
            mail_gift_gold: {
                name: '邮件赠送', options: {},
                tips: "人工发送的邮件附件并且玩家“已领取”，不包含活动币",
            },
            activity_coin_get: {
                name: '活动任务', options: {},
                tips: "玩家任务获得任务币数量",
            },
            activity_gift_gold: {
                name: '活动赠送', options: {},
                tips: "活动发送并且玩家已经获得，不包含活动币",
            },
            activity_gold_exchange: {
                name: '任务币转换', options: {},
                tips: "玩家完成任务获得真钱的数量",
            },
            pure_win_loss: { name: '纯游戏输赢', options: {}, tips: '游戏输赢-游戏挖矿-任务币转换-活动赠送' },
            channel_profit: {
                name: "渠道毛利",
                options: {},
                display: true,
                tips: "市场推广渠道毛利=团队充值-团队提现-游戏输赢*0.15-充值金额1%"
            }
        },
        list: <any>[],
        columnKeys: <any>[],
        hideColumns: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        updateNum: 0,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        //start_date: this.defaultDate,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: [
            {
                category: "player",
                title: LangUtil("玩家数据"),
                options: {
                    new_register: {
                        name: this.tableData.columns.new_register.name,
                        checked: true,
                    },
                    active_user: {
                        name: this.tableData.columns.active_user.name,
                        checked: true,
                    },
                    gift_gold: {
                        name: this.tableData.columns.gift_gold.name,
                        checked: true,
                    },
                    backwater_gold: {
                        name: this.tableData.columns.backwater_gold.name,
                        checked: true,
                    },
                    commission_gold: {
                        name: this.tableData.columns.commission_gold.name,
                        checked: true,
                    },
                },
            },
            {
                category: "recharge",
                title: LangUtil("充值兑换数据"),
                options: {
                    recharge: {
                        name: this.tableData.columns.recharge.name,
                        checked: true,
                    },
                    recharge_user: {
                        name: this.tableData.columns.recharge_user.name,
                        checked: true,
                    },
                    new_recharge_user: {
                        name: this.tableData.columns.new_recharge_user.name,
                        checked: true,
                    },
                    exchange: {
                        name: this.tableData.columns.exchange.name,
                        checked: true,
                    },
                    exchange_user: {
                        name: this.tableData.columns.exchange_user.name,
                        checked: true,
                    },
                    new_exchange_user: {
                        name: this.tableData.columns.new_exchange_user.name,
                        checked: true,
                    },
                },
            },
            {
                category: "game",
                title: LangUtil("游戏数据"),
                options: {
                    win_loss: {
                        name: this.tableData.columns.win_loss.name,
                        checked: true,
                    },
                    water: {
                        name: this.tableData.columns.water.name,
                        checked: true,
                    },
                },
            },
        ],
        formSource: null, // 表单的原始数据
    };

    get defaultDate() {
        let d1 = new Date();
        d1.setTime(d1.getTime() - 24 * 60 * 60 * 1000);
        return d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);

        let plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);

        //将平台中的  0 的系统 删除掉
        const newOptions = <any>{};
        for (let index = 0; index < plat_id_options_keys.length; index++) {
            const element = plat_id_options_keys[index];
            if (element == 0 || element == "0") {
                continue;
            }
            newOptions[element] = this.tableData.columns.plat_id.options[element];
        }
        this.tableData.columns.plat_id.options = newOptions;
        plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);

        this.tableData.columnKeys = Object.keys(this.tableData.columns);
        if (plat_id_options_keys.length > 0 && this.tableData.columnKeys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }

            // 预设栏位都显示
            this.tableData.columnKeys.forEach((key: any) => {
                this.tableData.columns[key]["display"] = true;
            });

            this.onQuery();
        }
    }
    /**合计 相关数据 */
    summaryData = {
        plat_id: "",
        active_user: "",
        recharge_user: "",
        exchange_user: "",
        exchange: "",
        new_exchange_user: "",
        new_recharge_user: "",
        new_register: "",
        recharge: "",
        water: "",
        win_loss: "",
        gift_gold: "",
        backwater_gold: "",
        commission_gold: "",
        new_user: "",
        agent_bonus_gold: "",
        repeat_recharge_user: "",
        new_register_device: "",
        effective_new_rate: "",
        new_user_recharge: "",
        old_user_recharge: "",
        new_recharge_rate: "",
        new_register_water: "",
        active_user_week: "",
        active_user_month: "",
        active_recharge_user: "",
        active_user_recharge: "",
        recharge_seep_rate: "",
        arpu_rate: "",
        arppu_rate: "",
        rech_amt: "",
        new_reg_rech_total: "",
        new_reg_first_rech_count: "",
        net_rech: "",
        exch_amt: "",
        new_exch_count: "",
        p_user_rech: "",
        p_rech_per_user: "",
        dau: "",
        new_user_arpu: "",
        new_user_arppu: "",
        d_exch_amt_per_user: "",
        d_user_cont_per_user: "",
        d_exch_amt_per_dau: "",
        user_cont_per_user: "",
        cost_per_user: "",
        mail_gift_gold: "",
        activity_gift_gold: "",
        activity_coin_get: "",
        activity_gold_exchange: "",
        pure_win_loss: "",
        channel_profit: "",
    };
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.summaryData["plat_id"] = <any>LangUtil("合计");
        this.summaryData["active_user"] = data.summary.active_user;
        this.summaryData["recharge_user"] = data.summary.recharge_user;
        this.summaryData["exchange_user"] = data.summary.exchange_user;
        this.summaryData["exchange"] = data.summary.exchange;
        this.summaryData["new_exchange_user"] =
            data.summary.new_exchange_user === 0 ? "0" : data.summary.new_exchange_user;
        this.summaryData["new_recharge_user"] =
            data.summary.new_recharge_user === 0 ? "0" : data.summary.new_recharge_user;
        this.summaryData["new_register"] = data.summary.new_register;
        this.summaryData["new_user"] = data.summary.new_user;
        this.summaryData["recharge"] = data.summary.recharge;
        this.summaryData["water"] = data.summary.water;
        this.summaryData["win_loss"] = data.summary.win_loss;
        this.summaryData["gift_gold"] = data.summary.gift_gold;
        this.summaryData["backwater_gold"] = data.summary.backwater_gold;
        this.summaryData["commission_gold"] = data.summary.commission_gold;
        this.summaryData["agent_bonus_gold"] = data.summary.agent_bonus_gold;
        this.summaryData["repeat_recharge_user"] = data.summary.repeat_recharge_user;
        this.summaryData["new_register_device"] = data.summary.new_register_device;
        this.summaryData["effective_new_rate"] = data.summary.effective_new_rate;
        this.summaryData["new_user_recharge"] = data.summary.new_user_recharge;
        this.summaryData["old_user_recharge"] = data.summary.old_user_recharge;
        this.summaryData["new_recharge_rate"] = data.summary.new_recharge_rate;
        this.summaryData["new_register_water"] = data.summary.new_register_water;
        this.summaryData["active_user_week"] = data.summary.active_user_week;
        this.summaryData["active_user_month"] = data.summary.active_user_month;
        this.summaryData["active_recharge_user"] = data.summary.active_recharge_user;
        this.summaryData["active_user_recharge"] = data.summary.active_user_recharge;
        this.summaryData["recharge_seep_rate"] = data.summary.recharge_seep_rate;
        this.summaryData["arpu_rate"] = data.summary.arpu_rate;
        this.summaryData["arppu_rate"] = data.summary.arppu_rate;
        this.summaryData["rech_amt"] = data.summary.rech_amt;
        this.summaryData["new_reg_rech_total"] = data.summary.new_reg_rech_total;
        this.summaryData["new_reg_first_rech_count"] = data.summary.new_reg_first_rech_count;
        this.summaryData["net_rech"] = data.summary.net_rech;
        this.summaryData["exch_amt"] = data.summary.exch_amt;
        this.summaryData["new_exch_count"] = data.summary.new_exch_count;
        this.summaryData["p_user_rech"] = data.summary.p_user_rech;
        this.summaryData["p_rech_per_user"] = data.summary.p_rech_per_user;
        this.summaryData["dau"] = data.summary.dau;
        this.summaryData["new_user_arppu"] = data.summary.new_user_arppu;
        this.summaryData["d_exch_amt_per_user"] = data.summary.d_exch_amt_per_user;
        this.summaryData["d_user_cont_per_user"] = data.summary.d_user_cont_per_user;
        this.summaryData["d_exch_amt_per_dau"] = data.summary.d_exch_amt_per_dau;
        this.summaryData["user_cont_per_user"] = data.summary.user_cont_per_user;
        this.summaryData["new_user_arpu"] = data.summary.new_user_arpu;
        this.summaryData["cost_per_user"] = data.summary.cost_per_user;
        this.summaryData["mail_gift_gold"] = data.summary.mail_gift_gold;
        this.summaryData["activity_gift_gold"] = data.summary.activity_gift_gold;
        this.summaryData["activity_coin_get"] = data.summary.activity_coin_get;
        this.summaryData["activity_gold_exchange"] = data.summary.activity_gold_exchange;
        this.summaryData["pure_win_loss"] = data.summary.pure_win_loss;
        this.summaryData["channel_profit"] = data.summary.channel_profit;
        // 把summaryData 插入第一笔
        this.tableData.list.splice(0, 0, this.summaryData);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            plat_id: "",
            channel_id: "",
            //start_date: this.defaultDate,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        // this.dialogData.status = status;
        // if (status == DialogStatus.update) {
        //     this.dialogData.formSource = data;
        //     Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        //     this.sendNotification(HttpType.undefined, { id: data.id });
        // } else {
        //     this.resetDialogForm();
        //     this.dialogData.formSource = null;
        // }
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_statistic_plat_days_statistic_by_date, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        // if(Object.keys(formCopy).length == 0){
        //     this.dialogData.bShow = false;
        //     return ;
        // }
        // 添加必填参数
        // TODO
        // 发送消息
        //this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                //this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
                console.log("---");
            })
            .catch(() => { });
    }
}
