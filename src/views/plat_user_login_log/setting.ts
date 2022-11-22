/**
 * description: 平台厂商用户登录log
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558770
 */
import cmd_admin_plat_user_login_log_table_columns from "@/views/plat_user_login_log/command/cmd_admin_plat_user_login_log_table_columns";
import cmd_admin_plat_user_login_log_index from "@/views/plat_user_login_log/command/cmd_admin_plat_user_login_log_index";
import cmd_admin_plat_user_login_log_show from "@/views/plat_user_login_log/command/cmd_admin_plat_user_login_log_show";
/**协议*/
export var HttpType = {
    admin_plat_user_login_log_table_columns: "admin/plat_user_login_log/table_columns",
    admin_plat_user_login_log_index: "admin/plat_user_login_log/index",
    admin_plat_user_login_log_show: "admin/plat_user_login_log/show/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_user_login_log_table_columns: "admin_plat_user_login_log_table_columns",
    admin_plat_user_login_log_index: "admin_plat_user_login_log_index",
    admin_plat_user_login_log_show: "admin_plat_user_login_log_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_user_login_log_table_columns, cmd_admin_plat_user_login_log_table_columns);
facade.registerCommand(HttpType.admin_plat_user_login_log_index, cmd_admin_plat_user_login_log_index);
facade.registerCommand(HttpType.admin_plat_user_login_log_show, cmd_admin_plat_user_login_log_show);
