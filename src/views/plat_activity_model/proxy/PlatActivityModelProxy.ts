import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity_model/setting";
import { MessageBox } from "element-ui";
import IPlatActivityModelProxy from "./IPlatActivityModelProxy";
import i18n from "@/lang";
export default class PlatActivityModelProxy extends AbstractProxy implements IPlatActivityModelProxy {
    static NAME = "PlatActivityModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_model_table_columns);
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
            activity_desc: { name: "", options: {} },
            active_model_tag: { name: "", options: {} },
            activity_name: { name: "", options: {} },
            award_tpl: { name: "", options: {} },
            award_types: { name: "", options: {} },
            bonus_multiple: { name: "", options: {} },
            category: { name: "", options: {} },
            icon: { name: "", options: {} },
            id: { name: "", options: {} },
            is_once: { name: "", options: {} },
            link_url: { name: "", options: {} },
            open_mode: { name: "", options: {} },
            open_mode_url: { name: "外部链接", options: {} },
            plat_id_count: { name: "", options: {} },
            public_child_rules: { name: "", options: {} },
            rules: { name: "", options: {} },
            rules_num: { name: "", options: {} },
            settlement_period: { name: "", options: {} },
            settlement_type: { name: "", options: {} },
            show_types: { name: "", options: <any>{} },
            daily_ratio: { name: "", options: <any>{} },
            type: { name: "", options: {} },
            init_prize_pool: { name: "初始奖池", options: {} },
            prize_pool_add: { name: "奖池新增", options: {} },
            day_init_num: { name: "每天初始次数", options: {} },
            update_cycle_type: { name: "期刊更新周期", options: {} },
            lottery_cons: { name: "抽奖消耗", options: {} },
            lottery_cons_type: { name: "抽奖消耗类型", options: {} },
            lottery_award: { name: "抽奖奖励", options: {} },
            lottery_award_type: { name: "奖励币种类型", options: {} },
            ball_award: { name: "彩球奖励", options: {} },
            rank_award: { name: "排名奖励", options: {} },
            day_num_init_config: { name: "每日次数重置", options: {} },
            spin_lottery_award_type: { name: "抽奖奖励", options: {} },
            spin_lottery_cons_type: { name: "抽奖消耗", options: {} },
            user_term: { name: "用户期限", options: {} },
            every_point_award_settlement_type: { name: '奖励方式', options: {} },
            every_point_award_type: { name: '抽奖奖励', options: {} },
            every_point_award_type_fix: { name: '抽奖奖励', options: { 3: LangUtil('代币') } },
            every_point_cons_type: { name: '抽奖消耗', options: {} },
            every_point_cycle_condition_type: { name: '循环任务-条件', options: {} },
            every_point_every_condition_type: { name: '每日任务-条件', options: {} },
            every_point_routine_condition_type: { name: '普通任务-条件', options: {} },
            rank_type: { name: '排行榜类型', options: {} },
            lowest_score: { name: '最低分数', options: {} },
            vendor_id: { name: '指定厂商', options: {} },
            vendor_product_id: { name: '指定游戏', options: {} },
            vendor_type: { name: '游戏类型', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        id: "",
        activity_name: "",
        plat_id: "",
        page_count: 1,
        page_size: 20,
    };

    /**條件规则 */
    conditionRule: any = {
        rule_id: "1", //独立规则-ID
        type: "1", //独立规则-类型:1-条件|21-消耗|61-奖励|71-概率奖池
        params_type: "2", //独立规则-参数类型:1-数值|2-布尔值
        params: 0, //独立规则-参数值
        params_probability: "", //独立规则-第二参数值
    };

    /**活动规则 */
    activityRules: any = {
        name: "", //大规则名称
        rule_num: 1, //大规则ID
        run_type: "1", //结算次数:1-多次结算|2-单次结算
        icon: "",
        open_mode: "",
        open_mode_url: "",
        list: [
            {
                name: "", //子规则名称
                list: [JSON.parse(JSON.stringify(this.conditionRule))],
            },
        ],
    };

