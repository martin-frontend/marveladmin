import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plats_notice/setting";
import { MessageBox } from "element-ui";
import IPlatsNoticeProxy from "./IPlatsNoticeProxy";
import i18n from "@/lang";
export default class PlatsNoticeProxy extends AbstractProxy implements IPlatsNoticeProxy {
    static NAME = "PlatsNoticeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_notice_table_columns);
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
            app_platform: { name: "应用平台", options: {} },
            content: { name: "公告内容", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            end_time: { name: "结束时间", options: {} },
            id: { name: "公告ID", options: {} },
            img_uris: { name: "公告图片", options: {} },
            index_no: { name: "排序序号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            languages: { name: "语言", options: {} },
            name: { name: "公告标题", options: {} },
            open_mode: { name: "打开模块", options: {} },
            open_mode_url: { name: "模块跳转网页", options: {} },
            plat_id: { name: "所属平台", options: {} },
            start_time: { name: "发布时间", options: {} },
            status: { name: "状态", options: {} },
            thumbnail_uris: { name: "公告缩略图", options: {} },
            type: { name: "类型", options: {} },
            type_position: { name: "位置类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            video_uris: { name: "视频播放URL地址", options: {} },
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

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            id: null,
            // TODO
            plat_id: "",
            app_platform: <any>[],
            name: "",
            start_time: "",
            end_time: "",
            type: 1,
            content: "",
            img_urls: "",
            img_uris: "",
            open_mode: "1",
            open_mode_url: "",
            thumbnail_uris: "",
            thumbnail_urls: "",
            languages: [],
            type_position: "",
            video_uris: "",
        },
        formSource: null, // 表单的原始数据
    };

    /**图片预览 相关数据 */
    previewImageDialogData = {
        bShow: false,
        url: "",
    };

    /**表单操作 数据 */
    tableCtrlData = {
        id: null,
        opt: null,
        status: null,
    };

    /**应用平台 类型 */
    appType = "2";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns.plat_id.options);
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
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        this.dialogData.form.plat_id = this.dialogData.form.plat_id.toString();
        this.dialogData.form.open_mode = this.dialogData.form.open_mode.toString();
        this.appType = data.app_platform[0].toString();
        this.dialogData.form.video_uris = this.dialogData.form.video_uris[this.appType];
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.sendNotification(HttpType.admin_plats_notice_show, { id: data.id });
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
            // TODO
            id: null,
            // TODO
            plat_id: "",
            app_platform: <any>[],
            name: "",
            start_time: "",
            end_time: "",
            type: 1,
            content: "",
            img_urls: "",
            img_uris: "",
            open_mode: "1",
            open_mode_url: "",
            thumbnail_uris: "",
            thumbnail_urls: "",
            language: null,
            type_position: "",
            languages: [],
            video_uris: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plats_notice_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        let {
            plat_id,
            app_platform,
            name,
            start_time,
            end_time,
            type,
            content,
            img_urls,
            img_uris,
            open_mode,
            open_mode_url,
            thumbnail_uris,
            thumbnail_urls,
            languages,
            type_position,
            video_uris,
        } = this.dialogData.form;
        app_platform = JSON.stringify(app_platform);
        img_uris = JSON.stringify(img_uris);
        img_urls = JSON.stringify(img_urls);
        thumbnail_uris = JSON.stringify(thumbnail_uris);
        thumbnail_urls = JSON.stringify(thumbnail_urls);
        video_uris = JSON.stringify({ [this.appType]: video_uris });
        if (type == 1) {
            img_uris = "";
            img_urls = "";
            thumbnail_uris = "";
            thumbnail_urls = "";
            video_uris = "";
        }
        if (type == 2) {
            content = "";
            video_uris = "";
        }
        if (type == 3) {
            content = "";
            img_uris = "";
            img_urls = "";
            thumbnail_uris = "";
            thumbnail_urls = "";
        }
        const formCopy: any = {
            // TODO
            plat_id,
            app_platform,
            name,
            start_time,
            end_time,
            type,
            content,
            img_urls,
            img_uris,
            open_mode,
            open_mode_url,
            thumbnail_uris,
            thumbnail_urls,
            languages: jsonStringify(languages),
            type_position,
            video_uris,
        };

        this.sendNotification(HttpType.admin_plats_notice_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate(fromTable = false) {
        let formCopy: any = null;
        if (fromTable) {
            formCopy = objectRemoveNull(this.tableCtrlData);
            console.log(formCopy);
        } else {
            const { type } = this.dialogData.form;
            // 删除多余无法去除的参数
            formCopy = formCompared(this.dialogData.form, this.dialogData.formSource);

            // 如果没有修改，就直接关闭弹窗
            if (Object.keys(formCopy).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }
            // 添加必填参数
            if (formCopy.start_time) {
                formCopy.end_time = this.dialogData.form.end_time;
            }
            if (formCopy.end_time) {
                formCopy.start_time = this.dialogData.form.start_time;
            }

            if (type == 1) {
                formCopy.img_uris = "";
                formCopy.img_urls = "";
                formCopy.thumbnail_uris = "";
                formCopy.thumbnail_urls = "";
                formCopy.video_uris = "";
            }
            if (type == 2) {
                formCopy.content = "";
                formCopy.video_uris = "";
            }
            if (type == 3) {
                formCopy.content = "";
                formCopy.img_uris = "";
                formCopy.img_urls = "";
                formCopy.thumbnail_uris = "";
                formCopy.thumbnail_urls = "";
                formCopy.video_uris = JSON.stringify({ [this.appType]: formCopy.video_uris });
            }

            formCopy.id = this.dialogData.form.id;
        }

        this.sendNotification(HttpType.admin_plats_notice_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plats_notice_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }

    onRemoveItem() {
        MessageBox.confirm(<string>LangUtil("确定撤销此公告?"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.tableCtrlData.opt = null;
                this.onUpdate(true);
            })
            .catch(() => { });
    }

    /**图片上传 */
    private isMin = false;
    onUploadImage(data: any, isMin: boolean = false) {
        this.isMin = isMin;
        this.sendNotification(HttpType.admin_resource_upload, data);
    }

    /**图片上传 回传url*/
    setImageUrl(body: any) {
        if (!this.isMin) {
            this.dialogData.form.img_uris = this.dialogData.form.img_uris || {};
            this.dialogData.form.img_urls = this.dialogData.form.img_urls || {};
            this.dialogData.form.img_uris[this.appType] = body.uri;
            this.dialogData.form.img_urls[this.appType] = body.url;
        } else {
            this.dialogData.form.thumbnail_uris = this.dialogData.form.thumbnail_uris || {};
            this.dialogData.form.thumbnail_urls = this.dialogData.form.thumbnail_urls || {};
            this.dialogData.form.thumbnail_uris[this.appType] = body.uri;
            this.dialogData.form.thumbnail_urls[this.appType] = body.url;
        }
    }
}
