import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/game_domain/setting";
import { MessageBox } from "element-ui";
import IGameDomainProxy from "./IGameDomainProxy";
import i18n from "@/lang";
export default class GameDomainProxy extends AbstractProxy implements IGameDomainProxy {
    static NAME = "GameDomainProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_game_domain_table_columns);
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
            // TODO
            api_domain: { name: "API地址", options: {} },
            cdn_domain: { name: "CDN地址", options: {} },
            channel_id: { name: "所属渠道", options: {} },
            created_at: { name: "创建人", options: {} },
            created_by: { name: "创建时间", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            domain: { name: "域名地址", options: {} },
            id: { name: "主键", options: {} },
            md5_tag: { name: "cdn文件标识", options: {} },
            plat_id: { name: "平台ID", options: {} },
            remark: { name: "备注", options: {} },
            updated_at: { name: "修改人", options: {} },
            updated_by: { name: "修改时间", options: {} },
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
        form: {
            id: null,
            // TODO
            plat_id: "",
            channel_id: "",
            domain: "",
            api_domain: "",
            cdn_domain: "",
            remark: "",
        },
        formSource: null, // 表单的原始数据
    };

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
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.plat_id = String(this.dialogData.form.plat_id);
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
            plat_id: "",
            channel_id: "",
            domain: "",
            api_domain: "",
            cdn_domain: "",
            remark: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_game_domain_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { plat_id, channel_id, domain, api_domain, cdn_domain, remark } = this.dialogData.form;
        const formCopy: any = {
            // TODO
            plat_id,
            channel_id,
            domain,
            api_domain,
            cdn_domain,
            remark,
        };
        this.sendNotification(HttpType.admin_game_domain_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);

        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return false;
        }
        // 添加必填参数
        formCopy.id = this.dialogData.form.id;
        // 发送消息
        this.sendNotification(HttpType.admin_game_domain_update, formCopy);
    }

    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>i18n.t("common.deleteConfirmStr"), <string>i18n.t("common.prompt"), {
            confirmButtonText: <string>i18n.t("common.determine"),
            cancelButtonText: <string>i18n.t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_game_domain_update, { id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
