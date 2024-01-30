import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_profit_tax/setting";
import { MessageBox } from "element-ui";
import IPlatProfitTaxProxy from "./IPlatProfitTaxProxy";
import LangUtil from "@/core/global/LangUtil";

export default class PlatProfitTaxProxy extends AbstractProxy implements IPlatProfitTaxProxy {
    static NAME = "PlatProfitTaxProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_profit_tax_table_columns);
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
            created_at: { name: '创建时间', options: {} },
            created_by: { name: '创建人', options: {} },
            data_belong: { name: '数据归属标记', options: {} },
            id: { name: 'ID', options: {} },
            plat_id: { name: '平台ID', options: {} },
            tax: { name: '税率', options: {} },
            updated_at: { name: '修改时间', options: {} },
            updated_by: { name: '更新人', options: {} },
            vendor_id: { name: '游戏厂商', options: {} },
            vendor_name: { name: '厂商名称', option: {} },
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
            vendor_id: "",
            tax: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
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
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_profit_tax_show, { id: data.id });
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
            vendor_id: "",
            tax: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_profit_tax_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const {
            plat_id,
            vendor_id,
            tax,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            vendor_id,
            tax,
        };
        this.sendNotification(HttpType.admin_plat_profit_tax_store, objectRemoveNull(formCopy));
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
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_plat_profit_tax_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(LangUtil("您是否删除该记录"), LangUtil("提示"), {
            confirmButtonText: LangUtil("确定"),
            cancelButtonText: LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_profit_tax_delete, { id });
            })
            .catch(() => { });
    }
}
