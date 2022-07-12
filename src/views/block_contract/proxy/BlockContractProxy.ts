import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import i18n from "@/lang";
import { HttpType } from "@/views/block_contract/setting";
import { MessageBox } from "element-ui";
import IBlockContractProxy from "./IBlockContractProxy";

export default class BlockContractProxy extends AbstractProxy implements IBlockContractProxy {
    static NAME = "BlockContractProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_block_contract_table_columns);
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
            block_network_id: { name: "区块网络", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            contract_abi: { name: "ABI内容", options: {} },
            contract_address: { name: "合约地址", options: {} },
            contract_decimal: { name: "合约精度", options: {} },
            contract_name: { name: "名称", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            extends: { name: "扩展内容", options: {} },
            id: { name: "ID", options: {} },
            is_delete: { name: "是否删除", options: {} },
            remark: { name: "描述", options: {} },
            type: { name: "合约类型", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
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
            id: 0,
            contract_name: "",
            remark: null,
            contract_address: null,
            contract_decimal: null,
            type: <any>null,
            block_network_id: <any>null,
            coin_name_unique: null,
            contract_abi: "",
            extends: "",
        },
        formSource: <any>null, // 表单的原始数据
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
        this.dialogData.form.type = this.dialogData.form.type.toString();
        this.dialogData.form.block_network_id = this.dialogData.form.block_network_id.toString();
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            //TODO
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_block_contract_show, { id: data.id });
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
            id: 0,
            contract_name: "",
            remark: null,
            contract_address: null,
            contract_decimal: null,
            type: null,
            block_network_id: null,
            coin_name_unique: null,
            contract_abi: "",
            extends: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_block_contract_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const form = this.dialogData.form;
        const formCopy: any = {
            block_network_id: form.block_network_id,
            contract_abi: form.contract_abi,
            contract_address: form.contract_address,
            contract_decimal: form.contract_decimal,
            contract_name: form.contract_name,
            extends: form.extends,
            remark: form.remark,
            type: form.type,
            coin_name_unique: form.coin_name_unique,
        };
        this.sendNotification(HttpType.admin_block_contract_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_block_contract_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("admin_role.confirmText1"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_block_contract_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
