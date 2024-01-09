import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_directly_commission_model/setting";
import { MessageBox } from "element-ui";
import IPlatDirectlyCommissionModelProxy from "./IPlatDirectlyCommissionModelProxy";
import LangUtil from "@/core/global/LangUtil";

export default class PlatDirectlyCommissionModelProxy extends AbstractProxy implements IPlatDirectlyCommissionModelProxy {
    static NAME = "PlatDirectlyCommissionModelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_directly_commission_model_table_columns);
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
        columns: <any>{
            commission_config: { name: '推广配置', options: {}, options_key: {} },
            commission_model_id: { name: '直属分红模版ID', options: {} },
            created_at: { name: '创建时间', options: {} },
            created_by: { name: '创建人', options: {} },
            desc: { name: '模版描述', options: {} },
            is_delete: { name: '是否删除', options: {} },
            name: { name: '模版名称', options: {} },
            settlement_period: { name: '结算周期', options: {} },
            settlement_type: { name: '结算方式', options: {} },
            updated_at: { name: '修改时间', options: {} },
            updated_by: { name: '修改人', options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            commission_model_id: "",
            name: "",
            desc: "",
            settlement_type: "",
            settlement_period: "",
            commission_config: [
                {
                    name: "", // 等级描述名称
                    loss_amount: 0, // 直属亏损金额
                    loss_bonus_ratio: 0, // 直属亏损分红百分比
                },
            ],
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
            // TODO
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.sendNotification(HttpType.admin_plat_directly_commission_model_show, { commission_model_id: data.commission_model_id });
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
            commission_model_id: "",
            name: "",
            desc: "",
            settlement_type: "",
            settlement_period: "",
            commission_config: [
                {
                    name: "", // 等级描述名称
                    loss_amount: 0, // 直属亏损金额
                    loss_bonus_ratio: 0, // 直属亏损分红百分比
                },
            ],
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_directly_commission_model_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const { name, desc, settlement_type, settlement_period, commission_config } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            settlement_type,
            settlement_period,
            commission_config,
        };
        formCopy.commission_config = JSON.stringify(formCopy.commission_config);
        this.sendNotification(HttpType.admin_plat_directly_commission_model_store, objectRemoveNull(formCopy));
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
        const { name, desc, settlement_type, settlement_period, commission_config } = this.dialogData.form;
        const formCopy: any = {
            name,
            desc,
            settlement_type,
            settlement_period,
            commission_config,
        };
        formCopy.commission_model_id = this.dialogData.form.commission_model_id;
        formCopy.commission_config = JSON.stringify(formCopy.commission_config);
        // 发送消息
        this.sendNotification(HttpType.admin_plat_directly_commission_model_update, formCopy);
    }

    /**删除数据 */
    onDelete(commission_model_id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_directly_commission_model_update, { commission_model_id, is_delete: 1 });
            })
            .catch(() => { });
    }
}