    /**平台数据 */
    platOptions = <any>{};
    /**活动模型平台授权 */
    platSettingDialogData = {
        bShow: false,
        selectedAll: false,
        form: {
            model_id: 0,
            authorize_plats: <any>[],
            all_plats: {},
        },
        formSource: null, // 表单的原始数据
    };

    /** 活动规则数据 */
    activityRuleList: any = [];

    /**预设弹窗数据 */
    defaultForm = {
        activity_name: "",
        activity_desc: "",
        icon: "",
        type: "",
        open_mode: "",
        settlement_period: "",
        settlement_type: "",
        award_types: [],
        show_types: [],
        daily_ratio: [],
        bonus_multiple: "1",
        link_url: "",
        award_tpl: "",
        category: "",
        is_once: "",
        active_model_tag: "",
        open_mode_url: "",
        rules: [JSON.parse(JSON.stringify(this.activityRules))],

        init_prize_pool: "",
        prize_pool_add: "",
        update_cycle_types: [],
        day_init_num: 0,

        lottery_cons: [],
        lottery_award: [],
        ball_award: [],
        rank_award: [],
        day_num_init_config: [],
        every_task: [],          // 每日任务
        cycle_task: [],          // 循环任务
        point_lottery_cons: [],  // 抽奖消耗
        point_lottery_award: [], // 抽奖奖励
        routine_task: [],        // 普通任务
        user_term: "",
        rank_type: "",
        lowest_score: "",
        vendor_id: "",
        vendor_product_id: "",
        vendor_type: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        /** 页面是否渲染 */
        isRender: false,
        /** 页面是否载入中 */
        loading: false,
        status: DialogStatus.create,
        form: JSON.parse(JSON.stringify(this.defaultForm)),
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        setTimeout(() => {
            this.dialogData.isRender = true;
            this.dialogData.loading = false;
            this.dialogData.form = JSON.parse(JSON.stringify(data));
        }, 300);
        this.dialogData.formSource = data;
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            id: "",
            activity_name: "",
            plat_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.loading = true;
            this.sendNotification(HttpType.admin_plat_activity_model_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.isRender = true;
            this.dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        this.dialogData.form = JSON.parse(JSON.stringify(this.defaultForm));
        const obj = {
            interval: ["", ""],
            type: "0",
            params: {
                key: "",
                value: 0,
            },
            award: { key: "", value: 0 },
            bonus_multiple: ""
        };
        const xiaohao_keys = Object.keys(this.tableData.columns.lottery_cons_type.options);
        if (xiaohao_keys && xiaohao_keys.length > 0) obj.type = xiaohao_keys[0];
        this.dialogData.form.lottery_cons.push(JSON.parse(JSON.stringify(obj)));
        {
            const newobj = {
                type: "0",
                params: {
                    key: "",
                    value: 0,
                },
            };
            this.dialogData.form.day_num_init_config.push(JSON.parse(JSON.stringify(newobj)));
        }

        const award_keys = Object.keys(this.tableData.columns.lottery_award_type.options);
        if (award_keys && award_keys.length > 0) obj.type = award_keys[0];
        this.dialogData.form.lottery_award.push(JSON.parse(JSON.stringify(obj)));
        this.dialogData.form.rank_award.push(JSON.parse(JSON.stringify(obj)));

        //彩球的
        for (let index = 0; index < 10; index++) {
            const ballObj = {
                interval: [10, index],
            };
            this.dialogData.form.ball_award.push(ballObj);
        }

        const every_task = [{
            condition: {
                type: "",
                params: [0, 0]
            },
            award: {
                type: "",
                settlement_type: "",
                params: [0, 0]
            }
        }];

        const cycle_task = {
            condition: {
                type: "",
                params: [0, 0]
            },
            award: {
                type: "",
                settlement_type: "",
                params: [0, 0]
            }
        };

        const lottery_cons = {
            weight: 0,
            type: "",
            params: [0, 0]
        }

        // 每日任务 
        this.dialogData.form.every_task.push(JSON.parse(JSON.stringify(every_task)));
        // 循环任务
        this.dialogData.form.cycle_task.push(JSON.parse(JSON.stringify(cycle_task)));
        // 抽奖消耗
        this.dialogData.form.point_lottery_cons.push(JSON.parse(JSON.stringify(lottery_cons)));
        // 抽奖奖励
        this.dialogData.form.point_lottery_award.push(JSON.parse(JSON.stringify(lottery_cons)));
        // 普通任务
        this.dialogData.form.routine_task.push(JSON.parse(JSON.stringify(cycle_task)));
    }

    resetSpinForm() {
        const obj = {
            interval: [1, 3],
            type: "0",
            params: {
                key: "",
                value: 0,
            },
        };
        this.dialogData.form.lottery_cons = [];
        this.dialogData.form.lottery_award = [];
        const xiaohao_keys = Object.keys(this.tableData.columns.lottery_cons_type.options);
        if (xiaohao_keys && xiaohao_keys.length > 0) obj.type = xiaohao_keys[0];
        this.dialogData.form.lottery_cons.push(JSON.parse(JSON.stringify(obj)));
        const award_keys = Object.keys(this.tableData.columns.lottery_award_type.options);
        if (award_keys && award_keys.length > 0) obj.type = award_keys[0];
        this.dialogData.form.lottery_award.push(JSON.parse(JSON.stringify(obj)));
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_model_index, objectRemoveNull(this.listQuery));
    }

