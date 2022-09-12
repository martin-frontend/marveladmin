import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/lobby_vendor_products/setting";
import { MessageBox } from "element-ui";
import ILobbyVendorProductsProxy from "./ILobbyVendorProductsProxy";

export default class LobbyVendorProductsProxy extends AbstractProxy implements ILobbyVendorProductsProxy {
    static NAME = "LobbyVendorProductsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_lobby_vendor_products_table_columns);
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
            data_belong: { name: "", options: {} },
            index_no: { name: "", options: {} },
            lobby_vendor_product_id: { name: "", options: {} },
            ori_product_id: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            status: { name: "", options: {} },
            updated_at: { name: "", options: {} },
            updated_by: { name: "", options: {} },
            vendor_id: { name: "", options: {} },
            vendor_product_id: { name: "", options: {} },
            vendor_product_name: { name: "", options: {} },
            vendor_type: { name: "", options: {} },
            water_rate: { name: "", options: {} },
            languages: { name: "", options: {} },
            vendor_languages: { name: "", options: {} },
        },
        ctrlData: {
            lobby_vendor_product_id: "",
            opt: "",
            status: "",
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        vendor_id: "",
        vendor_type: "",
        lobby_vendor_product_id: "",
        status: "",
        page_count: 1,
        page_size: 20,
        languages: "",
        vendor_languages: "",
    };

    /**更新列表資料 */
    rowData = {
        lobby_vendor_product_id: "",
        water_rate: 0,
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.update,
        form: <any>{
            languages: [],
        },
        formSource: <any>null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns["plat_id"].options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id))
                this.listQuery.plat_id = plat_id_options_keys[0];
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;

        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.dialogData.form.languages = [];
            this.dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            vendor_id: "",
            vendor_type: "",
            lobby_vendor_product_id: "",
            status: "",
            languages: "",
            vendor_languages: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_lobby_vendor_products_index, objectRemoveNull(this.listQuery));
    }
    /**更新数据 */
    onUpdate() {
        let formCopy: any = null;
        formCopy = objectRemoveNull(this.tableData.ctrlData);
        this.sendNotification(HttpType.admin_lobby_vendor_products_update, formCopy);
    }
    /**更新数据 */
    onUpdateLanguages() {        
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }
        formCopy.lobby_vendor_product_id = this.dialogData.form.lobby_vendor_product_id;
        this.sendNotification(HttpType.admin_lobby_vendor_products_update, formCopy);
    }
    /**更新刘水配置 */
    onUpdateWaterRate() {
        this.sendNotification(HttpType.admin_lobby_vendor_products_update, this.rowData);
    }
    /**同步游戏 */
    onSync() {
        this.sendNotification(HttpType.admin_lobby_vendor_products_sync_data, {
            plat_id: this.listQuery.plat_id,
        });
    }
}
