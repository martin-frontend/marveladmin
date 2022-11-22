import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_activity_rule/setting";
import { MessageBox } from "element-ui";
import IPlatActivityRuleProxy from "./IPlatActivityRuleProxy";
import i18n from "@/lang";
export default class PlatActivityRuleProxy extends AbstractProxy implements IPlatActivityRuleProxy {
    static NAME = "PlatActivityRuleProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_activity_rule_table_columns);
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
            id: { name: "" },
            name: { name: "" },
            type: { name: "", options: {} },
            settlement_types: { name: "", options: {} },
            class: { name: "" },
            params_name: { name: "" },
            params_type: { name: "", options: {} },
            desc: { name: "" },
            weight: { name: "" },
            created_by: { name: "" },
            created_at: { name: "" },
            updated_by: { name: "" },
            updated_at: { name: "" },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        id: "",
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
            id: "",
            name: "",
            desc: "",
            type: "",
            settlement_types: [],
            class: "",
            params_name: "",
            params_type: "",
            weight: "",
            created_by: "",
            created_at: "",
            updated_by: "",
            updated_at: "",
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
            id: "",
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
            this.sendNotification(HttpType.admin_plat_activity_rule_show, { id: data.id });
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
            name: "",
            desc: "",
            type: "",
            settlement_types: [],
            class: "",
            params_name: "",
            params_type: "",
            weight: "",
            created_by: "",
            created_at: "",
            updated_by: "",
            updated_at: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_activity_rule_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { name, desc, type, settlement_types, params_name, params_type, weight } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            type,
            settlement_types,
            params_name,
            params_type,
            weight,
        };

        formCopy.settlement_types = JSON.stringify(settlement_types);
        formCopy.class = this.dialogData.form.class;
        this.sendNotification(HttpType.admin_plat_activity_rule_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        // const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        // if (Object.keys(formCopy).length == 0) {
        //     this.dialogData.bShow = false;
        //     return;
        // }
        // 添加必填参数
        // formCopy.id = this.dialogData.form.id;
        const formCopy: any = {};
        Object.assign(formCopy, this.dialogData.form, {
            settlement_types: JSON.stringify(this.dialogData.form.settlement_types),
        });
        // 发送消息
        this.sendNotification(HttpType.admin_plat_activity_rule_update, objectRemoveNull(formCopy));
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const formCopy: any = {};
                Object.assign(formCopy, this.dialogData.form, {
                    settlement_types: JSON.stringify(this.dialogData.form.settlement_types),
                });
                formCopy.is_delete = 1;
                this.sendNotification(HttpType.admin_plat_activity_rule_update, formCopy);
            })
            .catch(() => {});
    }
}
