import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_register_same_ip_log/setting";
import { MessageBox } from "element-ui";
import IPlatRegisterSameIpLogProxy from "./IPlatRegisterSameIpLogProxy";

export default class PlatRegisterSameIpLogProxy extends AbstractProxy implements IPlatRegisterSameIpLogProxy {
    static NAME = "PlatRegisterSameIpLogProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_register_same_ip_log_table_columns);
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
            plat_id: { name: "平台ID", options: {} },
            register_ip: { name: "", options: {} },
            register_ip_count: { name: "", options: {} },
            register_ip_locked_count: { name: "", options: {} },
            status: { name: "", options: {} },
            remark: { name: "", options: {} },
            createdBy: { name: "", options: {} },
            createdAt: { name: "", options: {} },
            updatedBy: { name: "", options: {} },
            updatedAt: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        status: "",
        register_ip: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            status: "",
            created_at: "",
            created_by: "",
            plat_id: "",
            register_ip: "",
            register_ip_count: "",
            register_ip_locked_count: "",
            remark: "",
            updated_at: "",
            updated_by: "",
            // TODO
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
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            status: "",
            register_ip: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_register_same_ip_log_show, { id: data.id });
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
            status: "",
            created_at: "",
            created_by: "",
            plat_id: "",
            register_ip: "",
            register_ip_count: "",
            register_ip_locked_count: "",
            remark: "",
            updated_at: "",
            updated_by: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_register_same_ip_log_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        //this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
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
        formCopy.plat_id = this.dialogData.form.plat_id;
        formCopy.id = this.dialogData.form.id;
        formCopy.register_ip = this.dialogData.form.register_ip;
        this.sendNotification(HttpType.admin_plat_register_same_ip_log_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_register_same_ip_log_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**备注弹窗相关数据 */
    remarkDialogData = {
        bShow: false,
        status: "",
        form: {
            id: "",
            type: "",
            remark: "",
            desc: "",
        },
        formSource: null,
    };
    /**显示备注弹窗 */
    showRemarkDialog(remark: any) {
        this.remarkDialogData.bShow = true;
        this.remarkDialogData.form.remark = remark;
    }
    /**隐藏备注弹窗 */
    hideRemarkDialog() {
        this.remarkDialogData.bShow = false;
    }
}
