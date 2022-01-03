import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/system_resource/setting";
import { MessageBox } from "element-ui";
import ISystemResourceProxy, { BatchStatus } from "./ISystemResourceProxy";
import i18n from "@/lang";

export default class SystemResourceProxy extends AbstractProxy implements ISystemResourceProxy {
    static NAME = "SystemResourceProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_system_resource_table_columns);
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
            id: { name: "", options: {} },
            name: { name: "", options: {} },
            type: { name: "", options: {} },
            size: { name: "", options: {} },
            url: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        selectItems: <any>[], // 所选之图片
    };
    /**查询条件 */
    listQuery = {
        name: "",
        type: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
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
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            name: "",
            type: "",
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
            type: "",
        });
        Object.assign(this.imgBatchDialogData, {
            bShow: false,
            status: "",
            curFileList: <any>[],
            fileList: <any>[], // 欲上傳之圖片
            fileTotalCount: 0,
            deleteItems: <any>[], //欲刪除之圖片
            deleteTotalCount: 0,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_system_resource_index, objectRemoveNull(this.listQuery));
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_system_resource_update, { id: id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**图片批次处理弹窗相关数据 */
    imgBatchDialogData = {
        bShow: false,
        status: "",
        curFileList: <any>[],
        fileList: <any>[], // 欲上傳之圖片
        fileTotalCount: 0,
        deleteItems: <any>[], //欲刪除之圖片
        deleteTotalCount: 0,
    };
    /**显示批次处理弹窗 */
    showBatchDialog(status: string) {
        this.imgBatchDialogData.status = status;
        this.imgBatchDialogData.bShow = true;
        if (status == BatchStatus.Upload) {
            this.hideDialog();
            this.imgBatchDialogData.curFileList = this.imgBatchDialogData.fileList;
            this.imgBatchDialogData.fileTotalCount = this.imgBatchDialogData.fileList.length;
            this.onBatchUpload();
        } else {
            this.imgBatchDialogData.curFileList = this.imgBatchDialogData.deleteItems;
            this.imgBatchDialogData.fileTotalCount = this.imgBatchDialogData.deleteItems.length;
            this.onBatchDelete();
        }
    }
    /**隐藏批次处理弹窗 */
    hideBatchDialog() {
        this.resetDialogForm();
    }
    /**批次上傳 */
    onBatchUpload() {
        const item = this.imgBatchDialogData.fileList.shift();
        this.sendNotification(HttpType.admin_system_resource_store, {
            file: item.raw,
        });
    }
    /**批次删除 */
    onBatchDelete() {
        const item = this.imgBatchDialogData.deleteItems.shift();
        this.sendNotification(HttpType.admin_system_resource_update, { id: item.id, is_delete: 1 });
    }
    /** 上传图片变动 */
    fileChange(fileList: Object[]) {
        this.imgBatchDialogData.fileList = fileList;
    }
    /** 批次進度 */
    get percentage() {
        return Math.round(
            (1 - this.imgBatchDialogData.curFileList.length / this.imgBatchDialogData.fileTotalCount) * 100
        );
    }
}
