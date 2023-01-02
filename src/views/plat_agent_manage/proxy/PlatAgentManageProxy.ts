import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import { HttpType } from "@/views/plat_agent_manage/setting";
import { MessageBox } from "element-ui";
import IPlatAgentManageProxy from "./IPlatAgentManageProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class PlatAgentManageProxy extends AbstractProxy implements IPlatAgentManageProxy {
    static NAME = "PlatAgentManageProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_manage_table_columns);
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
            agent_real_name: { name: "员工名称", options: <any>[], option_key: {} },
            channel_id: { name: "渠道ID", options: [] },
            created_at: { name: "创建时间", options: [] },
            created_by: { name: "创建人", options: [] },
            customer_created_at: { name: "客户注册日期", options: [] },
            customer_exchange_times: { name: "兑换笔数", options: [] },
            customer_find_at: { name: "员工找到客户日期", options: [] },
            customer_recharge_times: { name: "充值笔数", options: [] },
            customer_remark: { name: "客户备注", options: [] },
            customer_user_id: { name: "客户游戏ID", options: [] },
            customer_user_source: { name: "客户来源", options: <any>[] },
            data_belong: { name: "数据归属标记", options: [] },
            is_delete: { name: "是否删除", options: [] },
            plat_id: { name: "平台ID", options: [] },
            remark: { name: "员工备注", options: [] },
            updated_at: { name: "修改时间", options: [] },
            updated_by: { name: "更新人", options: [] },
            user_id: { name: "员工游戏ID", options: <any>[] },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        agent_real_name: "",
        user_id: "",
        customer_user_id: "",
        customer_user_source: "",
        customer_recharge_times: "",
        "customer_recharge_times-{<=}": "",
        "customer_recharge_times-{>=}": "",
        "customer_created_at-{<=}": "",
        "customer_created_at-{>=}": "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            user_id: "",
            agent_real_name: "",
            remark: "",
            customer_user_id: "",
            customer_user_source: "",
            customer_find_at: "",
            customer_recharge_times: "",
            customer_created_at: "",
            customer_remark: "",
            customer_invite_user_id: "",
        },
        formSource: <any>{}, // 表单的原始数据
        isCustomer: false,
        canChangeBind: false,
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
            page_count: 1,
            page_size: 20,
            agent_real_name: "",
            user_id: "",
            customer_user_id: "",
            customer_user_source: "",
            customer_recharge_times: "",
            "customer_recharge_times-{<=}": "",
            "customer_recharge_times-{>=}": "",
            "customer_created_at-{<=}": "",
            "customer_created_at-{>=}": "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            this.dialogData.canChangeBind = false;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
            this.dialogData.form.user_id = this.dialogData.form.user_id.toString();
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
            user_id: "",
            agent_real_name: "",
            remark: "",
            customer_user_id: "",
            customer_user_source: "",
            customer_find_at: "",
            customer_recharge_times: "",
            customer_created_at: "",
            customer_remark: "",
        });
    }

    /**查询 */
    onQuery() {
        let { user_id, agent_real_name, customer_user_source } = this.listQuery;
        user_id = this.tableData.columns.user_id.options[user_id];
        agent_real_name = this.tableData.columns.agent_real_name.options[agent_real_name];
        customer_user_source = this.tableData.columns.customer_user_source.options[customer_user_source];
        this.sendNotification(
            HttpType.admin_plat_agent_manage_index,
            objectRemoveNull({ ...this.listQuery, user_id, agent_real_name, customer_user_source })
        );
    }

    onGetTableColumns() {
        this.sendNotification(HttpType.admin_plat_agent_manage_table_columns);
    }

    /**添加数据 */
    onAdd() {
        const { user_id, agent_real_name, remark } = this.dialogData.form;
        const formCopy: any = {
            user_id,
            agent_real_name,
            remark,
        };
        this.sendNotification(HttpType.admin_plat_agent_manage_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        if (Object.keys(formCopy).length == 0) {
            this.dialogData.bShow = false;
            return;
        }
        const { user_id, customer_user_id, customer_invite_user_id } = this.dialogData.form;
        if (!this.dialogData.isCustomer) {
            this.sendNotification(HttpType.admin_plat_agent_manage_update, { ...formCopy, user_id });
        } else {
            if (formCopy.customer_invite_user_id && !this.dialogData.canChangeBind) {
                this.sendNotification(HttpType.admin_plat_agent_manage_change_bind, {
                    user_id: customer_user_id,
                    invite_user_id: customer_invite_user_id,
                });
                return;
            }
            this.sendNotification(HttpType.admin_plat_agent_manage_update_user, { ...formCopy, customer_user_id });
        }
    }

    /**删除数据 */
    onDelete(user_id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_agent_manage_delete, { user_id });
            })
            .catch(() => {});
    }

    // 打开用户详情页
    onShowDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
