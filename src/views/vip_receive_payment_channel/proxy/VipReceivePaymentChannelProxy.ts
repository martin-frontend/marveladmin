import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/vip_receive_payment_channel/setting";
import { MessageBox } from "element-ui";
import IVipReceivePaymentChannelProxy from "./IVipReceivePaymentChannelProxy";
import i18n from "@/lang";

export default class VipReceivePaymentChannelProxy extends AbstractProxy implements IVipReceivePaymentChannelProxy {
    static NAME = "VipReceivePaymentChannelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_vip_receive_payment_channel_table_columns);
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
        columns: <any>{
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "币商充值渠道ID", options: {} },
            index_no: { name: "排序序号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            notice: { name: "提示信息", options: {} },
            plat_id: { name: "平台ID", options: { "0": "" } },
            status: { name: "状态:1-正常|98-禁用", options: {} },
            subtitle: { name: "说明", options: {} },
            title: { name: "标签", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            url: { name: "跳转链接", options: {} },
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
            plat_id: "",
            title: "",
            url: "",
            status: "1",
        },
        formSource: {
            id: null,
            plat_id: "",
            title: "",
            url: "",
            status: "",
            opt: "0",
        }, // 表单的原始数据
    };

    /**在table 更新排序/状态数据 */
    tableUpdateData = {
        status: "",
        opt: "",
        id: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.tableData.columns.plat_id.options["0"] = LangUtil("所有平台");
        const platIdOptionsKeys = Object.keys(this.tableData.columns.plat_id.options);
        if (platIdOptionsKeys.length > 0) {
            if (!platIdOptionsKeys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = platIdOptionsKeys[0];
            }
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.forEach((list: any) => {
            list.status = list.status.toString();
        });
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            title: "",
            url: "",
            status: "1",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            data.status = data.status.toString();
            data.plat_id = data.plat_id.toString();
            data.opt = "0";
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = { id: null, plat_id: "", title: "", url: "", status: "", opt: "0" };
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
            title: "",
            url: "",
            status: "1",
        });
    }

    /**查询 */
    onQuery() {
        const data: any = JSON.parse(JSON.stringify(this.listQuery));
        data.plat_id = data.plat_id === "0" ? "" : data.plat_id;
        this.sendNotification(HttpType.admin_vip_receive_payment_channel_index, objectRemoveNull(data));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, title, url, status } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            title,
            url,
            status,
        };
        this.sendNotification(HttpType.admin_vip_receive_payment_channel_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate(flag: boolean = false) {
        let formCopy: any = {};
        if (flag) {
            // 在table 操作
            formCopy = objectRemoveNull(this.tableUpdateData);
        } else {
            formCopy = formCompared(this.dialogData.form, this.dialogData.formSource);
            formCopy.id = this.dialogData.form.id;
        }

        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }
        this.sendNotification(HttpType.admin_vip_receive_payment_channel_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_vip_receive_payment_channel_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
