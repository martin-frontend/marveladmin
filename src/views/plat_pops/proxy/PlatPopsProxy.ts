import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_pops/setting";
import { MessageBox } from "element-ui";
import IPlatPopsProxy from "./IPlatPopsProxy";

export default class PlatPopsProxy extends AbstractProxy implements IPlatPopsProxy {
    static NAME = "PlatPopsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_pops_table_columns);
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
            app_platform: { name: "应用平台", options: [] },
            channel_id: { name: '所属渠道', options: {} },
            condition_balance: { name: "条件-余额", options: [] },
            condition_is_first_login: { name: "条件-首次登入", options: [] },
            condition_is_first_recharge: { name: "条件-首次充值", options: [] },
            conditions: { name: "条件", options: {} },
            created_at: { name: "创建时间", options: [] },
            created_by: { name: "创建人", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            end_time: { name: "结束时间", options: [] },
            id: { name: "弹窗ID", options: [] },
            index_no: { name: "排序序号", options: [] },
            is_delete: { name: "是否删除", options: ["否", "是"] },
            languages: { name: "语言", options: {} },
            plat_id: { name: "平台ID", options: {} },
            range_channel_ids: { name: '范围-渠道号ID', options: {} },
            range_type_all: { name: '受众范围所有', options: {} },
            range_type_channel_id: { name: '指定渠道', options: {} },
            range_type_user_id: { name: '指定用户', options: {} },
            range_type_user_tag_id: { name: '指定标签', options: {} },
            range_user_ids: { name: '范围-用户ID', options: {} },
            range_user_tag_ids: { name: '范围-用户标签ID', options: {} },
            rules: { name: '规则', options: {} },
            scenarios_type: { name: '弹窗情景类型', options: {} },
            start_time: { name: "发布时间", options: [] },
            status: { name: "状态", options: [] },
            title: { name: "弹窗标题", options: [] },
            type: { name: "弹窗类型", options: {} },
            type_bind_id: { name: "类型绑定id", options: [] },
            updated_at: { name: "修改时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            user_tag: { name: '用户标签', options: {} },
            condition_balance_options: { options: {} },
            subject: { name: '前端标题', options: {} },
            content: { name: '前端内容', options: {} },
            notice: { name: '公告选项', options: {} },
            acitvity: { name: '活动选项', options: {} },
            mark: {
                name: "",
                options: {
                    1: "<=",
                },
            },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        orderData: {
            id: null,
            opt: null, //操作:1-置顶 |2-置底 |3-上调 |4-下调
            status: null,
            plat_id: "",
        },
        /**是否重新排序 */
        isResort: false,
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        status: "",
        plat_id: "",
        type: "",
        channel_id: "",
    };

    /**條件规则 */
    conditionRule: any = {
        condition: "",
        firstLogin: 1,
        firstRecharge: 2,
        coin: "", //币种
        mark: "1",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: null,
            plat_id: "",
            app_platform: <any>[],
            languages: <any>[],
            time: <any>[],
            start_time: "",
            end_time: "",
            type: "",
            type_bind_id: "",
            subject: "",
            content: "",
            scenarios_type: "",
            range_type_all: 99,
            range_type_user_id: 99,
            range_user_ids: "",
            range_type_user_tag_id: 99,
            range_user_tag_ids: "",
            range_type_channel_id: 99,
            range_channel_ids: "",
            condition: [],
        },
        formSource: null, // 表单的原始数据
        excelColumnInfo: {
            userid: { name: "userid", options: {} },
        },
        excelChannelColumnInfo: {
            channelid: { name: "channelid", options: {} },
        },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        if (this.dialogData.form.type == 1) {
            this.onQueryNotice(this.dialogData.form.plat_id);
        }
        if (this.dialogData.form.type == 2) {
            this.onQueryActivity(this.dialogData.form.plat_id);
        }

        this.dialogData.form.time = [this.dialogData.form.start_time, this.dialogData.form.end_time];

        if (this.dialogData.form.type == 3 && data.rules) {
            this.dialogData.form.subject = data.rules.url;
            this.dialogData.form.content = data.rules.options;
        }

        this.tableData.columns.condition_balance_options = this.tableData.columns.condition_balance.options[
            this.dialogData.form.plat_id
        ];
        if (this.dialogData.form.condition_is_first_login) {
            this.addCondition({
                firstLogin: this.dialogData.form.condition_is_first_login,
                condition: "condition_is_first_login",
            });
        }
        if (this.dialogData.form.condition_is_first_recharge) {
            this.addCondition({
                condition: "condition_is_first_recharge",
                firstRecharge: this.dialogData.form.condition_is_first_recharge,
            });
        }
        if (this.dialogData.form.condition_balance) {
            const condition_balance = this.dialogData.form.condition_balance;
            for (let i = 0; i < Object.keys(condition_balance).length; i++) {
                this.addCondition({
                    condition: "condition_balance",
                    coin: Object.keys(condition_balance)[i],
                    balance: Object.values(condition_balance)[i],
                });
            }
        }
        if (this.dialogData.status == DialogStatus.create) {
            this.dialogData.form.type_bind_id = "";
        }

        // 指定标签
        const assignTagArr: any = [];
        if (data.range_user_tag_ids) {
            const arr = data.range_user_tag_ids.split(",");
            // @ts-ignore
            arr.forEach(tag => {
                if (this.tableData.columns.user_tag.options[data.plat_id][Number(tag)]) {
                    assignTagArr.push(tag);
                }
            });
        }
        this.dialogData.form.range_user_tag_ids = assignTagArr;
        // 指定渠道
        // const assignChannelArr: any = [];
        // if (data.range_channel_ids) {
        //     const arr = data.range_channel_ids.split(",");
        //     // @ts-ignore
        //     arr.forEach(tag => {
        //         if (this.tableData.columns.channel_id.options[data.plat_id][Number(tag)]) {
        //             assignChannelArr.push(tag);
        //         }
        //     });
        // }
        // this.dialogData.form.range_channel_ids = assignChannelArr;
    }

