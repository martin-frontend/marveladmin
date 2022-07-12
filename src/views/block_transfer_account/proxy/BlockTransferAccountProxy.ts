import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, getUrl, objectRemoveNull } from "@/core/global/Functions";
import Http from "@/core/net/Http";
import i18n from "@/lang";
import { HttpType } from "@/views/block_transfer_account/setting";
import { MessageBox } from "element-ui";
import IBlockTransferAccountProxy from "./IBlockTransferAccountProxy";

export default class BlockTransferAccountProxy extends AbstractProxy implements IBlockTransferAccountProxy {
    static NAME = "BlockTransferAccountProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_block_transfer_account_table_columns);
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
            address: { name: "账号地址", options: {} },
            block_network_id: { name: "区块网络", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "ID", options: {} },
            is_delete: { name: "是否删除", options: {} },
            name: { name: "名称", options: {} },
            plat_id: { name: "平台", options: {} },
            private_key: { name: "账号私钥", options: {} },
            remark: { name: "描述", options: {} },
            status: { name: "状态", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
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
            id: null,
            plat_id: "",
            name: "",
            type: null,
            address: null,
            status: null,
            remark: null,
            token_balance: "",
            block_network_id: null,
            private_key: null,
        },
        formSource: <any>null, // 表单的原始数据
    };
    /**弹窗显示余额 */
    dialogBalance = {
        bShow: false,
        data: <any>{},
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        for (const item of data.list) {
            item.main_balance = "--";
            item.token_balance = "--";
        }
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
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_block_transfer_account_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
        }
        this.dialogData.bShow = true;
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            id: null,
            plat_id: "",
            name: "",
            type: null,
            address: null,
            status: null,
            remark: null,
            token_balance: "",
            block_network_id: null,
            private_key: null,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_block_transfer_account_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const form = this.dialogData.form;
        const formCopy: any = {
            plat_id: form.plat_id,
            name: form.name,
            type: form.type,
            address: form.address,
            status: form.status,
            remark: form.remark,
            block_network_id: form.block_network_id,
            private_key: form.private_key,
        };
        this.sendNotification(HttpType.admin_block_transfer_account_store, objectRemoveNull(formCopy));
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
        formCopy.id = this.dialogData.formSource.id;
        // 发送消息
        this.sendNotification(HttpType.admin_block_transfer_account_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("admin_role.confirmText1"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_block_transfer_account_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**获取余额 */
    onGetBalance(id: any) {
        Http.request({}, getUrl(HttpType.admin_block_transfer_account_balance, { id })).then((result: any) => {
            this.dialogBalance.bShow = true;
            this.dialogBalance.data = result.data;
        });
    }
}
