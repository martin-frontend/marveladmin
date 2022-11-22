import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, isJsonString, objectRemoveNull } from "@/core/global/Functions";
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
            created_at: { name: "创建人", options: {} },
            created_by: { name: "创建时间", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            domain: { name: "域名地址", options: {} },
            id: { name: "主键", options: {} },
            md5_tag: { name: "cdn文件标识", options: {} },
            plat_id: { name: "平台ID", options: {} },
            remark: { name: "备注", options: {} },
            updated_at: { name: "修改人", options: {} },
            updated_by: { name: "修改时间", options: {} },
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

    form = {
        load_page_extend: {},
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            plat_id: "",
            domain: "",
            remark: "",
        },
        formSource: null, // 表单的原始数据
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
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
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
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            plat_id: "",
            domain: "",
            remark: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_load_page_domain_index, objectRemoveNull(this.listQuery));
    }

    onAdd() {
        const { plat_id, domain, remark } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            domain,
            remark,
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
            .catch(() => {});
    }

    onQueryLoadPage() {
        this.sendNotification(HttpType.admin_plat_show, { plat_id: this.listQuery.plat_id });
    }

    setLoadPage(data: any) {
        this.form.load_page_extend = jsonToObject(data);
    }

    onSaveLoadPage() {
        if (isJsonString(<any>this.form.load_page_extend)) {
            this.sendNotification(HttpType.admin_plat_upload_load_page, {
                plat_id: this.listQuery.plat_id,
                load_page_extend: this.form.load_page_extend,
            });
        } else {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }
}
