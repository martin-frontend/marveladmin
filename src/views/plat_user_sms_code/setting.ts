/**
 * description: 短信验证码查询
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67157
 */
import cmd_admin_plat_user_sms_code_table_columns from "@/views/plat_user_sms_code/command/cmd_admin_plat_user_sms_code_table_columns";
import cmd_admin_plat_user_sms_code_index from "@/views/plat_user_sms_code/command/cmd_admin_plat_user_sms_code_index";
/**协议*/
export var HttpType = {
    admin_plat_user_sms_code_table_columns: "admin/plat_user_sms_code/table_columns",
    admin_plat_user_sms_code_index: "admin/plat_user_sms_code/index",
};
/**事件*/
export var EventType = {
    admin_plat_user_sms_code_table_columns: "admin_plat_user_sms_code_table_columns",
    admin_plat_user_sms_code_index: "admin_plat_user_sms_code_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_user_sms_code_table_columns, cmd_admin_plat_user_sms_code_table_columns);
facade.registerCommand(HttpType.admin_plat_user_sms_code_index, cmd_admin_plat_user_sms_code_index);

