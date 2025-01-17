import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import i18n from "@/lang";
import { HttpType } from "@/views/system_sms_area_code/setting";
import { MessageBox } from "element-ui";
import ISystemSmsAreaCodeProxy from "./ISystemSmsAreaCodeProxy";

export default class SystemSmsAreaCodeProxy extends AbstractProxy implements ISystemSmsAreaCodeProxy {
    static NAME = "SystemSmsAreaCodeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_system_sms_area_code_table_columns);
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
            area_code: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            icon: { name: "", options: {} },
            id: { name: "", options: {} },
            index_no: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            name: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            area_region: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isResort: false, // 是否重新排序
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        area_code: "",
        name: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            icon: "",
            name: "",
            area_code: "",
            area_region: null,
        },
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
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
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
            area_code: "",
            name: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
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
            icon: "",
            name: "",
            area_code: "",
            area_region: null,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_sms_area_code_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { icon, name, area_code, area_region } = this.dialogData.form;
        const formCopy: any = {
            icon,
            name,
            area_code,
            area_region,
        };
        this.sendNotification(HttpType.admin_system_sms_area_code_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_system_sms_area_code_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该账号"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_system_sms_area_code_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_system_sms_area_code_update, { id: id, next_id: next_id, opt: 11 });
    }
}
