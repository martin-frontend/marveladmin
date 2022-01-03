import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/system_lang/setting";
import { FormItem, MessageBox } from "element-ui";
import ISystemLangProxy from "./ISystemLangProxy";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import { exportJson2Excel } from "@/core/global/Excel";
import i18n from "@/lang";

export default class SystemLangProxy extends AbstractProxy implements ISystemLangProxy {
    static NAME = "SystemLangProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_system_lang_table_columns);
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
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            id: { name: "主键", options: {} },
            language: { name: "语言", options: {} },
            module: { name: "模组", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
        },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        module: "",
        type: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            language: "",
            module: "",
            type: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        let newTableData = this.tableData.list.map(({ language, ...data}) =>
        ({
            ...data,
            language: jsonToObject(language)
        }));
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.list, newTableData);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        data.language = jsonToObject(data.language);
        Object.assign(this.dialogData.form, data);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            module: "",
            type: "",
        });
        console.log(this.listQuery);
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            // this.dialogData.form.language = jsonToObject(data.language);
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
            id: null,
            language: {},
            module: "",
            type: 1,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_lang_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            let langStr: any = "{}";
            if (Object.keys(formCopy.language).length > 0) {
                langStr = JSON.stringify(JSON.parse(formCopy.language));
            }

            formCopy.language = langStr;
            this.sendNotification(HttpType.admin_system_lang_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string> i18n.t("common.jsonError"));
        }
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            const id = formCopy.id;
            formCopy.language = jsonStringify(formCopy.language);
            const temp = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }

            let langStr: any = "{}";
            if (temp.language) {
                if (Object.keys(temp.language).length > 0) {
                    langStr = JSON.stringify(JSON.parse(temp.language));
                }
                temp.language = langStr;
            }

            temp.id = id;
            this.sendNotification(HttpType.admin_system_lang_update, temp);
        } catch (error) {
            MessageBox.alert(<string> i18n.t("common.jsonError"));
        }
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string> i18n.t("common.deleteConfirmStr"), <string> i18n.t("common.prompt"), {
            confirmButtonText: <string> i18n.t("common.determine"),
            cancelButtonText: <string> i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_system_lang_delete, { id });
            })
            .catch(() => {});
    }

    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = {};
        queryCopy = JSON.parse(JSON.stringify(this.listQuery));

        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        this.facade.sendNotification(HttpType.admin_system_lang_index, objectRemoveNull(queryCopy));
    }

    /**导出资料合并 */
    dataMatching(filterKeys: any, listData: any) {
        return listData.map((data: any) =>
            filterKeys.map((key: string) => {
                return data[key];
            })
        );
    }

    exportExcel(data: any) {
        this.tableData.isExportExcel = false;
        const newData = JSON.parse(JSON.stringify(data.list));
        //language 转物件
        newData.forEach((item:any, index:any) => {
            item.language = JSON.parse(item.language);
        });
        console.log("newData", newData);
        let exportColumn = ["module"];
        // 要导出的栏位
        let langKeys = Object.keys(newData[0].language);
        exportColumn = exportColumn.concat(langKeys);
        let dataArray: any = [];

        newData.forEach((item:any, index:any) => {
            dataArray.push(({ langKeys } = item.language));
            dataArray[index]["module"] = item.module;
        });

        // 导出资料
        let exportData = this.dataMatching(exportColumn, dataArray);

        exportJson2Excel(exportColumn, exportData, "language", undefined, undefined);
    }
}
