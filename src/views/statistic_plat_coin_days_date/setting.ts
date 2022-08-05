/**
 * description: 当日币种统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47775811
 */
import cmd_admin_statistic_plat_coin_days_table_columns from "@/views/statistic_plat_coin_days_date/command/cmd_admin_statistic_plat_coin_days_table_columns";
import cmd_admin_statistic_plat_coin_days_statistic_by_date from "@/views/statistic_plat_coin_days_date/command/cmd_admin_statistic_plat_coin_days_statistic_by_date";
/**协议*/
export var HttpType = {
    admin_statistic_plat_coin_days_table_columns: "admin/statistic_plat_coin_days/table_columns",
    admin_statistic_plat_coin_days_statistic_by_date: "admin/statistic_plat_coin_days/statistic_by_date",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_coin_days_table_columns: "admin_statistic_plat_coin_days_table_columns",
    admin_statistic_plat_coin_days_statistic_by_date: "admin_statistic_plat_coin_days_statistic_by_date",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_plat_coin_days_table_columns, cmd_admin_statistic_plat_coin_days_table_columns);
facade.registerCommand(HttpType.admin_statistic_plat_coin_days_statistic_by_date, cmd_admin_statistic_plat_coin_days_statistic_by_date);

