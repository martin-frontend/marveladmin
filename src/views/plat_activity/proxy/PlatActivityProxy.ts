import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, getTodayOffset, formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity/setting";
import { MessageBox, TableColumn } from "element-ui";
import IPlatActivityProxy from "./IPlatActivityProxy";
import i18n from "@/lang";
import Cookies from "js-cookie";
import ExchangeOrdersProxy from "@/views/exchange_orders/proxy/ExchangeOrdersProxy";

export default class PlatActivityProxy extends AbstractProxy implements IPlatActivityProxy {
    static NAME = "PlatActivityProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_table_columns);
        this.sendNotification(HttpType.admin_plat_activity_condition_table_columns);
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
    tableData = <any>{
        columns: {
            active_model_tag: { name: "", options: {} },
            activity_category: { name: "活动分类", options: {} },
            activity_desc: { name: "活动描述", options: {} },
            activity_name: { name: "活动名称", options: {} },
            all_coin: { name: "所有币种", options: {} },
            award_timing: { name: "派奖时间点", options: {} },
            award_timing_map: { name: "派奖时间点", options: {} },
            award_tpl: { name: "派奖内容模版", options: {} },
            award_type: { name: "派奖方式", options: {} },
            award_type_map: { name: "派奖方式", options: {} },
            bonus_multiple: { name: "提现流水倍数", options: {} },
            channel_ids: { name: "关联渠道", options: {} },
            channel_type: { name: "所选渠道", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            end_time: { name: "结束时间", options: {} },
            extend: { name: "扩展信息", options: {} },
            icon: { name: "活动图标", options: {} },
            id: { name: "活动ID", options: {} },
            index_no: { name: "排序值", options: {} },
            is_once: { name: "是否永久", options: {} },
            is_preheat: { name: "是否预热", options: {} },
            link_url: { name: "链接地址", options: {} },
            model_category: { name: "模型分类", options: {} },
            model_id: { name: "模型", options: {} },
            model_open_mode: { name: "打开模块", options: {} },
            model_rules_num: { name: "规则数量", options: {} },
            model_type: { name: "模型类型", options: {} },
            open_mode_url: { name: "模块跳转网页", options: {} },
            plat_id: { name: "所属平台", options: {} },
            process_status: { name: "流程状态", options: {} },
            public_child_rules: { name: "公共子规则ID", options: {} },
            publish_status: { name: "发布状态", options: {} },
            rules: { name: "匹配规则", options: {} },
            settlement_period: { name: "结算周期", options: {} },
            settlement_type: { name: "结算方式", options: {} },
            show_type: { name: "展示方式", options: {} },
            start_time: { name: "开始时间", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            reward_coin: { name: "", options: {} },
            languages: { name: "", options: {} },
            activity_coin: { name: "活动币", options: {} },
            activity_coin_task: { name: "活动币任务", options: {} },
            extended_task_type: { name: "扩展任务类型", options: {} },
            process_control: { name: "流程控制", options: {} },
            daily_ratio: { name: "", options: <any>{} },
            rule_desc: { name: "", options: <any>{} },
            vendor_id: { name: "厂商ID", options: {} },
            vendor_ids: { name: "", options: {} },
            show_end_time: { name: "展示-结束时间", options: {} },
            show_start_time: { name: "展示-开始时间", options: {} },
            prize_pool_amount: { name: "奖池金额", options: {} },
            user_term: { name: "用户期限", options: {} },
            every_point_cycle_condition_type: { name: '循环任务-条件', options: {} },
            every_point_every_condition_type: { name: '每日任务-条件', options: {} },
            every_point_routine_condition_type: { name: '普通任务-条件', options: {} },
            rank_type: { name: '排行榜类型', options: {} },
            lowest_score: { name: '最低分数', options: {} },
            vendor_product_id: { name: '指定游戏', options: {} },
            vendor_type: { name: '游戏类型', options: {} },
        },
        orderData: {
            id: "",
            opt: "", //操作:1-置顶 |2-置底 |3-上调 |4-下调
            plat_id: "",
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        lang: "zh",
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "start_time-{<=}": "",
        "end_time-{>=}": "",
        activity_name: "",
        id: "",
        model_category: "",
        publish_status: "",
        process_status: "",
        model_type: "",
        languages: "",
    };

    defaultForm = {
        id: null,
        plat_id: "",
        activity_name: "",
        activity_category: "",
        is_preheat: 0,
        start_time: "",
        end_time: "",
        model_open_mode: 1,
        open_mode_url: "",
        open_model_url: "",
        settlement_type: "",
        award_type: "",
        award_types: [],
        bonus_multiple: 1,
        type: "2",
        model_id: "",
        link_url: "",
        link_url_url: "",
        settlement_period: "",
        des: "",
        show_types: [],
        daily_ratio: [],
        show_type: <any>2,
        is_once: "",
        rules: <any>[],
        award_tpl: "",
        award_type_map: "",
        award_timing_map: "",
        icon: "",
        icon_url: "",
        extended_task_type: "",
        task_days: "",
        task_water_rate_2: "",
        task_water_rate_4: "",
        task_water_rate_8: "",
        task_water_rate_16: "",
        task_water_rate_32: "",
        task_water_rate_64: "",
        task_water_rate_128: "",
        activity_coin_task: <any>{},
        process_control: 1,
        rule_desc: "",
        active_model_tag: "",
        vendorArr: <any>[],
        transfer_amount_rate_Arr: <any>[],
        show_end_time: "",
        show_start_time: "",
        model_type: 0, // 模版的类型

        init_prize_pool: "",
        prize_pool_add: "",
        update_cycle_types: <any>[],
        day_init_num: 0,
        update_cycle_type: 0,

        lottery_cons: <any>[],
        lottery_award: <any>[],
        ball_award: <any>[],
        rank_award: <any>[],
        day_num_init_config: <any>[],
        every_task: [],          // 每日任务
        cycle_task: [],          // 循环任务
        point_lottery_cons: [],  // 抽奖消耗
        point_lottery_award: [], // 抽奖奖励
        routine_task: [],        // 普通任务
        user_term: "",
        coin_unique: "", // 活動幣種
        rank_type: "",
        lowest_score: "",
        vendor_id: "",
        vendor_product_id: "",
        vendor_type: "",
    };

    conditionDefaultForm = {
        show_type: "",
        register_time_type: "",
        register_start_time: dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
        register_end_time: dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
        assign_is_all: false,
        assign_is_user: false,
        assign_user: "",
        assign_is_agent: false,
        assign_agent_user_id: "",
        assign_agent_type: 1,
        assign_is_tag: false,
        assign_tag: "",
        assign_is_channel: false,
        assign_channel: "",
        remove_is_user: false,
        remove_user: "",
        remove_is_agent: false,
        remove_agent_user_id: "",
        remove_agent_type: 1,
        remove_is_tag: false,
        remove_tag: "",
        remove_is_channel: false,
        remove_channel: "",
        condition_unique_ip: false,
        condition_unique_device: false,
    }

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        copy: false,
        status: DialogStatus.create,
        form: JSON.parse(JSON.stringify(this.defaultForm)),
        excelColumnInfo: {
            userid: { name: "userid", options: {} },
        },
        excelChannelColumnInfo: {
            channelid: { name: "channelid", options: {} },
        },
        conditionForm: JSON.parse(JSON.stringify(this.conditionDefaultForm)),
        activityModelList: [],
        formSource: <any>null, // 表单的原始数据
        fileList: <any>[{ url: "" }],
        fileList1: <any>[{ url: "" }],
        uploadType: "",
        update: 0,
        columns: <any>{
            activity_id: { name: '活动id', options: {} },
            assign_agent_type: { name: '代理类型', options: {} },
            assign_agent_user_id: { name: '代理id', options: {} },
            assign_channel: { name: '指定渠道', options: {} },
            assign_is_agent: { name: '是否指定代理', options: {} },
            assign_is_all: { name: '参与用户', options: {} },
            assign_is_channel: { name: '是否指定渠道', options: {} },
            assign_is_tag: { name: '是否指定标签', options: {} },
            assign_is_user: { name: '是否指定用户', options: {} },
            assign_tag: { name: '指定标签', options: {} },
            assign_user: { name: '指定用户', options: {} },
            condition_unique_device: { name: '唯一登入设备号', options: {} },
            condition_unique_ip: { name: '唯一登录ip', options: {} },
            plat_id: { name: '平台id', options: {} },
            register_end_time: { name: '注册结束时间', options: {} },
            register_start_time: { name: '注册开始时间', options: {} },
            register_time_type: { name: '玩家注册时间类型', options: {} },
            remove_agent_type: { name: '排除代理类型', options: {} },
            remove_agent_user_id: { name: '排除代理', options: {} },
            remove_channel: { name: '排除渠道', options: {} },
            remove_is_agent: { name: '是否排除代理', options: {} },
            remove_is_channel: { name: '是否排除渠道', options: {} },
            remove_is_tag: { name: '是否排除标签', options: {} },
            remove_is_user: { name: '是否排除用户', options: {} },
            remove_tag: { name: '排除标签', options: {} },
            remove_user: { name: '排除用户', options: {} },
            show_type: { name: '前台展示类型', options: {} },
        }
    };

    /**弹窗相关数据 */
    dialogLanguagesData = {
        bShow: false,
        status: DialogStatus.update,
        form: <any>{
            languages: [],
        },
        formSource: <any>null, // 表单的原始数据
    };

    /**活动 数据 */
    activeModelData = {
        options: <any>[],
        data: {},
        ruleList: [],
    };

    /**activity:活动设置, condition:条件设置*/
    editTabsActivity = "activity";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const model_type_options_keys = Object.keys(this.tableData.columns.model_type.options);

        if (plat_id_options_keys.length > 0 && model_type_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (!model_type_options_keys.includes(this.listQuery.model_type)) {
                this.listQuery.model_type = model_type_options_keys[0];
            }
            this.onQuery();
            this.getPlatActivityRule();
            this.tableData.lang = Cookies.get("language") || "zh";
        }
    }

    setDialogColumns(data: any) {
        Object.assign(this.dialogData.columns, data);
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        // 取 模板描述
        if (data.model_id != 0) {
            this.getModelDetail(data.model_id);
        }

        this.dialogData.form.transfer_amount_rate_Arr = [];
        if (data.extended_task_type == 2) {
            this.dialogData.form.task_days = data.extend.task_days;
            this.dialogData.form.task_water_rate_2 = data.extend.task_water_rate_2;
            this.dialogData.form.task_water_rate_4 = data.extend.task_water_rate_4;
            this.dialogData.form.task_water_rate_8 = data.extend.task_water_rate_8;
            this.dialogData.form.task_water_rate_16 = data.extend.task_water_rate_16;
            this.dialogData.form.task_water_rate_32 = data.extend.task_water_rate_32;
            this.dialogData.form.task_water_rate_64 = data.extend.task_water_rate_64;
            this.dialogData.form.task_water_rate_128 = data.extend.task_water_rate_128;
            const keys = Object.keys(data.extend.transfer_amount_rate_in_activity);
            keys.forEach(key => {
                this.dialogData.form.transfer_amount_rate_Arr.push(data.extend.transfer_amount_rate_in_activity[key]);
            });
        }
        this.dialogData.formSource["award_type_map"] = this.dialogData.form.award_type_map;
        this.dialogData.formSource["award_timing_map"] = this.dialogData.form.award_timing_map;
        this.dialogData.formSource["type"] = this.dialogData.form.type;
        this.dialogData.formSource["open_model_url"] = this.dialogData.form.open_model_url;
        this.dialogData.formSource["award_types"] = this.dialogData.form.award_types;
        this.dialogData.formSource["show_types"] = this.dialogData.form.show_types;
        this.dialogData.formSource["daily_ratio"] = this.dialogData.form.daily_ratio;
        this.dialogData.formSource["des"] = this.dialogData.form.des;
        this.dialogData.form.plat_id = this.dialogData.form.plat_id.toString();
        this.dialogData.fileList[0].url = this.dialogData.form.link_url_url;
        this.dialogData.fileList1[0].url = this.dialogData.form.icon_url;
        if (this.dialogData.form.rules && data.model_type != 12 && data.model_type != 13 && data.model_type != 14 && this.dialogData.form.model_type != 15) {
            for (const item of this.dialogData.form.rules) {
                if (item.list) {
                    for (const child of item.list) {
                        if (child.list)
                            for (const child_1 of child.list) {
                                if ((child_1.type == 1 &&
                                    child_1.rule_id
                                    == 93) || (child_1.type == 1 &&
                                        child_1.rule_id
                                        == 94)) {
                                    child_1.params = child_1.params.split(',')
                                }
                                if (child_1.coin_type && child_1.type == "61" && child_1.params_type == 5) {
                                    if (this.getRuleInfo(child_1).key_value_type == 2) {
                                        if (!child_1.params) {
                                            child_1.params = {};
                                        }

                                        for (const iterator of child_1.params) {
                                            if (!iterator.percent) {
                                                iterator.percent = 0;
                                            }
                                            if (!iterator.max_limit) {
                                                iterator.max_limit = 0;
                                            }
                                        }
                                    }
                                }
                            }
                    }
                }
            }
        }
        else {
            if (data.model_type == 12) {
                this.setBallAwardData(data);
            }
            else if (data.model_type == 13) {
                this.setSpinAwardData(data);
            }
            else if (data.model_type == 14) {
                this.setActivityLotteryAwardData(data);
            }
            else if (data.model_type == 15) {
                this.setActivityRankingAwardData(data);
            }
        }
    }

    setConditionDetail(data: any) {
        Object.assign(this.dialogData.conditionForm, JSON.parse(JSON.stringify(data)));
        this.dialogData.conditionForm.assign_is_all = this.dialogData.conditionForm.assign_is_all == 1 ? true : false;
        this.dialogData.conditionForm.assign_is_user = this.dialogData.conditionForm.assign_is_user == 1 ? true : false;
        this.dialogData.conditionForm.assign_is_agent = this.dialogData.conditionForm.assign_is_agent == 1 ? true : false;
        this.dialogData.conditionForm.assign_is_tag = this.dialogData.conditionForm.assign_is_tag == 1 ? true : false;
        this.dialogData.conditionForm.assign_is_channel = this.dialogData.conditionForm.assign_is_channel == 1 ? true : false;
        this.dialogData.conditionForm.remove_is_user = this.dialogData.conditionForm.remove_is_user == 1 ? true : false;
        this.dialogData.conditionForm.remove_is_agent = this.dialogData.conditionForm.remove_is_agent == 1 ? true : false;
        this.dialogData.conditionForm.remove_is_tag = this.dialogData.conditionForm.remove_is_tag == 1 ? true : false;
        this.dialogData.conditionForm.remove_is_channel = this.dialogData.conditionForm.remove_is_channel == 1 ? true : false;
        this.dialogData.conditionForm.condition_unique_ip = this.dialogData.conditionForm.condition_unique_ip == 1 ? true : false;
        this.dialogData.conditionForm.condition_unique_device = this.dialogData.conditionForm.condition_unique_device == 1 ? true : false;
        // 指定标签
        const assignTagArr: any = [];
        if (data.assign_tag) {
            const arr = data.assign_tag.split(",");
            // @ts-ignore
            arr.forEach(tag => {
                if (this.dialogData.columns.assign_tag.options[data.plat_id][Number(tag)]) {
                    assignTagArr.push(tag);
                }
            });
        }
        this.dialogData.conditionForm.assign_tag = assignTagArr;
        // 排除标签
        const removeTagArr: any = [];
        if (data.remove_tag) {
            const arr = data.remove_tag.split(",");
            // @ts-ignore
            arr.forEach(tag => {
                if (this.dialogData.columns.assign_tag.options[data.plat_id][Number(tag)]) {
                    removeTagArr.push(tag);
                }
            });
        }
        this.dialogData.conditionForm.remove_tag = removeTagArr;
        // 指定渠道
        // const assignChannelArr: any = [];
        // if (data.assign_channel) {
        //     const arr = data.assign_channel.split(",");
        //     // @ts-ignore
        //     arr.forEach(tag => {
        //         if (this.dialogData.columns.assign_channel.options[data.plat_id][Number(tag)]) {
        //             assignChannelArr.push(tag);
        //         }
        //     });
        // }
        // this.dialogData.conditionForm.assign_channel = assignChannelArr;
        // 排除渠道
        // const removeChannelArr: any = [];
        // if (data.remove_channel) {
        //     const arr = data.remove_channel.split(",");
        //     // @ts-ignore
        //     arr.forEach(tag => {
        //         if (this.dialogData.columns.assign_channel.options[data.plat_id][Number(tag)]) {
        //             removeChannelArr.push(tag);
        //         }
        //     });
        // }
        // this.dialogData.conditionForm.remove_channel = removeChannelArr;
    }

    setBallAwardData(data: any) {
        this.dialogData.form.init_prize_pool = data.init_prize_pool;
        this.dialogData.form.prize_pool_add = data.prize_pool_add;
        this.dialogData.form.day_init_num = data.day_init_num;
        this.dialogData.form.update_cycle_types = JSON.parse(JSON.stringify(data.update_cycle_types));
        this.dialogData.form.update_cycle_type = data.update_cycle_types[0];
        this.dialogData.form.lottery_cons = JSON.parse(JSON.stringify(data.lottery_cons));
        this.dialogData.form.lottery_award = JSON.parse(JSON.stringify(data.lottery_award));
        this.dialogData.form.ball_award = JSON.parse(JSON.stringify(data.ball_award));
        this.dialogData.form.rank_award = JSON.parse(JSON.stringify(data.rank_award));
        this.dialogData.form.day_num_init_config = JSON.parse(JSON.stringify(data.day_num_init_config));
    }

    setSpinAwardData(data: any) {
        this.dialogData.form.lottery_cons = JSON.parse(JSON.stringify(data.lottery_cons));
        this.dialogData.form.lottery_award = JSON.parse(JSON.stringify(data.lottery_award));
    }

    setActivityLotteryAwardData(data: any) {
        this.dialogData.form.every_task = JSON.parse(JSON.stringify(data.every_task));
        this.dialogData.form.cycle_task = JSON.parse(JSON.stringify(data.cycle_task));
        this.dialogData.form.point_lottery_cons = JSON.parse(JSON.stringify(data.point_lottery_cons));
        this.dialogData.form.point_lottery_award = JSON.parse(JSON.stringify(data.point_lottery_award));
        this.dialogData.form.routine_task = JSON.parse(JSON.stringify(data.routine_task));
    }

    setActivityRankingAwardData(data: any) {
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            page_count: 1,
            page_size: 20,
            "start_time-{<=}": "",
            "end_time-{>=}": "",
            activity_name: "",
            id: "",
            model_category: "",
            publish_status: "",
            process_status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.type = this.dialogData.form.model_id ? "1" : "2";
            this.dialogData.form.model_id = this.dialogData.form.model_id.toString();

            this.sendNotification(HttpType.admin_plat_activity_show, { id: data.id });
            this.sendNotification(HttpType.admin_plat_activity_condition_show, { id: data.id });
            this.getActivityModel({
                page_count: 1,
                page_size: 20000,
                plat_id: data.plat_id,
            });
        } else {
            this.resetDialogForm();
            this.resetConditionForm();
            this.dialogData.formSource = null;
        }
    }

