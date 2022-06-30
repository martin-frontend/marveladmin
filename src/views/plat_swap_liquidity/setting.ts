/**
 * description: Swap管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766731
 */
import cmd_admin_plat_swap_liquidity_table_columns from "@/views/plat_swap_liquidity/command/cmd_admin_plat_swap_liquidity_table_columns";
import cmd_admin_plat_swap_liquidity_index from "@/views/plat_swap_liquidity/command/cmd_admin_plat_swap_liquidity_index";
import cmd_admin_plat_swap_liquidity_update from "@/views/plat_swap_liquidity/command/cmd_admin_plat_swap_liquidity_update";
import cmd_admin_plat_swap_liquidity_update_liquidity from "@/views/plat_swap_liquidity/command/cmd_admin_plat_swap_liquidity_update_liquidity";
/**协议*/
export var HttpType = {
    admin_plat_swap_liquidity_table_columns: "admin/plat_swap_liquidity/table_columns",
    admin_plat_swap_liquidity_index: "admin/plat_swap_liquidity/index",
    admin_plat_swap_liquidity_update: "admin/plat_swap_liquidity/update/{plat_swap_pair_id}",
    admin_plat_swap_liquidity_update_liquidity: "admin/plat_swap_liquidity/update/liquidity/{plat_swap_pair_id}",
};
/**事件*/
export var EventType = {
    admin_plat_swap_liquidity_table_columns: "admin_plat_swap_liquidity_table_columns",
    admin_plat_swap_liquidity_index: "admin_plat_swap_liquidity_index",
    admin_plat_swap_liquidity_update: "admin_plat_swap_liquidity_update",
    admin_plat_swap_liquidity_update_liquidity: "admin_plat_swap_liquidity_update_liquidity",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_swap_liquidity_table_columns, cmd_admin_plat_swap_liquidity_table_columns);
facade.registerCommand(HttpType.admin_plat_swap_liquidity_index, cmd_admin_plat_swap_liquidity_index);
facade.registerCommand(HttpType.admin_plat_swap_liquidity_update, cmd_admin_plat_swap_liquidity_update);
facade.registerCommand(HttpType.admin_plat_swap_liquidity_update_liquidity, cmd_admin_plat_swap_liquidity_update_liquidity);

