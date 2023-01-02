/**
 * description: 人员修改记录
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776663
 */
import cmd_admin_admin_user_log_user_table_columns from "@/views/admin_user_log_user/command/cmd_admin_admin_user_log_user_table_columns";
import cmd_admin_admin_user_log_user_index from "@/views/admin_user_log_user/command/cmd_admin_admin_user_log_user_index";
import cmd_admin_admin_user_log_user_show from "@/views/admin_user_log_user/command/cmd_admin_admin_user_log_user_show";
/**协议*/
export var HttpType = {
    admin_admin_user_log_user_table_columns: "admin/admin_user_log/user/table_columns",
    admin_admin_user_log_user_index: "admin/admin_user_log/user/index",
    admin_admin_user_log_user_show: "admin/admin_user_log/user/show/{id}",
};
/**事件*/
export var EventType = {
    admin_admin_user_log_user_table_columns: "admin_admin_user_log_user_table_columns",
    admin_admin_user_log_user_index: "admin_admin_user_log_user_index",
    admin_admin_user_log_user_show: "admin_admin_user_log_user_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_user_log_user_table_columns, cmd_admin_admin_user_log_user_table_columns);
facade.registerCommand(HttpType.admin_admin_user_log_user_index, cmd_admin_admin_user_log_user_index);
facade.registerCommand(HttpType.admin_admin_user_log_user_show, cmd_admin_admin_user_log_user_show);

