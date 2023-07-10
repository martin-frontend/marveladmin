/**
 * description: 价值留存统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777817
 */
import cmd_admin_statistic_coin_keep_days_table_columns from "@/views/statistic_coin_keep_days/command/cmd_admin_statistic_coin_keep_days_table_columns";
import cmd_admin_statistic_coin_keep_days_index from "@/views/statistic_coin_keep_days/command/cmd_admin_statistic_coin_keep_days_index";
/**协议*/
export var HttpType = {
    admin_statistic_coin_keep_days_table_columns: "admin/statistic_coin_keep_days/table_columns",
    admin_statistic_coin_keep_days_index: "admin/statistic_coin_keep_days/index",
};
/**事件*/
export var EventType = {
    admin_statistic_coin_keep_days_table_columns: "admin_statistic_coin_keep_days_table_columns",
    admin_statistic_coin_keep_days_index: "admin_statistic_coin_keep_days_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_coin_keep_days_table_columns, cmd_admin_statistic_coin_keep_days_table_columns);
facade.registerCommand(HttpType.admin_statistic_coin_keep_days_index, cmd_admin_statistic_coin_keep_days_index);

