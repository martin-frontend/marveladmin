import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plats_notice/setting";
import { MessageBox } from "element-ui";
import IPlatsNoticeProxy from "./IPlatsNoticeProxy";
import { dateFormat } from "@/core/global/Functions";

import i18n from "@/lang";
import GlobalVar from "@/core/global/GlobalVar";
export default class PlatsNoticeProxy extends AbstractProxy implements IPlatsNoticeProxy {
    static NAME = "PlatsNoticeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_notice_table_columns);
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
            app_platform: { name: "应用平台", options: {} },
            category: { name: "分类", options: {} },
            content: { name: "公告内容", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            end_time: { name: "结束时间", options: {} },
            extends: { name: '配置参数', options: {} },
            id: { name: "公告ID", options: {} },
            img_uris: { name: "公告图片", options: {} },
            index_no: { name: "排序序号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            languages: { name: "语言", options: {} },
            name: { name: "公告标题", options: {} },
            open_mode: { name: "打开模块", options: {} },
            open_mode_url: { name: "模块跳转网页", options: {} },
            plat_id: { name: "所属平台", options: {} },
            start_time: { name: "发布时间", options: {} },
            status: { name: "状态", options: {} },
            thumbnail_uris: { name: "公告缩略图", options: {} },
            type: { name: "类型", options: {} },
            type_position: { name: "位置类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            video_uris: { name: "视频播放URL地址", options: {} },
            condition_balance: { name: "条件-余额", options: {} },
            condition_balance_options: { options: {} },
            condition_channel_id: { name: "条件-渠道号", options: {} },
            condition_is_first_login: { name: "条件-首次登入", options: {} },
            condition_is_first_recharge: { name: "条件-首次充值", options: {} },
            conditions: { name: "条件", options: {} },
            mark: {
                name: "",
                options: {
                    1: "<=",
                },
            },
            relation: {
                name: "",
                options: {
                    1: LangUtil("且"),
                    2: LangUtil("或"),
                },
            },
            condition_is_login: { name: "条件-是否登入", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isResort: false, // 是否重新排序
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 200,
        plat_id: "",
        type_position: "",
        status: "",
        category: "",
    };

    /**條件规则 */
    conditionRule: any = {
        condition: "",
        firstLogin: 1,
        firstRecharge: 2,
        coin: "", //币种
        mark: "1",
        showRelation: "0",
        relation: 2,
        balance: "", //余额
        channel_id: "",
        isLogin: 1,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        /** 页面是否载入中 */
        loading: false,
        addSwitch: true,
        form: <any>{
            id: null,
            plat_id: "",
            app_platform: <any>[],
            name: "",
            time: <any>[],
            start_time: "",
            end_time: "",
            type: 1,
            category: "",
            content: "",
            img_urls: "",
            img_uris: "",
            open_mode: "1",
            open_mode_url: "",
            thumbnail_uris: "",
            thumbnail_urls: "",
            languages: [],
            type_position: "",
            video_uris: "",
            condition: [],
            other_param: {}, //跳转到游戏的参数
            isNeedOtherParam: false,
            extends: {},
        },
        excelColumnInfo: {
            channel_id: { name: "channel_id", options: {} },
        },
        formSource: null, // 表单的原始数据
    };

    /**图片预览 相关数据 */
    previewImageDialogData = {
        bShow: false,
        url: "",
    };

    /**表单操作 数据 */
    tableCtrlData = {
        id: null,
        opt: null,
        status: null,
    };

    /**应用平台 类型 */
    appType = "2";
    type = "2";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns.plat_id.options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
            }
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            type_position: "",
            status: "",
            category: "",
        });
    }

    /**详细数据 */
    setDetail(data: any) {
        data.other_param = {};
        data.isNeedOtherParam = false;
        //将跳转URL中的参数分开
        if (data.open_mode_url && data.open_mode_url.trim()) {
            const str = data.open_mode_url.split("##");
            if (str && str.length > 1) {
                data.open_mode_url = str[0];
                data.other_param = JSON.parse(str[1]);
                data.isNeedOtherParam = true;
                console.log(" 转换之后的JSONwei ", data.other_param);
            }
        }
        data.extends = jsonToObject(data.extends);
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        // Object.assign(this.dialogData.form.other_param, data.other_param);
        // Object.assign(
        //     this.dialogData.form.other_param,
        //     JSON.parse(
        //         JSON.stringify({
        //             other_param: data.other_param,
        //         })
        //     )
        // );
        // this.dialogData.form.other_param = JSON.parse(JSON.stringify(data.other_param ));
        this.dialogData.form.plat_id = this.dialogData.form.plat_id.toString();
        this.dialogData.form.open_mode = this.dialogData.form.open_mode.toString();
        this.dialogData.form.time = [this.dialogData.form.start_time, this.dialogData.form.end_time];
        this.appType = data.app_platform[0].toString();
        this.dialogData.form.video_uris = this.dialogData.form.video_uris[this.type];
        this.tableData.columns.condition_balance_options = this.tableData.columns.condition_balance.options[
            this.dialogData.form.plat_id
        ];
        this.dialogData.addSwitch = false;
        //弹窗充值
        if (this.dialogData.form.condition_channel_id) {
            this.addCondition({
                condition: "condition_channel_id",
                channel_id: this.dialogData.form.condition_channel_id,
            });
        }
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
            const condition_balance = JSON.parse(this.dialogData.form.condition_balance);
            for (let i = 0; i < Object.keys(condition_balance).length; i++) {
                this.addCondition({
                    condition: "condition_balance",
                    coin: Object.keys(condition_balance)[i],
                    balance: Object.values(condition_balance)[i],
                });
            }
        }
        if (this.dialogData.form.condition_is_login) {
            this.addCondition({
                isLogin: this.dialogData.form.condition_is_login,
                condition: "condition_is_login",
            });
        }
        this.onChangeCondition();
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.loading = true;
            this.dialogData.formSource = data;
            this.dialogData.form.condition = [];
            this.sendNotification(HttpType.admin_plats_notice_show, { id: data.id });
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
            name: "",
            start_time: "",
            end_time: "",
            type: 1,
            category: "",
            content: "",
            img_urls: "",
            img_uris: "",
            open_mode: "1",
            open_mode_url: "",
            thumbnail_uris: "",
            thumbnail_urls: "",
            language: null,
            type_position: "",
            languages: [],
            video_uris: "",
            time: [],
            condition: [],
            other_param: {},
            isNeedOtherParam: false,
            extends: {},
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plats_notice_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let {
            plat_id,
            app_platform,
            name,
            time,
            start_time,
            end_time,
            type,
            category,
            content,
            img_urls,
            img_uris,
            open_mode,
            open_mode_url,
            thumbnail_uris,
            thumbnail_urls,
            languages,
            type_position,
            video_uris,
        } = this.dialogData.form;
        if (this.dialogData.form.isNeedOtherParam) {
            if (typeof this.dialogData.form.other_param == "string") {
                open_mode_url = open_mode_url + "##" + this.dialogData.form.other_param;
            } else open_mode_url = open_mode_url + "##" + JSON.stringify(this.dialogData.form.other_param);
            // open_mode_url = open_mode_url + "##" + this.dialogData.form.other_param;
        }
        // else
        // {
        //     this.dialogData.form.open_mode_url = this.dialogData.form.open_mode_url;
        // }
        app_platform = JSON.stringify(app_platform);
        img_uris = JSON.stringify(img_uris);
        img_urls = JSON.stringify(img_urls);
        thumbnail_uris = JSON.stringify(thumbnail_uris);
        thumbnail_urls = JSON.stringify(thumbnail_urls);
        if (type == 1) {
            img_uris = "";
            img_urls = "";
            thumbnail_uris = "";
            thumbnail_urls = "";
            video_uris = "";
        }
        if (type == 2) {
            content = "";
            video_uris = "";
        }
        if (type == 3) {
            content = "";
            img_uris = "";
            img_urls = "";
            thumbnail_uris = "";
            thumbnail_urls = "";
        }
        const formCopy: any = {
            // TODO
            plat_id,
            app_platform,
            name,
            time,
            start_time,
            end_time,
            type,
            category,
            content,
            img_urls,
            img_uris,
            open_mode,
            open_mode_url,
            thumbnail_uris,
            thumbnail_urls,
            languages: jsonStringify(languages),
            type_position,
            video_uris,
        };
        formCopy.start_time = this.dialogData.form.time[0];
        formCopy.end_time = this.dialogData.form.time[1];

        formCopy.video_uris = JSON.stringify({ [this.type]: formCopy.video_uris });
        delete formCopy.time;
        if (formCopy.type_position == 15) {
            formCopy.condition_balance = {};
            // @ts-ignore
            this.dialogData.form.condition.forEach(element => {
                if (element.condition == "condition_channel_id") {
                    // 渠道ID
                    formCopy.condition_channel_id = element.channel_id;
                } else if (element.condition == "condition_is_first_login") {
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
                } else if (element.condition == "condition_is_login") {
                    // 用户是否登入
                    formCopy.condition_is_login = element.isLogin;
                }
            });
            if (Object.keys(formCopy.condition_balance).length > 0) {
                formCopy.condition_balance = JSON.stringify(formCopy.condition_balance);
            } else {
                delete formCopy.condition_balance;
            }
        }
        delete formCopy.condition;
        // console.log("添加的数据为", formCopy);
        formCopy.extends = JSON.stringify(formCopy.extends);
        try {
            let extendsStr: any = "{}";
            if (Object.keys(this.dialogData.form.extends).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(this.dialogData.form.extends));
            }
            formCopy.extends = extendsStr;
            this.sendNotification(HttpType.admin_plats_notice_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate(fromTable = false) {
        let formCopy: any = null;
        if (fromTable) {
            formCopy = objectRemoveNull(this.tableCtrlData);
        } else {
            const { type } = this.dialogData.form;
            // 删除多余无法去除的参数
            formCopy = formCompared(this.dialogData.form, this.dialogData.formSource);

            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(formCopy).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }
            // 添加必填参数
            if (formCopy.start_time) {
                formCopy.end_time = this.dialogData.form.end_time;
            }
            if (formCopy.end_time) {
                formCopy.start_time = this.dialogData.form.start_time;
            }

            if (type == 1) {
                formCopy.img_uris = "";
                formCopy.img_urls = "";
                formCopy.thumbnail_uris = "";
                formCopy.thumbnail_urls = "";
                formCopy.video_uris = "";
            }
            if (type == 2) {
                formCopy.content = "";
                formCopy.video_uris = "";
            }
            if (type == 3) {
                formCopy.content = "";
                formCopy.img_uris = "";
                formCopy.img_urls = "";
                formCopy.thumbnail_uris = "";
                formCopy.thumbnail_urls = "";
                formCopy.video_uris = JSON.stringify({ [this.type]: formCopy.video_uris });
            }
            formCopy.id = this.dialogData.form.id;
        }
        if (this.dialogData.form.isNeedOtherParam) {
            if (typeof this.dialogData.form.other_param == "string")
                formCopy.open_mode_url = this.dialogData.form.open_mode_url + "##" + this.dialogData.form.other_param;
            else
                formCopy.open_mode_url =
                    this.dialogData.form.open_mode_url + "##" + JSON.stringify(this.dialogData.form.other_param);
        } else {
            formCopy.open_mode_url = this.dialogData.form.open_mode_url;
        }
        formCopy.start_time = this.dialogData.form.time[0];
        formCopy.end_time = this.dialogData.form.time[1];
        delete formCopy.time;

        formCopy.condition_channel_id = "";
        formCopy.condition_is_first_login = 0;
        formCopy.condition_is_first_recharge = 0;
        formCopy.condition_is_login = 0;

        formCopy.condition_balance = "";
        if (this.dialogData.form.type_position == 15) {
            formCopy.condition_balance = {};
            // @ts-ignore
            this.dialogData.form.condition.forEach(element => {
                if (element.condition == "condition_channel_id") {
                    // 渠道ID
                    formCopy.condition_channel_id = element.channel_id;
                } else if (element.condition == "condition_is_first_login") {
                    // 用户首次登录
                    formCopy.condition_is_first_login = element.firstLogin;
                } else if (element.condition == "condition_is_first_recharge") {
                    // 用户首次充值
                    formCopy.condition_is_first_recharge = element.firstRecharge;
                } else if (element.condition == "condition_balance") {
                    // 用户首次充值
                    if (element.balance && element.coin) {
                        formCopy.condition_balance[element.coin] = element.balance;
                    }
                } else if (element.condition == "condition_is_login") {
                    // 用户是否登入
                    formCopy.condition_is_login = element.isLogin;
                }
            });
            formCopy.condition_balance = JSON.stringify(formCopy.condition_balance);
        }
        delete formCopy.condition;

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

            temp.plat_id = this.dialogData.form.plat_id;
            this.sendNotification(HttpType.admin_plats_notice_update, formCopy);
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
                this.sendNotification(HttpType.admin_plats_notice_update, { id, is_delete: 1 });
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
                this.tableCtrlData.opt = null;
                this.onUpdate(true);
            })
            .catch(() => { });
    }

    /**图片上传 */
    private isMin = false;
    onUploadImage(data: any, isMin: boolean = false) {
        this.isMin = isMin;
        data.custom_host = GlobalVar.host;
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片上传 回传url*/
    setImageUrl(body: any) {
        if (!this.isMin) {
            this.dialogData.form.img_uris = this.dialogData.form.img_uris || {};
            this.dialogData.form.img_urls = this.dialogData.form.img_urls || {};
            this.dialogData.form.img_uris[this.appType] = body.uri;
            this.dialogData.form.img_urls[this.appType] = body.url;
        } else {
            this.dialogData.form.thumbnail_uris = this.dialogData.form.thumbnail_uris || {};
            this.dialogData.form.thumbnail_urls = this.dialogData.form.thumbnail_urls || {};
            this.dialogData.form.thumbnail_uris[this.appType] = body.uri;
            this.dialogData.form.thumbnail_urls[this.appType] = body.url;
        }
    }

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_plats_notice_update, { id: id, next_id: next_id, opt: 11 });
    }

    /** 显示复制模版 */
    showCopyDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.resetDialogForm();
        this.dialogData.formSource = null;
        this.dialogData.loading = true;
        this.sendNotification(HttpType.admin_plats_notice_show, { id: data.id });
    }

    addCondition(option: any = {}) {
        if (this.dialogData.form.condition.length > 0) {
            this.dialogData.form.condition[this.dialogData.form.condition.length - 1].showRelation = "1";
        }
        this.dialogData.form.condition.push(JSON.parse(JSON.stringify({ ...this.conditionRule, ...option })));
    }

    onChangeCondition() {
        for (let i = 0; i < this.dialogData.form.condition.length; i++) {
            if (this.dialogData.form.condition[i].condition == "condition_channel_id") {
                if (i > 0) {
                    this.dialogData.form.condition[i - 1].relation = 1;
                }
                this.dialogData.form.condition[i].relation = 1;
            } else {
                this.dialogData.form.condition[i].relation = 2;
            }
        }
    }

    isValid_DateTime(str: any) {
        // Regex to check valid
        // DateTime(YYYY-MM-DD HH:MM:SS)
        let regex = new RegExp(
            /^([0-9]{4})-((01|02|03|04|05|06|07|08|09|10|11|12|(?:J(anuary|u(ne|ly))|February|Ma(rch|y)|A(pril|ugust)|(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(JANUARY|FEBRUARY|MARCH|APRIL|MAY|JUNE|JULY|AUGUST|SEPTEMBER|OCTOBER|NOVEMBER|DECEMBER)|(September|October|November|December)|(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)))|(january|february|march|april|may|june|july|august|september|october|november|december))-([0-3][0-9])\s([0-1][0-9]|[2][0-3]):([0-5][0-9]):([0-5][0-9])$/
        );
        // if str
        // is empty return false
        if (str == null) {
            return false;
        }

        // Return true if the str
        // matched the ReGex
        if (regex.test(str) == true) {
            return true;
        } else {
            return false;
        }
    }
}
