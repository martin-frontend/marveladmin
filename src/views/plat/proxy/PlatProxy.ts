import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, getFirstKey, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat/setting";
import { MessageBox } from "element-ui";
import IPlatProxy, { IWaterConfig } from "./IPlatProxy";
import i18n from "@/lang";
export default class PlatProxy extends AbstractProxy implements IPlatProxy {
    static NAME = "PlatProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_table_columns);
        this.sendNotification(HttpType.admin_plat_agent_promotion_model_index, {
            page_count: 1,
            page_size: 1000,
            hideLoading: true,
        });
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_index, {
            page_count: 1,
            page_size: 1000,
            hideLoading: true,
        });
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
            plat_id: { name: "", options: {} },
            plat_name: { name: "", options: {} },
            api_type: { name: "类型", options: {} },
            region: { name: "", options: {} },
            language: { name: "", options: {} },
            status: { name: "", options: {} },
            app_types: { name: "", options: {} },
            vip_model_id: { name: "", options: {} },
            backwater_model_id: { name: "", options: {} },
            promotion_model_id: { name: "", options: {} },
            water_config: { name: "", options: {} },
            extends: { name: "", options: {} },
            vendor_type: { name: "", options: {}, options_rate: <any>{}, options_type: <any>{} },
            promotion_floor: { name: "", options: {} },
            is_bind_phone_award: { name: "", options: {} },
            is_bind_phone_exchange: { name: "", options: {} },
            is_bind_phone_recharge: { name: "绑定手机充值", options: {} },
            is_bet_water_display: { name: "", options: {} },
            is_promotion_statistics_display: { name: "", options: {} },
            is_gold_transfer: { name: "", options: {} },
            gold_transfer_fee: { name: "", options: {} },
            gold_transfer_water_multiple: { name: "", options: {} },
            promotion_floor_unit: { name: "", options: {} },
            is_promotion_same: { name: "", options: {} },
            is_bind_phone_transfer: { name: "", options: {} },
            is_bind_real_name: { name: "兑换绑定CPF", options: {} },
            is_bind_cpf_exchange: { name: "", options: {} },
            currency_type: { name: "", options: {} },
            is_promotion_solid: { name: "", options: {} },
            is_password_gold_transfer: { name: "", options: {} },
            is_show_message_win: { name: "", options: {} },
            is_agent_bonus: { name: "", options: {} }, // 1:是 0:否
            recharge_cost_rate: { name: "", options: {} },
            game_cost_rate: { name: "", options: {} },
            agent_bonus_rate_limit: { name: "", options: {} },
            promotion_discount: { name: "", options: {} },
            is_bet_gold_display: { name: "", options: {} },
            all_bonus_config: { name: "", options: {} },
            all_bonus_model_id: { name: "", options: {} },
            bonus_all_banner: { name: "", options: {} },
            is_open_registration: { name: "", options: {} },
            is_force_short_chain: { name: "", options: {} },
            is_game_with_parent: { name: "", options: {} },
            is_win_gold_display: { name: "", options: {} },
            is_win_leaderboard_display: { name: "", options: {} },
            is_water_leaderboard_display: { name: "", options: {} },
            is_recharge_leaderboard_display: { name: "", options: {} },
            validate_type: { name: "安全设置", options: {} },
            register_types: { name: "注册方式", options: {} },
            stake_bonus_model_id: { name: "", options: {} },
            is_show_commission: { name: "显示推广赚钱", options: {} },
            is_gold_exchange: { name: "货币互转", options: {} },
            is_exchange_fail_automatic_refund: { name: "", options: {} },
            bet_log_keep_days: { name: "投注记录保留天数", options: {} },
            bet_log_search_days: { name: "投注记录搜索天数", options: {} },
            main_language: { name: "主语言", options: {} },
            is_first_login_send_sms: { name: "首次登入发送短信", options: {} },
            is_user_manual_refund: { name: "用户手动退款", options: {} },
            client_config: { name: "Client 配置参数", options: {} },
            other_config: { name: "配置参数", options: {} },
            vendor_wallet_types: { name: "游戏钱包类型", options: {} },
            exchange_count: { name: "玩家兑换笔数", options: {} },
            is_user_verification: { name: "", options: {} },
            register_same_ip_limit: { name: "", options: {} },
            max_exchange_gold: { name: "最大兑换金额", options: {} },
            forbidden_country: { name: "", options: {} },
            is_active_digital_currency: { name: "数字货币是否参数活动", options: {} },
            is_activity_task: { name: "活动币任务是否启用", options: {} },
            activity_task_least_amount: { name: "活动币任务最少真实金额", options: {} },
            is_activity_back_water: { name: "活动币任务是否返水", options: {} },
            activity_task_pattern: { name: "活动币任务激活模式", options: {} },
            auth_types: { name: "验证方式", options: {} },
            is_register_store_bank_info: { name: "注册是否储存银行卡信息", options: {} },
            is_currency_conversion: { name: '汇率转换', options: {} },
            commission_config: { name: '直属分红配置', options: {} },
            commission_model_id: { name: '直属分红配置', options: {} },
            betting_tax: { name: '游戏投注营利税收', options: {} },
            is_game_audit: { name: '游戏稽核开关', options: {} },
            start_audit_amount: { name: '起点稽核金额', options: {} },
            trigger_audit_jackpot_multiplier: { name: '触发稽核爆奖倍数', options: {} },
            trigger_audit_profit_amount: { name: '触发稽核盈利金额', options: {} },
            audit_turnover_multiplier: { name: '稽核流水倍数', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        plat_name: "",
        status: "",
        page_count: 1,
        page_size: 20,
    };

    /**初始表单数据 */
    defaultForm = {
        plat_id: 0,
        plat_name: "",
        region: "China",
        language: [],
        app_types: [],
        status: 1,
        extends: {},
        water_config: {},
        promotion_floor: {},
        is_bind_phone_award: 1,
        is_bind_phone_exchange: 1,
        is_bet_water_display: 1,
        is_promotion_statistics_display: 1,
        is_gold_transfer: 0,
        gold_transfer_fee: 0,
        gold_transfer_water_multiple: 1,
        promotion_floor_unit: 0.01,
        is_promotion_same: 0,
        is_bind_phone_transfer: 0,
        is_bind_real_name: 1,
        is_bind_cpf_exchange: 0,
        currency_type: "CNY",
        is_promotion_solid: 98, // 1:是 98:否
        is_password_gold_transfer: 98, // 1:是 98:否
        is_show_message_win: 1, // 1:是 98:否
        is_agent_bonus: 98, // 1:是 98:否
        is_first_login_send_sms: 98, // 1:是 98:否
        is_user_manual_refund: 98, // 1:是 98:否
        is_user_verification: 98,
        recharge_cost_rate: 0,
        game_cost_rate: 0,
        agent_bonus_rate_limit: 0,
        is_bet_gold_display: 0,
        is_open_registration: 0,
        is_force_short_chain: 1,
        is_game_with_parent: 98,
        api_type: 1, //1-普通 2-OpenApi
        is_win_gold_display: 1,
        is_win_leaderboard_display: 0,
        is_water_leaderboard_display: 0,
        is_recharge_leaderboard_display: 0,
        is_bind_phone_recharge: 0,
        validate_type: [],
        register_types: [],
        is_show_commission: 1,
        is_gold_exchange: 98,
        is_exchange_fail_automatic_refund: 98,
        bet_log_keep_days: 0,
        bet_log_search_days: 0,
        main_language: "",
        client_config: {},
        other_config: {},
        vendor_wallet_types: [],
        exchange_count: 1,
        register_same_ip_limit: 0,
        max_exchange_gold: -1,
        forbidden_country: "",
        is_active_digital_currency: 1,
        is_activity_task: "",
        activity_task_least_amount: "",
        is_activity_back_water: "",
        activity_task_pattern: "",
        auth_types: 1,
        is_register_store_bank_info: 98,
        is_currency_conversion: 98,
        betting_tax: 0,
        is_game_audit: 98,
        start_audit_amount: "",
        trigger_audit_profit_amount: "",
        trigger_audit_jackpot_multiplier: "",
        audit_turnover_multiplier: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: JSON.parse(JSON.stringify(this.defaultForm)),
        formSource: null, // 表单的原始数据
        initPromotion_floor: <any>{},
        initWater_config: <any>{},
        forbidden_country: "",
    };

    /**初始返佣折扣数据 */
    defaultPromotionConfig = {
        0: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        2: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        4: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        8: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        16: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        32: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        64: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
        128: {
            is_open: false,
            start_limit_num: 0,
            start_limit_water: 0,
            start_num: 0,
        },
    };

    /**折扣返佣弹窗数据 */
    promotionDiscountDialogData = {
        bShow: false,
        form: {
            plat_id: "",
            promotion_discount: JSON.parse(JSON.stringify(this.defaultPromotionConfig)),
        },
        formSource: null,
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.setInitConfig();
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
        data.extends = jsonToObject(data.extends);
        this.dialogData.formSource = data;

        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        // client_config
        Object.assign(
            this.dialogData.form.client_config,
            JSON.parse(
                JSON.stringify({
                    client_config: data.extends.client_config,
                })
            )
        );
        delete data.extends["client_config"];

        Object.assign(this.dialogData.form.other_config, JSON.parse(JSON.stringify(data.extends)));
        this.promotionDiscountDialogData.form.promotion_discount = JSON.parse(
            JSON.stringify(this.defaultPromotionConfig)
        );
        if (data.promotion_discount && data.promotion_discount.length != 0) {
            Object.assign(
                this.promotionDiscountDialogData.form.promotion_discount,
                JSON.parse(JSON.stringify(data.promotion_discount))
            );
        }

        const langKeys = Object.keys(this.tableData.columns.language.options);
        const arr = [];
        for (const item of this.dialogData.form.language) {
            const idx = langKeys.indexOf(item);
            arr.push(idx);
        }
        this.dialogData.form.language = arr;
        this.dialogData.bShow = true;
        // console.log(">>>>>>>", this.dialogData.form.language)
    }

    /**设置配置初始数据 */
    setInitConfig() {
        let type = getFirstKey(this.tableData.columns.vendor_type.options_type[0]);
        Object.keys(this.tableData.columns.vendor_type.options).forEach(element => {
            this.dialogData.initPromotion_floor[element] = 0;
            this.dialogData.initWater_config[element] = { type: type, rate: 1 };
        });
    }

    /**设置推广配置数据 */
    setPromotionModel(data: any[]) {
        if (this.promotionModelDialogData.promotionModelList.length == 0) {
            this.promotionModelDialogData.promotionModelList.push(...data);
        }
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            plat_name: "",
            status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.form.client_config = {};
            this.dialogData.form.other_config = {};
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_show, { plat_id: data.plat_id });
        } else {
            this.dialogData.bShow = true;
            this.resetDialogForm();
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
        this.dialogData.form.promotion_floor = JSON.parse(JSON.stringify(this.dialogData.initPromotion_floor));
        this.dialogData.form.water_config = JSON.parse(JSON.stringify(this.dialogData.initWater_config));
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const formCopy = JSON.parse(JSON.stringify(this.dialogData.form));

        formCopy.app_types = JSON.stringify(formCopy.app_types);
        formCopy.water_config = JSON.stringify(formCopy.water_config);
        formCopy.promotion_floor = JSON.stringify(formCopy.promotion_floor);
        formCopy.validate_type = JSON.stringify(formCopy.validate_type);
        formCopy.register_types = JSON.stringify(formCopy.register_types);
        formCopy.vendor_wallet_types = JSON.stringify(formCopy.vendor_wallet_types);

        //组回原始 extends
        if (typeof this.dialogData.form.client_config == "string") {
            this.dialogData.form.client_config = JSON.parse(this.dialogData.form.client_config);
        }
        if (typeof this.dialogData.form.other_config == "string") {
            this.dialogData.form.other_config = JSON.parse(this.dialogData.form.other_config);
        }
        formCopy.extends = {};
        formCopy.extends = {
            ...this.dialogData.form.client_config,
            ...this.dialogData.form.other_config,
        };
        formCopy.extends = JSON.stringify(formCopy.extends);
        try {
            let extendsStr: any = "{}";
            if (Object.keys(this.dialogData.form.extends).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(this.dialogData.form.extends));
            }
            formCopy.extends = extendsStr;

            const langKeys = Object.keys(this.tableData.columns.language.options);
            const arr = [];
            for (const idx of this.dialogData.form.language) {
                arr.push(langKeys[idx]);
            }
            formCopy.language = JSON.stringify(arr);

            this.sendNotification(HttpType.admin_plat_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        //组回原始 extends
        if (typeof this.dialogData.form.client_config == "string") {
            this.dialogData.form.client_config = JSON.parse(this.dialogData.form.client_config);
        }
        if (typeof this.dialogData.form.other_config == "string") {
            this.dialogData.form.other_config = JSON.parse(this.dialogData.form.other_config);
        }
        formCopy.extends = {};
        formCopy.extends = {
            ...this.dialogData.form.client_config,
            ...this.dialogData.form.other_config,
        };
        formCopy.extends = JSON.stringify(formCopy.extends);
        try {
            formCopy.extends = JSON.parse(formCopy.extends);
            const temp = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }

            let extendsStr: any = "{}";
            if (temp.extends) {
                if (Object.keys(temp.extends).length > 0) {
                    extendsStr = JSON.stringify(JSON.parse(temp.extends));
                }
                temp.extends = extendsStr;
            }

            const langKeys = Object.keys(this.tableData.columns.language.options);
            const arr = [];
            for (const idx of formCopy.language) {
                arr.push(langKeys[idx]);
            }
            temp.language = JSON.stringify(arr);

            temp.plat_id = this.dialogData.form.plat_id;
            this.sendNotification(HttpType.admin_plat_update, temp);
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_update, { plat_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**Vip Model弹窗相关数据 */
    vipModelDialogData = {
        bShow: false,
        form: {
            plat_id: 0,
            plat_name: "",
            vip_model_id: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**顯示Vip Model弹窗 */
    showVipModelDialog(data: any) {
        this.vipModelDialogData.bShow = true;
        const { plat_id, vip_model_id, plat_name } = data;
        const formCopy: any = {
            plat_id,
            plat_name,
            vip_model_id: vip_model_id || "",
        };
        Object.assign(this.vipModelDialogData.form, JSON.parse(JSON.stringify(formCopy)));
        this.vipModelDialogData.formSource = formCopy;
    }

    /**隱藏Vip Model弹窗 */
    hideVipModelDialog() {
        this.vipModelDialogData.bShow = false;
    }

    /**更新Vip数据 */
    onUpdateVipModel() {
        const formCopy: any = formCompared(this.vipModelDialogData.form, this.vipModelDialogData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.vipModelDialogData.bShow = false;
            return;
        }
        const { plat_id, vip_model_id } = this.vipModelDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            vip_model_id: vip_model_id == "" ? 0 : vip_model_id,
        });
    }

    /**Backwater Model弹窗相关数据 */
    backwaterModelDialogData = {
        bShow: false,
        form: {
            plat_id: 0,
            plat_name: "",
            backwater_model_id: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**顯示Backwater Model弹窗 */
    showBackwaterModelDialog(data: any) {
        this.backwaterModelDialogData.bShow = true;
        const { plat_id, backwater_model_id, plat_name } = data;
        const formCopy: any = {
            plat_id,
            plat_name,
            backwater_model_id: backwater_model_id || "",
        };
        Object.assign(this.backwaterModelDialogData.form, JSON.parse(JSON.stringify(formCopy)));
        this.backwaterModelDialogData.formSource = formCopy;
    }

    commissionDialogData = {
        bShow: false,
        form: {
            plat_id: 0,
            plat_name: "",
            commission_model_id: "",
        },
        formSource: null, // 表单的原始数据
    };

    showCommissionDialog(data: any) {
        this.commissionDialogData.bShow = true;
        const { plat_id, commission_model_id, plat_name } = data;
        const formCopy: any = {
            plat_id,
            plat_name,
            commission_model_id: commission_model_id || "",
        };
        Object.assign(this.commissionDialogData.form, JSON.parse(JSON.stringify(formCopy)));
        this.commissionDialogData.formSource = formCopy;
    }

    /**隱藏Vip Model弹窗 */
    hideBackwaterModelDialog() {
        this.backwaterModelDialogData.bShow = false;
    }

    /**更新Vip数据 */
    onUpdateBackwaterModel() {
        const formCopy: any = formCompared(
            this.backwaterModelDialogData.form,
            this.backwaterModelDialogData.formSource
        );
        if (Object.keys(formCopy).length == 0) {
            this.backwaterModelDialogData.bShow = false;
            return;
        }
        const { plat_id, backwater_model_id } = this.backwaterModelDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            backwater_model_id: backwater_model_id == "" ? 0 : backwater_model_id,
        });
    }

    /**更新直属分红数据 */
    onUpdateCommissionModel() {
        const formCopy: any = formCompared(
            this.commissionDialogData.form,
            this.commissionDialogData.formSource
        );
        if (Object.keys(formCopy).length == 0) {
            this.commissionDialogData.bShow = false;
            return;
        }
        const { plat_id, commission_model_id } = this.commissionDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            commission_model_id: commission_model_id == "" ? 0 : commission_model_id,
        });
    }

    /**Promotion Model弹窗相关数据 */
    promotionModelDialogData = {
        bShow: false,
        form: {
            plat_id: 0,
            plat_name: "",
            promotion_model_id: "",
        },
        formSource: null, // 表单的原始数据
        promotionModelList: <any>[],
    };

    /**顯示Promotion Model弹窗 */
    showPromotionModelDialog(data: any) {
        this.promotionModelDialogData.bShow = true;
        const { plat_id, promotion_model_id, plat_name } = data;
        const formCopy: any = {
            plat_id,
            plat_name,
            promotion_model_id: promotion_model_id || "",
        };
        Object.assign(this.promotionModelDialogData.form, JSON.parse(JSON.stringify(formCopy)));
        this.promotionModelDialogData.formSource = formCopy;
    }

    /**隱藏Promotion Model弹窗 */
    hidePromotionModelDialog() {
        this.promotionModelDialogData.bShow = false;
    }

    /**更新Vip数据 */
    onUpdatePromotionModel() {
        const formCopy: any = formCompared(
            this.promotionModelDialogData.form,
            this.promotionModelDialogData.formSource
        );
        if (Object.keys(formCopy).length == 0) {
            this.promotionModelDialogData.bShow = false;
            return;
        }
        const { plat_id, promotion_model_id } = this.promotionModelDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            promotion_model_id: promotion_model_id == "" ? 0 : promotion_model_id,
        });
    }

    /**取得推廣配置 */
    getPromotionModelById(id: any) {
        return this.promotionModelDialogData.promotionModelList.find((item: any) => item.promotion_model_id == id);
    }

    /**清除缓存 */
    clearCache(data: any) {
        const { plat_id } = data;
        MessageBox.confirm(<string>LangUtil("确定要") + <string>LangUtil("清除缓存"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_clear_cache, {
                    plat_id: plat_id,
                });
            })
            .catch(() => { });
    }

    /**显示折扣返佣弹窗 */
    showPromotionDiscountDialog(data: any) {
        this.promotionDiscountDialogData.form.plat_id = data.plat_id;
        Object.assign(this.promotionDiscountDialogData.form, JSON.parse(JSON.stringify(data)));
        console.log(this.promotionDiscountDialogData.form);
        this.sendNotification(HttpType.admin_plat_show, { plat_id: data.plat_id });
        this.promotionDiscountDialogData.bShow = true;
    }

    /**隐藏折扣返佣弹窗 */
    hidePromotionDiscountDialog() {
        this.promotionDiscountDialogData.bShow = false;
    }

    /**更新返佣折扣 */
    onUpdatePromotionDiscount() {
        const { plat_id, promotion_discount } = this.promotionDiscountDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            promotion_discount: JSON.stringify(promotion_discount),
        });
    }

    /**All Bonus Model弹窗相关数据 */
    allBonusModelDialogData = {
        bShow: false,
        form: {
            plat_id: 0,
            plat_name: "",
            all_bonus_model_id: "",
        },
        formSource: null, // 表单的原始数据
        allBonusModelList: <any>[],
    };

    /**顯示All Bonus Model弹窗 */
    showAllBonusModelDialog(data: any) {
        this.allBonusModelDialogData.bShow = true;
        const { plat_id, all_bonus_model_id, plat_name } = data;
        const formCopy: any = {
            plat_id,
            plat_name,
            all_bonus_model_id: all_bonus_model_id || "",
        };
        Object.assign(this.allBonusModelDialogData.form, JSON.parse(JSON.stringify(formCopy)));
        this.allBonusModelDialogData.formSource = formCopy;
    }

    /**隱藏顯示All Bonus Model弹窗 */
    hideAllBonusModelDialog() {
        this.allBonusModelDialogData.bShow = false;
    }

    /**隱藏顯示直属分红配置弹窗 */
    hideCommissionDialog() {
        this.commissionDialogData.bShow = false;
    }

    // /**更新All Bonus数据 */
    // onUpdateAllBonusModel() {
    //     const formCopy: any = formCompared(this.allBonusModelDialogData.form, this.allBonusModelDialogData.formSource);
    //     if (Object.keys(formCopy).length == 0) {
    //         this.allBonusModelDialogData.bShow = false;
    //         return;
    //     }
    //     const { plat_id, all_bonus_model_id } = this.allBonusModelDialogData.form;
    //     this.sendNotification(HttpType.admin_plat_update, {
    //         plat_id: plat_id,
    //         all_bonus_model_id: all_bonus_model_id == "" ? 0 : all_bonus_model_id,
    //     });
    // }

    /**初始化基础设置 */
    onInitSetting() {
        const platName = this.allBonusModelDialogData.form.plat_name;
        MessageBox.confirm(`【${platName}】${LangUtil("质押分红是否初始化")}`, <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_clear_stake_bonus, {
                    plat_id: this.allBonusModelDialogData.form.plat_id,
                });
            })
            .catch(() => { });
    }

    /**取得全盘分红配置 */
    getAllBonusModelById(id: any) {
        return this.allBonusModelDialogData.allBonusModelList.find((item: any) => item.all_bonus_model_id == id);
    }

    /**设置全盘分红配置数据 */
    setAllBonusModel(data: any[]) {
        if (this.allBonusModelDialogData.allBonusModelList.length == 0) {
            this.allBonusModelDialogData.allBonusModelList.push(...data);
        }
    }
}
