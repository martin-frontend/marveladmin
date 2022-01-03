import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/admin_role/setting";
import { MessageBox } from "element-ui";
import IAdminRoleProxy from "./IAdminRoleProxy";
import i18n from "@/lang";
export default class AdminRoleProxy extends AbstractProxy implements IAdminRoleProxy {
    static NAME = "AdminRoleProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_admin_role_table_columns);
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
            role_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            name: { name: "", options: {} },
            desc: { name: "", options: {} },
            status: { name: "", options: {} },
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
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            role_id: null,
            name: "",
            desc: "",
            plat_id: null,
            status: 1,
        },
        formSource: null, // 表单的原始数据
    };
    /**权限弹窗相关数据 */
    dialogSettingData = {
        bShow: false,
        /**搜索条件 */
        inputSearch: "",
        /**详细数据 */
        detail: <any>{},
        /**已选择的权限 */
        detailPermission: <any>[],
        /**权限树 */
        permissionData: <any>[],
        /**默认选择 */
        defaultPermission: <any>[],
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(value: any) {
        this.dialogSettingData.detail = value;
        this.dialogSettingData.detailPermission = Array.from(
            new Set([...value.permission_ids, ...this.dialogSettingData.defaultPermission])
        );
        this.onMineInfo();
        
    }
    /**权限数据 */
    setPermission(value: any) {
        this.dialogSettingData.permissionData.length = 0;
        this.dialogSettingData.permissionData.push(...value);
        // 设置默认必选项
        this.dialogSettingData.defaultPermission.length = 0;
        this.setDefaultPermission(value);
        // 该用户已选择的权限
        this.dialogSettingData.detailPermission = Array.from(
            new Set([...this.dialogSettingData.detail.permission_ids, ...this.dialogSettingData.defaultPermission])
        );
        // setTimeout(()=>{
            this.dialogSettingData.bShow = true;
        // }, 500);
        
    }
    private setDefaultPermission(children: any) {
        for (const child of children) {
            if (child.meta.is_accessible == 1) {
                child.disabled = true;
                this.dialogSettingData.defaultPermission.push(child.permission_id);
                // if (child.children && child.children.length > 0) {
                // this.setDefaultPermission(child.children);
                // }
            }
        }
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
            role_id: null,
            name: "",
            desc: "",
            plat_id: null,
            status: 1,
        });
    }

    /**显示权限设置弹窗 */
    showDialogSetting(data: any) {
        this.sendNotification(HttpType.admin_admin_role_show, { role_id: data.role_id, modules: 1 });
    }
    /**隐藏权限设置弹窗 */
    hidedialogSetting() {
        this.dialogSettingData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_admin_role_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {name, desc, plat_id, status} = this.dialogData.form;
        const formCopy: any = {
            name, desc, plat_id, status
        };
        this.sendNotification(HttpType.admin_admin_role_store, objectRemoveNull(formCopy));
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
        formCopy.role_id = this.dialogData.form.role_id;
        formCopy.plat_id = this.dialogData.form.plat_id;
        // 发送消息
        this.sendNotification(HttpType.admin_admin_role_update, formCopy);
    }
    /**删除数据 */
    onDelete(role_id: any) {
        MessageBox.confirm(<string> i18n.t("admin_role.confirmText1"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_admin_role_update, { role_id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**获取个人详细信息，得到权限信息 */
    onMineInfo() {
        this.sendNotification(HttpType.admin_admin_user_mine, {
            plat_id: this.dialogSettingData.detail.plat_id,
            modules: 2,
        });
    }
    /**保存权限设置 */
    onSavePermission(permission_ids: any) {
        this.sendNotification(HttpType.admin_admin_role_update, {
            role_id: this.dialogSettingData.detail.role_id,
            opt: 1,
            permission_ids,
        });
    }
}
