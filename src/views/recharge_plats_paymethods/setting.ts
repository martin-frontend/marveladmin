/**
 * description: 支付方式管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705132
 */
import cmd_admin_recharge_plats_paymethods_table_columns from "@/views/recharge_plats_paymethods/command/cmd_admin_recharge_plats_paymethods_table_columns";
import cmd_admin_recharge_plats_paymethods_index from "@/views/recharge_plats_paymethods/command/cmd_admin_recharge_plats_paymethods_index";
import cmd_admin_recharge_plats_paymethods_update from "@/views/recharge_plats_paymethods/command/cmd_admin_recharge_plats_paymethods_update";
/**协议*/
export var HttpType = {
    admin_recharge_plats_paymethods_table_columns: "admin/recharge_plats_paymethods/table_columns",
    admin_recharge_plats_paymethods_index: "admin/recharge_plats_paymethods/index",
    admin_recharge_plats_paymethods_update: "admin/recharge_plats_paymethods/update/{id}",
};
/**事件*/
export var EventType = {
    admin_recharge_plats_paymethods_table_columns: "admin_recharge_plats_paymethods_table_columns",
    admin_recharge_plats_paymethods_index: "admin_recharge_plats_paymethods_index",
    admin_recharge_plats_paymethods_update: "admin_recharge_plats_paymethods_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_recharge_plats_paymethods_table_columns, cmd_admin_recharge_plats_paymethods_table_columns);
facade.registerCommand(HttpType.admin_recharge_plats_paymethods_index, cmd_admin_recharge_plats_paymethods_index);
facade.registerCommand(HttpType.admin_recharge_plats_paymethods_update, cmd_admin_recharge_plats_paymethods_update);

