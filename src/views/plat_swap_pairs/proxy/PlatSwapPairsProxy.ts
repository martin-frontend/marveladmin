import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import i18n from "@/lang";
import { HttpType } from "@/views/plat_swap_pairs/setting";
import { MessageBox } from "element-ui";
import IPlatSwapPairsProxy from "./IPlatSwapPairsProxy";

export default class PlatSwapPairsProxy extends AbstractProxy implements IPlatSwapPairsProxy {
    static NAME = "PlatSwapPairsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_swap_pairs_table_columns);
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
            coin_a: { name: "币种A", options: {} },
            coin_a_amount: { name: "币种A数量", options: {} },
            coin_b: { name: "币种B", options: {} },
            coin_b_amount: { name: "币种B数量", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            is_delete: { name: "是否删除", options: Array(2) },
            plat_id: { name: "所属平台", options: {} },
            plat_swap_pair_id: { name: "币对编号", options: {} },
            price: { name: "币价" },
            status: { name: "状态", options: {} },
            swap_fee_ratio: { name: "手续费比率", options: {} },
            system_coin_a_amount: { name: "系统币种A数量", options: {} },
            system_coin_b_amount: { name: "系统币种B数量", options: {} },
            tolerance_params: { name: "容差配置", options: {} },
            type: { name: "类型", option: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_coin_a_amount: { name: "用户币种A数量", options: {} },
            user_coin_b_amount: { name: "用户币种B数量", options: {} },
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
            plat_id: "",
            coin_a: "",
            coin_b: "",
            status: 1,
            plat_swap_pair_id: "",
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

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
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
            plat_id: "",
            coin_a: "",
            coin_b: "",
            status: 1,
            plat_swap_pair_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_swap_pairs_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, coin_a, coin_b, status } = this.dialogData.form;
        const formCopy: any = { plat_id, coin_a, coin_b, status };
        console.warn(formCopy);
        this.sendNotification(HttpType.admin_plat_swap_pairs_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);

        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        formCopy.plat_id = this.dialogData.form.plat_id;
        formCopy.plat_swap_pair_id = this.dialogData.form.plat_swap_pair_id;

        // 发送消息
        this.sendNotification(HttpType.admin_plat_swap_pairs_update, formCopy);
    }

    /**删除数据 */
    onDelete() {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                const data = {
                    plat_id: this.dialogData.form.plat_id,
                    plat_swap_pair_id: this.dialogData.form.plat_swap_pair_id,
                    is_delete: 1,
                };
                this.sendNotification(HttpType.admin_plat_swap_pairs_update, data);
            })
            .catch(() => {});
    }
}
