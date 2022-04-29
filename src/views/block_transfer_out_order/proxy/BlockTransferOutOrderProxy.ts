import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/block_transfer_out_order/setting";
import { MessageBox } from "element-ui";
import IBlockTransferOutOrderProxy from "./IBlockTransferOutOrderProxy";

export default class BlockTransferOutOrderProxy extends AbstractProxy implements IBlockTransferOutOrderProxy {
    static NAME = "BlockTransferOutOrderProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_block_transfer_out_order_table_columns);
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
            actual_amount: { name: "到帐划转总额", options: {} },
            amount: { name: "数量", options: {} },
            auto_transfer: { name: "自动转账", options: {} },
            block_number: { name: "区块高度", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            created_ip: { name: "创建IP", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            fee: { name: "手续费", options: {} },
            fee_rate: { name: "手续费比例(单位百分比)", options: {} },
            from_address: { name: "转账地址", options: {} },
            gas_fee: { name: "油费", options: {} },
            id: { name: "主键", options: {} },
            is_internal: { name: "是否内部转账", options: {} },
            log_index: { name: "交易Log索引", options: {} },
            order_no: { name: "订单编号", options: {} },
            plat_id: { name: "所属平台", options: {} },
            remark: { name: "备注", options: {} },
            status: { name: "状态", options: {} },
            to_address: { name: "到账地址", options: {} },
            token_address: { name: "代币地址", options: {} },
            token_decimal: { name: "代币精度", options: {} },
            token_name: { name: "币种", options: {} },
            transfer_account_id: { name: "划转账号ID", options: {} },
            txn_hash: { name: "交易TxnHash", options: {} },
            type: { name: "订单类型", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_id: { name: "用户ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id:"",
        order_no:null,
        token_name:null,
        status:null,
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
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
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
    // showDialog(status: string, data?: any) {
    //     this.dialogData.bShow = true;
    //     this.dialogData.status = status;
    //     if (status == DialogStatus.update) {
    //         this.dialogData.formSource = data;
    //         Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    //         this.sendNotification(HttpType.undefined, { id: data.id });
    //     } else {
    //         this.resetDialogForm();
    //         this.dialogData.formSource = null;
    //     }
    // }
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
        this.sendNotification(HttpType.admin_block_transfer_out_order_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    // onAdd() {
    //     const formCopy: any = {
    //         // TODO
    //     };
    //     this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    // }
    /**更新数据 */
    // onUpdate() {
    //     const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
    //     // 删除多余无法去除的参数
    //     // TODO
    //     // 如果没有修改，就直接关闭弹窗
    //     if (Object.keys(formCopy).length == 0) {
    //         this.dialogData.bShow = false;
    //         return;
    //     }
    //     // 添加必填参数
    //     // TODO
    //     // 发送消息
    //     this.sendNotification(HttpType.undefined, formCopy);
    // }
    /**删除数据 */
    // onDelete(id: any) {
    //     MessageBox.confirm("您是否删除该记录", "提示", {
    //         confirmButtonText: "确定",
    //         cancelButtonText: "取消",
    //         type: "warning",
    //     })
    //         .then(() => {
    //             this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
    //         })
    //         .catch(() => {});
    // }
}
