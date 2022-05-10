import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_block_coins/setting";
import { MessageBox } from "element-ui";
import IPlatBlockCoinsProxy from "./IPlatBlockCoinsProxy";

export default class PlatBlockCoinsProxy extends AbstractProxy implements IPlatBlockCoinsProxy {
    static NAME = "PlatBlockCoinsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_block_coins_table_columns);
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
            can_play_game: { name: "是否允许游戏", options: {} },
            coin_name_unique: { name: "币种", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            game_scale: { name: "游戏比例", options: {} },
            gold: { name: "公共钱包", options: {} },
            id: { name: "主键", options: {} },
            is_delete: { name: "是否删除", options: {} },
            plat_id: { name: "平台ID", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            remark: { name: "描述", options: {} },
            type: {name: "类型", options: {}},
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: null,
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: <any>null,
            coin_name_unique: null,
            can_play_game: null,
            remark: null,
            game_scale: 1,
            type: null,
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
            plat_id: null,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.plat_id = data.plat_id.toString();
            this.dialogData.form.type = data.type.toString();
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
            plat_id: <any>null,
            coin_name_unique: null,
            can_play_game: null,
            remark: null,
            game_scale: 1,
            type: null,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_block_coins_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const form = this.dialogData.form;
        const formCopy: any = {
            plat_id: form.plat_id,
            coin_name_unique: form.coin_name_unique,
            can_play_game: form.can_play_game,
            remark: form.remark,
            game_scale: form.game_scale,
            type: form.type,
        };
        this.sendNotification(HttpType.admin_plat_block_coins_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_plat_block_coins_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_block_coins_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
