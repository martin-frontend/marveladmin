import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_email/setting";
import { MessageBox } from "element-ui";
import IPlatEmailProxy, { EmailTab, EmailAttachmentType, EmailType } from "./IPlatEmailProxy";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";

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
        columns: {
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
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        activeName: EmailTab.Plat,
        platEmailTag: EmailTab.Plat,
        userEmailTag: EmailTab.User
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
            attachment_content: <any>[], //附件内容
        },
        formSource: null, // 表单的原始数据
        readonly: false,  //是否唯讀
        excelColumnInfo: {
            userid: { name: "userid", options: {} }
        }
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

        let attachment_content = <any>[];
        data.attachment_content.forEach((element: any) => {
            Object.keys(element).forEach(key => {
                attachment_content.push({ type: key, amount: element[key] })
            });
        });
        data.attachment_content = attachment_content;
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
        let bonus = <any>[];
        formCopy.attachment_content.forEach((element: any) => {
            bonus.push({ [element.type]: element.amount });
        });
        formCopy.attachment_content = JSON.stringify(bonus);
        formCopy.attachment_type = bonus.length > 0
            ? EmailAttachmentType.BonusAttach
            : EmailAttachmentType.NoAttach;
        formCopy.is_mass_mailer = this.isGroupMail ? 1 : 0;
        this.sendNotification(HttpType.admin_plat_mail_content_store, objectRemoveNull(formCopy));
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
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
            attachment_gold: { name: "", options: {} },
            attachment_score: { name: "", options: {} },
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
        total_attachment_gold: "",
        total_attachment_gold_read: "",
        total_attachment_read: 0,
        total_attachment_score: 0,
        total_attachment_score_read: 0,
        total_num: 0,
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
    }
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
    }
    // 是否为群发
    get isGroupMail() {
        return this.dialogData.form.type == EmailType.Group;
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
            total_attachment_gold: data.total_attachment_gold,
            total_attachment_gold_read: data.total_attachment_gold_read,
            total_attachment_read: data.total_attachment_read,
            total_attachment_score: data.total_attachment_score,
            total_attachment_score_read: data.total_attachment_score_read,
            total_num: data.total_num
        });
    }
    /**错误讯息弹窗数据 */
    alertDialogData = {
        bShow: false,
        form: {
            content: ""
        }
    }
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
    /**取得excel 挡案名称 */
    getExcelOutputName() {
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${<string>i18n.t(`plat_email.UserMail`)}-${plat_name}`;
        if (this.userListQuery["created_at-{>=}"] && this.userListQuery["created_at-{<=}"] != "") {
            name += `-${this.userListQuery["created_at-{>=}"]}～${this.userListQuery["created_at-{<=}"]}`;
        }
        return name;
    }
    /**导出excel */
    onExportExcel(data: any) {
        this.platUserTableData.isExportExcel = false;
        let list = data.list.filter((data: any) => {
            return parseInt(data.attachment_gold) > 0
        }
        );

        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.platUserTableData.columns),
            this.platUserTableData.columns,
            list,
            [],
            []
        );
    }
}
