/**
 * description: 平台厂商用户
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558764
 */
import cmd_admin_plat_vendor_user_table_columns from "@/views/plat_vendor_user/command/cmd_admin_plat_vendor_user_table_columns";
import cmd_admin_plat_vendor_user_index from "@/views/plat_vendor_user/command/cmd_admin_plat_vendor_user_index";
import cmd_admin_plat_vendor_user_show from "@/views/plat_vendor_user/command/cmd_admin_plat_vendor_user_show";
/**协议*/
export var HttpType = {
    admin_plat_vendor_user_table_columns: "admin/plat_vendor_user/table_columns",
    admin_plat_vendor_user_index: "admin/plat_vendor_user/index",
    admin_plat_vendor_user_show: "admin/plat_vendor_user/show/{vendor_user_id}",
};
/**事件*/
export var EventType = {
    admin_plat_vendor_user_table_columns: "admin_plat_vendor_user_table_columns",
    admin_plat_vendor_user_index: "admin_plat_vendor_user_index",
    admin_plat_vendor_user_show: "admin_plat_vendor_user_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_vendor_user_table_columns, cmd_admin_plat_vendor_user_table_columns);
facade.registerCommand(HttpType.admin_plat_vendor_user_index, cmd_admin_plat_vendor_user_index);
facade.registerCommand(HttpType.admin_plat_vendor_user_show, cmd_admin_plat_vendor_user_show);

