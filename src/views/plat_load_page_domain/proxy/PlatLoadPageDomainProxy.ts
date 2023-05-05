import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, isJsonString, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_load_page_domain/setting";
import { MessageBox } from "element-ui";
import IPlatLoadPageDomainProxy from "./IPlatLoadPageDomainProxy";
import i18n from "@/lang";
import { jsonToObject } from "@/core/global/Functions";
export default class PlatLoadPageDomainProxy extends AbstractProxy implements PlatLoadPageDomainProxy {
    static NAME = "PlatLoadPageDomainProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_load_page_domain_table_columns);
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
            id: { name: "主键", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            plat_id: { name: "平台ID", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            domain: { name: "域名地址", options: [] },
            version: { name: "发布版本", options: [] },
            template: { name: "模板", options: [] },
            model_type: { name: "模板类型", options: {} },
            remark: { name: "备注", options: [] },
            md5_tag: { name: "cdn文件标识", options: [] },
            channel_config: { name: "渠道参数配置", options: [] },
            is_delete: { name: "是否删除", options: [] },
            created_by: { name: "创建时间", options: [] },
            created_at: { name: "创建人", options: [] },
            updated_by: { name: "修改时间", options: [] },
            updated_at: { name: "修改人", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
    };

    isEdited = false;
    form = {
        load_page_extend: {},
    };
    copy_load_page_extend = {};

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            plat_id: "",
            channel_id: "",
            domain: "",
            model_type: "",
            template: "",
            remark: "",
            channel_config: {},
        },
        formSource: null, // 表单的原始数据
    };

    templateDialogData = {
        bShow: false,
        fileList: <any>[],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
            this.onQueryLoadPage();
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
        const { channel_config } = data;
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        if (isJsonString(channel_config)) {
            this.dialogData.form.channel_config = jsonToObject(channel_config);
        }
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_load_page_domain_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
            this.dialogData.form.plat_id = this.listQuery.plat_id;
        }
    }

    /**显示弹窗 */
    showTemplateDialog(data?: any) {
        this.templateDialogData.bShow = true;
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
        this.templateDialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            plat_id: "",
            channel_id: "",
            domain: "",
            template: "",
            remark: "",
            model_type: "",
            channel_config: {},
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_load_page_domain_index, objectRemoveNull(this.listQuery));
    }

    onAdd() {
        const { plat_id, domain, remark, channel_id, channel_config, template, model_type } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            channel_id,
            domain,
            remark,
            template,
            model_type,
            channel_config: jsonStringify(channel_config),
        };
        formCopy.app_types = JSON.stringify(formCopy.app_types);
        this.sendNotification(HttpType.admin_plat_load_page_domain_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            this.templateDialogData.bShow = false;
            return;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_load_page_domain_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_load_page_domain_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    onQueryLoadPage() {
        this.sendNotification(HttpType.admin_plat_show, { plat_id: this.listQuery.plat_id });
    }

    setLoadPage(data: any) {
        this.isEdited = false;
        this.form.load_page_extend = data ? jsonToObject(data) : {};
        this.copy_load_page_extend = JSON.parse(JSON.stringify(this.form.load_page_extend));
    }

    onSaveLoadPage() {
        const jsonString = jsonStringify(this.form.load_page_extend);
        if (isJsonString(jsonString)) {
            this.sendNotification(HttpType.admin_plat_upload_load_page, {
                plat_id: this.listQuery.plat_id,
                load_page_extend: this.form.load_page_extend,
            });
        } else {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    uploadTemplate() {
        const { id } = this.dialogData.form;
        const file = this.templateDialogData.fileList[0];
        this.sendNotification(HttpType.admin_plat_load_page_domain_uploadTemplate, { id, file });
    }

    reset_load_page_extend() {
        this.form.load_page_extend = JSON.parse(JSON.stringify(this.copy_load_page_extend));
    }
}
