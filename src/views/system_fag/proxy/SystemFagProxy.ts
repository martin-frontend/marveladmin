import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/system_fag/setting";
import { MessageBox } from "element-ui";
import ISystemFagProxy from "./ISystemFagProxy";
import i18n from "@/lang";
export default class SystemFagProxy extends AbstractProxy implements ISystemFagProxy {
    static NAME = "SystemFagProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_system_fag_table_columns);
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
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: { name: "", content: "", id: "", module: "" },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.isResort = true;
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
            this.sendNotification(HttpType.admin_system_fag_show, { id: data.id });
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
        Object.assign(this.dialogData.form, { name: "", content: "", id: "", module: "" });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_fag_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, content, id, module } = this.dialogData.form;
        const formCopy: any = {
            name,
            content,
            id,
            module,
        };
        this.sendNotification(HttpType.admin_system_fag_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_system_fag_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_system_fag_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**是否重新排序 */
    isResort = false;
    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_system_fag_update, { id: id, next_id: next_id, opt: 11 });
    }
}
