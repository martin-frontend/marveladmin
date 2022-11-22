import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_service/setting";
import { MessageBox } from "element-ui";
import IPlatServiceProxy from "./IPlatServiceProxy";
import i18n from "@/lang";

export default class PlatServiceProxy extends AbstractProxy implements IPlatServiceProxy {
    static NAME = "PlatServiceProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_fag_table_columns);
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
            id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            name: { name: "", options: {} },
            content: { name: "", options: {} },
            index_no: { name: "", options: {} },
            module: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isResort: false, // 是否重新排序
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            plat_id: 0,
            name: "",
            content: "",
            module: "",
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
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
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
            this.sendNotification(HttpType.admin_plats_fag_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.form.plat_id = Number(this.listQuery.plat_id);
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
            id: "",
            plat_id: 0,
            name: "",
            content: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plats_fag_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, name, content, module } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            name,
            content,
            module,
        };
        this.sendNotification(HttpType.admin_plats_fag_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_plats_fag_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plats_fag_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**还原默认配置 */
    reSync() {
        this.facade.sendNotification(HttpType.admin_plats_fag_sync, { plat_id: this.listQuery.plat_id });
    }
    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_plats_fag_update, { id: id, next_id: next_id, opt: 11 });
    }
}
