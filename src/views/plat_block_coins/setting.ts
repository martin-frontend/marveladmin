/**
 * description: 平台代币管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766151
 */
import cmd_admin_plat_block_coins_table_columns from "@/views/plat_block_coins/command/cmd_admin_plat_block_coins_table_columns";
import cmd_admin_plat_block_coins_index from "@/views/plat_block_coins/command/cmd_admin_plat_block_coins_index";
import cmd_admin_plat_block_coins_store from "@/views/plat_block_coins/command/cmd_admin_plat_block_coins_store";
import cmd_admin_plat_block_coins_update from "@/views/plat_block_coins/command/cmd_admin_plat_block_coins_update";
/**协议*/
export var HttpType = {
    admin_plat_block_coins_table_columns: "admin/plat_block_coins/table_columns",
    admin_plat_block_coins_index: "admin/plat_block_coins/index",
    admin_plat_block_coins_store: "admin/plat_block_coins/store",
    admin_plat_block_coins_update: "admin/plat_block_coins/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_block_coins_table_columns: "admin_plat_block_coins_table_columns",
    admin_plat_block_coins_index: "admin_plat_block_coins_index",
    admin_plat_block_coins_store: "admin_plat_block_coins_store",
    admin_plat_block_coins_update: "admin_plat_block_coins_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_block_coins_table_columns, cmd_admin_plat_block_coins_table_columns);
facade.registerCommand(HttpType.admin_plat_block_coins_index, cmd_admin_plat_block_coins_index);
facade.registerCommand(HttpType.admin_plat_block_coins_store, cmd_admin_plat_block_coins_store);
facade.registerCommand(HttpType.admin_plat_block_coins_update, cmd_admin_plat_block_coins_update);
