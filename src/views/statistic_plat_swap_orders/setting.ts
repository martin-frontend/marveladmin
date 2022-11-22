/**
 * description: 交易统计
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766735
 */
import cmd_admin_statistic_plat_swap_orders_table_columns from "@/views/statistic_plat_swap_orders/command/cmd_admin_statistic_plat_swap_orders_table_columns";
import cmd_admin_statistic_plat_swap_orders_index from "@/views/statistic_plat_swap_orders/command/cmd_admin_statistic_plat_swap_orders_index";
/**协议*/
export var HttpType = {
    admin_statistic_plat_swap_orders_table_columns: "admin/statistic_plat_swap_orders/table_columns",
    admin_statistic_plat_swap_orders_index: "admin/statistic_plat_swap_orders/index",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_swap_orders_table_columns: "admin_statistic_plat_swap_orders_table_columns",
    admin_statistic_plat_swap_orders_index: "admin_statistic_plat_swap_orders_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_statistic_plat_swap_orders_table_columns,
    cmd_admin_statistic_plat_swap_orders_table_columns
);
facade.registerCommand(HttpType.admin_statistic_plat_swap_orders_index, cmd_admin_statistic_plat_swap_orders_index);
