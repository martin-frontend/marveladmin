/**
 * description: 流动性日志
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766737
 */
import cmd_admin_plat_swap_liquidity_log_table_columns from "@/views/plat_swap_liquidity_log/command/cmd_admin_plat_swap_liquidity_log_table_columns";
import cmd_admin_plat_swap_liquidity_log_index from "@/views/plat_swap_liquidity_log/command/cmd_admin_plat_swap_liquidity_log_index";
/**协议*/
export var HttpType = {
    admin_plat_swap_liquidity_log_table_columns: "admin/plat_swap_liquidity_log/table_columns",
    admin_plat_swap_liquidity_log_index: "admin/plat_swap_liquidity_log/index",
};
/**事件*/
export var EventType = {
    admin_plat_swap_liquidity_log_table_columns: "admin_plat_swap_liquidity_log_table_columns",
    admin_plat_swap_liquidity_log_index: "admin_plat_swap_liquidity_log_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_swap_liquidity_log_table_columns,
    cmd_admin_plat_swap_liquidity_log_table_columns
);
facade.registerCommand(HttpType.admin_plat_swap_liquidity_log_index, cmd_admin_plat_swap_liquidity_log_index);
