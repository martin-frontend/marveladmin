import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_marquee/setting";
import { MessageBox } from "element-ui";
import IPlatMarqueeProxy, { StatusType, TimeType } from "./IPlatMarqueeProxy";
import i18n from "@/lang";
export default class PlatMarqueeProxy extends AbstractProxy implements IPlatMarqueeProxy {
    static NAME = "PlatMarqueeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plats_marquee_table_columns);
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
            plat_id: { name: "", options: {} },
            id: { name: "", options: {} },
            app_types: { name: "", options: {} },
            type: { name: "", options: {} },
            start_time: { name: "", options: {} },
            content: { name: "", options: {} },
            status: { name: "", options: {} },
            platAll: { name: "", options: <any>{} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        app_types: "",
        status: "",
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            plat_id: "",
            type: TimeType.Now,
            start_time: "",
            app_types: [],
            content: "",
            status: StatusType.disactivated,
        },
        formSource: null, // 表单的原始数据
        contetnMaxLength: 100, // 内容长度限制
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.tableData.columns.platAll = JSON.parse(JSON.stringify(this.tableData.columns.plat_id));
        this.tableData.columns.platAll.options["0"] = <string>LangUtil("全部平台");
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
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
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            plat_id: "",
            app_types: "",
            status: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plats_marquee_show, { id: data.id });
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
            id: "",
            plat_id: "",
            type: TimeType.Now,
            start_time: "",
            app_types: [],
            content: "",
            status: StatusType.disactivated,
        });
    }

    /**查询 */
    onQuery() {
        const queryCopy = JSON.parse(JSON.stringify(this.listQuery));
        if (queryCopy.plat_id == "0") {
            queryCopy.plat_id = "";
        }
        this.sendNotification(HttpType.admin_plats_marquee_index, objectRemoveNull(queryCopy));
    }
    /**添加数据 */
    onAdd() {
        const { id, plat_id, type, start_time, app_types, content, status } = this.dialogData.form;
        const formCopy: any = {
            id,
            plat_id,
            type,
            start_time,
            app_types,
            content,
            status,
        };
        formCopy.app_types = JSON.stringify(formCopy.app_types);
        this.sendNotification(HttpType.admin_plats_marquee_store, objectRemoveNull(formCopy));
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
        this.sendNotification(HttpType.admin_plats_marquee_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plats_marquee_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
