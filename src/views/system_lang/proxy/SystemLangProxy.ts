import LangUtil from "@/core/global/LangUtil";
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
            plat_id: { name: "平台ID", options: {} },
            key: { name: "键", options: {} },
            ar_AR: { name: "键", options: {} },
            en_EN: { name: "键", options: {} },
            jp_JP: { name: "", options: {} },
            ko_Kr: { name: "", options: {} },
            th_TH: { name: "", options: {} },
            vi_VN: { name: "", options: {} },
            zh_CN: { name: "", options: {} },
            zh_TW: { name: "", options: {} },
            es_ES: { name: "", options: {} },
            pt_PT: { name: "", options: {} },
            hi_IN: { name: "", options: {} },
            de_DE: { name: "", options: {} },
            fr_FR: { name: "", options: {} },
            tr_TR: { name: 'Türk dili', options: {} },
            ms_MS: { name: "", options: {} },
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
        type: "",
        key: "",
        zh_CN: "",
        vi_VN: "",
        en_EN: "",
        es_ES: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: "",
            language: "",
            module: "",
            type: "",
            plat_id: "",
            key: "",
            ar_AR: "",
            en_EN: "",
            jp_JP: "",
            ko_Kr: "",
            th_TH: "",
            vi_VN: "",
            zh_CN: "",
            zh_TW: "",
            es_ES: "",
            pt_PT: "",
            hi_IN: "",
            de_DE: "",
            fr_FR: "",
            tr_TR: "",
            ms_MS: "",
            config: <any>{
                ar_AR: [],
                en_EN: [],
                jp_JP: [],
                ko_Kr: [],
                th_TH: [],
                vi_VN: [],
                zh_CN: [],
                zh_TW: [],
                es_ES: [],
                pt_PT: [],
                hi_IN: [],
                de_DE: [],
                fr_FR: [],
                tr_TR: [],
                ms_MS: [],
            },
        },
        check: <any>{
            ar_AR: true,
            en_EN: true,
            jp_JP: true,
            ko_Kr: true,
            th_TH: true,
            vi_VN: true,
            zh_CN: true,
            zh_TW: true,
            es_ES: true,
            pt_PT: true,
            hi_IN: true,
            de_DE: true,
            fr_FR: true,
            tr_TR: true,
            ms_MS: true,
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
        let newTableData = this.tableData.list.map(({ language, ...data }) => ({
            ...data,
            language: jsonToObject(language),
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
            key: "",
            module: "",
            type: "",
            zh_CN: "",
            vi_VN: "",
            en_EN: "",
            es_ES: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        this.resetDialogForm();
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            const copyData = JSON.parse(JSON.stringify(data));
            Object.keys(this.dialogData.form.config).forEach(key => {
                this.dialogData.form.config[key] = copyData.config[key] ?? [];
            });
            delete copyData.config;
            Object.assign(this.dialogData.form, copyData);
        } else {
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
            id: "",
            language: {},
            module: "",
            type: 1,
            plat_id: "",
            key: "",
            ar_AR: "",
            en_EN: "",
            jp_JP: "",
            ko_Kr: "",
            th_TH: "",
            vi_VN: "",
            zh_CN: "",
            zh_TW: "",
            es_ES: "",
            pt_PT: "",
            hi_IN: "",
            de_DE: "",
            fr_FR: "",
            tr_TR: "",
            ms_MS: "",
            config: {
                ar_AR: [],
                en_EN: [],
                jp_JP: [],
                ko_Kr: [],
                th_TH: [],
                vi_VN: [],
                zh_CN: [],
                zh_TW: [],
                es_ES: [],
                pt_PT: [],
                hi_IN: [],
                de_DE: [],
                fr_FR: [],
                tr_TR: [],
                ms_MS: [],
            },
        });
        Object.assign(this.dialogData.check, {
            ar_AR: true,
            en_EN: true,
            jp_JP: true,
            ko_Kr: true,
            th_TH: true,
            vi_VN: true,
            zh_CN: true,
            zh_TW: true,
            es_ES: true,
            pt_PT: true,
            hi_IN: true,
            de_DE: true,
            fr_FR: true,
            tr_TR: true,
            ms_MS: true,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_lang_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let formCopy: any = Object.assign({}, this.dialogData.form);
        formCopy.config = JSON.stringify(formCopy.config);
        try {
            this.sendNotification(HttpType.admin_system_lang_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            const id = formCopy.id;
            const temp = formCompared(formCopy, this.dialogData.formSource);
            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(temp).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }

            temp.id = id;
            temp.type = formCopy.type;
            temp.key = formCopy.key;
            this.sendNotification(HttpType.admin_system_lang_update, temp);
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
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
                this.sendNotification(HttpType.admin_system_lang_delete, { id });
            })
            .catch(() => { });
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
        console.log("newData", newData);
        let exportColumn = [];
        // 要导出的栏位
        let langKeys = Object.keys(newData[0]);
        exportColumn = exportColumn.concat(langKeys);
        let dataArray: any = [];

        newData.forEach((item: any, index: any) => {
            dataArray.push(({ langKeys } = newData[index]));
        });

        // 导出资料
        let exportData = this.dataMatching(exportColumn, dataArray);

        exportJson2Excel(exportColumn, exportData, "language", undefined, undefined);
    }

    /**
     * 获取全部翻译
     * @param data
     * source	string	源语言: en_EN   sentence	string	要翻译的语句
     */
    translate(data: any): void {
        this.sendNotification(HttpType.admin_system_lang_translate, data);
    }

    /**获取全部翻译返回更新表单 */
    updateForm(data: any): void {
        for (const key in this.dialogData.check) {
            if (this.dialogData.check[key]) {
                this.dialogData.form[key] = data[key];
            }
        }
    }

    /**语言包导入翻译 */
    languageImport(sentences: any): void {
        const newData = JSON.stringify(sentences);
        this.sendNotification(HttpType.admin_system_lang_import, { sentences: newData });
    }

    generate(): void {
        this.sendNotification(HttpType.admin_system_lang_generate);
    }

    translateAllLang() {
        this.sendNotification(HttpType.admin_system_lang_translate_all_error_lang);
    }

    migrate(): void {
        this.sendNotification(HttpType.admin_system_lang_transfer, { type: this.listQuery.type });
    }
}
