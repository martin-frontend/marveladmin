/**
 * description: 用户收款方式
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705455
 */
import cmd_admin_plat_users_payment_method_table_columns from "@/views/plat_users_payment_method/command/cmd_admin_plat_users_payment_method_table_columns";
import cmd_admin_plat_users_payment_method_index from "@/views/plat_users_payment_method/command/cmd_admin_plat_users_payment_method_index";
/**协议*/
export var HttpType = {
    admin_plat_users_payment_method_table_columns: "admin/plat_users_payment_method/table_columns",
    admin_plat_users_payment_method_index: "admin/plat_users_payment_method/index",
};
/**事件*/
export var EventType = {
    admin_plat_users_payment_method_table_columns: "admin_plat_users_payment_method_table_columns",
    admin_plat_users_payment_method_index: "admin_plat_users_payment_method_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_payment_method_table_columns, cmd_admin_plat_users_payment_method_table_columns);
facade.registerCommand(HttpType.admin_plat_users_payment_method_index, cmd_admin_plat_users_payment_method_index);

