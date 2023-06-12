/**
 * description: 用户认证
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777464
 */
import cmd_admin_plat_users_verification_table_columns from "@/views/plat_users_verification/command/cmd_admin_plat_users_verification_table_columns";
import cmd_admin_plat_users_verification_index from "@/views/plat_users_verification/command/cmd_admin_plat_users_verification_index";
import cmd_admin_plat_users_verification_update from "@/views/plat_users_verification/command/cmd_admin_plat_users_verification_update";
/**协议*/
export var HttpType = {
    admin_plat_users_verification_table_columns: "admin/plat_users_verification/table_columns",
    admin_plat_users_verification_index: "admin/plat_users_verification/index",
    admin_plat_users_verification_update: "admin/plat_users_verification/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_verification_table_columns: "admin_plat_users_verification_table_columns",
    admin_plat_users_verification_index: "admin_plat_users_verification_index",
    admin_plat_users_verification_update: "admin_plat_users_verification_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_verification_table_columns, cmd_admin_plat_users_verification_table_columns);
facade.registerCommand(HttpType.admin_plat_users_verification_index, cmd_admin_plat_users_verification_index);
facade.registerCommand(HttpType.admin_plat_users_verification_update, cmd_admin_plat_users_verification_update);

