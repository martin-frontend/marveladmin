import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, jsonToObject, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/vendor_product/setting";
import { Message, MessageBox } from "element-ui";
import IVendorProductProxy from "./IVendorProductProxy";
import i18n from "@/lang";
import { BaseInfo } from "@/components/vo/commonVo";
import { exportJson2Excel } from "@/core/global/Excel";
export default class VendorProductProxy extends AbstractProxy implements IVendorProductProxy {
    static NAME = "VendorProductProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_vendor_product_table_columns);
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
            vendor_product_id: { name: "产品ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            vendor_product_name: { name: "产品名称", options: [] },
            vendor_id: { name: "产品厂商", options: {} },
            vendor_type: { name: "产品类型", options: {} },
            languages: { name: "支持语言", options: {} },
            ori_product_id: { name: "产品ID[厂商]", options: [] },
            icon: { name: "产品图片", options: [] },
            icon_url: { name: LangUtil("缩略图"), options: [] },
            status: { name: "状态", options: {} },
            orientation: { name: "方向", options: {} },
            open_mode: { name: "打开方式", options: {} },
            is_delete: { name: "是否删除", options: [] },
            ori_vendor_extend: { name: "产品扩展字段", options: [] },
            created_by: { name: "创建人", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_by: { name: "修改人", options: [] },
            updated_at: { name: "修改时间", options: [] },
            currency_type: { name: "结算方式", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    exportData = {
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**查询条件 */
    listQuery = {
        vendor_id: "",
        vendor_type: "",
        vendor_product_name: "",
        ori_product_id: "",
        status: "",
        page_count: 1,
        page_size: 20,
        currency_type: "",
        languages: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            vendor_id: "",
            vendor_product_id: "",
            vendor_type: "",
            vendor_product_name: "",
            ori_product_id: "",
            icon: "",
            status: 1,
            ori_vendor_extend: {},
            languages: "",
            open_mode: 1,
        },
        formSource: null, // 表单的原始数据
        update: 1,
    };

    fieldSelectionData = {
        bShow: false,
        fieldOptions: [
            "vendor_id",
            "vendor_product_name",
            "languages",
            "vendor_type",
            "ori_product_id",
            "icon",
            "icon_url",
            "ori_vendor_extend",
            "orientation",
            "currency_type",
            "status",
            "open_mode",
        ],
    };

    exportData = {
        fieldOrder: <any>[],
        isExportExcel: false,
        list: <any>[],
        isQueryExportData: false,
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 1000 },
    };

    /**产品厂商 copy */
    vendorIdOptions = <any>{};

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.getVendorId();
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
        data.ori_vendor_extend = jsonToObject(data.ori_vendor_extend);
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            vendor_id: "",
            vendor_type: "",
            vendor_product_name: "",
            ori_product_id: "",
            status: "",
            page_count: 1,
            page_size: 20,
            currency_type: "",
            languages: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_vendor_product_show, { vendor_product_id: data.vendor_product_id });
            this.getVendorTypes();
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
            vendor_id: "",
            vendor_product_id: "",
            vendor_type: "",
            vendor_product_name: "",
            ori_product_id: "",
            icon: "",
            status: 1,
            ori_vendor_extend: {},
            languages: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_vendor_product_index, objectRemoveNull(this.listQuery));
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = pageCurrent + 1;
        this.facade.sendNotification(HttpType.admin_vendor_product_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData();
        }
    }

    /**添加数据 */
    onAdd() {
        const {
            vendor_id,
            vendor_product_id,
            vendor_type,
            vendor_product_name,
            ori_product_id,
            icon,
            status,
            ori_vendor_extend,
            languages,
        } = this.dialogData.form;
        const formCopy: any = {
            vendor_id,
            vendor_product_id,
            vendor_type,
            vendor_product_name,
            ori_product_id,
            icon,
            status,
            ori_vendor_extend,
            languages,
        };
        try {
            let extendsStr: any = "{}";
            if (Object.keys(formCopy.ori_vendor_extend).length > 0) {
                extendsStr = JSON.stringify(JSON.parse(formCopy.ori_vendor_extend));
            }
            formCopy.ori_vendor_extend = extendsStr;
            this.sendNotification(HttpType.admin_vendor_product_store, objectRemoveNull(formCopy));
        } catch (error) {
            Message.warning(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy = JSON.parse(JSON.stringify(this.dialogData.form));
        try {
            formCopy.ori_vendor_extend = JSON.parse(formCopy.ori_vendor_extend);
            const temp: any = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return;
            }
            // 添加必填参数
            temp.vendor_product_id = this.dialogData.form.vendor_product_id;
            // 发送消息
            this.sendNotification(HttpType.admin_vendor_product_update, temp);
        } catch (error) {
            Message.warning(<string>LangUtil("json格式不正确"));
        }
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_vendor_product_update, { vendor_product_id: id, is_delete: 1 });
            })
            .catch(() => { });
    }

    /**更改方向数据 */
    onUpdateOrientation(data: any) {
        this.sendNotification(HttpType.admin_vendor_product_update, {
            vendor_product_id: data.vendor_product_id,
            orientation: data.orientation,
        });
    }
    /**厂商类型 */
    vendorTypesOptions: { [key: string]: string } = {};
    /**取得厂商类型 */
    getVendorTypes() {
        this.sendNotification(HttpType.admin_vendor_show, { vendor_id: this.dialogData.form.vendor_id });
    }
    /**设置厂商类型数据 */
    setVendorTypes(ary: string[]) {
        for (var key in this.vendorTypesOptions) {
            delete this.vendorTypesOptions[key];
        }
        for (const type of ary) {
            this.vendorTypesOptions[type] = this.tableData.columns.vendor_type.options[type];
        }
        this.dialogData.update++;
    }

    /**依照货币类型 取vendor id */
    getVendorId() {
        this.sendNotification(HttpType.admin_vendor_index, {
            currency_type: this.listQuery.currency_type,
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

    /**语言包导入翻译 */
    languageImport(sentences: any): void {
        //@ts-ignore
        const data: any = sentences.map(item => ({ ...item, languages: item.languages?.split(",") }));
        const newData = JSON.stringify(data);
        this.sendNotification(HttpType.admin_vendor_product_import, { sentences: newData });
    }
    /**取得excel 挡案名称 */
    getExcelOutputName() {
        return LangUtil("厂商产品管理");
    }

    /**取得所有资料 */
    onQueryExportData() {
        this.exportData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        const { pageSize, pageCurrent } = this.exportData.pageInfo;
        queryCopy.page_size = pageSize;
        queryCopy.page_count = Number(pageCurrent) + 1;
        queryCopy.plat_id = queryCopy.plat_id === "0" ? "" : queryCopy.plat_id;
        this.sendNotification(HttpType.admin_vendor_product_index, objectRemoveNull(queryCopy));
    }

    /**每1000笔保存一次 */
    onSaveExportData(data: any) {
        const { list, pageInfo } = data;
        this.exportData.list.push(...list);
        Object.assign(this.exportData.pageInfo, pageInfo);
        const { pageCount, pageCurrent } = pageInfo;
        if (pageCurrent < pageCount) {
            this.onQueryExportData();
        } else {
            this.exportExcel();
            this.resetExportData(500);
        }
    }

    /**导出excel */
    exportExcel() {
        const newData = JSON.parse(JSON.stringify(this.exportData.list));
        const exportField: string[] = [];
        for (const item of this.fieldSelectionData.fieldOptions) {
            if (this.exportData.fieldOrder.indexOf(item) != -1) {
                exportField.push(item);
            }
        }
        let exportData = this.dataMatching(exportField, newData);
        exportJson2Excel(exportField, exportData, this.getExcelOutputName(), undefined, undefined);
    }

    resetExportData(timeout: any) {
        setTimeout(() => {
            this.exportData.isExportExcel = false;
            this.exportData.list = [];
            Object.assign(this.exportData.pageInfo, {
                pageCurrent: 0,
            });
        }, timeout);
    }

    /** 批次進度 */
    get percentage() {
        return Math.round((this.exportData.pageInfo.pageCurrent / this.exportData.pageInfo.pageCount) * 100);
    }

    showFieldSelectionDialog() {
        this.fieldSelectionData.bShow = true;
        this.exportData.fieldOrder = [...this.fieldSelectionData.fieldOptions];
    }

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any) {
        return listData.map((data: any) =>
            filterKeys.map((key: string) => {
                return data[key];
            })
        );
    }
}
