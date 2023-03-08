import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { FormItem, MessageBox } from "element-ui";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import { exportJson2Excel } from "@/core/global/Excel";
import i18n from "@/lang";
import { HttpType } from "../setting";
import ICommonLangImgProxy from "./ICommonLangImgProxy";
import GlobalVar from "@/core/global/GlobalVar";
import Http from "@/core/net/Http";

export default class CommonLangImgProxy extends AbstractProxy implements ICommonLangImgProxy {
    static NAME = "CommonLangImgProxy";

    private source: string = "";

    /**进入页面时调用 */
    enter() {
        if (this.dialogData.bShow) {
            this.sendNotification(HttpType.admin_system_lang_image_table_columns);
        }
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
        },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        if (this.dialogData.bShow) {
            this.translateLangCheck();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        let newTableData = this.tableData.list.map(({ language, ...data }) => ({
            ...data,
            // language: jsonToObject(language)
        }));
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.list, newTableData);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        // data.language = jsonToObject(data.language);
        Object.assign(this.dialogData.form, data);
    }

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            module: "",
            type: "",
            plat_id: "",
            key: "",
            ar_AR: { uris: "", urls: "" },
            en_EN: { uris: "", urls: "" },
            jp_JP: { uris: "", urls: "" },
            ko_Kr: { uris: "", urls: "" },
            th_TH: { uris: "", urls: "" },
            vi_VN: { uris: "", urls: "" },
            zh_CN: { uris: "", urls: "" },
            zh_TW: { uris: "", urls: "" },
            es_ES: { uris: "", urls: "" },
            pt_PT: { uris: "", urls: "" },
        },
        formSource: null, // 表单的原始数据
    };

    /**显示弹窗 */
    showDialog(data?: any) {
        //清除数据
        this.resetDialogForm();
        this.dialogData.formSource = null;
        this.dialogData.form.key = data.key;
        this.dialogData.form.plat_id = data.plat_id != undefined ? data.plat_id : 0;
        this.dialogData.bShow = true;
        this.enter();
    }
    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            id: "",
            // language: {},
            module: "",
            type: 1,
            plat_id: "",
            key: "",
            ar_AR: { uris: "", urls: "" },
            en_EN: { uris: "", urls: "" },
            jp_JP: { uris: "", urls: "" },
            ko_Kr: { uris: "", urls: "" },
            th_TH: { uris: "", urls: "" },
            vi_VN: { uris: "", urls: "" },
            zh_CN: { uris: "", urls: "" },
            zh_TW: { uris: "", urls: "" },
            es_ES: { uris: "", urls: "" },
            pt_PT: { uris: "", urls: "" },
        });
        this.dialogData.status = DialogStatus.create;
        this.source = "";
    }

    /**添加平台的数据 */
    onAdd() {
        let formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            let data: any = {};
            for (var key in this.tableData.columns.language.options) {
                if (formCopy[key].uris && formCopy[key].urls) {
                    formCopy[key] = JSON.stringify(formCopy[key]);
                } else {
                    formCopy[key].uris = "";
                    formCopy[key].urls = "";
                    formCopy[key] = JSON.stringify(formCopy[key]);
                }
            }
            this.sendNotification(HttpType.admin_system_lang_image_store, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        try {
            for (var key in this.tableData.columns.language.options) {
                if (formCopy[key].uris && formCopy[key].urls) {
                    formCopy[key] = JSON.stringify(formCopy[key]);
                } else {
                    formCopy[key].uris = "";
                    formCopy[key].urls = "";
                    formCopy[key] = JSON.stringify(formCopy[key]);
                }
            }

            this.sendNotification(HttpType.admin_system_lang_image_update, objectRemoveNull(formCopy));
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
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
        this.dialogData.status = DialogStatus.create;
        if (data.id != undefined) {
            this.dialogData.status = DialogStatus.update;
        }
        Object.assign(this.dialogData.form, data);
    }

    /**
     * 根据key查询数据库是否有该key的图片
     * @param data
     * plat_id , type, key
     */
    translateLangCheck(): void {
        const data: any = {};
        data.plat_id = this.dialogData.form.plat_id;
        data.key = this.dialogData.form.key;
        this.sendNotification(HttpType.admin_system_lang_image_show_key, data);
    }

    /**图片上传 */
    private isMin = false;
    onUploadImage(data: any, isMin: boolean = false) {
        this.source = data.source;
        this.sendNotification(HttpType.admin_resource_lang_upload, data);
    }

    /**图片上传 回传url，更新form数据*/
    setImageUrl(body: any) {
        //@ts-ignore
        this.dialogData.form[this.source].uris = body.uri;
        //@ts-ignore
        this.dialogData.form[this.source].urls = body.url;
    }
}
