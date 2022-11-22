/**
 * description: 返水明细
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=65977
 */
import cmd_admin_plat_users_backwater_log_table_columns from "@/views/plat_users_backwater_log/command/cmd_admin_plat_users_backwater_log_table_columns";
import cmd_admin_plat_users_backwater_log_index from "@/views/plat_users_backwater_log/command/cmd_admin_plat_users_backwater_log_index";
import cmd_admin_plat_users_backwater_log_show from "@/views/plat_users_backwater_log/command/cmd_admin_plat_users_backwater_log_show";
/**协议*/
export var HttpType = {
    admin_plat_users_backwater_log_table_columns: "admin/plat_users_backwater_log/table_columns",
    admin_plat_users_backwater_log_index: "admin/plat_users_backwater_log/index",
    admin_plat_users_backwater_log_show: "admin/plat_users_backwater_log/show/{plat_id}/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_backwater_log_table_columns: "admin_plat_users_backwater_log_table_columns",
    admin_plat_users_backwater_log_index: "admin_plat_users_backwater_log_index",
    admin_plat_users_backwater_log_show: "admin_plat_users_backwater_log_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_users_backwater_log_table_columns,
    cmd_admin_plat_users_backwater_log_table_columns
);
facade.registerCommand(HttpType.admin_plat_users_backwater_log_index, cmd_admin_plat_users_backwater_log_index);
facade.registerCommand(HttpType.admin_plat_users_backwater_log_show, cmd_admin_plat_users_backwater_log_show);
