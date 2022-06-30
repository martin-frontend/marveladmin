/**
 * description: 投注明细
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558292
 */
import cmd_admin_plat_users_bet_table_columns from "@/views/plat_users_bet/command/cmd_admin_plat_users_bet_table_columns";
import cmd_admin_plat_users_bet_index from "@/views/plat_users_bet/command/cmd_admin_plat_users_bet_index";
import cmd_admin_plat_users_bet_show from "@/views/plat_users_bet/command/cmd_admin_plat_users_bet_show";
/**协议*/
export var HttpType = {
    admin_plat_users_bet_table_columns: "admin/plat_users_bet/table_columns",
    admin_plat_users_bet_index: "admin/plat_users_bet/index",
    admin_plat_users_bet_show: "admin/plat_users_bet/show/{plat_id}/{bet_id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_bet_table_columns: "admin_plat_users_bet_table_columns",
    admin_plat_users_bet_index: "admin_plat_users_bet_index",
    admin_plat_users_bet_show: "admin_plat_users_bet_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_bet_table_columns, cmd_admin_plat_users_bet_table_columns);
facade.registerCommand(HttpType.admin_plat_users_bet_index, cmd_admin_plat_users_bet_index);
facade.registerCommand(HttpType.admin_plat_users_bet_show, cmd_admin_plat_users_bet_show);
