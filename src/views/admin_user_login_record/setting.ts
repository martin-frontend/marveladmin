/**
 * description: 用户登陸记录表
 * document: 
 */
import cmd_admin_admin_user_login_record_table_columns from "@/views/admin_user_login_record/command/cmd_admin_admin_user_login_record_table_columns";
import cmd_admin_admin_user_login_record_index from "@/views/admin_user_login_record/command/cmd_admin_admin_user_login_record_index";
/**协议*/
export var HttpType = {
    admin_admin_user_login_record_table_columns: "admin/admin_user_login_record/table_columns",
    admin_admin_user_login_record_index: "admin/admin_user_login_record/index",
};
/**事件*/
export var EventType = {
    admin_admin_user_login_record_table_columns: "admin_admin_user_login_record_table_columns",
    admin_admin_user_login_record_index: "admin_admin_user_login_record_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_user_login_record_table_columns, cmd_admin_admin_user_login_record_table_columns);
facade.registerCommand(HttpType.admin_admin_user_login_record_index, cmd_admin_admin_user_login_record_index);

