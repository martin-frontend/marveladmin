import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import i18n from "@/lang";
import { HttpType } from "@/views/block_system_coins/setting";
import { MessageBox } from "element-ui";
import IBlockSystemCoinsProxy from "./IBlockSystemCoinsProxy";

export default class BlockSystemCoinsProxy extends AbstractProxy implements IBlockSystemCoinsProxy {
    static NAME = "BlockSystemCoinsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_block_system_coins_table_columns);
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
            coin_name: { name: "币种", options: {} },
            coin_name_unique: { name: "KEY", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否删除", options: {} },
            remark: { name: "说明", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            icon: { name: "图片", options: {} },
            icon_url: { name: "图片", options: {} },
            coin_tag: { name: "三方游戏用户前缀", options: {} },
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
            coin_name: "",
            coin_name_unique: "",
            remark: "",
            icon: "",
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
            // this.sendNotification(HttpType.undefined, { id: data.id });
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
            coin_name: "",
            coin_name_unique: "",
            remark: "",
            icon: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_block_system_coins_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const form = this.dialogData.form;
        const formCopy: any = {
            coin_name: form.coin_name,
            coin_name_unique: form.coin_name_unique,
            remark: form.remark,
            icon: form.icon,
        };
        this.sendNotification(HttpType.admin_block_system_coins_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_block_system_coins_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("是否删除该权限组？"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_block_system_coins_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
