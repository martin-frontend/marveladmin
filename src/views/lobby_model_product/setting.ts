/**
 * description: 大厅产品管理
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558279
 */
import cmd_admin_lobby_model_product_table_columns from "@/views/lobby_model_product/command/cmd_admin_lobby_model_product_table_columns";
import cmd_admin_lobby_model_product_index from "@/views/lobby_model_product/command/cmd_admin_lobby_model_product_index";
import cmd_admin_lobby_model_product_store from "@/views/lobby_model_product/command/cmd_admin_lobby_model_product_store";
import cmd_admin_lobby_model_product_show from "@/views/lobby_model_product/command/cmd_admin_lobby_model_product_show";
import cmd_admin_lobby_model_product_update from "@/views/lobby_model_product/command/cmd_admin_lobby_model_product_update";
import cmd_admin_vendor_show from "@/views/lobby_model_product/command/cmd_admin_vendor_show";
import cmd_admin_vendor_index from "@/views/lobby_model_product/command/cmd_admin_vendor_index";
import cmd_admin_vendor_product_show from "@/views/lobby_model_product/command/cmd_admin_vendor_product_show";
/**协议*/
export var HttpType = {
    admin_lobby_model_product_table_columns: "admin/lobby_model_product/table_columns",
    admin_lobby_model_product_index: "admin/lobby_model_product/index",
    admin_lobby_model_product_store: "admin/lobby_model_product/store",
    admin_lobby_model_product_show: "admin/lobby_model_product/show/{lobby_model_product_id}",
    admin_lobby_model_product_update: "admin/lobby_model_product/update/{lobby_model_product_id}",
    admin_vendor_show: "admin/vendor/show/{vendor_id}",
    admin_vendor_index: "admin/vendor/index",
    admin_vendor_product_show: "admin/vendor_product/show/{vendor_product_id}",
};
/**事件*/
export var EventType = {
    admin_lobby_model_product_table_columns: "admin_lobby_model_product_table_columns",
    admin_lobby_model_product_index: "admin_lobby_model_product_index",
    admin_lobby_model_product_store: "admin_lobby_model_product_store",
    admin_lobby_model_product_show: "admin_lobby_model_product_show",
    admin_lobby_model_product_update: "admin_lobby_model_product_update",
    admin_vendor_show: "admin_vendor_show",
    admin_vendor_index: "admin_vendor_index",
    admin_vendor_product_show: "admin_vendor_product_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_lobby_model_product_table_columns, cmd_admin_lobby_model_product_table_columns);
facade.registerCommand(HttpType.admin_lobby_model_product_index, cmd_admin_lobby_model_product_index);
facade.registerCommand(HttpType.admin_lobby_model_product_store, cmd_admin_lobby_model_product_store);
facade.registerCommand(HttpType.admin_lobby_model_product_show, cmd_admin_lobby_model_product_show);
facade.registerCommand(HttpType.admin_lobby_model_product_update, cmd_admin_lobby_model_product_update);
facade.registerCommand(HttpType.admin_vendor_show, cmd_admin_vendor_show);
facade.registerCommand(HttpType.admin_vendor_index, cmd_admin_vendor_index);
facade.registerCommand(HttpType.admin_vendor_product_show, cmd_admin_vendor_product_show);
