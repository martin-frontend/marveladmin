import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/system_config/setting";
import { MessageBox } from "element-ui";
import ISystemConfigProxy from "./ISystemConfigProxy";
import i18n from "@/lang";
export default class SystemConfigProxy extends AbstractProxy implements ISystemConfigProxy {
    static NAME = "SystemConfigProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_system_config_table_columns);
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
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            des: { name: "参数描述", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否刪除", options: {} },
            key: { name: "参数标识", options: {} },
            name: { name: "参数名称", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            value: { name: "参数值", options: {} },
            category: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        name: "",
        key: "",
        category: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            name: "",
            des: "",
            key: "",
            type: "1",
            value: "",
            category: "",
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
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            name: "",
            key: "",
            category: "",
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
            name: "",
            des: "",
            key: "",
            type: 1,
            value: "",
            category: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_config_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const { name, des, key, type, value, category } = this.dialogData.form;
        const formCopy: any = {
            // TODO
            name,
            des,
            key,
            type,
            value,
            category,
        };
        this.sendNotification(HttpType.admin_system_config_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate() {
        // 删除多余无法去除的参数
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);

        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }
        formCopy.id = this.dialogData.form.id;
        this.sendNotification(HttpType.admin_system_config_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_system_config_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
