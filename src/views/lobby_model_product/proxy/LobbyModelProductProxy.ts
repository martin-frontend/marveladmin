import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/lobby_model_product/setting";
import { MessageBox } from "element-ui";
import ILobbyModelProductProxy from "./ILobbyModelProductProxy";
import i18n from "@/lang";

export default class LobbyModelProductProxy extends AbstractProxy implements ILobbyModelProductProxy {
    static NAME = "LobbyModelProductProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_lobby_model_product_table_columns);
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
            // TODO
            app_types: { name: "支持应用平台", options: { "2": "app" } },
            category: { name: "大厅分类", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            icon: { name: "产品图片", options: {} },
            is_delete: { name: "是否删除", options: {} },
            list_type: { name: "所选产品列表", options: {} },
            lobby_model_product_id: { name: "大厅产品模型ID", options: {} },
            show_type: { name: "所属类型", options: {} },
            status: { name: "状态", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            vendor_id: { name: "产品厂商", options: {} },
            vendor_product_id: { name: "产品名称", options: {}, options_key: {} },
            vendor_product_name: { name: "产品名称", options: {} },
            vendor_type: { name: "产品类型", options: {} },
            currency_type: { name: "结算方式", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 10000,
        plat_id: null,
        vendor_product_name: null,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            lobby_model_product_id: null,
            vendor_id: "",
            vendor_type: "",
            app_types: [],
            show_type: undefined,
            category: "",
            vendor_product_id: "",
            vendor_product_name: "",
            icon: "",
            list_type: "",
            currency_type: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**筛选 */
    listFilter = {
        app_type: null,
        show_type: null,
        category: null,
        currency_type: null,
    };

    /**数据筛选 */
    tableDataFilter = [];

    /**产品类型 copy */
    vendorTypeOptions = <any>{};

    /**产品厂商 copy */
    vendorIdOptions = <any>{};

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableDataFilter = data.list;
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.onFilterTable();
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;

        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.getVendorId();

            this.dialogData.form.list_type = String(this.dialogData.form.list_type);
            this.onGetVendor(true);
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
            // TODO
            id: null,
            lobby_model_product_id: null,
            vendor_id: "",
            vendor_type: "",
            app_types: [],
            show_type: undefined,
            category: "",
            vendor_product_id: "",
            vendor_product_name: "",
            icon: "",
            currency_type: "",
            list_type: 0,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_lobby_model_product_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const {
            app_types,
            category,
            icon,
            id,
            list_type,
            lobby_model_product_id,
            show_type,
            vendor_id,
            vendor_product_id,
            vendor_product_name,
            vendor_type,
            currency_type,
        } = this.dialogData.form;

        const formCopy: any = {
            // TODO
            app_types,
            category,
            icon,
            id,
            list_type,
            lobby_model_product_id,
            show_type,
            vendor_id,
            vendor_product_id,
            vendor_product_name,
            vendor_type,
            currency_type,
        };

        this.sendNotification(HttpType.admin_lobby_model_product_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }
        // 添加必填参数
        formCopy.lobby_model_product_id = this.dialogData.form.lobby_model_product_id;
        // 发送消息
        this.sendNotification(HttpType.admin_lobby_model_product_update, formCopy);
    }
    /**删除数据 */
    onDelete(lobby_model_product_id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_lobby_model_product_update, {
                    lobby_model_product_id,
                    is_delete: 1,
                });
            })
            .catch(() => {});
    }

    /**产品厂商二级连动产品类型 */
    onGetVendor(isEdit: boolean = false) {
        const vendor_id = this.dialogData.form.vendor_id;
        if (!isEdit) {
            this.dialogData.form.vendor_type = "";
        }
        this.sendNotification(HttpType.admin_vendor_show, { vendor_id });
    }
    /**写入连动产品类型 */
    setVendor(value: any) {
        const options: any = {};
        if (Object.keys(this.vendorTypeOptions).length === 0) {
            this.vendorTypeOptions = JSON.parse(JSON.stringify(this.tableData.columns.vendor_type.options));
        }
        for (const type of value.vendor_types) {
            options[type] = this.vendorTypeOptions[type];
        }
        this.tableData.columns.vendor_type.options = options;
    }

    /**依照货币类型 取vendor id */
    getVendorId() {
        this.sendNotification(HttpType.admin_vendor_index, {
            currency_type: this.dialogData.form.currency_type,
            page_size: 10000,
        });
    }
    setVendorId(body: any) {
        const list: any = JSON.parse(JSON.stringify(body.list));
        this.vendorIdOptions = {};
        list.forEach((ele: any) => {
            this.vendorIdOptions[ele.vendor_id] = ele.vendor_name;
        });
    }

    /** 筛选显示表格类型*/
    onFilterTable() {
        this.tableDataFilter = this.tableData.list.filter((value: any) => {
            if (this.listFilter.app_type && value.app_types.indexOf(this.listFilter.app_type) == -1) {
                return false;
            }
            if (this.listFilter.show_type && value.show_type != this.listFilter.show_type) {
                return false;
            }
            if (this.listFilter.category && value.category != this.listFilter.category) {
                return false;
            }
            if (this.listFilter.currency_type && value.currency_type != this.listFilter.currency_type) {
                return false;
            }
            if (this.listFilter.currency_type && value.currency_type.indexOf(this.listFilter.currency_type) == -1) {
                return false;
            }
            return true;
        });
    }
}