    chickDailyRatio(): boolean {
        if (this.dialogData.form.award_types.includes(16)) {
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
        const formCopy: any = JSON.parse(JSON.stringify(this.dialogData.form));
        delete formCopy.id;
        formCopy.rules = JSON.stringify(formCopy.rules);
        formCopy.award_types = JSON.stringify(formCopy.award_types);
        formCopy.show_types = JSON.stringify(formCopy.show_types);
        formCopy.daily_ratio = JSON.stringify(formCopy.daily_ratio);

        /**彩球模版 */
        if (this.dialogData.form.type == 12) {
            formCopy.update_cycle_types = JSON.stringify(formCopy.update_cycle_types);
            formCopy.lottery_cons = JSON.stringify(formCopy.lottery_cons);
            formCopy.lottery_award = JSON.stringify(formCopy.lottery_award);
            formCopy.ball_award = JSON.stringify(formCopy.ball_award);
            formCopy.rank_award = JSON.stringify(formCopy.rank_award);
            formCopy.day_num_init_config = JSON.stringify(formCopy.day_num_init_config);
        }
        if (this.dialogData.form.type == 13) {
            formCopy.lottery_cons.forEach((item: { interval: any[]; }) => {
                item.interval[1] = item.interval[0];
            });
            formCopy.lottery_cons = JSON.stringify(formCopy.lottery_cons);
            formCopy.lottery_award = JSON.stringify(formCopy.lottery_award);
        }
        if (this.dialogData.form.type == 14) {
            formCopy.every_task = JSON.stringify(formCopy.every_task);
            formCopy.cycle_task = JSON.stringify(formCopy.cycle_task);
            formCopy.point_lottery_cons = JSON.stringify(formCopy.point_lottery_cons);
            formCopy.point_lottery_award = JSON.stringify(formCopy.point_lottery_award);
            formCopy.routine_task = JSON.stringify(formCopy.routine_task);
            delete formCopy.award_types;
            delete formCopy.ball_award;
            delete formCopy.day_num_init_config;
            delete formCopy.lottery_award;
            delete formCopy.lottery_cons;
            delete formCopy.rank_award;
        }
        if (this.dialogData.form.type == 15) {
            formCopy.vendor_product_id = JSON.stringify(formCopy.vendor_product_id);
            delete formCopy.award_types;
            delete formCopy.ball_award;
            delete formCopy.cycle_task;
            delete formCopy.every_task;
            delete formCopy.day_num_init_config;
            delete formCopy.lottery_award;
            delete formCopy.point_lottery_cons;
            delete formCopy.point_lottery_award;
            delete formCopy.lottery_cons;
            delete formCopy.rank_award;
            delete formCopy.routine_task;
        }
        this.sendNotification(HttpType.admin_plat_activity_model_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate() {
        if (!this.chickDailyRatio()) return;
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // TODO
        // 发送消息
        Object.assign(formCopy, this.dialogData.form, {
            rules: JSON.stringify(this.dialogData.form.rules),
            award_types: JSON.stringify(this.dialogData.form.award_types),
            show_types: JSON.stringify(this.dialogData.form.show_types),
            daily_ratio: JSON.stringify(this.dialogData.form.daily_ratio),
        });
        /**彩球模版 */
        if (this.dialogData.form.type == 12) {
            Object.assign(formCopy, this.dialogData.form, {
                update_cycle_types: JSON.stringify(this.dialogData.form.update_cycle_types),
                lottery_cons: JSON.stringify(this.dialogData.form.lottery_cons),
                lottery_award: JSON.stringify(this.dialogData.form.lottery_award),
                ball_award: JSON.stringify(this.dialogData.form.ball_award),
                rank_award: JSON.stringify(this.dialogData.form.rank_award),
                day_num_init_config: JSON.stringify(this.dialogData.form.day_num_init_config),
            });
        }
        if (this.dialogData.form.type == 13) {
            formCopy.lottery_cons.forEach((item: { interval: any[]; }) => {
                item.interval[1] = item.interval[0];
            });
            Object.assign(formCopy, this.dialogData.form, {
                lottery_cons: JSON.stringify(this.dialogData.form.lottery_cons),
                lottery_award: JSON.stringify(this.dialogData.form.lottery_award),
            });
        }
        if (this.dialogData.form.type == 14) {
            formCopy.every_task = JSON.stringify(formCopy.every_task);
            formCopy.cycle_task = JSON.stringify(formCopy.cycle_task);
            formCopy.point_lottery_cons = JSON.stringify(formCopy.point_lottery_cons);
            formCopy.point_lottery_award = JSON.stringify(formCopy.point_lottery_award);
            formCopy.routine_task = JSON.stringify(formCopy.routine_task);
            delete formCopy.award_types;
            delete formCopy.ball_award;
            delete formCopy.day_num_init_config;
            delete formCopy.lottery_award;
            delete formCopy.lottery_cons;
            delete formCopy.rank_award;
        }
        if (this.dialogData.form.type == 15) {
            formCopy.vendor_product_id = JSON.stringify(formCopy.vendor_product_id);
            delete formCopy.award_types;
            delete formCopy.ball_award;
            delete formCopy.cycle_task;
            delete formCopy.every_task;
            delete formCopy.day_num_init_config;
            delete formCopy.lottery_award;
            delete formCopy.point_lottery_cons;
            delete formCopy.point_lottery_award;
            delete formCopy.lottery_cons;
            delete formCopy.rank_award;
            delete formCopy.routine_task;
        }
        this.sendNotification(HttpType.admin_plat_activity_model_update, objectRemoveNull(formCopy));
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const formCopy: any = {};
                Object.assign(formCopy, this.dialogData.form, {
                    rules: JSON.stringify(this.dialogData.form.rules),
                    award_types: JSON.stringify(this.dialogData.form.award_types),
                    show_types: JSON.stringify(this.dialogData.form.show_types),
                    daily_ratio: JSON.stringify(this.dialogData.form.daily_ratio),
                    is_delete: 1,
                });

                if (this.dialogData.form.type == 12) {
                    Object.assign(formCopy, this.dialogData.form, {
                        update_cycle_types: JSON.stringify(this.dialogData.form.update_cycle_types),
                        lottery_cons: JSON.stringify(this.dialogData.form.lottery_cons),
                        lottery_award: JSON.stringify(this.dialogData.form.lottery_award),
                        ball_award: JSON.stringify(this.dialogData.form.ball_award),
                        rank_award: JSON.stringify(this.dialogData.form.rank_award),
                        day_num_init_config: JSON.stringify(this.dialogData.form.day_num_init_config),
                        is_delete: 1,
                    });
                }
                if (this.dialogData.form.type == 13) {
                    Object.assign(formCopy, this.dialogData.form, {
                        lottery_cons: JSON.stringify(this.dialogData.form.lottery_cons),
                        lottery_award: JSON.stringify(this.dialogData.form.lottery_award),
                        is_delete: 1,
                    });
                }
                if (this.dialogData.form.type == 14) {
                    Object.assign(formCopy, this.dialogData.form, {
                        every_task: JSON.stringify(formCopy.every_task),
                        cycle_task: JSON.stringify(formCopy.cycle_task),
                        point_lottery_cons: JSON.stringify(formCopy.point_lottery_cons),
                        point_lottery_award: JSON.stringify(formCopy.point_lottery_award),
                        routine_task: JSON.stringify(formCopy.routine_task),
                        is_delete: 1,
                    });
                }
                this.sendNotification(HttpType.admin_plat_activity_model_update, formCopy);
            })
            .catch(() => { });
    }

    /**取得平台与活动规则数据 */
    onGetPlatData() {
        this.sendNotification(HttpType.admin_plat_index, {
            page_count: 1,
            page_size: 3000,
        });
        this.sendNotification(HttpType.admin_plat_activity_rule_index, {
            page_count: 1,
            page_size: 3000,
        });
    }

    /**平台数据 */
    setPlatList(data: any) {
        const obj = <any>{};
        data.forEach((element: any) => {
            obj[element.plat_id] = element.plat_name;
        });
        this.platOptions = obj;
    }

    /**显示活动模型平台授权弹窗 */
    showPlatSettingDialog(id: string) {
        this.sendNotification(HttpType.admin_plat_activity_model_plat_index, { model_id: id });
    }

    /**隐藏活动模型平台授权弹窗 */
    hidePlatSettingDialog() {
        this.platSettingDialogData.bShow = false;
    }

    /**设置活动模型平台授权 */
    setPlatSetting(data: any) {
        this.platSettingDialogData.form = data;
        this.platSettingDialogData.formSource = JSON.parse(JSON.stringify(data));
        this.platSettingDialogData.bShow = true;
        this.platSettingDialogData.selectedAll =
            this.platSettingDialogData.form.authorize_plats.length ==
            Object.keys(this.platSettingDialogData.form.all_plats).length;
    }

    /**更新活动模型平台授权数据 */
    onUpdatePlatSetting() {
        const formCopy: any = formCompared(this.platSettingDialogData.form, this.platSettingDialogData.formSource);
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.platSettingDialogData.bShow = false;
            return;
        }
        formCopy.model_id = this.platSettingDialogData.form.model_id;
        formCopy.plat_ids = JSON.stringify(this.platSettingDialogData.form.authorize_plats);
        delete formCopy.authorize_plats;
        this.sendNotification(HttpType.admin_plat_activity_model_plat_store, formCopy);
    }

    /** 增加规则 */
    addRule() {
        this.dialogData.form.rules.push(JSON.parse(JSON.stringify(this.activityRules)));
    }

    /** 设置活动规则数据 */
    setActivityRuleList(body: any) {
        this.activityRuleList = body.list;
    }

    /** 显示复制模版 */
    showCopyDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.sendNotification(HttpType.admin_plat_activity_model_show, { id: data.id });
        this.resetDialogForm();
        this.dialogData.formSource = null;
        this.dialogData.loading = true;
    }
}
