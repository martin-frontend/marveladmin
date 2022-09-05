import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plats_module_share/setting";
import { MessageBox } from "element-ui";
import IPlatsModuleShareProxy from "./IPlatsModuleShareProxy";
import i18n from "@/lang";
export default class PlatsModuleShareProxy extends AbstractProxy implements IPlatsModuleShareProxy {
    static NAME = "PlatsModuleShareProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_module_share_table_columns);
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
            created_at: {name: "创建时间", options: []},
            created_by: {name: "创建人", options: []},
            data_belong: {name: "数据归属标记", options: []},
            id: {name: "自增ID", options: []},
            module: {name: "共享功能模块", options: {}},
            plat_id: {name: "共享平台ID", options: {}},
            to_plat_id: {name: "平台ID", options: {}},
            updated_at: {name: "修改时间", options: []},
            updated_by: {name: "更新人", options: []},
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

    /**表单资料 */
    dialogData = {
        bShow: false,
        form: {
            module : '',
            plat_id : '',
            to_plat_id : '',
            id: ''
        },
        status: DialogStatus.update,
        formSource: {} // 表单的原始数据
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns["plat_id"].options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
    }

    /**查询 */
    onQuery() {
        this.facade.sendNotification(HttpType.admin_plats_module_share_index, objectRemoveNull(this.listQuery));
    }

    /**显示弹窗 */
    showDialog(data?: any) {
        this.dialogData.bShow = true;
        if(data) {
            this.dialogData.formSource = { ...data };
            Object.assign(this.dialogData.form, { ...data });
            this.dialogData.status = DialogStatus.update;
        } else {            
            Object.assign(this.dialogData.form, {
                module : '',
                plat_id : '',
                to_plat_id : '',
            });
            this.dialogData.status = DialogStatus.create;
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);

        formCopy.id = this.dialogData.form.id;
        console.warn('formCopy',formCopy);
        
        // 发送消息
        this.sendNotification(HttpType.admin_plats_module_share_update, formCopy);
    }

    /**刪除数据 */
    onDelete() {
        let id = this.dialogData.form.id;
        // this.sendNotification(HttpType.admin_plats_module_share_update, { id, is_delete: 1 });
    }

    /**新增数据 */
    onCreate() {
        this.sendNotification(HttpType.admin_plats_module_share_store, this.dialogData.form);
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
}
