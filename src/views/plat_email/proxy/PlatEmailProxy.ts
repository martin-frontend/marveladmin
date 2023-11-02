import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_email/setting";
import { MessageBox } from "element-ui";
import IPlatEmailProxy, { EmailTab, EmailAttachmentType, EmailType } from "./IPlatEmailProxy";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";
import { checkUnique, unique } from "@/core/global/Permission";

export default class PlatEmailProxy extends AbstractProxy implements IPlatEmailProxy {
    static NAME = "PlatEmailProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_mail_table_columns);
        this.sendNotification(HttpType.admin_plat_mail_content_table_columns);
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
            attachment_content: { name: "", options: {} },
            bonus_multiple: { name: "", options: {} },
            cate: { name: "", options: {} },
            content: { name: "", options: {} },
            content_id: { name: "", options: {} },
            receive_users: { name: "", options: {} },
            is_mass_mailer: { name: "", options: {} },
            created_by: { name: "", options: {} },
            created_at: { name: "", options: {} },
            effective_at: { name: "", options: {} },
            plat_id: { name: "", options: <any>{} },
            send_type: { name: "", options: {} },
            status: { name: "", options: {} },
            title: { name: "", options: {} },
            type: { name: "", options: {} },
            remark: { name: "", options: {} },
            member_analyze: { name: LangUtil("收到/阅读/奖励/发送"), options: {} },
            start_time: { name: '开始时间', options: {} },
            end_time: { name: '结束时间', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        activeName: EmailTab.Plat,
        platEmailTag: EmailTab.Plat,
        userEmailTag: EmailTab.User,
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        content_id: "",
        title: "",
        send_type: "",
        type: "",
        status: "",
        cate: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        remark: "",
        receive_users: "",
        page_count: 1,
        page_size: 20,
    };

    fieldSelectionEmailData = {
        bShow: false,
        fieldOptions: [
            "content_id",
            "plat_id",
            "title",
            "content",
            "send_type",
            "type",
            "cate",
            "member_analyze",
            "created_by",
            "created_at",
            "status",
        ],
    };

