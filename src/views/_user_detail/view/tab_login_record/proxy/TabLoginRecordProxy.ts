import AbstractProxy from "@/core/abstract/AbstractProxy";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabLoginRecordProxy from "./ITabLoginRecordProxy";

export default class TabLoginRecordProxy extends AbstractProxy implements ITabLoginRecordProxy {
    static NAME = "TabLoginRecordProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_login_record_table_columns);
    }

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 */
    tableData = {
        columns: {
            bet_id: { name: "默认主键编号", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            device: { name: "设备号", options: {} },
            login_ip: { name: "登陆时IP", options: {} },
            password: { name: "用户密码", options: {} },
            plat_id: { name: "平台ID", options: {} },
            user_id: { name: "平台用户ID", options: {} },
            username: { name: "用户名", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.onQuery();
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_login_record_index, { user_id: getPageSetting().user_id });
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
    }
}
