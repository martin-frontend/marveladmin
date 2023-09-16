import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_verification/setting";
import { MessageBox } from "element-ui";
import IPlatUsersVerificationProxy from "./IPlatUsersVerificationProxy";
import LangUtil from "@/core/global/LangUtil";

export default class PlatUsersVerificationProxy extends AbstractProxy implements IPlatUsersVerificationProxy {
    static NAME = "PlatUsersVerificationProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_verification_table_columns);
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
            id: { name: "主键", options: {} },
            plat_id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            country: { name: "", options: {} },
            city: { name: "", options: {} },
            verification_name: { name: "", options: {} },
            mobile: { name: "", options: {} },
            email: { name: "", options: {} },
            province: { name: "", options: {} },
            post_code: { name: "", options: {} },
            address: { name: "", options: {} },
            remark: { name: "", options: {} },
            status: { name: "", options: {} },
            created_by: { name: "", options: {} },
            created_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            verification_time: { name: '认证时间', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        user_id: "",
        status: "",
        plat_id: "",
        "created_at-{>=}": "",
        "created_at-{<=}": "",
        "verification_time-{>=}": "",
        "verification_time-{<=}": "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            // TODO
            status: "",
        },
        isPass: false,
        formSource: null, // 表单的原始数据
    };

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

    isDandlerDelete = {
        data: <any>{},
        status: false,
    };

    /**显示备注弹窗 */
    showRemarkDialog() {
        this.remarkDialogData.bShow = true;
    }

    /**隐藏备注弹窗 */
    hideRemarkDialog() {
        this.remarkDialogData.bShow = false;
    }

    // /**更新備註 */
    onUpdateReamrk() {
        this.sendNotification(HttpType.admin_plat_users_verification_update, {
            id: this.remarkDialogData.form.id,
            remark: this.remarkDialogData.form.remark,
        });
        this.hideRemarkDialog();
    }

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
            user_id: "",
            status: "",
            plat_id: "",
            "created_at-{>=}": "",
            "created_at-{<=}": "",
            "verification_time-{>=}": "",
            "verification_time-{<=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
    }

    showTip(data: any, isPass: boolean = false) {
        const str = isPass ? LangUtil("是否通过？") : LangUtil("是否拒绝？");
        MessageBox.confirm(str, <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const formCopy = {
                    id: data.id,
                    status: isPass ? "1" : "2",
                    remark: this.remarkDialogData.form.remark,
                };
                this.sendNotification(HttpType.admin_plat_users_verification_update, formCopy);
                //this.sendNotification(HttpType.admin_coin_receive_recharge_order_close, { id });
            })
            .catch(() => { });
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
            status: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_verification_index, objectRemoveNull(this.listQuery));
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
        this.dialogData.form.status = this.dialogData.isPass ? "1" : "2";
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
        this.sendNotification(HttpType.admin_plat_users_verification_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_users_verification_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
