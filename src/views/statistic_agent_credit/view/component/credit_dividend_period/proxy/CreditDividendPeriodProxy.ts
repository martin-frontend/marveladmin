import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_agent_credit/setting";
import { MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
import ICreditDividendPeriodProxy from "./ICreditDividendPeriodProxy";

export default class CreditDividendPeriodProxy extends AbstractProxy implements ICreditDividendPeriodProxy {
    static NAME = "CreditDividendPeriodProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_credit_dividend_period_table_columns);
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
            id: { name: "ID", options: [] },
            data_belong: { name: "数据归属标记", options: [] },
            date_number: { name: "期号", options: [] },
            plat_id: { name: "平台ID", options: [] },
            start_time: { name: "开始时间", options: [] },
            end_time: { name: "结束时间", options: [] },
            is_delete: { name: "是否删除", options: [] },
            created_at: { name: "创建时间", options: [] },
            updated_at: { name: "修改时间", options: [] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "start_time-{>=}": "",
        "end_time-{<=}": "",
        order_by: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            start_time: "",
            end_time: "",
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
            "start_time-{>=}": "",
            "end_time-{<=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_credit_dividend_period_show, { id: data.id });
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
            start_time: "",
            end_time: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_credit_dividend_period_index, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const { start_time, end_time, plat_id } = this.dialogData.form;
        const formCopy: any = {
            start_time,
            end_time,
            plat_id,
        };
        this.sendNotification(HttpType.admin_credit_dividend_period_store, objectRemoveNull(formCopy));
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
        formCopy.plat_id = this.dialogData.form.plat_id;
        formCopy.start_time = this.dialogData.form.start_time;
        formCopy.end_time = this.dialogData.form.end_time;
        // 发送消息
        this.sendNotification(HttpType.admin_credit_dividend_period_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        const { plat_id } = this.dialogData.form
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_credit_dividend_period_delete, { id, plat_id });
            })
            .catch(() => { });
    }
}
