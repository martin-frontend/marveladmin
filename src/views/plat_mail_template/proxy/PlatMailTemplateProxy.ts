import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_mail_template/setting";
import { MessageBox } from "element-ui";
import IPlatMailTemplateProxy from "./IPlatMailTemplateProxy";

export default class PlatMailTemplateProxy extends AbstractProxy implements IPlatMailTemplateProxy {
    static NAME = "PlatMailTemplateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_mail_template_table_columns);
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
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
            plat_id: "",
            template_name: "",
            template_id:"",
            title: "",
            content: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
        }
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
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_mail_template_show, { id: data.template_id });
        } else {
            this.resetDialogForm();
            this.dialogData.form.plat_id = this.listQuery.plat_id;
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
            // TODO
            plat_id: "",
            template_name: "",
            title: "",
            content: "",
            template_id:"",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_mail_template_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy = JSON.parse(JSON.stringify(this.dialogData.form));
        // const formCopy: any = {
        //     plat_id: "",
        //     template_name: "",
        //     title: "",
        //     content: "",
        // };

        this.sendNotification(HttpType.admin_plat_mail_template_store, objectRemoveNull(formCopy));
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
        // TODO
        // 发送消息
        formCopy.id = this.dialogData.form.template_id;
        this.sendNotification(HttpType.admin_plat_mail_template_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_mail_template_delete, { id });
            })
            .catch(() => {});
    }
}
