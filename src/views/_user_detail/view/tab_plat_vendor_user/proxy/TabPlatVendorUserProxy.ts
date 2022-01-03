import AbstractProxy from "@/core/abstract/AbstractProxy";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabPlatVendorUserProxy from "./ITabPlatVendorUserProxy";

export default class TabPlatVendorUserProxy extends AbstractProxy implements ITabPlatVendorUserProxy {
    static NAME = "TabPlatVendorUserProxy";

    private pageSetting = getPageSetting();
    /**进入页面时调用 */
    enter() {
        this.admin_plat_vendor_user_table_columns();
        this.listQuery.user_id = this.pageSetting.user_id;
    }

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 */
    tableData = {
        columns: {
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            last_login_app_type: { name: "最近登陆应用平台", options: {} },
            last_login_at: { name: "最近登入时间", options: {} },
            last_login_device: { name: "最近登录设备号", options: {} },
            last_login_ip: { name: "最近登录IP", options: {} },
            last_logout_at: { name: "最近注销时间", options: {} },
            last_logout_type: { name: "最近注销类型", options: {} },
            plat_id: { name: "所属平台", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_id: { name: "用户ID", options: {} },
            user_status: { name: "用户状态", options: {} },
            vendor_id: { name: "产品厂商", options: {} },
            vendor_name: { name: "厂商名称", options: {} },
            vendor_user_id: { name: "平台厂商用户ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
    };
    /**查詢数据 */
    listQuery = {
        user_id: 0,
        page_count: 1,
        page_size: 10,
    };
    /**当前选择的厂商 */
    select_vendor_id = 0;

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /**設置表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**获取表头 */
    admin_plat_vendor_user_table_columns() {
        this.sendNotification(HttpType.admin_plat_vendor_user_table_columns);
    }
    /**获取列表数据 */
    admin_plat_vendor_user_index() {
        this.sendNotification(HttpType.admin_plat_vendor_user_index, this.listQuery);
    }
    /**获取详情 */
    admin_plat_vendor_user_show() {}
    /**查询厂商余额 */
    admin_plat_vendor_user_money(row: any) {
        const {vendor_id, vendor_user_id} = row;
        this.select_vendor_id = vendor_id;
        this.sendNotification(HttpType.admin_plat_vendor_user_money, { vendor_user_id });
    }
}
