/**
 * description: 用户每日币种统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777239
 */
import cmd_admin_plat_users_coin_statistic_days_table_columns from "@/views/plat_users_coin_statistic_days/command/cmd_admin_plat_users_coin_statistic_days_table_columns";
import cmd_admin_plat_users_coin_statistic_days_index from "@/views/plat_users_coin_statistic_days/command/cmd_admin_plat_users_coin_statistic_days_index";
/**协议*/
export var HttpType = {
    admin_plat_users_coin_statistic_days_table_columns: "admin/plat_users_coin_statistic_days/table_columns",
    admin_plat_users_coin_statistic_days_index: "admin/plat_users_coin_statistic_days/index",
};
/**事件*/
export var EventType = {
    admin_plat_users_coin_statistic_days_table_columns: "admin_plat_users_coin_statistic_days_table_columns",
    admin_plat_users_coin_statistic_days_index: "admin_plat_users_coin_statistic_days_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_coin_statistic_days_table_columns, cmd_admin_plat_users_coin_statistic_days_table_columns);
facade.registerCommand(HttpType.admin_plat_users_coin_statistic_days_index, cmd_admin_plat_users_coin_statistic_days_index);