    setActivityType(data: any) {
        this.tableData.columns.acitvity.options = data;
    }

    setNoticeType(data: any) {
        this.tableData.columns.notice.options = data;
    }

    setActivity(data: any) {
        const languages = JSON.parse(data.languages)
        this.dialogData.form.languages.splice(0)
        this.dialogData.form.languages.push(...languages);
    }

    setNotice(data: any) {
        this.dialogData.form.app_platform.push(...data.app_platform);
        this.dialogData.form.languages.push(...data.languages);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            status: "",
            type: "",
            channel_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.form.condition = [];
            this.sendNotification(HttpType.admin_plat_pops_show, { id: data.id });
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
        Object.assign(this.dialogData.form, {
            id: null,
            plat_id: "",
            app_platform: <any>[],
            languages: <any>[],
            type: "",
            type_bind_id: "",
            subject: "",
            content: "",
            scenarios_type: "",
            range_type_all: 99,
            range_type_user_id: 99,
            range_user_ids: "",
            range_type_user_tag_id: 99,
            range_user_tag_ids: "",
            range_type_channel_id: 99,
            range_channel_ids: "",
            condition: [],
            start_time: "",
            end_time: "",
            time: [],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_pops_index, objectRemoveNull(this.listQuery));
    }

    /**查询 */
    onQueryNotice(plat_id: any) {
        this.sendNotification(HttpType.admin_plat_pops_type_plats_notice_index,
            { plat_id: plat_id });
    }

    /**查询 */
    onQueryActivity(plat_id: any) {
        this.sendNotification(HttpType.admin_plat_pops_type_plat_activity_index,
            { plat_id: plat_id });
    }

    onNoticeShow(id: any) {
        this.sendNotification(HttpType.admin_plat_pops_type_plats_notice_show,
            { id: id });
    }

    onActivityShow(id: any) {
        this.sendNotification(HttpType.admin_plat_pops_type_plat_activity_show,
            { id: id });
    }

    /**添加数据 */
    onAdd() {
        let {
            plat_id,
            app_platform,
            languages,
            start_time,
            end_time,
            type,
            type_bind_id,
            subject,
            content,
            scenarios_type,
            range_type_all,
            range_type_user_id,
            range_user_ids,
            range_type_user_tag_id,
            range_user_tag_ids,
            range_type_channel_id,
            range_channel_ids,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            app_platform: jsonStringify(app_platform),
            languages: jsonStringify(languages),
            start_time,
            end_time,
            type,
            type_bind_id,
            scenarios_type,
            range_type_all,
            range_type_user_id,
            range_user_ids,
            range_type_user_tag_id,
            range_user_tag_ids,
            range_type_channel_id,
            range_channel_ids,
        };
        if (this.dialogData.form.range_type_all == 99 &&
            this.dialogData.form.range_type_user_id == 99 &&
            this.dialogData.form.range_type_user_tag_id == 99 &&
            this.dialogData.form.range_type_channel_id == 99) {
            MessageBox.alert(<any>LangUtil("参与用户必须至少选择一项"));
            return;
        }
        if (this.dialogData.form.range_type_user_tag_id == true && this.dialogData.form.range_user_tag_ids == "") {
            MessageBox.alert(<any>LangUtil("指定标签必须选择"));
            return;
        }

        formCopy.start_time = this.dialogData.form.time[0];
        formCopy.end_time = this.dialogData.form.time[1];
        formCopy.range_user_tag_ids = formCopy.range_user_tag_ids.toString();
        if (formCopy.type == 3) {
            formCopy.rules = JSON.stringify({ url: subject, options: content });
        }
        formCopy.condition_balance = {};
        // @ts-ignore
        this.dialogData.form.condition.forEach(element => {
            if (element.condition == "condition_is_first_login") {
                // 用户首次登录
                formCopy.condition_is_first_login = element.firstLogin;
            } else if (element.condition == "condition_is_first_recharge") {
                // 用户首次充值
                formCopy.condition_is_first_recharge = element.firstRecharge;
            } else if (element.condition == "condition_balance") {
                // 用户首次充值
                if (element.balance) {
                    formCopy.condition_balance[element.coin] = element.balance;
                }
            }
        });
        if (Object.keys(formCopy.condition_balance).length > 0) {
            formCopy.condition_balance = JSON.stringify(formCopy.condition_balance);
        } else {
            delete formCopy.condition_balance;
        }
        delete formCopy.condition;
        delete formCopy.time;
        delete formCopy.subject;
        delete formCopy.content;
        this.sendNotification(HttpType.admin_plat_pops_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate(fromTable = false) {
        let formCopy: any = null;
        if (fromTable) {
            formCopy = objectRemoveNull(this.tableData.orderData);
        } else {
            // 删除多余无法去除的参数
            formCopy = formCompared(this.dialogData.form, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(formCopy).length == 0) {
                this.dialogData.bShow = false;
                return;
            }
            // 添加必填参数
            formCopy.id = this.dialogData.form.id;

            if (this.dialogData.form.range_type_all == 99 &&
                this.dialogData.form.range_type_user_id == 99 &&
                this.dialogData.form.range_type_user_tag_id == 99 &&
                this.dialogData.form.range_type_channel_id == 99) {
                MessageBox.alert(<any>LangUtil("参与用户必须至少选择一项"));
                return;
            }
            if (this.dialogData.form.range_type_user_tag_id == true && this.dialogData.form.range_user_tag_ids == "") {
                MessageBox.alert(<any>LangUtil("指定标签必须选择"));
                return;
            }
            formCopy.range_type_all = this.dialogData.form.range_type_all;
            formCopy.range_type_user_id = this.dialogData.form.range_type_user_id;
            formCopy.range_user_ids = this.dialogData.form.range_user_ids;
            formCopy.range_type_user_tag_id = this.dialogData.form.range_type_user_tag_id;
            formCopy.range_type_channel_id = this.dialogData.form.range_type_channel_id;
            formCopy.range_channel_ids = this.dialogData.form.range_channel_ids;
            if (formCopy.range_user_tag_ids) {
                formCopy.range_user_tag_ids = JSON.parse(formCopy.range_user_tag_ids).toString();
            }
            // if (formCopy.range_channel_ids) {
            //     formCopy.range_channel_ids = JSON.parse(formCopy.range_channel_ids).toString();
            // }
            if (this.dialogData.form.type == 3) {
                formCopy.rules = JSON.stringify({ url: this.dialogData.form.subject, options: this.dialogData.form.content });
            }
            formCopy.condition_balance = {};
            // @ts-ignore
            this.dialogData.form.condition.forEach(element => {
                if (element.condition == "condition_is_first_login") {
                    // 用户首次登录
                    formCopy.condition_is_first_login = element.firstLogin;
                } else if (element.condition == "condition_is_first_recharge") {
                    // 用户首次充值
                    formCopy.condition_is_first_recharge = element.firstRecharge;
                } else if (element.condition == "condition_balance") {
                    // 用户首次充值
                    if (element.balance) {
                        formCopy.condition_balance[element.coin] = element.balance;
                    }
                }
            });

            if (Object.keys(formCopy.condition_balance).length > 0) {
                formCopy.condition_balance = JSON.stringify(formCopy.condition_balance);
            } else {
                delete formCopy.condition_balance;
            }
            delete formCopy.condition;
            delete formCopy.time;
            delete formCopy.subject;
            delete formCopy.content;
            formCopy.start_time = this.dialogData.form.time[0];
            formCopy.end_time = this.dialogData.form.time[1];
        }
        this.sendNotification(HttpType.admin_plat_pops_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_pops_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    onRemoveItem() {
        MessageBox.confirm(<string>LangUtil("确定撤销此公告?"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.tableData.orderData.opt = null;
                this.onUpdate(true);
            })
            .catch(() => { });
    }

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_plat_pops_update, { id: id, next_id: next_id, opt: 11 });
    }

    /** 显示复制模版 */
    showCopyDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.resetDialogForm();
        this.dialogData.formSource = null;
        this.sendNotification(HttpType.admin_plat_pops_show, { id: data.id });
    }

    /**排序 */
    onOrderList() {
        const formCopy = this.tableData.orderData;
        this.sendNotification(HttpType.admin_plat_pops_update, formCopy);
    }

    addCondition(option: any = {}) {
        this.dialogData.form.condition.push(JSON.parse(JSON.stringify({ ...this.conditionRule, ...option })));
    }
}
