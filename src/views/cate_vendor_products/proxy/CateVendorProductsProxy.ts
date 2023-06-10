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
            type: { name: "", options: {} },
            icon_name: { name: "", options: {} },
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
        isResort: false, // 是否重新排序
        isCopyModle: false, // 是否为复制模式
    };

    copy_data = {
        type: "1", // 复制的数据 当前的分类
        list: <any>[], // 复制的数据
    };
    select_list_temp = <any>[]; //临时选择的容器
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 100,
        plat_id: "",
        type: "1",
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
            type: "",
            vendor_product_id: "",
            icon_name:"",
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
            this.listQuery.type = "1";
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.tableData.isResort = true;
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
            this.dialogData.form.type = this.listQuery.type;
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
            icon_name:"",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_cate_vendor_products_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { category, vendor_id, vendor_product_id, plat_id, type ,icon_name} = this.dialogData.form;
        const formCopy: any = {
            category,
            vendor_id,
            vendor_product_id,
            plat_id,
            type,
            icon_name,
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

    /**重新排序 */
    onResort({ id, next_id }: { [key: string]: number }) {
        this.facade.sendNotification(HttpType.admin_cate_vendor_products_update, { id: id, next_id: next_id, opt: 11 });
    }
    clearCopyData()
    {
        this.copy_data.type =  this.listQuery.type;
        this.copy_data.list = [];
    }
    onBatchCopy() {
        let str = "";
        for (let index = 0; index < this.copy_data.list.length; index++) {
            str = str + this.copy_data.list[index].id;
            if (!(index == this.copy_data.list.length - 1)) {
                str = str + ",";
            }
        }
        const obj = {
            plat_id: this.listQuery.plat_id,
            ids: str,
            types: this.listQuery.type,
        };
        this.sendNotification(HttpType.admin_cate_vendor_products_batch_copy_data, obj);
    }
}
