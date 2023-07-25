import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
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
            activity_category: { name: "活动分类", options: {} },
            activity_desc: { name: "活动描述", options: {} },
            activity_name: { name: "活动名称", options: {} },
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
            vendor_id: { name: "厂商ID", options: {} },
            vendor_ids: { name: "", options: {} },
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

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
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
            show_type: <any>2,
            is_once: "",
            rules: <any>[],
            award_tpl: "",
            award_type_map: "",
            award_timing_map: "",
            icon: "",
            icon_url: "",
            extended_task_type: 0,
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
            vendorArr: <any>[],
            transfer_amount_rate_Arr: <any>[],
        },
        activityModelList: [],
        formSource: <any>null, // 表单的原始数据
        fileList: <any>[{ url: "" }],
        fileList1: <any>[{ url: "" }],
        uploadType: "",
        update: 0,
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
        this.dialogData.formSource["des"] = this.dialogData.form.des;
        this.dialogData.form.plat_id = this.dialogData.form.plat_id.toString();
        this.dialogData.fileList[0].url = this.dialogData.form.link_url_url;
        this.dialogData.fileList1[0].url = this.dialogData.form.icon_url;
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
            this.getActivityModel({
                page_count: 1,
                page_size: 20000,
                plat_id: data.plat_id,
            });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
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
        Object.assign(this.dialogData.form, {
            id: null,
            plat_id: "",
            activity_name: "",
            activity_category: "",
            is_preheat: 0,
            start_time: "",
            end_time: "",
            model_open_mode: 1,
            open_model_url: "",
            open_mode_url: "",
            settlement_type: "",
            award_type: "",
            award_types: [],
            bonus_multiple: 1,
            type: "2",
            model_id: "",
            link_url: "",
            settlement_period: "",
            des: "",
            show_types: [],
            show_type: <any>1,
            is_once: "",
            rules: [],
            award_tpl: "",
            award_type_map: "",
            icon: "",
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
            vendorArr: <any>[],
            transfer_amount_rate_Arr: <any>[],
        });

        this.activeModelData.options.length = 0;
        this.dialogData.fileList = [{ url: "" }];
        this.dialogData.fileList1 = [{ url: "" }];
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

    /**添加数据 */
    onAdd() {
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
            vendorArr,
            transfer_amount_rate_Arr,
        } = this.dialogData.form;
        for (const item of rules) {
            for (const child of item.list) {
                for (const child_1 of child.list) {
                    if (child_1.coin_type && child_1.type == "61" && child_1.params_type == 5) {
                        child_1.params = { [child_1.coin_type]: child_1.coin_amount };
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
                model_id,
                rules: JSON.stringify(rules),
                bonus_multiple,
                link_url,
                settlement_period,
                settlement_type,
                award_tpl,
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

        MessageBox.confirm(<string>LangUtil("发布以后活动数据不能修改，确定发布"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_activity_store, objectRemoveNull(formCopy));
            })
            .catch(() => {});
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
            .catch(() => {});
    }

    /**更新活动*/
    onUpdate() {
        // 删除多余无法去除的参数
        let formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        formCopy = objectRemoveNull(formCopy);
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            console.log("如果没有修改，就直接关闭弹窗");
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
        // 发送消息
        this.sendNotification(HttpType.admin_plat_activity_update, formCopy);
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
        if (this.dialogData.status == DialogStatus.update) {
            this.dialogData.form.des = body.activity_desc;
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
                link_url,
                is_once,
            } = body;

            this.dialogData.form.model_open_mode = open_mode;
            this.dialogData.form.settlement_type = settlement_type;
            this.dialogData.form.award_types = award_types;
            this.dialogData.form.bonus_multiple = bonus_multiple;
            this.dialogData.form.settlement_period = settlement_period;
            this.dialogData.form.award_tpl = award_tpl;
            this.dialogData.form.des = activity_desc;
            this.dialogData.form.show_types = show_types;
            this.dialogData.form.link_url = link_url;
            this.dialogData.form.is_once = is_once;
            this.dialogData.form.show_type = show_types[0];

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
            this.dialogData.form.transfer_amount_rate_Arr = <any>[];
            this.dialogData.form.rules = rules;
            this.dialogData.update++;

            console.log(">>>>>>>>>>>>>>>>>>>>>update");
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
}
