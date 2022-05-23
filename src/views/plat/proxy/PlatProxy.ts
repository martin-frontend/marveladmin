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
            is_bind_real_name: { name: "", options: {} },
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
        currency_type: "CNY",
        is_promotion_solid: 98, // 1:是 98:否
        is_password_gold_transfer: 98, // 1:是 98:否
        is_show_message_win: 1, // 1:是 98:否
        is_agent_bonus: 98, // 1:是 98:否
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
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: JSON.parse(JSON.stringify(this.defaultForm)),
        formSource: null, // 表单的原始数据
        initPromotion_floor: <any>{},
        initWater_config: <any>{},
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
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_show, { plat_id: data.plat_id });
        } else {
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
        const {
            plat_id,
            plat_name,
            app_types,
            api_type,
            region,
            currency_type,
            language,
            status,
            water_config,
            //代理保底
            promotion_floor,
            promotion_floor_unit, //保底设定最小单位
            is_promotion_same, //保底是否平级
            is_promotion_solid, //保底级差是否固定
            //总代分红
            is_agent_bonus,
            recharge_cost_rate,
            game_cost_rate,
            agent_bonus_rate_limit,
            //开关设定
            is_bind_phone_award, //绑定手机领取奖励
            is_bind_phone_exchange, //绑定手机-收款
            is_bet_water_display, //投注流水展示
            is_promotion_statistics_display, //推广统计展示
            is_bind_phone_transfer, //绑定手机-金币划转
            is_bind_real_name, //兑换绑定真名
            is_password_gold_transfer, //现金密码-金必划转
            is_show_message_win, //显示中讲信息
            is_bet_gold_display, // 输赢投注显示
            is_open_registration, // 注册开关
            is_win_leaderboard_display,
            is_water_leaderboard_display,
            is_recharge_leaderboard_display,
            is_bind_phone_recharge, //绑定手机充值
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            plat_name,
            app_types,
            api_type,
            region,
            currency_type,
            language,
            status,
            water_config,
            //代理保底
            promotion_floor,
            promotion_floor_unit, //保底设定最小单位
            is_promotion_same, //保底是否平级
            is_promotion_solid, //保底级差是否固定
            //总代分红
            is_agent_bonus,
            recharge_cost_rate,
            game_cost_rate,
            agent_bonus_rate_limit,
            //开关设定
            is_bind_phone_award, //绑定手机领取奖励
            is_bind_phone_exchange, //绑定手机-收款
            is_bet_water_display, //投注流水展示
            is_promotion_statistics_display, //推广统计展示
            is_bind_phone_transfer, //绑定手机-金币划转
            is_bind_real_name, //兑换绑定真名
            is_password_gold_transfer, //现金密码-金必划转
            is_show_message_win, //显示中讲信息
            is_bet_gold_display, // 输赢投注显示
            is_open_registration, // 注册开关

            is_win_leaderboard_display,
            is_water_leaderboard_display,
            is_recharge_leaderboard_display,
            is_bind_phone_recharge, //绑定手机充值
        };

        formCopy.app_types = JSON.stringify(formCopy.app_types);
        formCopy.water_config = JSON.stringify(formCopy.water_config);
        formCopy.promotion_floor = JSON.stringify(formCopy.promotion_floor);
        try {
            let extendsStr: any = "{}";
            if (Object.keys(this.dialogData.form.extends).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(this.dialogData.form.extends));
            }
            formCopy.extends = extendsStr;

            const langKeys = Object.keys(this.tableData.columns.language.options);
            const arr = [];
            for (const idx of language) {
                arr.push(langKeys[idx]);
            }
            formCopy.language = JSON.stringify(arr);

            this.sendNotification(HttpType.admin_plat_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>i18n.t("common.jsonError"));
        }
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
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
            MessageBox.alert(<string>i18n.t("common.jsonError"));
        }
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_update, { plat_id: id, is_delete: 1 });
            })
            .catch(() => {});
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
        MessageBox.confirm(
            <string>i18n.t("admin_permission.confirmText2") + <string>i18n.t("plat.clearCache"),
            <string>i18n.t("common.prompt"),
            {
                confirmButtonText: <string>i18n.t("common.determine"),
                cancelButtonText: <string>i18n.t("common.cancel"),
                type: "warning",
            }
        )
            .then(() => {
                this.sendNotification(HttpType.admin_plat_clear_cache, {
                    plat_id: plat_id,
                });
            })
            .catch(() => {});
    }

    /**显示折扣返佣弹窗 */
    showPromotionDiscountDialog(data: any) {
        this.promotionDiscountDialogData.form.plat_id = data.plat_id;
        Object.assign(this.promotionDiscountDialogData.form, JSON.parse(JSON.stringify(data)));
        console.log(">>>>>>>>>");
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
    /**更新All Bonus数据 */
    onUpdateAllBonusModel() {
        const formCopy: any = formCompared(this.allBonusModelDialogData.form, this.allBonusModelDialogData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.allBonusModelDialogData.bShow = false;
            return;
        }
        const { plat_id, all_bonus_model_id } = this.allBonusModelDialogData.form;
        this.sendNotification(HttpType.admin_plat_update, {
            plat_id: plat_id,
            all_bonus_model_id: all_bonus_model_id == "" ? 0 : all_bonus_model_id,
        });
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
