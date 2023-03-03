import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabBetProxy from "./ITabBetProxy";

export default class TabBetProxy extends AbstractProxy implements ITabBetProxy {
    static NAME = "TabBetProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_bet_table_columns);
        this.listQuery.user_id = getPageSetting().user_id;
        this.listQuery.plat_id = getPageSetting().plat_id;
    }

    /**离开页面时调用 */
    leave() { }

    /**表格相关数据 */
    tableData = {
        columns: <any>{
            bet_id: {
                name: "用户投注明细ID",
                options: [],
            },
            data_belong: {
                name: "数据归属标记",
                options: [],
            },
            user_id: {
                name: "用户ID",
                options: [],
            },
            is_credit_user: {
                name: "用户类型",
                options: {},
            },
            coin_name_unique: {
                name: "币种",
                options: {},
            },
            gold_scale: {
                name: "币种汇率",
                options: [],
            },
            plat_id: {
                name: "所属平台",
                options: {},
            },
            channel_id: {
                name: "渠道ID",
                options: [],
            },
            vendor_id: {
                name: "产品厂商",
                options: {},
            },
            vendor_product_id: {
                name: "产品ID",
                options: [],
            },
            ori_product_id: {
                name: "产品ID[厂商]",
                options: [],
            },
            vendor_product_name: {
                name: "游戏名称",
                options: [],
            },
            vendor_type: {
                name: "游戏类型",
                options: {},
            },
            order_no: {
                name: "下注订单",
                options: [],
            },
            game_round_no: {
                name: "游戏局数号",
                options: [],
            },
            win_gold: {
                name: "输赢金额",
                options: [],
            },
            settlement_status: {
                name: "投注状态",
                options: {},
            },
            settlement_at: {
                name: "结算时间",
                options: [],
            },
            could_resettlement: {
                name: "可能重结",
                options: [],
            },
            resettlement_status: {
                name: "重结状态",
                options: ["否", "是"],
            },
            resettlement_version: {
                name: "重结版本",
                options: [],
            },
            bet_gold: {
                name: "投注金额",
                options: [],
            },
            bet_at: {
                name: "投注时间",
                options: [],
            },
            valid_bet_gold: {
                name: "有效投注",
                options: [],
            },
            bonus_gold: {
                name: "彩金",
                options: [],
            },
            data_part: {
                name: "数据组成",
                options: [],
            },
            settlement_water: {
                name: "有效金额",
                options: [],
            },
            water_type: {
                name: "流水结算方式",
                options: {
                    win_gold: "输赢绝对值",
                    valid_bet_gold: "有效投注",
                },
            },
            water_rate: {
                name: "流水结算比例",
                options: [],
            },
            water_rate_except_user: {
                name: "流水结算比例[不包含用户配置]",
                options: [],
            },
            water_rate_game: {
                name: "流水结算比例[不包含用户配置和平台配置]",
                options: [],
            },
            water_rate_accelerate: {
                name: "流水结算加速比例",
                options: [],
            },
            water: {
                name: "用户流水",
                options: [],
            },
            water_except_user: {
                name: "用户流水[不包含用户配置]",
                options: [],
            },
            water_game: {
                name: "用户流水[不包含用户配置和平台配置]",
                options: [],
            },
            water_accelerate: {
                name: "用户加速流水",
                options: [],
            },
            water_accelerate_except_user: {
                name: "用户加速流水[不包含用户配置]",
                options: [],
            },
            water_accelerate_game: {
                name: "用户加速流水[不包含用户配置和平台配置]",
                options: [],
            },
            is_settlement_backwater: {
                name: "是否已结算反水",
                options: ["否", "是"],
            },
            backwater_rate: {
                name: "挖矿比率",
                options: [],
            },
            backwater: {
                name: "用户返水",
                options: [],
            },
            backwater_except_user: {
                name: "用户返水[不包含用户配置]",
                options: [],
            },
            backwater_game: {
                name: "[足球]有效投注",
                options: [],
            },
            backwater_id: {
                name: "数据组成",
                options: [],
            },
            promotion_type: {
                name: "推广类型",
                options: ["未开启", "无限代", "无限代不算自营"],
            },
            commission_at: {
                name: "佣金结算时间",
                options: [],
            },
            pull_at: {
                name: "拉取时间",
                options: [],
            },
            bet_gold_coin: {
                name: "投注金额",
                options: [],
            },
            valid_bet_gold_coin: {
                name: "有效投注",
                options: [],
            },
            bonus_gold_coin: {
                name: "彩金",
                options: [],
            },
            win_gold_coin: {
                name: "输赢金额",
                options: [],
            },
            settlement_water_coin: {
                name: "有效金额",
                options: [],
            },
            water_coin: {
                name: "用户流水",
                options: [],
            },
            water_except_user_coin: {
                name: "用户流水[不包含用户配置]",
                options: [],
            },
            water_game_coin: {
                name: "用户流水[不包含用户配置和平台配置]",
                options: [],
            },
            backwater_coin: {
                name: "用户返水",
                options: [],
            },
            backwater_except_user_coin: {
                name: "用户返水[不包含用户配置]",
                options: [],
            },
            backwater_game_coin: {
                name: "[足球]有效投注",
                options: [],
            },
            water_accelerate_coin: {
                name: "用户加速流水",
                options: [],
            },
            credit_rate_info: {
                name: "信誉占比信息",
                options: [],
            },
            has_credit_rate_log: {
                name: "是否生成信誉占比日志",
                options: ["否", "是", "不需要"],
            },
            backwater_config: {
                name: "平台返水配置",
                options: [],
            },
            created_by: {
                name: "创建人",
                options: [],
            },
            created_at: {
                name: "创建时间",
                options: [],
            },
            updated_by: {
                name: "修改人",
                options: [],
            },
            updated_at: {
                name: "修改时间",
                options: [],
            },
            game_info: {
                name: "当前局的游戏信息",
                options: [],
            },
            nick_name: {
                name: "用户昵称",
                options: [],
            },
            username: {
                name: "用户账号",
                options: [],
            },
            agent_user_id: {
                name: "代理ID",
            },
            bet_code: {
                name: "下注内容",
            },
            bet_result: {
                name: "下注结果",
            },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bet_gold: "",
            settlement_water: "",
            valid_bet_gold: "",
            water: "",
            win_gold: "",
            water_accelerate: "",
        },
        winLoss: "",
        summary_coin: [],
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    };
    /**查询数据 */
    listQuery: { [key: string]: string | number } = {
        type: "",
        user_id: 0,
        plat_id: 0,
        settlement_status: "",
        vendor_id: "",
        vendor_type: "",
        ori_product_id: "",
        vendor_product_name: "",
        "win_gold-{>=}": "",
        "win_gold-{<}": "",
        "settlement_at-{>=}": "",
        "settlement_at-{<=}": "",
        "bet_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
        "bet_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
        page_count: 1,
        page_size: 10,
        coin_name_unique: "",
    };
    /**表单资料 */
    dialogData = {
        bShow: false,
        form: <any>{},
        log: <any>{
            columns: <any>{
                bet_id: {
                    name: "编号",
                    options: [],
                },
                data_belong: {
                    name: "数据归属标记",
                    options: [],
                },
                plat_id: {
                    name: "所属平台",
                    options: [],
                },
                user_id: {
                    name: "用户ID",
                    options: [],
                },
                subordinate_user_id: {
                    name: "下属用户ID",
                    options: [],
                },
                channel_id: {
                    name: "渠道ID",
                    options: [],
                },
                coin_name_unique: {
                    name: "币种",
                    options: [],
                },
                vendor_type: {
                    name: "游戏类型",
                    options: {},
                },
                order_no: {
                    name: "下注订单",
                    options: [],
                },
                bet_gold_coin: {
                    name: "投注金额",
                    options: [],
                },
                win_gold_coin: {
                    name: "输赢金额",
                    options: [],
                },
                backwater_coin: {
                    name: "用户返水",
                    options: [],
                },
                settlement_water_coin: {
                    name: "有效金额",
                    options: [],
                },
                valid_bet_gold_coin: {
                    name: "有效投注",
                    options: [],
                },
                settlement_at: {
                    name: "结算时间",
                    options: [],
                },
                credit_rate_self: {
                    name: "自己占成",
                    options: [],
                },
                credit_rate_invite: {
                    name: "上级占成",
                    options: [],
                },
                coin_rate_self: {
                    name: "我的金额比率",
                    options: [],
                },
                coin_rate_subordinate: {
                    name: "代理商金额比率",
                    options: [],
                },
                coin_rate_superior: {
                    name: "平台金额比率",
                    options: [],
                },
                coin_self: {
                    name: "我的金额",
                    options: [],
                },
                coin_subordinate: {
                    name: "代理商金额",
                    options: [],
                },
                coin_superior: {
                    name: "上级金额",
                    options: [],
                },
                water_config: {
                    name: "流水配置",
                    options: [],
                },
                backwater_config: {
                    name: "平台返水配置",
                    options: [],
                },
                settlement_water_coin_real: {
                    name: "结算返水",
                    options: [],
                },
                backwater_coin_real: {
                    name: "实际返水",
                    options: [],
                },
                created_by: {
                    name: "创建人",
                    options: [],
                },
                created_at: {
                    name: "创建时间",
                    options: [],
                },
                updated_by: {
                    name: "修改人",
                    options: [],
                },
                updated_at: {
                    name: "修改时间",
                    options: [],
                },
            },
            list: <any>[],
            pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
            listQuery: {
                page_count: 1,
                page_size: 20,
            },
        },
    };

    jsonEditorDialog = {
        bShow: false,
        data: <any>{},
    };

    /**显示弹窗 */
    showDialog(data: any) {
        Object.assign(this.dialogData, {
            bShow: true,
            data: JSON.parse(JSON.stringify(data)),
        });
        this.sendNotification(HttpType.admin_plat_users_bet_show, {
            plat_id: this.listQuery.plat_id,
            bet_id: data.bet_id,
        });
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**详细数据 */
    setDetail(data: any) {
        const { nick_name } = this.dialogData.form;
        if(data.game_info) {
            data.game_info = JSON.parse(data.game_info);
        }
        Object.assign(this.dialogData, {
            form: JSON.parse(JSON.stringify(data)),
        });
        Object.assign(this.dialogData.form, {
            nick_name,
        });
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /**设置表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.summary, data.summary);
        this.tableData.summary_coin = data.summary_coin;
    }
    /**重置查询数据 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            type: "",
            settlement_status: "",
            vendor_id: "",
            vendor_type: "",
            ori_product_id: "",
            vendor_product_name: "",
            "win_gold-{>=}": "",
            "win_gold-{<}": "",
            "settlement_at-{>=}": "",
            "settlement_at-{<=}": "",
            "bet_at-{>=}": dateFormat(getTodayOffset(), "yyyy-MM-dd hh:mm:ss"),
            "bet_at-{<=}": dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss"),
            coin_name_unique: "",
        });
        this.tableData.winLoss = "";
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_bet_index, objectRemoveNull(this.listQuery));
    }

    /**跳转详情 */
    showDetailPage(data: any) {
        const { plat_id, bet_id } = data;
        this.sendNotification(HttpType.admin_plat_users_bet_show_url, { plat_id, bet_id });
    }

    getCreditLogTableColumns() {
        this.sendNotification(HttpType.admin_plat_users_bet_credit_log_table_columns);
    }

    getCreditLogList() {
        const { order_no, plat_id } = this.dialogData.form;
        this.sendNotification(HttpType.admin_plat_users_bet_credit_log_index, { plat_id, order_no });
    }

    setCreditLogTableColumns(data: any) {
        Object.assign(this.dialogData.log.columns, data);
        this.getCreditLogList();
    }

    setCreditLogList(data: any) {
        this.dialogData.log.list.length = 0;
        this.dialogData.log.list.push(...data.list);
    }
}
