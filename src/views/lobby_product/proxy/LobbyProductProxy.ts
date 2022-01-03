import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { getFirstKey, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/lobby_product/setting";
import { MessageBox, Row } from "element-ui";
import ILobbyProductProxy from "./ILobbyProductProxy";
import i18n from "@/lang";
export default class LobbyProductProxy extends AbstractProxy implements ILobbyProductProxy {
    static NAME = "LobbyProductProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_lobby_product_table_columns);
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
            app_type: { name: "", options: {} },
            category: { name: "", options: {} },
            created_at: { name: "", options: {} },
            created_by: { name: "", options: {} },
            data_belong: { name: "", options: {} },
            icon: { name: "", options: {} },
            index_no: { name: "", options: {} },
            is_delete: { name: "", options: {} },
            list_type: { name: "", options: {} },
            lobby_model_product_id: { name: "", options: {} },
            lobby_product_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            show_type: { name: "", options: {} },
            status: { name: "", options: {} },
            tags: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_product_name: { name: "", options: {} },
            vendor_type: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        tableDataFilter: <any>[],// 表格资料筛选
        listFilter: {// 筛选
            app_type: null,
            category: null,
        }
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        page_count: 1,
        page_size: 2000,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            plat_id: "",
            app_type: null || "",
            category: null,
            lobby_model_product_ids: <any>[],
        },
        formSource: null, // 表单的原始数据
        productList: <any>[], // 表单产品列表
        productFilterList: <any>[]   // 表单产品筛选列表
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
        this.onFilterChange();
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_lobby_product_show, { id: data.id });
        } else {
            this.resetDialogForm();
            this.dialogData.formSource = null;
            this.dialogData.form.app_type = getFirstKey(this.tableData.columns.app_type.options);
            this.dialogData.form.plat_id = this.listQuery.plat_id;
            this.sendNotification(HttpType.admin_lobby_model_product_index, {
                plat_id: this.listQuery.plat_id,
                page_count: 1,
                page_size: 2000,
            });
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
            app_type: null,
            category: null,
            lobby_model_product_ids: [],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_lobby_product_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const {
            plat_id,
            app_type,
            category,
            lobby_model_product_ids,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            app_type,
            category,
        };
        formCopy.lobby_model_product_ids = JSON.stringify(lobby_model_product_ids);
        this.sendNotification(HttpType.admin_lobby_product_store, objectRemoveNull(formCopy));
    }
    /**删除数据 */
    onDelete(data: any) {
        MessageBox.confirm(<string> i18n.t("lobby_product.deleteConfirmStr") + data.vendor_product_name, <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_lobby_product_update, { lobby_product_id: data.lobby_product_id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**更新标签数据 */
    onUpdateTags(data: any) {
        const { lobby_product_id } = data;
        data.tags = JSON.stringify(data.tags);
        this.sendNotification(HttpType.admin_lobby_product_update, { lobby_product_id: lobby_product_id, tags: data.tags });
    }
    /**更新排序 */
    onUpdateOpt(data: any) {
        this.sendNotification(HttpType.admin_lobby_product_update, data);
    }
    /**设置产品列表 */
    setProductList(data: any) {
        this.dialogData.productList.length = 0;
        this.dialogData.productList.push(...data.list);
        this.dialogData.productFilterList.length = 0;
        this.dialogData.productFilterList.push(...data.list);
        this.handleFormChange();
    }
    /**表格数据筛选 */
    onFilterChange() {
        this.tableData.tableDataFilter = this.tableData.list.filter((value: any) => {
            if (this.tableData.listFilter.app_type && value.app_type != this.tableData.listFilter.app_type) {
                return false;
            }
            if (this.tableData.listFilter.category && value.category != this.tableData.listFilter.category) {
                return false;
            }
            return true;
        });
    }
    /**表单数据筛选 */
    handleFormChange() {
        this.dialogData.productFilterList = this.dialogData.productList.filter((value: any) => {
            if (
                this.tableData.list.find(
                    (v: any) => v.lobby_model_product_id == value.lobby_model_product_id && v.app_type == this.dialogData.form.app_type
                )
            ) {
                return false;
            }
            if (this.dialogData.form.app_type && value.app_types != this.dialogData.form.app_type) {
                return false;
            }
            if (this.dialogData.form.category && value.category != this.dialogData.form.category) {
                return false;
            }
            return true;
        });
    }
}
