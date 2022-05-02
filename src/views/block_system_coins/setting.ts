/**
 * description: 系统代币管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766132
 */
import cmd_admin_block_system_coins_table_columns from "@/views/block_system_coins/command/cmd_admin_block_system_coins_table_columns";
import cmd_admin_block_system_coins_index from "@/views/block_system_coins/command/cmd_admin_block_system_coins_index";
import cmd_admin_block_system_coins_store from "@/views/block_system_coins/command/cmd_admin_block_system_coins_store";
import cmd_admin_block_system_coins_update from "@/views/block_system_coins/command/cmd_admin_block_system_coins_update";
/**协议*/
export var HttpType = {
    admin_block_system_coins_table_columns: "admin/block_system_coins/table_columns",
    admin_block_system_coins_index: "admin/block_system_coins/index",
    admin_block_system_coins_store: "admin/block_system_coins/store",
    admin_block_system_coins_update: "admin/block_system_coins/update/{id}",
};
/**事件*/
export var EventType = {
    admin_block_system_coins_table_columns: "admin_block_system_coins_table_columns",
    admin_block_system_coins_index: "admin_block_system_coins_index",
    admin_block_system_coins_store: "admin_block_system_coins_store",
    admin_block_system_coins_update: "admin_block_system_coins_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_system_coins_table_columns, cmd_admin_block_system_coins_table_columns);
facade.registerCommand(HttpType.admin_block_system_coins_index, cmd_admin_block_system_coins_index);
facade.registerCommand(HttpType.admin_block_system_coins_store, cmd_admin_block_system_coins_store);
facade.registerCommand(HttpType.admin_block_system_coins_update, cmd_admin_block_system_coins_update);

