import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/block_recharge_address/setting";
import { MessageBox } from "element-ui";
import IBlockRechargeAddressProxy from "./IBlockRechargeAddressProxy";

export default class BlockRechargeAddressProxy extends AbstractProxy implements IBlockRechargeAddressProxy {
    static NAME = "BlockRechargeAddressProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_block_recharge_address_table_columns);
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
            address: { name: "地址", options: {} },
            block_network_id: { name: "链名", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            gold: { name: "USDT余额", options: {} },
            id: { name: "ID", options: {} },
            is_delete: { name: "是否删除", options: {} },
            private_key: { name: "私钥", options: {} },
            status: { name: "状态", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_id: { name: "平台用户", options: {} },
            amount: { name: "平台用户", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        summary: {
            gold: "0.000", // 总余额
            total_record_count: 1001, // 总数量
            total_used: 6, // 已使用的数量
        },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        order_by: "",
        address: null,
        user_id: null,
        coin_name_unique: null,
        block_network_id: null,
    };
    /**弹窗相关数据 */
    // dialogData = {
    //     bShow: false,
    //     status: DialogStatus.create,
    //     form: {
    //         id: null,
    //         // TODO
    //     },
    //     formSource: null, // 表单的原始数据
    // };

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
        Object.assign(this.tableData.summary, data.summary);
    }
    /**详细数据 */
    // setDetail(data: any) {
    //     this.dialogData.formSource = data;
    //     Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    // }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            order_by: "",
            address: null,
            user_id: null,
            coin_name_unique: null,
            block_network_id: null,
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
    // hideDialog() {
    //     this.dialogData.bShow = false;
    // }
    /**重置弹窗表单 */
    // resetDialogForm() {
    //     Object.assign(this.dialogData.form, {
    //         // TODO
    //     });
    // }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_block_recharge_address_index, objectRemoveNull(this.listQuery));
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
