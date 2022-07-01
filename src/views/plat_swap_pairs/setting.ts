/**
 * description: 币对管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766726
 */
import cmd_admin_plat_swap_pairs_table_columns from "@/views/plat_swap_pairs/command/cmd_admin_plat_swap_pairs_table_columns";
import cmd_admin_plat_swap_pairs_index from "@/views/plat_swap_pairs/command/cmd_admin_plat_swap_pairs_index";
import cmd_admin_plat_swap_pairs_store from "@/views/plat_swap_pairs/command/cmd_admin_plat_swap_pairs_store";
import cmd_admin_plat_swap_pairs_update from "@/views/plat_swap_pairs/command/cmd_admin_plat_swap_pairs_update";
/**协议*/
export var HttpType = {
    admin_plat_swap_pairs_table_columns: "admin/plat_swap_pairs/table_columns",
    admin_plat_swap_pairs_index: "admin/plat_swap_pairs/index",
    admin_plat_swap_pairs_store: "admin/plat_swap_pairs/store",
    admin_plat_swap_pairs_update: "admin/plat_swap_pairs/update/{plat_swap_pair_id}",
};
/**事件*/
export var EventType = {
    admin_plat_swap_pairs_table_columns: "admin_plat_swap_pairs_table_columns",
    admin_plat_swap_pairs_index: "admin_plat_swap_pairs_index",
    admin_plat_swap_pairs_store: "admin_plat_swap_pairs_store",
    admin_plat_swap_pairs_update: "admin_plat_swap_pairs_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_swap_pairs_table_columns, cmd_admin_plat_swap_pairs_table_columns);
facade.registerCommand(HttpType.admin_plat_swap_pairs_index, cmd_admin_plat_swap_pairs_index);
facade.registerCommand(HttpType.admin_plat_swap_pairs_store, cmd_admin_plat_swap_pairs_store);
facade.registerCommand(HttpType.admin_plat_swap_pairs_update, cmd_admin_plat_swap_pairs_update);

