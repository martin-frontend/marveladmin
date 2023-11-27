import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_users_bet/setting";
import { MessageBox } from "element-ui";
import IPlatUsersBetProxy from "./IPlatUsersBetProxy";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";

export default class PlatUsersBetProxy extends AbstractProxy implements IPlatUsersBetProxy {
    static NAME = "PlatUsersBetProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_bet_table_columns);
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
            bet_id: { name: "用户投注明细ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            user_id: { name: "用户ID", options: [] },
            is_credit_user: { name: "用户类型", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            gold_scale: { name: "币种汇率", options: [] },
            plat_id: { name: "所属平台", options: {} },
            channel_id: { name: "渠道ID", options: [] },
            vendor_id: { name: "产品厂商", options: {} },
            vendor_product_id: { name: "产品ID", options: [] },
            ori_product_id: { name: "产品ID[厂商]", options: [] },
            vendor_product_name: { name: "游戏名称", options: [] },
            vendor_type: { name: "游戏类型", options: {} },
            order_no: { name: "下注订单", options: [] },
            game_round_no: { name: "游戏局数号", options: [] },
            win_gold: { name: "输赢金额", options: [] },
            settlement_status: { name: "投注状态", options: {} },
            settlement_at: { name: "结算时间", options: [] },
            could_resettlement: { name: "可能重结", options: [] },
            resettlement_status: { name: "重结状态", options: ["否", "是"] },
            resettlement_version: { name: "重结版本", options: [] },
            bet_gold: { name: "投注金额", options: [] },
            bet_at: { name: "投注时间", options: [] },
            valid_bet_gold: { name: "有效投注", options: [] },
            bonus_gold: { name: "彩金", options: [] },
            data_part: { name: "数据组成", options: [] },
            settlement_water: { name: "结算流水", options: [] },
            water_type: { name: "流水结算方式", options: {} },
            water_rate: { name: "流水结算比例", options: [] },
            water_rate_except_user: { name: "流水结算比例[不包含用户配置]", options: [] },
            water_rate_game: { name: "流水结算比例[不包含用户配置和平台配置]", options: [] },
            water_rate_accelerate: { name: "流水结算加速比例", options: [] },
            water: { name: "用户流水", options: [] },
            water_except_user: { name: "用户流水[不包含用户配置]", options: [] },
            water_game: { name: "用户流水[不包含用户配置和平台配置]", options: [] },
            water_accelerate: { name: "用户加速流水", options: [] },
            water_accelerate_except_user: { name: "用户加速流水[不包含用户配置]", options: [] },
            water_accelerate_game: { name: "用户加速流水[不包含用户配置和平台配置]", options: [] },
            is_settlement_backwater: { name: "是否已结算反水", options: ["否", "是"] },
            backwater_rate: { name: "挖矿比率", options: [] },
            backwater: { name: "用户返水", options: [] },
            backwater_except_user: { name: "用户返水[不包含用户配置]", options: [] },
            backwater_game: { name: "[足球]有效投注", options: [] },
            backwater_id: { name: "数据组成", options: [] },
            promotion_type: { name: "推广类型", options: ["未开启", "无限代", "无限代不算自营"] },
            commission_at: { name: "佣金结算时间", options: [] },
            pull_at: { name: "拉取时间", options: [] },
            bet_gold_coin: { name: "投注金额", options: [] },
            valid_bet_gold_coin: { name: "有效投注", options: [] },
            bonus_gold_coin: { name: "彩金", options: [] },
            win_gold_coin: { name: "输赢金额", options: [] },
            settlement_water_coin: { name: "结算流水", options: [] },
            water_coin: { name: "用户流水", options: [] },
            water_except_user_coin: { name: "用户流水[不包含用户配置]", options: [] },
            water_game_coin: { name: "用户流水[不包含用户配置和平台配置]", options: [] },
            backwater_coin: { name: "用户返水", options: [] },
            backwater_except_user_coin: { name: "用户返水[不包含用户配置]", options: [] },
            backwater_game_coin: { name: "[足球]有效投注", options: [] },
            water_accelerate_coin: { name: "用户加速流水", options: [] },
            credit_rate_info: { name: "信誉占比信息", options: [] },
            has_credit_rate_log: { name: "是否生成信誉占比日志", options: ["否", "是", "不需要"] },
            backwater_config: { name: "平台返水配置", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            updated_at: { name: "修改时间", options: [] },
            game_info: { name: "当前局的游戏信息", options: [] },
            nick_name: { name: "用户昵称", options: [] },
            username: { name: "用户账号", options: [] },
            agent_user_id: { name: "代理ID" },
            bet_code: { name: "下注内容" },
            bet_result: { name: "下注结果" },
            league: { name: LangUtil("联赛") },
            market_type_text: { name: LangUtil("盘口") },
            odds: { name: LangUtil("赔率") },
            vendor_order_no: { name: "厂商订单", options: [] },
            vendor_coin_name_unicode: { name: "厂商币种", options: [] },
            vendor_win_gold: { name: "厂商输赢", options: [] },
            sports_type: { name: '体育类型', options: {} },
            bet_score: { name: '滚球比分', options: {} },
            is_inplay: { name: LangUtil("滚球") },
            combo: { name: LangUtil("串关"), options: {} },
            combo_detail: { name: LangUtil("串关详情"), options: {} },
            game_valid_bet_gold: { name: '游戏有效投注', options: {} },
            game_valid_bet_gold_coin: { name: '游戏有效投注', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            bet_gold: "",
            settlement_water: "",
            valid_bet_gold: "",
            game_valid_bet_gold: "",
            water: "",
            win_gold: "",
            water_accelerate: "",
            backwater: "",
            total_bet_user_num: "",
        },
        summary_coin: [],
        task_coin_summary: {
            bet_gold: "",
            settlement_water: "",
            valid_bet_gold: "",
            game_valid_bet_gold: "",
            water: "",
            win_gold: "",
            water_accelerate: "",
            backwater: "",
            total_bet_user_num: "",
        },
    };
    /**查询条件 */
    listQuery = {
        agent_user_id: "",
        plat_id: "",
        "settlement_at-{>=}": "",
        "settlement_at-{<=}": "",
        "bet_at-{>=}": dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
        "bet_at-{<=}": dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
        user_id: "",
        nick_name: "",
        order_no: "",
        vendor_id: "",
        vendor_type: "",
        settlement_status: "",
        ori_product_id: "",
        vendor_product_name: "",
        page_count: 1,
        page_size: 20,
        "win_gold-{>=}": <any>"",
        "win_gold-{<}": <any>"",
        coin_name_unique: "",
        username: "",
        is_credit_user: "",
        resettlement_status: "",
        is_export: false,
        vendor_order_no: "",
        channel_id: "",
        sports_type: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: <any>{},
        log: <any>{
            columns: <any>{
                bet_id: { name: "编号", options: [] },
                data_belong: { name: "数据归属标记", options: [] },
                plat_id: { name: "所属平台", options: [] },
                user_id: { name: "用户ID", options: [] },
                subordinate_user_id: { name: "下属用户ID", options: [] },
                channel_id: { name: "渠道ID", options: [] },
                coin_name_unique: { name: "币种", options: [] },
                vendor_type: { name: "游戏类型", options: {} },
                order_no: { name: "下注订单", options: [] },
                bet_gold_coin: { name: "投注金额", options: [] },
                win_gold_coin: { name: "输赢金额", options: [] },
                backwater_coin: { name: "用户返水", options: [] },
                settlement_water_coin: { name: "有效金额", options: [] },
                valid_bet_gold_coin: { name: "有效投注", options: [] },
                settlement_at: { name: "结算时间", options: [] },
                credit_rate_self: { name: "自己占成", options: [] },
                credit_rate_invite: { name: "上级占成", options: [] },
                coin_rate_self: { name: "我的金额比率", options: [] },
                coin_rate_subordinate: { name: "代理商金额比率", options: [] },
                coin_rate_superior: { name: "平台金额比率", options: [] },
                coin_self: { name: "我的金额", options: [] },
                coin_subordinate: { name: "代理商金额", options: [] },
                coin_superior: { name: "上级金额", options: [] },
                water_config: { name: "流水配置", options: [] },
                backwater_config: { name: "平台返水配置", options: [] },
                settlement_water_coin_real: { name: "结算返水", options: [] },
                backwater_coin_real: { name: "实际返水", options: [] },
                created_by: { name: "创建人", options: [] },
                created_at: { name: "创建时间", options: [] },
                updated_by: { name: "修改人", options: [] },
                updated_at: { name: "修改时间", options: [] },
            },
            list: <any>[],
            pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
            listQuery: {
                page_count: 1,
                page_size: 20,
            },
        },
        trun_bet_detail_text: <any>0,
    };

    dialogMultiData = {
        bShow: false,
        list: <any>[],
    }

    jsonEditorDialog = {
        bShow: false,
        data: <any>{},
    };

    statisticDialog = {
        list: <any>[],
        bShow: false,
        form: <any>{},
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "vendor_id",
            "plat_id",
            "channel_id",
            "user_id",
            "is_credit_user",
            "nick_name",
            "vendor_product_name",
            "vendor_type",
            "sports_type",
            "bet_score",
            "order_no",
            "coin_name_unique",
            "bet_gold_coin",
            "game_valid_bet_gold_coin",
            "valid_bet_gold_coin",
            "win_gold_coin",
            "settlement_water_coin",
            "water_coin",
            "win_gold",
            "bet_at",
            "settlement_at",
            "pull_at",
            "is_inplay",
            "bet_gold",
            "league",
            "bet_code",
            "bet_result",
            "market_type_text",
            "odds",
            "game_valid_bet_gold",
            "valid_bet_gold",
            "water_type",
            "water_rate",
            "water",
            "water_accelerate",
            "water_rate_accelerate",
            "backwater",
            "settlement_status",
            "combo_detail",
        ],
    };

    exportData = {
        fieldOrder: <any>[],
        stop: false,
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        exportCount: 1,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
        isSearch: true,
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.tableData.columns.win_gold.name = LangUtil("输赢金额$");
        // this.tableData.columns.valid_bet_gold.name = LangUtil("有效投注$");
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
        const { bet_gold, valid_bet_gold, water, win_gold, water_accelerate } = data.summary;
        Object.assign(this.tableData.summary, data.summary);
        Object.assign(this.tableData.task_coin_summary, data.task_coin_summary);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.summary_coin = data.summary_coin;
    }
    /**详细数据 */
    setDetail(data: any) {
        const { nick_name } = this.dialogData.form;
        if (data.game_info) {
            data.game_info = JSON.parse(data.game_info);
        }
        Object.assign(this.dialogData, {
            form: JSON.parse(JSON.stringify(data)),
        });
        Object.assign(this.dialogData.form, {
            nick_name,
        });
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            agent_user_id: "",
            "settlement_at-{>=}": "",
            "settlement_at-{<=}": "",
            "bet_at-{>=}": dateFormat(new Date(), "yyyy-MM-dd 00:00:00"),
            "bet_at-{<=}": dateFormat(new Date(), "yyyy-MM-dd 23:59:59"),
            user_id: "",
            nick_name: "",
            order_no: "",
            vendor_id: "",
            vendor_type: "",
            settlement_status: "",
            ori_product_id: "",
            vendor_product_name: "",
            "win_gold-{>=}": "",
            "win_gold-{<}": "",
            coin_name_unique: "",
            username: "",
            is_credit_user: "",
            resettlement_status: "",
            vendor_order_no: "",
            channel_id: "",
            sports_type: "",
        });
    }

    /**取得excel 挡案名称 */
    get getExcelOutputName() {
        let times = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
        let name: string =
            LangUtil("投注明细") + "-" + times + "-" + this.tableData.columns.plat_id.options[this.listQuery.plat_id];

        //return `${name}-${this.listQuery["bet_at-{>=}"]}～${this.listQuery["bet_at-{<=}"]}`;
        return name;
    }
    // _gameKeyList = [
    //     "vendor_id",
    //     "user_id",
    //     "is_credit_user",
    //     "nick_name",
    //     "vendor_product_name",
    //     "vendor_type",
    //     "order_no",
    //     "coin_name_unique",
    //     "win_gold",
    //     "bet_at",
    //     "settlement_at",
    //     "pull_at",
    //     "league",
    //     "bet_code",
    //     "market_type_text",
    //     "odds",
    //     "bet_gold",
    //     "valid_bet_gold",
    //     "water",
    //     "settlement_status",
    // ];

    /**取得当前页签导出栏位顺序 */
    // get curKeyList() {
    //     return this._gameKeyList;
    // }
    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        this.exportData.isSearch = false;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.is_export = true;
        if (!queryCopy.plat_id) {
            queryCopy.plat_id = "0";
        }
        this.sendNotification(HttpType.admin_plat_users_bet_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent % 20 == 0) {
            this.exportExcel();
            this.exportData.list = [];
            this.exportData.exportCount++;
            this.onQueryExportData();
        } else if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
        // if (pageCurrent < pageCount) {
        //     this.onQueryExportData();
        // } else {
        //     this.exportExcel();
        //     this.resetExportData(500);
        // }
    }

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list)) as any[];

        let maxComboListLength = 0;
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].combo_list && newData[i].combo_list.length) {
                const comboListLength = newData[i].combo_list.length;
                if (comboListLength > maxComboListLength) {
                    maxComboListLength = comboListLength;
                }
            }
        }
        const length = maxComboListLength; // 串关最大值
        const comboList: any[] = Array.from({ length }).map((_, index) => index + 1); // [1,2,3]
        const combo = this.tableData.columns?.combo ?? { name: "" };


        // 新增串关栏位
        const list = newData.map(i => ({
            ...i,
            ...comboList.reduce(
                (prev, cur) => ({
                    ...prev,
                    [`combo_${cur}`]: "",
                }),
                {}
            ),
        }));

        let exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        list.forEach(element => {
            element.vendor_id = this.tableData.columns.vendor_id.options[this.listQuery.plat_id][element.vendor_id]
            element.coin_name_unique = this.converCoinName(element.coin_name_unique);
            if (element.sports_type == 0) {
                element.sports_type = "-";
            } else {
                let sports_type = '';
                for (let i = 0; i < element.sports_type.split('|').length; i++) {
                    sports_type =
                        sports_type + this.tableData.columns.sports_type.options[element.sports_type.split('|')[i]];
                    if (i + 1 != element.sports_type.split('|').length) {
                        sports_type = sports_type + 'x';
                    }
                }
                element.sports_type = sports_type;
            }
            if (!element.bet_score) {
                element.bet_score = "-";
            }
            if (exportField.includes("combo_detail")) {
                if (element.combo_list && element.combo_list.length) {
                    for (let i = 0; i < element.combo_list.length; i++) {
                        element[`combo_${i + 1}`] =
                            LangUtil('投注赔率') + ':' + element.combo_list[i].odds + '|' +
                            LangUtil('盘口玩法') + ':' + element.combo_list[i].market_type_text + '|' +
                            LangUtil('投注内容') + ':' + element.combo_list[i].content + '|' +
                            LangUtil('赛果') + ':' + element.combo_list[i].win_type + '|' +
                            LangUtil('联赛名称') + ':' + element.combo_list[i].competition_name + '|' +
                            LangUtil('比赛队伍') + ':' + element.combo_list[i].home_name + '-' + element.combo_list[i].away_name + '|' +
                            LangUtil('开赛时间') + ':' + element.combo_list[i].start_time;
                    }
                }
            }
        });

        if (exportField.includes("combo_detail")) {
            exportField = exportField.filter(e => e !== "combo_detail");
            // 串关表头
            const comboFields = comboList.reduce(
                (prev: any, cur: any) => ({
                    ...prev,
                    [`combo_${cur}`]: { name: `${combo?.name}${cur}`, options: {} },
                }),
                {}
            );

            const combo_fields_keys = comboList.map(i => `combo_${i}`);
            exportField = [
                ...exportField, ...combo_fields_keys
            ];

            new BaseInfo.ExportExcel(
                `${this.getExcelOutputName}`,
                exportField,
                { ...this.tableData.columns, ...comboFields },
                list,
                ["plat_id", "is_credit_user", "vendor_type", "settlement_status"],
                []
            );
        } else {
            new BaseInfo.ExportExcel(
                `${this.getExcelOutputName}`,
                exportField,
                this.tableData.columns,
                list,
                ["plat_id", "is_credit_user", "vendor_type", "settlement_status"],
                []
            );
        }
    }

    /**增加合计数据 */
    addSummary(data: any) {
        let summary = {
            user_id: "汇总",
            bet_gold: data.summary.bet_gold,
            settlement_water: data.summary.settlement_water,
            valid_bet_gold: data.summary.valid_bet_gold,
            water: data.summary.water,
            win_gold: data.summary.win_gold,
            water_accelerate: data.summary.water_accelerate,
        };

        data.list.unshift(summary);
        return data.list;
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        Object.assign(this.dialogData, {
            bShow: true,
            form: JSON.parse(JSON.stringify(data)),
        });
        this.sendNotification(HttpType.admin_plat_users_bet_show, { plat_id: data.plat_id, bet_id: data.bet_id });
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    hideMultiDetailDialog() {
        this.dialogMultiData.bShow = false;
    }

    /**查询 */
    onQuery() {
        const query = JSON.parse(JSON.stringify(this.listQuery));
        if (!query.plat_id) {
            query.plat_id = "0";
        }
        delete query.is_export;
        this.sendNotification(HttpType.admin_plat_users_bet_index, objectRemoveNull(query));
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            this.exportData.exportCount = 1;
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("今日"),
                onClick(picker: any) {
                    const start = getTodayOffset();
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("昨日"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近60天"),
                onClick(picker: any) {
                    const start = getTodayOffset(-60);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    /**显示用户详情弹窗 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    showMultiDetail(data: any) {
        this.dialogMultiData.list.length = 0;
        this.dialogMultiData.list.push(...data);
        this.dialogMultiData.bShow = true;
    }

    /**跳转详情 */
    showDetailPage(data: any) {
        const { plat_id, bet_id } = data;
        this.dialogData.trun_bet_detail_text = data.trun_bet_detail_text || 0;
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

    /**统计 */
    admin_plat_users_bet_vendors() {
        this.sendNotification(HttpType.admin_plat_users_bet_vendors, objectRemoveNull(this.listQuery));
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    showStatisticDialog(data: any) {
        this.statisticDialog.list.length = 0;
        this.statisticDialog.list.push(...data);
        this.statisticDialog.bShow = true;
    }

    //@ts-ignore
    lottTranslator = lottTranslator;

    converCoinName(coinKey: any) {
        return this.tableData.columns.coin_name_unique.options[this.listQuery.plat_id][coinKey];
    }
}
