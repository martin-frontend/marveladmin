import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_vendor_gold_log_alarm/setting";
import { MessageBox } from "element-ui";
import IPlatUsersVendorGoldLogAlarmProxy from "./IPlatUsersVendorGoldLogAlarmProxy";

export default class PlatUsersVendorGoldLogAlarmProxy extends AbstractProxy
    implements IPlatUsersVendorGoldLogAlarmProxy {
    static NAME = "PlatUsersVendorGoldLogAlarmProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_alarm_table_columns);
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
            data_belong: { name: "", options: {} },
            wallet_type: { name: "", options: {} },
            batch_no: { name: "", options: {} },
            type: { name: "", options: {} },
            user_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            order_no: { name: "", options: {} },
            gold: { name: "", options: {} },
            check_times: { name: "", options: {} },
            status: { name: "", options: {} },
            log_created_at: { name: "", options: {} },
            created_at: { name: "", options: {} },
            updated_at: { name: "", options: {} },
        },
        ctrlData: {
            id: "",
            status: "",
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        user_id: "",
        vendor_id: "",
        order_no: "",
        status: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
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
            user_id: "",
            vendor_id: "",
            order_no: "",
            status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            //this.sendNotification(HttpType.undefined, { id: data.id });
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
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_alarm_index, objectRemoveNull(this.listQuery));
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
        // const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // // 删除多余无法去除的参数
        // // TODO
        // // 如果没有修改，就直接关闭弹窗
        // if (Object.keys(formCopy).length == 0) {
        //     this.dialogData.bShow = false;
        //     return;
        // }
        // // 添加必填参数
        // // TODO
        // // 发送消息
        // this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_alarm_update, formCopy);

        this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_alarm_update, this.tableData.ctrlData);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_users_vendor_gold_log_alarm_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
