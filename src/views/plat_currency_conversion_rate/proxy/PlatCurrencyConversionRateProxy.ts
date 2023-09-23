import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_currency_conversion_rate/setting";
import { MessageBox } from "element-ui";
import IPlatCurrencyConversionRateProxy from "./IPlatCurrencyConversionRateProxy";
import LangUtil from "@/core/global/LangUtil";

export default class PlatCurrencyConversionRateProxy extends AbstractProxy implements IPlatCurrencyConversionRateProxy {
    static NAME = "PlatCurrencyConversionRateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_currency_conversion_rate_table_columns);
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
            from_coin: { name: '转换前币种', options: {} },
            id: { name: 'ID', options: {} },
            plat_id: { name: '平台ID', options: {} },
            rate: { name: '汇率', options: {} },
            status: { name: '状态', options: {} },
            to_coin: { name: '转换后币种', options: {} },
            updated_at: { name: '修改时间', options: {} },
            updated_by: { name: '更新人', options: {} },
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

    /**查询条件 */
    logListQuery = {
        page_count: 1,
        page_size: 20,
        id: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            from_coin: "",
            to_coin: "",
            rate: "",
            status: 1,
        },
        formSource: null, // 表单的原始数据
    };

    logDialogData = {
        bShow: false,
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
        }
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
            this.sendNotification(HttpType.admin_plat_currency_conversion_rate_show, { id: data.id });
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
            from_coin: "",
            to_coin: "",
            rate: "",
            status: 1,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_currency_conversion_rate_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const { plat_id, from_coin, to_coin, rate, status } = this.dialogData.form;
        const formCopy: any = { plat_id, from_coin, to_coin, rate, status };
        this.sendNotification(HttpType.admin_plat_currency_conversion_rate_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_plat_currency_conversion_rate_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_currency_conversion_rate_delete, { id });
            })
            .catch(() => { });
    }

    onShowLog() {
        this.sendNotification(HttpType.admin_conversion_orders_show_index, objectRemoveNull(this.logListQuery));
    }


    setLog(data: any) {
        this.logDialogData.list.length = 0;
        this.logDialogData.bShow = true;
        this.logDialogData.list.push(...data.list);
        Object.assign(this.logDialogData.pageInfo, data.pageInfo);
    }
}
