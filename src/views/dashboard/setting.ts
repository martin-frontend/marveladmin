/**
 * description: 首页
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706379，http://18.166.154.73:8090/pages/viewpage.action?pageId=1706830
 */
import cmd_admin_index_statistic_table_columns from "@/views/dashboard/command/cmd_admin_index_statistic_table_columns";
import cmd_admin_index_statistic_yesterday_statistic from "@/views/dashboard/command/cmd_admin_index_statistic_yesterday_statistic";
import cmd_admin_index_statistic_today_statistic from "@/views/dashboard/command/cmd_admin_index_statistic_today_statistic";
import cmd_admin_index_statistic_recharge_statistic from "@/views/dashboard/command/cmd_admin_index_statistic_recharge_statistic";
import cmd_admin_index_statistic_exchange_statistic from "@/views/dashboard/command/cmd_admin_index_statistic_exchange_statistic";
import cmd_admin_index_statistic_coin_statistic from "@/views/dashboard/command/cmd_admin_index_statistic_coin_statistic";
/**协议*/
export var HttpType = {
    admin_index_statistic_table_columns: "admin/index_statistic/table_columns",
    admin_index_statistic_yesterday_statistic: "admin/index_statistic/yesterday_statistic",
    admin_index_statistic_today_statistic: "admin/index_statistic/today_statistic",
    admin_index_statistic_recharge_statistic: "admin/index_statistic/recharge_statistic",
    admin_index_statistic_exchange_statistic: "admin/index_statistic/exchange_statistic",
    admin_index_statistic_coin_statistic: "admin/index_statistic/coin_statistic",
};
/**事件*/
export var EventType = {
    admin_index_statistic_table_columns: "admin_index_statistic_table_columns",
    admin_index_statistic_yesterday_statistic: "admin_index_statistic_yesterday_statistic",
    admin_index_statistic_today_statistic: "admin_index_statistic_today_statistic",
    admin_index_statistic_recharge_statistic: "admin_index_statistic_recharge_statistic",
    admin_index_statistic_exchange_statistic: "admin_index_statistic_exchange_statistic",
    admin_index_statistic_coin_statistic: "admin_index_statistic_coin_statistic",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_index_statistic_table_columns, cmd_admin_index_statistic_table_columns);
facade.registerCommand(HttpType.admin_index_statistic_yesterday_statistic, cmd_admin_index_statistic_yesterday_statistic);
facade.registerCommand(HttpType.admin_index_statistic_today_statistic, cmd_admin_index_statistic_today_statistic);
facade.registerCommand(HttpType.admin_index_statistic_recharge_statistic, cmd_admin_index_statistic_recharge_statistic);
facade.registerCommand(HttpType.admin_index_statistic_exchange_statistic, cmd_admin_index_statistic_exchange_statistic);
facade.registerCommand(HttpType.admin_index_statistic_coin_statistic, cmd_admin_index_statistic_coin_statistic);

