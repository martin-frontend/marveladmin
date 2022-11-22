/**
 * description: 操作日志
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707048
 */
import cmd_admin_admin_user_log_table_columns from "@/views/admin_user_log/command/cmd_admin_admin_user_log_table_columns";
import cmd_admin_admin_user_log_index from "@/views/admin_user_log/command/cmd_admin_admin_user_log_index";
import cmd_admin_admin_user_log_show from "@/views/admin_user_log/command/cmd_admin_admin_user_log_show";
/**协议*/
export var HttpType = {
    admin_admin_user_log_table_columns: "admin/admin_user_log/table_columns",
    admin_admin_user_log_index: "admin/admin_user_log/index",
    admin_admin_user_log_show: "admin/admin_user_log/show/{id}",
};
/**事件*/
export var EventType = {
    admin_admin_user_log_table_columns: "admin_admin_user_log_table_columns",
    admin_admin_user_log_index: "admin_admin_user_log_index",
    admin_admin_user_log_show: "admin_admin_user_log_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_user_log_table_columns, cmd_admin_admin_user_log_table_columns);
facade.registerCommand(HttpType.admin_admin_user_log_index, cmd_admin_admin_user_log_index);
facade.registerCommand(HttpType.admin_admin_user_log_show, cmd_admin_admin_user_log_show);
