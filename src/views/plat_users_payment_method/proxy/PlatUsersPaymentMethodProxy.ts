import AbstractProxy from "@/core/abstract/AbstractProxy";
import { objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_users_payment_method/setting";
import GlobalEventType from "@/core/global/GlobalEventType";
import IPlatUsersPaymentMethodProxy from "./IPlatUsersPaymentMethodProxy";
import { MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
export default class PlatUsersPaymentMethodProxy extends AbstractProxy implements IPlatUsersPaymentMethodProxy {
    static NAME = "PlatUsersPaymentMethodProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_users_payment_method_table_columns);
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
            data_belong: { name: "数据归属标记", options: {} },
            id: { name: "主键", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            payment_method: { name: "收款方式详情", options: <any>{} },
            plat_id: { name: "平台ID", options: {} },
            status: { name: "使用状态", options: {} },
            type: { name: "收款方式类型", options: {} },
            updated_at: { name: "更新时间", options: {} },
            user_id: { name: "用户ID", options: {} },
            username: { name: "用户账号", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        nick_name: "",
        payment_method: "",
        plat_id: "",
        type: "",
        user_id: "",
        username: "",
    };

    /**用户详情 ID */
    userDetailId = 0;

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            nick_name: null,
            payment_method: null,
            type: null,
            user_id: null,
            username: null,
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_users_payment_method_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    onShowUserDetail() {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, this.userDetailId);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该收款方式"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_plat_users_payment_method_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }
}
