/**
 * description: 平台大厅厂商产品
 * document: 
 */
import cmd_admin_lobby_vendor_products_table_columns from "@/views/lobby_vendor_products/command/cmd_admin_lobby_vendor_products_table_columns";
import cmd_admin_lobby_vendor_products_index from "@/views/lobby_vendor_products/command/cmd_admin_lobby_vendor_products_index";
import cmd_admin_lobby_vendor_products_update from "@/views/lobby_vendor_products/command/cmd_admin_lobby_vendor_products_update";
import cmd_admin_lobby_vendor_products_sync_data from "@/views/lobby_vendor_products/command/cmd_admin_lobby_vendor_products_sync_data";
/**协议*/
export var HttpType = {
    admin_lobby_vendor_products_table_columns: "admin/lobby_vendor_products/table_columns",
    admin_lobby_vendor_products_index: "admin/lobby_vendor_products/index",
    admin_lobby_vendor_products_update: "admin/lobby_vendor_products/update/{lobby_vendor_product_id}",
    admin_lobby_vendor_products_sync_data: "admin/lobby_vendor_products/sync_data/{plat_id}",
};
/**事件*/
export var EventType = {
    admin_lobby_vendor_products_table_columns: "admin_lobby_vendor_products_table_columns",
    admin_lobby_vendor_products_index: "admin_lobby_vendor_products_index",
    admin_lobby_vendor_products_update: "admin_lobby_vendor_products_update",
    admin_lobby_vendor_products_sync_data: "admin_lobby_vendor_products_sync_data",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_lobby_vendor_products_table_columns, cmd_admin_lobby_vendor_products_table_columns);
facade.registerCommand(HttpType.admin_lobby_vendor_products_index, cmd_admin_lobby_vendor_products_index);
facade.registerCommand(HttpType.admin_lobby_vendor_products_update, cmd_admin_lobby_vendor_products_update);
facade.registerCommand(HttpType.admin_lobby_vendor_products_sync_data, cmd_admin_lobby_vendor_products_sync_data);

