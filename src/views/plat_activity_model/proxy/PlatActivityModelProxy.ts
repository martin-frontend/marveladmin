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
        columns: {
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
            plat_id_count: { name: "", options: {} },
            public_child_rules: { name: "", options: {} },
            rules: { name: "", options: {} },
            rules_num: { name: "", options: {} },
            settlement_period: { name: "", options: {} },
            settlement_type: { name: "", options: {} },
            show_types: { name: "", options: <any>{} },
            daily_ratio: { name: "", options: <any>{} },
            type: { name: "", options: {} },
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
        list: [
            {
                name: "", //子规则名称
                list: [JSON.parse(JSON.stringify(this.conditionRule))],
            },
        ],
    };

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
        rules: [JSON.parse(JSON.stringify(this.activityRules))],
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
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_model_index, objectRemoveNull(this.listQuery));
    }
    chickDailyRatio(): boolean {
        // if (this.dialogData.form.award_types.includes(16))
        if (this.dialogData.form.active_model_tag == "16") {
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
                this.sendNotification(HttpType.admin_plat_activity_model_update, formCopy);
            })
            .catch(() => {});
    }

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