    /** 显示复制模版 */
    showCopyDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.dialogData.copy = true;
        this.resetDialogForm();
        this.resetConditionForm();
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        this.dialogData.form.type = this.dialogData.form.model_id ? "1" : "2";
        this.dialogData.form.model_id = this.dialogData.form.model_id.toString();
        this.sendNotification(HttpType.admin_plat_activity_show, { id: data.id });
        this.sendNotification(HttpType.admin_plat_activity_condition_show, { id: data.id });
        this.getActivityModel({
            page_count: 1,
            page_size: 20000,
            plat_id: data.plat_id,
        });
        this.dialogData.formSource = null;
    }

    /**显示弹窗 */
    showLanguagesDialog(status: string, data?: any) {
        this.dialogLanguagesData.bShow = true;

        if (status == DialogStatus.update) {
            this.dialogLanguagesData.formSource = data;
            Object.assign(this.dialogLanguagesData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.dialogLanguagesData.form.languages = [];
            this.dialogLanguagesData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**隐藏弹窗 */
    hideLanguagesDialog() {
        this.dialogLanguagesData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        this.dialogData.form = JSON.parse(JSON.stringify(this.defaultForm));
        this.activeModelData.options.length = 0;
        this.dialogData.fileList = [{ url: "" }];
        this.dialogData.fileList1 = [{ url: "" }];
    }

    resetConditionForm() {
        this.dialogData.conditionForm = JSON.parse(JSON.stringify(this.conditionDefaultForm));
    }

    /**取活动规则 */
    getPlatActivityRule() {
        this.sendNotification(HttpType.admin_plat_activity_rule_index, {
            page_count: 1,
            page_size: 3000,
        });
    }

    /**写入活动规则 */
    setActivityRuleList(body: any) {
        this.activeModelData.ruleList = body.list;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_index, objectRemoveNull(this.listQuery));
    }

    onQueryConditionColumns() {
        this.sendNotification(HttpType.admin_plat_activity_condition_table_columns);
    }

    getRuleInfo(rule: any) {
        let result: any = [];
        result = this.activeModelData.ruleList.filter((item: any) => parseInt(rule.rule_id) === item.id);
        return result.length > 0 ? result[0] : "";
    }
    chickDailyRatio(): boolean {
        if (this.dialogData.form.award_type == 16 || this.dialogData.form.award_type == "16") {
            // if (this.dialogData.form.active_model_tag == "16") {
            let sumNub = 0;
            for (let index = 0; index < this.dialogData.form.daily_ratio.length; index++) {
                sumNub += this.dialogData.form.daily_ratio[index];
            }
            if (sumNub != 100) {
                const msg = LangUtil("全部比例总和必须为100%");
                MessageBox.alert(msg, "", { confirmButtonText: <string>LangUtil("关闭") });

                return false;
            }
            return true;
        }
        return true;
    }

    /**添加数据 */
    onAdd() {
        if (!this.chickDailyRatio()) return;

        let formCopy = <any>{};

        const {
            plat_id,
            activity_name,
            activity_category,
            is_preheat,
            start_time,
            end_time,
            model_open_mode,
            open_mode_url,
            award_type,
            daily_ratio,
            type,
            model_id,
            rules,
            bonus_multiple,
            link_url,
            settlement_period,
            settlement_type,
            award_tpl,
            show_type,
            is_once,
            icon,
            rule_desc,
            process_control,
            active_model_tag,
            extended_task_type,
            task_days,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
            vendorArr,
            transfer_amount_rate_Arr,
            show_end_time,
            show_start_time,
            coin_unique
        } = this.dialogData.form;
        if (rules && this.dialogData.form.model_type != 12 && this.dialogData.form.model_type != 13 && this.dialogData.form.model_type != 14 && this.dialogData.form.model_type != 15) {
            for (const item of rules) {
                if (item.list)
                    for (const child of item.list) {
                        if (child.list)
                            for (const child_1 of child.list) {
                                if ((child_1.type == 1 &&
                                    child_1.rule_id
                                    == 93) || (child_1.type == 1 &&
                                        child_1.rule_id
                                        == 94)) {
                                    child_1.params = child_1.params.join()
                                }
                                if (child_1.coin_type && child_1.type == "61" && child_1.params_type == 5) {
                                    // child_1.params = { [child_1.coin_type]: child_1.coin_amount };

                                    if (this.getRuleInfo(child_1).key_value_type == 2) {
                                        child_1.params = {};
                                        child_1.params[child_1.coin_type] = {};
                                        child_1.params[child_1.coin_type]["percent"] = child_1.coin_amount;
                                        child_1.params[child_1.coin_type]["max_limit"] = child_1.max_limit;

                                        delete child_1.coin_type;
                                        delete child_1.coin_amount;
                                        delete child_1.max_limit;
                                    } else {
                                        child_1.params = { [child_1.coin_type]: child_1.coin_amount };
                                    }
                                }
                            }
                    }
            }
        }
        if (type === "1") {
            formCopy = {
                plat_id,
                activity_name,
                activity_category,
                is_preheat,
                start_time,
                end_time,
                model_open_mode,
                award_type,
                daily_ratio: JSON.stringify(daily_ratio),
                model_id,
                rules: JSON.stringify(rules),
                bonus_multiple,
                link_url,
                settlement_period,
                settlement_type,
                award_tpl,
                show_type,
                icon,
                rule_desc,
                active_model_tag,
                extended_task_type,
                task_days,
                task_water_rate_2,
                task_water_rate_4,
                task_water_rate_8,
                task_water_rate_16,
                task_water_rate_32,
                task_water_rate_64,
                task_water_rate_128,
                process_control,
                show_end_time,
                show_start_time,
                coin_unique
            };
        } else {
            formCopy = {
                plat_id,
                activity_name,
                activity_category,
                is_preheat,
                start_time,
                open_mode_url,
                end_time,
                model_open_mode,
                bonus_multiple,
                link_url,
                show_type,
                icon,
                extended_task_type,
                task_days,
                task_water_rate_2,
                task_water_rate_4,
                task_water_rate_8,
                task_water_rate_16,
                task_water_rate_32,
                task_water_rate_64,
                task_water_rate_128,
                process_control,
                rule_desc,
                active_model_tag,
                show_end_time,
                show_start_time,
                coin_unique
            };
        }
        /**
         *  "publish_status": {
                "name": "发布状态",
                    "options": {
                        "1": "待发布",
                        "2": "已发布",
                        "3": "已撤销"
                    }
                },
        */
        formCopy.activity_coin_task = {
            task_days,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
        };

        const obj = <any>{};
        for (let index = 0; index < this.dialogData.form.vendorArr.length; index++) {
            const element = this.dialogData.form.vendorArr[index];
            obj[element.vendor_id] = element.water;
        }
        formCopy.activity_coin_task.task_water_vendor = obj;

        const obj_rate = <any>{};
        for (let index = 0; index < this.dialogData.form.transfer_amount_rate_Arr.length; index++) {
            const element = this.dialogData.form.transfer_amount_rate_Arr[index];
            obj_rate[index + 1 + ""] = element;
        }
        formCopy.activity_coin_task.transfer_amount_rate_in_activity = obj_rate;

        formCopy.activity_coin_task = JSON.stringify(formCopy.activity_coin_task);
        if (formCopy.extended_task_type == 1) {
            delete formCopy.activity_coin_task;
        }
        delete formCopy.task_days;
        delete formCopy.task_water_rate_2;
        delete formCopy.task_water_rate_4;
        delete formCopy.task_water_rate_8;
        delete formCopy.task_water_rate_16;
        delete formCopy.task_water_rate_32;
        delete formCopy.task_water_rate_64;
        delete formCopy.task_water_rate_128;
        formCopy["publish_status"] = Object.keys(this.tableData.columns.publish_status.options)[1];

        if (this.dialogData.form.model_type == 12) {
            // formCopy.settlement_period =   Object.keys(this.tableData.columns.settlement_period.options)[0];
            // formCopy.settlement_type = 1;
            formCopy.model_type = 12;
            formCopy.init_prize_pool = this.dialogData.form.init_prize_pool;
            formCopy.prize_pool_add = this.dialogData.form.prize_pool_add;
            formCopy.day_init_num = this.dialogData.form.day_init_num;
            /**彩球模版 */
            formCopy.update_cycle_types = JSON.stringify(this.dialogData.form.update_cycle_types);
            formCopy.lottery_cons = JSON.stringify(this.dialogData.form.lottery_cons);
            formCopy.lottery_award = JSON.stringify(this.dialogData.form.lottery_award);
            formCopy.ball_award = JSON.stringify(this.dialogData.form.ball_award);
            formCopy.rank_award = JSON.stringify(this.dialogData.form.rank_award);
            formCopy.day_num_init_config = JSON.stringify(this.dialogData.form.day_num_init_config);
        }
        if (this.dialogData.form.model_type == 13) {
            formCopy.model_type = 13;
            this.dialogData.form.lottery_cons.forEach((item: { interval: any[]; }) => {
                item.interval[1] = item.interval[0];
            });
            formCopy.lottery_cons = JSON.stringify(this.dialogData.form.lottery_cons);
            formCopy.lottery_award = JSON.stringify(this.dialogData.form.lottery_award);
        }
        if (this.dialogData.form.model_type == 14) {
            formCopy.model_type = 14;
            formCopy.every_task = JSON.stringify(this.dialogData.form.every_task);
            formCopy.cycle_task = JSON.stringify(this.dialogData.form.cycle_task);
            formCopy.point_lottery_cons = JSON.stringify(this.dialogData.form.point_lottery_cons);
            formCopy.point_lottery_award = JSON.stringify(this.dialogData.form.point_lottery_award);
            formCopy.routine_task = JSON.stringify(this.dialogData.form.routine_task);
            formCopy.user_term = this.dialogData.form.user_term;
        }
        if (this.dialogData.form.model_type == 15) {
            formCopy.model_type = 15;
            formCopy.rank_award = JSON.stringify(this.dialogData.form.rank_award);
            formCopy.rank_type = this.dialogData.form.rank_type;
            formCopy.lowest_score = this.dialogData.form.lowest_score;
            formCopy.vendor_id = this.dialogData.form.vendor_id;
            formCopy.vendor_type = this.dialogData.form.vendor_type;
            formCopy.vendor_product_id = JSON.stringify(this.dialogData.form.vendor_product_id);
        }
        if (!formCopy.show_end_time) {
            formCopy.show_end_time = formCopy.end_time;
        }
        if (!formCopy.show_start_time) {
            formCopy.show_start_time = formCopy.start_time;
        }
        // pointForm.rules = JSON.parse(pointForm.rules);
        // console.log("----发送的JSON ", pointForm);
        formCopy.start_time = this.resetDate(formCopy.start_time);
        formCopy.end_time = this.resetDate(formCopy.end_time);
        formCopy.show_start_time = this.resetDate(formCopy.show_start_time);
        formCopy.show_end_time = this.resetDate(formCopy.show_end_time);

        if (this.dialogData.conditionForm.assign_is_all == false &&
            this.dialogData.conditionForm.assign_is_agent == false &&
            this.dialogData.conditionForm.assign_is_channel == false &&
            this.dialogData.conditionForm.assign_is_tag == false &&
            this.dialogData.conditionForm.assign_is_user == false) {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("参与用户必须至少选择一项"));
            return;
        }
        if (this.dialogData.conditionForm.assign_user.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定用户超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_agent_user_id.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定代理超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_user.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除用户超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_agent_user_id.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除代理超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_channel.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定渠道超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_channel.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除渠道超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_is_tag == true && this.dialogData.conditionForm.assign_tag == "") {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("指定标签必须选择"));
            return;
        } else if (this.dialogData.conditionForm.assign_tag.length > 100) {
            MessageBox.alert(<any>LangUtil("指定标签超过最大上限[100]"));
            return;
        }
        // if (this.dialogData.conditionForm.assign_is_channel == true && this.dialogData.conditionForm.assign_channel == "") {
        //     this.editTabsActivity = "condition";
        //     MessageBox.alert(<any>LangUtil("指定渠道必须选择"));
        //     return;
        // } else if (this.dialogData.conditionForm.assign_channel.length > 100) {
        //     MessageBox.alert(<any>LangUtil("指定渠道超过最大上限[100]"));
        //     return;
        // }
        if (this.dialogData.conditionForm.remove_is_tag == true && this.dialogData.conditionForm.remove_tag == "") {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("排除标签必须选择"));
            return;
        } else if (this.dialogData.conditionForm.remove_tag.length > 100) {
            MessageBox.alert(<any>LangUtil("排除标签超过最大上限[100]"));
            return;
        }
        // if (this.dialogData.conditionForm.remove_is_channel == true && this.dialogData.conditionForm.remove_channel == "") {
        //     this.editTabsActivity = "condition";
        //     MessageBox.alert(<any>LangUtil("排除渠道必须选择"));
        //     return;
        // } else if (this.dialogData.conditionForm.remove_channel.length > 100) {
        //     MessageBox.alert(<any>LangUtil("排除渠道超过最大上限[100]"));
        //     return;
        // }
        MessageBox.confirm(<string>LangUtil("发布以后活动数据不能修改，确定发布"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_activity_store, objectRemoveNull(formCopy));
            })
            .catch(() => { });
    }
    //将时间只发送天
    resetDate(date: string) {
        const strArr = date.split(" ");
        return strArr[0];
    }
    /**关闭该活动 */
    onCloseActive() {
        MessageBox.confirm(<string>LangUtil("活动已发布，是否要关闭该活动"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                /**
                 *  "publish_status": {
                    "name": "发布状态",
                        "options": {
                            "1": "待发布",
                            "2": "已发布",
                            "3": "已撤销"
                        }
                    },
                 */
                const copyForm = {
                    id: this.dialogData.form.id,
                    publish_status: Object.keys(this.tableData.columns.publish_status.options)[2],
                };
                this.facade.sendNotification(HttpType.admin_plat_activity_update, copyForm);
            })
            .catch(() => { });
    }

    /**更新活动*/
    onUpdate() {
        if (!this.chickDailyRatio()) return;
        // 删除多余无法去除的参数
        let formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        formCopy = objectRemoveNull(formCopy);
        if (this.dialogData.form.award_type == 16 || this.dialogData.form.award_type == "16") {
            formCopy.daily_ratio = JSON.stringify(this.dialogData.form.daily_ratio);
        }
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }

        // 添加必填参数
        /**
         *  "publish_status": {
            "name": "发布状态",
                "options": {
                    "1": "待发布",
                    "2": "已发布",
                    "3": "已撤销"
                }
            },
         */
        const {
            task_days,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
        } = this.dialogData.form;
        formCopy.activity_coin_task = {
            task_days,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
        };
        if (formCopy.extended_task_type == 1) {
            delete formCopy.activity_coin_task;
        }

        const obj_rate = <any>{};
        for (let index = 0; index < this.dialogData.form.transfer_amount_rate_Arr.length; index++) {
            const element = this.dialogData.form.transfer_amount_rate_Arr[index];
            obj_rate[index + 1 + ""] = element;
        }
        formCopy.activity_coin_task.transfer_amount_rate_in_activity = obj_rate;
        formCopy.activity_coin_task = JSON.stringify(formCopy.activity_coin_task);

        delete formCopy.task_days;
        delete formCopy.task_water_rate_2;
        delete formCopy.task_water_rate_4;
        delete formCopy.task_water_rate_8;
        delete formCopy.task_water_rate_16;
        delete formCopy.task_water_rate_32;
        delete formCopy.task_water_rate_64;
        delete formCopy.task_water_rate_128;
        formCopy["publish_status"] = Object.keys(this.tableData.columns.publish_status.options)[1];
        formCopy.id = this.dialogData.form.id;
        if (formCopy.show_type == 2) {
            formCopy.link_url = this.dialogData.form.link_url;
        }
        if (this.dialogData.form.model_type == 12) {
            /**彩球模版 */
            formCopy.update_cycle_types = JSON.stringify(this.dialogData.form.update_cycle_types);
            formCopy.lottery_cons = JSON.stringify(this.dialogData.form.lottery_cons);
            formCopy.lottery_award = JSON.stringify(this.dialogData.form.lottery_award);
            formCopy.ball_award = JSON.stringify(this.dialogData.form.ball_award);
            formCopy.rank_award = JSON.stringify(this.dialogData.form.rank_award);
            formCopy.day_num_init_config = JSON.stringify(this.dialogData.form.day_num_init_config);
        }
        if (this.dialogData.form.model_type == 13) {
            this.dialogData.form.lottery_cons.forEach((item: { interval: any[]; }) => {
                item.interval[1] = item.interval[0];
            });
            formCopy.lottery_cons = JSON.stringify(this.dialogData.form.lottery_cons);
            formCopy.lottery_award = JSON.stringify(this.dialogData.form.lottery_award);
        }
        if (this.dialogData.form.model_type == 14) {
            formCopy.model_type = 14;
            formCopy.every_task = JSON.stringify(this.dialogData.form.every_task);
            formCopy.cycle_task = JSON.stringify(this.dialogData.form.cycle_task);
            formCopy.point_lottery_cons = JSON.stringify(this.dialogData.form.point_lottery_cons);
            formCopy.point_lottery_award = JSON.stringify(this.dialogData.form.point_lottery_award);
            formCopy.routine_task = JSON.stringify(this.dialogData.form.routine_task);
            formCopy.user_term = this.dialogData.form.user_term;
        }
        if (this.dialogData.form.model_type == 15) {
            formCopy.model_type = 15;
            formCopy.rank_type = this.dialogData.form.rank_type;
            formCopy.lowest_score = this.dialogData.form.lowest_score;
            formCopy.vendor_id = this.dialogData.form.vendor_id;
            formCopy.vendor_type = this.dialogData.form.vendor_type;
            formCopy.vendor_product_id = JSON.stringify(this.dialogData.form.vendor_product_id);
            formCopy.rank_award = JSON.stringify(this.dialogData.form.rank_award);
        }
        if (this.dialogData.conditionForm.assign_is_all == false &&
            this.dialogData.conditionForm.assign_is_agent == false &&
            this.dialogData.conditionForm.assign_is_channel == false &&
            this.dialogData.conditionForm.assign_is_tag == false &&
            this.dialogData.conditionForm.assign_is_user == false) {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("参与用户必须至少选择一项"));
            return;
        }
        if (this.dialogData.conditionForm.assign_user.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定用户超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_agent_user_id.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定代理超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_user.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除用户超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_agent_user_id.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除代理超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_channel.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("指定渠道超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.remove_channel.split(",").length > 100) {
            MessageBox.alert(<any>LangUtil("排除渠道超过最大上限[100]"));
            return;
        }
        if (this.dialogData.conditionForm.assign_is_tag == true && this.dialogData.conditionForm.assign_tag == "") {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("指定标签必须选择"));
            return;
        } else if (this.dialogData.conditionForm.assign_tag.length > 100) {
            MessageBox.alert(<any>LangUtil("指定标签超过最大上限[100]"));
            return;
        }
        // if (this.dialogData.conditionForm.assign_is_channel == true && this.dialogData.conditionForm.assign_channel == "") {
        //     this.editTabsActivity = "condition";
        //     MessageBox.alert(<any>LangUtil("指定渠道必须选择"));
        //     return;
        // } else if (this.dialogData.conditionForm.assign_channel.length > 100) {
        //     MessageBox.alert(<any>LangUtil("指定渠道超过最大上限[100]"));
        //     return;
        // }
        if (this.dialogData.conditionForm.remove_is_tag == true && this.dialogData.conditionForm.remove_tag == "") {
            this.editTabsActivity = "condition";
            MessageBox.alert(<any>LangUtil("排除标签必须选择"));
            return;
        } else if (this.dialogData.conditionForm.remove_tag.length > 100) {
            MessageBox.alert(<any>LangUtil("排除标签超过最大上限[100]"));
            return;
        }
        // if (this.dialogData.conditionForm.remove_is_channel == true && this.dialogData.conditionForm.remove_channel == "") {
        //     this.editTabsActivity = "condition";
        //     MessageBox.alert(<any>LangUtil("排除渠道必须选择"));
        //     return;
        // } else if (this.dialogData.conditionForm.remove_channel.length > 100) {
        //     MessageBox.alert(<any>LangUtil("排除渠道超过最大上限[100]"));
        //     return;
        // }
        // 发送消息
        this.sendNotification(HttpType.admin_plat_activity_update, formCopy);
        this.onUpdateCondition(this.dialogData.form.id);
    }

    onUpdateCondition(id: any) {
        const { show_type, register_time_type, register_start_time, register_end_time, assign_is_all, assign_is_user, assign_user, assign_is_agent, assign_agent_user_id, assign_agent_type,
            assign_is_tag, assign_tag, assign_is_channel, assign_channel, remove_is_user, remove_user,
            remove_is_agent, remove_agent_user_id, remove_agent_type, remove_is_tag, remove_tag, remove_is_channel, remove_channel, condition_unique_ip, condition_unique_device, } = this.dialogData.conditionForm;
        const formCopy: any = {
            show_type,
            register_time_type,
            register_start_time,
            register_end_time,
            assign_is_all,
            assign_is_user,
            assign_user,
            assign_is_agent,
            assign_agent_user_id,
            assign_agent_type,
            assign_is_tag,
            assign_tag,
            assign_is_channel,
            assign_channel,
            remove_is_user,
            remove_user,
            remove_is_agent,
            remove_agent_user_id,
            remove_agent_type,
            remove_is_tag,
            remove_tag,
            remove_is_channel,
            remove_channel,
            condition_unique_ip,
            condition_unique_device,
        };
        formCopy.assign_is_all = formCopy.assign_is_all == true ? 1 : 98;
        formCopy.assign_is_user = formCopy.assign_is_user == true ? 1 : 98;
        formCopy.assign_is_agent = formCopy.assign_is_agent == true ? 1 : 98;
        formCopy.assign_is_tag = formCopy.assign_is_tag == true ? 1 : 98;
        formCopy.assign_is_channel = formCopy.assign_is_channel == true ? 1 : 98;
        formCopy.remove_is_user = formCopy.remove_is_user == true ? 1 : 98;
        formCopy.remove_is_agent = formCopy.remove_is_agent == true ? 1 : 98;
        formCopy.remove_is_tag = formCopy.remove_is_tag == true ? 1 : 98;
        formCopy.remove_is_channel = formCopy.remove_is_channel == true ? 1 : 98;
        formCopy.condition_unique_ip = formCopy.condition_unique_ip == true ? 1 : 98;
        formCopy.condition_unique_device = formCopy.condition_unique_device == true ? 1 : 98;
        formCopy.id = id;
        formCopy.assign_tag = formCopy.assign_tag.toString();
        formCopy.assign_channel = formCopy.assign_channel.toString();
        formCopy.remove_tag = formCopy.remove_tag.toString();
        formCopy.remove_channel = formCopy.remove_channel.toString();
        this.sendNotification(HttpType.admin_plat_activity_condition_update, formCopy);
    }

    /**取活动模版数据数据 */
    getActivityModel(data: any) {
        this.dialogData.form.model_id = "";
        if (this.dialogData.form.rules) {
            this.dialogData.form.rules.length = 0;
        }
        this.sendNotification(HttpType.admin_plat_activity_model_index, data);
    }
    /**写入活动模版数据数据 */
    setActivityModelList(data: any) {
        this.activeModelData.options.length = 0;
        this.activeModelData.options.push(...data.list);
    }

    /**取活动模版数 详细数据 */
    getModelDetail(id: any) {
        console.warn("/**取活动模版数 详细数据 */", id);

        this.facade.sendNotification(HttpType.admin_plat_activity_model_show, { id: id });
    }

    /**写入活动模版数 详细数据 */
    setModelDetail(body: any) {
        if (this.dialogData.status == DialogStatus.update || this.dialogData.copy == true) {
            this.dialogData.form.des = body.activity_desc;
            this.dialogData.copy = false;
        } else {
            let data = JSON.parse(JSON.stringify(body));
            const {
                open_mode,
                settlement_type,
                award_types,
                rules,
                bonus_multiple,
                settlement_period,
                award_tpl,
                activity_desc,
                show_types,
                daily_ratio,
                link_url,
                is_once,
                rule_desc,
                active_model_tag,
                rank_type,
                lowest_score,
            } = body;
            this.dialogData.form.model_open_mode = open_mode;
            this.dialogData.form.settlement_type = settlement_type;
            this.dialogData.form.award_types = award_types;
            this.dialogData.form.bonus_multiple = bonus_multiple;
            this.dialogData.form.settlement_period = settlement_period;
            this.dialogData.form.award_tpl = award_tpl;
            this.dialogData.form.des = activity_desc;
            this.dialogData.form.show_types = show_types;
            this.dialogData.form.daily_ratio = daily_ratio;
            this.dialogData.form.link_url = link_url;
            this.dialogData.form.is_once = is_once;
            this.dialogData.form.show_type = show_types[0];
            this.dialogData.form.model_type = body.type;
            this.dialogData.form.rank_type = rank_type;
            this.dialogData.form.lowest_score = lowest_score;
            if (data.type != 12 && data.type != 13 && data.type != 14 && data.type != 15) {
                for (const item of rules) {
                    for (const child of item.list) {
                        for (const child_1 of child.list) {
                            if (child_1.params_type && child_1.type) {
                                if (
                                    child_1.type == 61 &&
                                    child_1.params_type == 5 &&
                                    this.dialogData.form.extended_task_type != 2
                                ) {
                                    child_1.coin_type = "USDT";
                                    child_1.coin_amount = 0;
                                } else {
                                    child_1.coin_type = "";
                                    child_1.coin_amount = 0;
                                }
                            }
                        }
                    }
                }
            } else {
                if (data.type == 12) {
                    this.setBallAwardData(data);
                } else if (data.type == 13) {
                    this.setSpinAwardData(data);
                } else if (data.type == 14) {
                    this.setActivityLotteryAwardData(data);
                    this.dialogData.form.every_task.forEach((day: { award: { type: number; params: string[]; }; }[]) => {
                        day.forEach((task: { award: { type: number; params: string[]; }; }) => {
                            if (task.award.type == 3) {
                                task.award.params = ["", ""]
                            }
                        })
                    })
                    this.dialogData.form.cycle_task.forEach((task: { award: { type: number; params: string[]; }; }) => {
                        if (task.award.type == 3) {
                            task.award.params = ["", ""]
                        }
                    })
                    this.dialogData.form.routine_task.forEach((task: { award: { type: number; params: string[]; }; }) => {
                        if (task.award.type == 3) {
                            task.award.params = ["", ""]
                        }
                    })
                } else if (data.type == 15) {
                    const obj = {
                        interval: ["", ""],
                        type: "0",
                        params: {
                            key: "",
                            value: 0,
                        },
                        award: { key: "", value: "" },
                        bonus_multiple: ""
                    };
                    this.dialogData.form.rank_award.push(JSON.parse(JSON.stringify(obj)));
                }
            }
            this.dialogData.form.transfer_amount_rate_Arr = <any>[];
            this.dialogData.form.rules = rules;
            this.dialogData.update++;
        }
    }

    /**图片上传 */
    uploadImage(data: any) {
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片上传 写入图片url*/
    uploadSuccess(body: any) {
        if (this.dialogData.uploadType == "icon") {
            this.dialogData.form.icon = body.uri;
            this.dialogData.fileList1 = [{ url: body.url }];
        } else {
            this.dialogData.form.link_url = body.uri;
            this.dialogData.fileList = [{ url: body.url }];
        }
    }

    /**排序 */
    onOrderList() {
        const formCopy = this.tableData.orderData;
        this.sendNotification(HttpType.admin_plat_activity_update, formCopy);
    }

    /**更新数据 */
    onUpdateLanguages(id: any) {
        const formCopy: any = formCompared(this.dialogLanguagesData.form, this.dialogLanguagesData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.dialogLanguagesData.bShow = false;
            return false;
        }
        formCopy.id = id;
        this.sendNotification(HttpType.admin_plat_activity_update, formCopy);
    }

    vendorDialogData = {
        bShow: false,
        form: {
            name: "",
            water: "",
            vendor_id: "",
        },
    };

    showVendorDialog() {
        this.vendorDialogData.bShow = true;
        this.resetVendorDialogForm();
    }

    resetVendorDialogForm() {
        Object.assign(this.vendorDialogData.form, {
            name: "",
            water: "",
            vendor_id: "",
        });
    }

    onAddVendor() {
        this.dialogData.form.vendorArr.push({ ...this.vendorDialogData.form });
        this.vendorDialogData.bShow = false;
    }

    get vendor_options() {
        const newlist = <any>[];
        const plat_id = this.dialogData.form.plat_id;
        const keys = Object.keys(this.tableData.columns.vendor_ids.options[plat_id]);

        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];

            let isHave = false;
            for (let n = 0; n < this.dialogData.form.vendorArr.length; n++) {
                const element_cur = this.dialogData.form.vendorArr[n];
                if (element_cur.vendor_id == element) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                newlist.push({
                    name: this.tableData.columns.vendor_ids.options[plat_id][element],
                    value: element,
                });
            }
        }

        return newlist;
    }

    admin_plat_activity_ball_prize_update(obj: any) {
        this.sendNotification(HttpType.admin_plat_activity_ball_prize_update, obj);
    }
}
