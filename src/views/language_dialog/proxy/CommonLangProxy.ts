import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { FormItem, MessageBox } from "element-ui";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import { exportJson2Excel } from "@/core/global/Excel";
import i18n from "@/lang";
import { HttpType } from "../setting";
import ICommonLangProxy from "./ICommonLangProxy";
import GlobalVar from "@/core/global/GlobalVar";

export default class CommonLangProxy extends AbstractProxy implements ICommonLangProxy {
    static NAME = "CommonLangProxy";

    //要翻译的原始文字
    private sentence = "";
    //管理类型，options: {1: '前端WEB皮肤1语言', 2: '后端管理语言', 3: '服务器数据语言', 4: '厂商游戏', 5: '平台公告', 6: '常见问题', 7: '平台邮件', 8: '平台活动'}
    private type = "";

    /**进入页面时调用 */
    enter() {
        if (this.dialogData.bShow) {
            this.sendNotification(HttpType.admin_plat_lang_table_columns);
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
            hi_IN: { name: "", options: {} },
            de_DE: { name: "", options: {} },
            fr_FR: { name: "", options: {} },
            tr_TR: { name: 'Türk dili', options: {} },
        },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.dialogData.form.key = this.sentence;
        this.dialogData.form.type = this.type;
        if (this.tableData.columns.language.options) {
            for (let key in this.tableData.columns.language.options) {
                this.dialogData.form[key] = this.sentence;
            }
        }
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

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
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
            },
        },
        formSource: null, // 表单的原始数据
    };

    /**显示弹窗 */
    showDialog(data?: any) {
        //清除数据
        this.resetDialogForm();
        this.dialogData.formSource = null;

        this.sentence = data.sentence;
        this.type = data.type;
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
            },
        });
        this.dialogData.status = DialogStatus.create;
    }

    /**添加平台的数据 */
    onAdd() {
        let formCopy: any = Object.assign({}, this.dialogData.form);
        formCopy.config = JSON.stringify(formCopy.config);
        try {
            if (formCopy.plat_id) {
                this.sendNotification(HttpType.admin_plat_lang_store, objectRemoveNull(formCopy));
            } else {
                this.sendNotification(HttpType.admin_system_lang_store, objectRemoveNull(formCopy));
            }
        } catch (error) {
            MessageBox.alert(<string>LangUtil("json格式不正确"));
        }
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        formCopy.config = JSON.stringify(formCopy.config);
        try {
            if (formCopy.plat_id) {
                console.log("admin_plat_lang_update========", formCopy);
                this.sendNotification(HttpType.admin_plat_lang_update, formCopy);
            } else {
                console.log("admin_system_lang_update========", formCopy);

                this.sendNotification(HttpType.admin_system_lang_update, formCopy);
            }
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
        const copyData = JSON.parse(JSON.stringify(data));
        if (data.config) {
            Object.keys(this.dialogData.form.config).forEach(key => {
                this.dialogData.form.config[key] = copyData.config[key] ?? [];
            });
            delete copyData.config;
        }
        Object.assign(this.dialogData.form, copyData);
    }

    /**
     * 根据key查询数据库是否有该key的翻译
     * @param data
     * plat_id , type, key
     */
    translateLangCheck(): void {
        const data: any = {};
        data.plat_id = this.dialogData.form.plat_id;
        data.type = this.dialogData.form.type;
        data.key = this.dialogData.form.key;
        this.sendNotification(HttpType.admin_system_lang_check, data);
    }
}
