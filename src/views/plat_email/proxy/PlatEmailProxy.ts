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
            member_analyze: { name: LangUtil('收到/阅读/奖励/发送'), options: {} },
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

    }

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
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
        },
        formSource: null, // 表单的原始数据
        readonly: false, //是否唯讀
        excelColumnInfo: {
            userid: { name: "userid", options: {} },
        },
    };

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
        if (checkUnique(unique.plat_email_store_attachment)) {
            this.sendNotification(HttpType.admin_plat_email_store_attachment_store, objectRemoveNull(formCopy));
        } else {
            this.sendNotification(HttpType.admin_plat_mail_content_store, objectRemoveNull(formCopy));
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
                element.attachment_content = '';
            } else {
                element.attachment_content = jsonStringify(element.attachment_content);
            }
        });
        new BaseInfo.ExportExcel(
            this.getExcelOutputName("用户邮件列表"),
            // Object.keys(this.platUserTableData.columns),
            this.exportData.fieldOrder,
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
        new BaseInfo.ExportExcel(
            this.getExcelOutputName("平台邮件列表"),
            // Object.keys(this.tableData.columns),
            this.exportEmailData.fieldOrder,
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

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    showEmailFieldSelectionDialog() {
        this.fieldSelectionEmailData.bShow = true;
        this.exportEmailData.fieldOrder = [...this.fieldSelectionEmailData.fieldOptions];
    }
}
