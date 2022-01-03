import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_bonus_all_stock_model/setting";
import { MessageBox } from "element-ui";
import IPlatBonusAllStockModelProxy from "./IPlatBonusAllStockModelProxy";

export default class PlatBonusAllStockModelProxy extends AbstractProxy implements IPlatBonusAllStockModelProxy {
    static NAME = "PlatBonusAllStockModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_table_columns);
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
            all_bonus_config: { name: "", options: <any>{} },
            all_bonus_model_id: { name: "", options: {} },
            calc_type: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            desc: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            name: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
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
            all_bonus_model_id: "",
            name: "",
            desc: "",
            calc_type: "",
            all_bonus_config: [
                {
                    name: "", // 等级描述名称
                    total_performance: 0, // 团队业绩
                    stock_num: 0, // 每万占股
                },
            ],
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
            this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_show, {
                all_bonus_model_id: data.all_bonus_model_id,
            });
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
            all_bonus_model_id: "",
            name: "",
            desc: "",
            calc_type: "",
            all_bonus_config: [
                {
                    name: "", // 等级描述名称
                    total_performance: 0, // 团队业绩
                    stock_num: 0, // 每万占股
                },
            ],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, desc, calc_type, all_bonus_config } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            calc_type,
            all_bonus_config,
        };
        formCopy.all_bonus_config = JSON.stringify(formCopy.all_bonus_config);

        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_store, objectRemoveNull(formCopy));
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
        formCopy.all_bonus_model_id = this.dialogData.form.all_bonus_model_id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_update, formCopy);
    }
    /**删除数据 */
    onDelete(data: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_bonus_all_stock_model_update, {
                    all_bonus_model_id: data.all_bonus_model_id,
                    all_bonus_config: JSON.stringify(data.all_bonus_config),
                    is_delete: 1,
                });
            })
            .catch(() => {});
    }
}
