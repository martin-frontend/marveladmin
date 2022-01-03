import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_backwater_model/setting";
import { MessageBox } from "element-ui";
import IPlatUsersBackwaterModelProxy from "./IPlatUsersBackwaterModelProxy";
import i18n from "@/lang";
export default class PlatUsersBackwaterModelProxy extends AbstractProxy implements IPlatUsersBackwaterModelProxy {
    static NAME = "PlatUsersBackwaterModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_backwater_model_table_columns);
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
            backwater_model_id: { name: "", options: {} },
            name: { name: "", options: {} },
            desc: { name: "", options: {} },
            backwater_config: { name: "", options: {} },
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
        form: {
            backwater_model_id: "",
            name: "",
            desc: "",
            backwater_config: {},
        },
        formSource: null, // 表单的原始数据
    };
    private initBackwater = {};
    private initRate: number = 0.05;
    /**设置表头数据 */
    setTableColumns(data: any) {
        let options = data.backwater_config.options;
        for (const key in options) {
            //@ts-ignore
            this.initBackwater[parseInt(key)] = { backwater_rate: this.initRate };
        }
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
            this.sendNotification(HttpType.admin_plat_users_backwater_model_show, { backwater_model_id: data.backwater_model_id });
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
            backwater_model_id: "",
            name: "",
            desc: "",
        });
        this.dialogData.form.backwater_config = JSON.parse(JSON.stringify(this.initBackwater))
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_backwater_model_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            name,
            desc,
            backwater_config
        } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
        };
        formCopy.backwater_config = JSON.stringify(backwater_config);
        this.sendNotification(HttpType.admin_plat_users_backwater_model_store, objectRemoveNull(formCopy));
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
        formCopy.backwater_model_id = this.dialogData.form.backwater_model_id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_users_backwater_model_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string> i18n.t("common.deleteConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_users_backwater_model_update, { backwater_model_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
