import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_user_sms_code/setting";
import { MessageBox } from "element-ui";
import IPlatUserSmsCodeProxy from "./IPlatUserSmsCodeProxy";

export default class PlatUserSmsCodeProxy extends AbstractProxy implements IPlatUserSmsCodeProxy {
    static NAME = "PlatUserSmsCodeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_sms_code_table_columns);
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
            user_id: { name: "", options: {} },
            area_code: { name: "", options: {} },
            mobile: { name: "", options: {} },
            code: { name: "", options: {} },
            type: { name: "", options: {} },
            status: { name: "", options: {} },
            plat_id: { name: "", options: {} },
            created_at: { name: "", options: {} },
            area_code: { name: "手机区号", options: {}},
            code_type: { name: "号码类型", options: {}},
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };
    /**查询条件 */
    listQuery = {
        plat_id: "",
        user_id: "",
        mobile: "",
        status: "",
        page_count: 1,
        page_size: 20,
        code_type: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null
            // TODO
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
            plat_id: "",
            user_id: "",
            mobile: "",
            status: "",
            code_type: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_sms_code_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