    exportEmailData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            content_id: "",
            plat_id: "", //所属平台
            title: "", //邮件名称
            content: "", //邮件内容
            cate: 1, //邮件分类   1-平台|11-活动
            type: "1", //邮件类型 1-全平台邮件（包含新用户）|2-全平台邮件|3-群发邮件
            user_list: "", //发送用户
            send_type: 1, //发送类型 1-人工发送|11-系统发送
            is_mass_mailer: 0, //是否群发0-否|1-是
            bonus_multiple: 1, //提领流水倍数
            attachment_type: 1, //附件类型 1-无附件 | 11-奖励物件
            attachment_content: <any>[], //附件内容,attachment_content:{"USDT":"10000","BNB":"88"}
            template_id: "", //模版ID
            template_option: <any>[], // 模版的列表
            template_detail: <any>{}, // 模版的详细信息
            remark: "",
            time: <any>[],
            start_time: "",
            end_time: "",
        },
        formSource: null, // 表单的原始数据
        readonly: false, //是否唯讀
        excelColumnInfo: {
            userid: { name: "userid", options: {} },
        },
    };

    /**展示参数值 */
    dialogPreviewValue = {
        bShow: false,
        value: "",
    };

    sendData = {
        groupSize: 1000,
        userListExceed: false,
        bShow: false,
        groupsCount: 0, // 全部组数
        groupsCurrent: 0, // 目前组数
        content_id: 0,
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
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
        data.list.forEach((element: any) => {
            let memberAnalze: string = `${element.statistics.receive} / ${element.statistics.read} / ${element.statistics.receive_award} / ${element.statistics.send}`;
            element.member_analyze = memberAnalze;
        });
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        // let attachment_content = <any>[];
        // data.attachment_content.forEach((element: any) => {
        //     Object.keys(element).forEach(key => {
        //         attachment_content.push({ type: key, amount: element[key] })
        //     });
        // });
        // data.attachment_content = attachment_content;
        this.dialogData.formSource = data;
        this.dialogData.form.time = [this.dialogData.form.start_time, this.dialogData.form.end_time];
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            content_id: "",
            title: "",
            send_type: "",
            type: "",
            status: "",
            cate: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            remark: "",
            receive_users: "",
            page_count: 1,
            page_size: 20,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.readonly = true;
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_mail_content_show, { content_id: data.content_id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
            this.dialogData.readonly = false;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            plat_id: "", //所属平台
            title: "", //邮件名称
            content: "", //邮件内容
            cate: "1", //邮件分类   1-平台|11-活动
            type: "1", //邮件类型 1-全平台邮件（包含新用户）|2-全平台邮件|3-群发邮件
            user_list: "", //发送用户
            send_type: 1, //发送类型 1-人工发送|11-系统发送
            is_mass_mailer: 0, //是否群发0-否|1-是
            bonus_multiple: 1, //提领流水倍数
            attachment_type: 1, //附件类型 1-无附件 | 11-奖励物件
            attachment_content: [], //附件内容
            template_id: "",
            template_option: <any>[], // 模版的列表
            template_detail: <any>{}, // 模版的详细信息
            remark: "",
            start_time: "",
            end_time: "",
            time: [],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_mail_content_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const {
            plat_id,
            title,
            content,
            cate,
            type,
            user_list,
            send_type,
            is_mass_mailer,
            bonus_multiple,
            attachment_type,
            attachment_content,
            template_id,
            remark,
            start_time,
            end_time,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            title,
            content,
            cate,
            type,
            user_list,
            send_type,
            is_mass_mailer,
            bonus_multiple,
            attachment_type,
            attachment_content,
            template_id,
            remark,
            start_time,
            end_time,
        };
        let attachment_content_copy = [];
        let bonus: any = {};
        formCopy.attachment_content.forEach((element: any) => {
            if (bonus[element.type]) {
                //防止有傻逼选择多个相同的币种
                bonus[element.type] = String(Number(bonus[element.type]) + Number(element.amount));
            } else {
                bonus[element.type] = element.amount;
            }
        });
        if (Object.keys(bonus).length === 0) {
            //没有奖励
            formCopy.attachment_type = EmailAttachmentType.NoAttach;
            formCopy.attachment_content = null;
            formCopy.bonus_multiple = null;
        } else {
            formCopy.attachment_type = EmailAttachmentType.BonusAttach;
            formCopy.attachment_content = JSON.stringify(bonus);
        }
        formCopy.is_mass_mailer = this.isGroupMail ? 1 : 0;
        formCopy.start_time = this.dialogData.form.time[0];
        formCopy.end_time = this.dialogData.form.time[1];

        if (checkUnique(unique.plat_email_store_attachment)) {
            if (user_list.split(",").length <= this.sendData.groupSize) {
                this.sendNotification(HttpType.admin_plat_email_store_attachment_store, objectRemoveNull(formCopy));
            } else {
                // 大于 groupSize
                this.sendData.userListExceed = true;
                // 计算需要分成多少组
                this.sendData.groupsCount = Math.ceil(user_list.split(",").length / this.sendData.groupSize);
                let group = user_list.split(",").slice(0, this.sendData.groupSize);
                formCopy.user_list = group;
                this.sendData.groupsCurrent = 1;
                this.sendNotification(HttpType.admin_plat_email_store_attachment_store, objectRemoveNull(formCopy));
            }
        } else {
            if (user_list.split(",").length <= this.sendData.groupSize) {
                this.sendNotification(HttpType.admin_plat_mail_content_store, objectRemoveNull(formCopy));
            } else {
                this.sendData.userListExceed = true;
                let group = user_list.split(",").slice(0, this.sendData.groupSize);
                formCopy.user_list = group;
                this.sendData.groupsCurrent = 1;
                this.sendNotification(HttpType.admin_plat_mail_content_store, objectRemoveNull(formCopy));
            }
        }
    }

    sendRestUsers(content_id?: any) {
        this.sendData.bShow = true;
        if (this.sendData.groupsCurrent < this.sendData.groupsCount) {
            const { user_list } = this.dialogData.form;
            if (content_id) {
                this.sendData.content_id = content_id;
            }
            let group = user_list.split(",").slice(this.sendData.groupsCurrent * this.sendData.groupSize, (this.sendData.groupsCurrent + 1) * this.sendData.groupSize);

            this.sendNotification(HttpType.admin_plat_mail_content_store_user, objectRemoveNull({ content_id: this.sendData.content_id, user_list: group }));
            this.sendData.groupsCurrent++;
        } else {
            this.resetSendData()
        }
    }

    resetSendData() {
        Object.assign(this.sendData, {
            userListExceed: false,
            bShow: false,
            groupsCount: 0, // 全部组数
            groupsCurrent: 0, // 目前组数
            content_id: 0,
        })
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_mail_content_update, { content_id: id, status: 99 });
            })
            .catch(() => { });
    }

    /**用户邮件表格相关数据 */
    platUserTableData = {
        columns: {
            id: { name: "", options: {} },
            content_id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            channel_id: { name: "", options: {} },
            receive_users: { name: "", options: {} },
            cate: { name: "", options: {} },
            is_read: { name: "", options: {} },
            read_at: { name: "", options: {} },
            attachment_status: { name: "", options: {} },
            attachment_open_at: { name: "", options: {} },
            attachment_content: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            title: { name: "", options: {} },
            content: { name: "", options: {} },
            type: { name: "", options: {} },
            send_type: { name: "", options: {} },
            status: { name: "", options: {} },
            nick_name: { name: "", options: {} },
            created_at: { name: "", options: {} },
            start_time: { name: '开始时间', options: {} },
            end_time: { name: '结束时间', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        read_num: 0,
        total_attachment: 0,
        total_attachment_content: {},
        total_attachment_content_read: {},
        total_attachment_read: 0,
        total_num: 0,
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    };

    /**用戶郵件查询条件 */
    userListQuery = {
        plat_id: "",
        content_id: "",
        title: "",
        user_id: "",
        nick_name: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        attachment_type: "",
        page_count: 1,
        page_size: 20,
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "content_id",
            "plat_id",
            "user_id",
            "nick_name",
            "title",
            "send_type",
            "type",
            "cate",
            "is_read",
            "created_by",
            "created_at",
            "attachment_content",
            "attachment_status",
            "attachment_open_at",
            "remark",
        ],
    };

    /**导出 相关数据 */
    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    // 是否为群发
    get isGroupMail() {
        return this.dialogData.form.type == EmailType.Group;
    }

    // 是否为全平台邮件（新用户）
    get isAllPlatNew() {
        return this.dialogData.form.type == EmailType.AllPlatNew;
    }

    /**设置用户邮件表头 */
    setPlatUserTableColumns(data?: any) {
        Object.assign(this.platUserTableData.columns, data);
    }

    /**用户邮件列表查询 */
    onUserQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.userListQuery));
        if (this.userListQuery.attachment_type) {
            // 無獎勵
            if (this.userListQuery.attachment_type == "1") {
                queryCopy["attachment_gold-{<=}"] = 0;
            } else {
                queryCopy["attachment_gold-{>}"] = 0;
            }
        }
        this.sendNotification(HttpType.admin_plat_users_mail_index, objectRemoveNull(queryCopy));
    }

    /**重置用户邮件查询 */
    resetUserListQuery() {
        Object.assign(this.userListQuery, {
            content_id: "",
            title: "",
            user_id: "",
            nick_name: "",
            attachment_type: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            page_count: 1,
            page_size: 20,
        });
    }

    /**设置用户邮件列表数据 */
    setUserTableData(data: any) {
        // this.platUserTableData = JSON.parse(JSON.stringify(data));
        this.platUserTableData.list.length = 0;
        this.platUserTableData.list.push(...data.list);
        Object.assign(this.platUserTableData.pageInfo, data.pageInfo);
        Object.assign(this.platUserTableData, {
            read_num: data.read_num,
            total_attachment: data.total_attachment,
            total_attachment_content: data.total_attachment_content,
            total_attachment_content_read: data.total_attachment_content_read,
            total_attachment_read: data.total_attachment_read,
            total_num: data.total_num,
        });
    }

    /**错误讯息弹窗数据 */
    alertDialogData = {
        bShow: false,
        form: {
            content: "",
        },
    };

    /**显示发送错误弹窗 */
    showAlertDialog(data: any) {
        this.alertDialogData.bShow = true;
        this.alertDialogData.form.content = data;
    }

    /**隐藏发送错误弹窗 */
    hideAlertDialog() {
        this.alertDialogData.bShow = false;
    }

    /**搜寻全部资料 */
    onQueryAll() {
        this.platUserTableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.userListQuery));
        queryCopy.page_size = this.platUserTableData.excelPageSize;
        queryCopy.page_count = 1;
        this.sendNotification(HttpType.admin_plat_users_mail_index, objectRemoveNull(queryCopy));
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.userListQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        this.sendNotification(HttpType.admin_plat_users_mail_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /**导出excel */
    exportExcel() {
        this.exportData.isExportExcel = true;
        const newData = JSON.parse(JSON.stringify(this.exportData.list));
        // @ts-ignore
        newData.forEach(element => {
            if (element.attachment_content.length == 0) {
                element.attachment_content = "";
            } else {
                element.attachment_content = jsonStringify(element.attachment_content);
            }
        });

        const exportField = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName("用户邮件列表"),
            // Object.keys(this.platUserTableData.columns),
            exportField,
            this.platUserTableData.columns,
            newData,
            ["plat_id", "send_type", "type", "cate", "is_read", "attachment_status"],
            []
        );
    }

    /**取得所有资料 */
    onQueryExportEmailData() {
        this.exportEmailData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportEmailData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
        this.sendNotification(HttpType.admin_plat_mail_content_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportEmailData(data: any) {
        const { list, pageInfo } = data;
        this.exportEmailData.list.push(...list);
        Object.assign(this.exportEmailData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportEmailData();
        } else {
            this.onExportEmailExcel();
            this.resetExportEmailData(500);
        }
    }

    resetExportEmailData(timeout: any) {
        setTimeout(() => {
            this.exportEmailData.isExportExcel = false;
            this.exportEmailData.list = [];
            Object.assign(this.exportEmailData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    onExportEmailExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportEmailData.list));
        // @ts-ignore
        newData.forEach(element => {
            let memberAnalze: string = `${element.statistics.receive} / ${element.statistics.read} / ${element.statistics.receive_award} / ${element.statistics.send}`;
            element.member_analyze = memberAnalze;
        });

        const exportField = [];
        for (const item of this.fieldSelectionEmailData.fieldOptions) {
            if (this.exportEmailData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }

        new BaseInfo.ExportExcel(
            this.getExcelOutputName("平台邮件列表"),
            // Object.keys(this.tableData.columns),
            exportField,
            this.tableData.columns,
            newData,
            ["plat_id", "send_type", "type", "cate", "status"],
            []
        );
    }

    /**取得excel 挡案名称 */
    getExcelOutputName(title: string) {
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>LangUtil(title)}-${plat_name}`;
        return name;
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportEmailData.pageInfo.pageCurrent / this.exportEmailData.pageInfo.pageCount) * 100);
    }

    /** 邮件批次進度 */
    get sendPercentage() {
        return Math.round((this.sendData.groupsCurrent / this.sendData.groupsCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    showEmailFieldSelectionDialog() {
        this.fieldSelectionEmailData.bShow = true;
        this.exportEmailData.fieldOrder = [...this.fieldSelectionEmailData.fieldOptions];
    }

    setTemplateArrData(data: any) {
        console.log(" 模版返回", data);
        this.dialogData.form.template_option.length = 0;
        this.dialogData.form.template_option = JSON.parse(JSON.stringify(data.list));
        this.dialogData.form.template_id = "";
    }

    setTemplateDetail(data: any) {
        console.log("设置模版", data);

        this.dialogData.form.title = data.title;
        this.dialogData.form.content = data.content;
    }

    admin_plat_mail_template_index() {
        this.sendNotification(HttpType.admin_plat_mail_template_index, { plat_id: this.dialogData.form.plat_id });
    }

    admin_plat_mail_template_show() {
        if (!this.dialogData.form.template_id) return;
        this.sendNotification(HttpType.admin_plat_mail_template_show, { id: this.dialogData.form.template_id });
    }

    /**邮件模版相关 */
    platEmailTemplateManager_data = {
        bShow: false,
        columns: {
            template_id: { name: "ID", options: {} },
            template_name: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            title: { name: "", options: {} },
            content: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            created_by: { name: "", options: {} },
            created_at: { name: "", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    platEmailTemplateManager_listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };

    /**弹窗相关数据 */
    platEmailTemplateManager_dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
            plat_id: "",
            template_name: "",
            template_id: "",
            title: "",
            content: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns_templateManager(data: any) {
        Object.assign(this.platEmailTemplateManager_data.columns, data);
        const plat_id_options_keys = Object.keys(this.platEmailTemplateManager_data.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.platEmailTemplateManager_listQuery.plat_id)) {
                this.platEmailTemplateManager_listQuery.plat_id = plat_id_options_keys[0];
            }
        }
        this.onQuery_templateManager();
    }
    /**表格数据 */
    setTableData_templateManager(data: any) {
        this.platEmailTemplateManager_data.list.length = 0;
        this.platEmailTemplateManager_data.list.push(...data.list);
        Object.assign(this.platEmailTemplateManager_data.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail_templateManager(data: any) {
        this.platEmailTemplateManager_dialogData.formSource = data;
        Object.assign(this.platEmailTemplateManager_dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**显示弹窗 */
    showDialog_templateManager(status: string, data?: any) {
        this.platEmailTemplateManager_dialogData.bShow = true;
        this.platEmailTemplateManager_dialogData.status = status;
        if (status == DialogStatus.update) {
            this.platEmailTemplateManager_dialogData.formSource = data;
            Object.assign(this.platEmailTemplateManager_dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_mail_template_show, { id: data.template_id });
        } else {
            this.resetDialogForm_templateManager();
            this.platEmailTemplateManager_dialogData.form.plat_id = this.listQuery.plat_id;
            this.platEmailTemplateManager_dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog_templateManager() {
        this.platEmailTemplateManager_dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm_templateManager() {
        Object.assign(this.platEmailTemplateManager_dialogData.form, {
            // TODO
            plat_id: "",
            template_name: "",
            title: "",
            content: "",
            template_id: "",
        });
    }

    /**查询 */
    onQuery_templateManager() {
        this.sendNotification(
            HttpType.admin_plat_mail_template_index,
            objectRemoveNull(this.platEmailTemplateManager_listQuery)
        );
    }

    /**添加数据 */
    onAdd_templateManager() {
        const formCopy = JSON.parse(JSON.stringify(this.platEmailTemplateManager_dialogData.form));
        this.sendNotification(HttpType.admin_plat_mail_template_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate_templateManager() {
        const formCopy: any = formCompared(
            this.platEmailTemplateManager_dialogData.form,
            this.platEmailTemplateManager_dialogData.formSource
        );
        if (Object.keys(formCopy).length == 0) {
            this.platEmailTemplateManager_dialogData.bShow = false;
            return;
        }
        formCopy.id = this.platEmailTemplateManager_dialogData.form.template_id;
        this.sendNotification(HttpType.admin_plat_mail_template_update, formCopy);
    }

    /**删除数据 */
    onDelete_templateManager(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_mail_template_delete, { id });
            })
            .catch(() => { });
    }

    openEmailTemplateManager() {
        this.platEmailTemplateManager_data.bShow = true;
        this.platEmailTemplateManager_listQuery.plat_id = this.listQuery.plat_id;
        this.sendNotification(HttpType.admin_plat_mail_template_table_columns);
    }

    /**展示参数值 */
    previewValue(value: string) {
        this.dialogPreviewValue.value = value;
        this.dialogPreviewValue.bShow = true;
    }
}
