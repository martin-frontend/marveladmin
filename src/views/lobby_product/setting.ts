/**
 * description: 平台大厅产品
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558288
 */
import cmd_admin_lobby_product_table_columns from "@/views/lobby_product/command/cmd_admin_lobby_product_table_columns";
import cmd_admin_lobby_product_index from "@/views/lobby_product/command/cmd_admin_lobby_product_index";
import cmd_admin_lobby_product_store from "@/views/lobby_product/command/cmd_admin_lobby_product_store";
import cmd_admin_lobby_product_show from "@/views/lobby_product/command/cmd_admin_lobby_product_show";
import cmd_admin_lobby_product_update from "@/views/lobby_product/command/cmd_admin_lobby_product_update";
import cmd_admin_lobby_model_product_index from "@/views/lobby_product/command/cmd_admin_lobby_model_product_index";
/**协议*/
export var HttpType = {
    admin_lobby_product_table_columns: "admin/lobby_product/table_columns",
    admin_lobby_product_index: "admin/lobby_product/index",
    admin_lobby_product_store: "admin/lobby_product/store",
    admin_lobby_product_show: "admin/lobby_product/show/{lobby_product_id}",
    admin_lobby_product_update: "admin/lobby_product/update/{lobby_product_id}",
    admin_lobby_model_product_index: "admin/lobby_model_product/index",
};
/**事件*/
export var EventType = {
    admin_lobby_product_table_columns: "admin_lobby_product_table_columns",
    admin_lobby_product_index: "admin_lobby_product_index",
    admin_lobby_product_store: "admin_lobby_product_store",
    admin_lobby_product_show: "admin_lobby_product_show",
    admin_lobby_product_update: "admin_lobby_product_update",
    admin_lobby_model_product_index: "admin_lobby_model_product_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_lobby_product_table_columns, cmd_admin_lobby_product_table_columns);
facade.registerCommand(HttpType.admin_lobby_product_index, cmd_admin_lobby_product_index);
facade.registerCommand(HttpType.admin_lobby_product_store, cmd_admin_lobby_product_store);
facade.registerCommand(HttpType.admin_lobby_product_show, cmd_admin_lobby_product_show);
facade.registerCommand(HttpType.admin_lobby_product_update, cmd_admin_lobby_product_update);
facade.registerCommand(HttpType.admin_lobby_model_product_index, cmd_admin_lobby_model_product_index);
