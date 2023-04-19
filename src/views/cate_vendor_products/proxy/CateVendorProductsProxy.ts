import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/cate_vendor_products/setting";
import { MessageBox } from "element-ui";
import ICateVendorProductsProxy from "./ICateVendorProductsProxy";
import LangUtil from "@/core/global/LangUtil";

export default class CateVendorProductsProxy extends AbstractProxy implements ICateVendorProductsProxy {
    static NAME = "CateVendorProductsProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_cate_vendor_products_table_columns);
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
            id: { name: "ID", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            plat_id: { name: "平台ID", options: {} },
            vendor_id: { name: "厂商ID", options: {} },
            vendor_product_id: { name: "产品ID", options: {} },
            category: { name: "分类标签", options: {} },
            alias: { name: "别名", options: {} },
            game_desc: { name: "描述", options: {} },
            index_no: { name: "排序序号", options: {} },
            languages: { name: "展示语言", options: {} },
            created_by: { name: "创建人", options: {} },
            created_at: { name: "创建时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            updated_at: { name: "修改时间", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
            vendor_status: { name: "厂商状态", options: {} },
            vendor_product_name: { name: "产品名称", options: {} },
            vendor_product_status: { name: "游戏状态", options: {} },
            vendor_product_languages: { name: "支持语言", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 100 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 100,
        plat_id: "",
        category: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            plat_id: "",
            category: "",
            vendor_id: "",
            vendor_product_id: "",
        },
        formSource: null, // 表单的原始数据
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            category: "",
        });
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
            this.dialogData.form.plat_id = this.listQuery.plat_id;
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
            category: "",
            vendor_id: "",
            vendor_product_id: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_cate_vendor_products_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { category, vendor_id, vendor_product_id, plat_id } = this.dialogData.form;
        const formCopy: any = {
            category,
            vendor_id,
            vendor_product_id,
            plat_id,
        };
        this.sendNotification(HttpType.admin_cate_vendor_products_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_cate_vendor_products_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_cate_vendor_products_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
    /**更新排序 */
    onUpdateOpt(data: any) {
        this.sendNotification(HttpType.admin_cate_vendor_products_update, data);
    }
}
