import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/vendor/setting";
import { MessageBox } from "element-ui";
import IVendorProxy from "./IVendorProxy";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import i18n from "@/lang";
export default class VendorProxy extends AbstractProxy implements IVendorProxy {
    static NAME = "VendorProxy";

    /**在这里获取基础数据，退出页面时，proxy不会销毁，所以只会获取一次 */
    onRegister() { }

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_vendor_table_columns);
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
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            extends: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            status: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            vendor_desc: { name: "", options: {} },
            vendor_icon: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_name: { name: "", options: {} },
            vendor_name_unique: { name: "", options: {} },
            vendor_types: { name: "", options: {} },
            is_save_bet_info: { name: "", options: {} },
            currency_type: { name: "", options: {} },
            proxy_key: { name: "", options: {} },
            time_region_hour_interval: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        currency_type: "CNY",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            vendor_id: null,
            vendor_name: "",
            vendor_name_unique: "",
            vendor_types: [],
            extends: "",
            status: 1,
            vendor_desc: "",
            is_save_bet_info: 1,
            currency_type: "CNY",
            proxy_key: "",
            time_region_hour_interval: 0
        },
        formSource: null, // 表单的原始数据
        // 扩展数据
        extendsData: {},
    };
    /**测试弹窗 */
    testDialogData = {
        bShow: false,
        form: {
            vendor_id: "",
            value: ""
        }
    }

    /**设置表头数据 */
    setTableCoulmns(data: any) {
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
        this.dialogData.extendsData = jsonToObject(data.extends);
        Object.assign(this.dialogData.form, data);
    }

    /**重置查询条件 */
    resetListQuery() {
        this.listQuery = {
            page_count: 1,
            page_size: 20,
            currency_type: "CNY",
        };
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;

        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.extendsData = jsonToObject(data.extends);
            Object.assign(this.dialogData.form, data);
            this.sendNotification(HttpType.admin_vendor_show, { vendor_id: data.vendor_id });
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
            vendor_id: null,
            vendor_name: "",
            vendor_name_unique: "",
            vendor_types: [],
            extends: "",
            status: 1,
            vendor_desc: "",
            is_save_bet_info: 1,
            proxy_key: "",
            time_region_hour_interval: 0,
        });
        this.dialogData.extendsData = {};
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_vendor_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            vendor_id,
            vendor_name,
            vendor_name_unique,
            vendor_types,
            status,
            vendor_desc,
            currency_type,
            proxy_key,
            time_region_hour_interval
        } = this.dialogData.form;
        const formCopy: any = {
            vendor_id,
            vendor_name,
            vendor_name_unique,
            vendor_types,
            status,
            vendor_desc,
            currency_type,
            proxy_key,
            time_region_hour_interval
        };
        formCopy.vendor_types = JSON.stringify(formCopy.vendor_types);
        formCopy.extends = jsonStringify(this.dialogData.extendsData);
        this.sendNotification(HttpType.admin_vendor_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        this.dialogData.form.extends = jsonStringify(this.dialogData.extendsData);
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        // 特殊处理参数
        // 添加主键
        formCopy.vendor_id = this.dialogData.form.vendor_id;
        this.sendNotification(HttpType.admin_vendor_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_vendor_update, { vendor_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }
    /**测试数据 */
    onTest(value: string) {
        this.sendNotification(HttpType.admin_vendor_test_vendor, { vendor_id: this.testDialogData.form.vendor_id, value: value });
    }
}