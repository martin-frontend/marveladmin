/**
 * description: 厂商产品管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66135
 */
import cmd_admin_vendor_product_table_columns from "@/views/vendor_product/command/cmd_admin_vendor_product_table_columns";
import cmd_admin_vendor_product_index from "@/views/vendor_product/command/cmd_admin_vendor_product_index";
import cmd_admin_vendor_product_store from "@/views/vendor_product/command/cmd_admin_vendor_product_store";
import cmd_admin_vendor_product_show from "@/views/vendor_product/command/cmd_admin_vendor_product_show";
import cmd_admin_vendor_product_update from "@/views/vendor_product/command/cmd_admin_vendor_product_update";
import cmd_admin_vendor_show from "@/views/vendor_product/command/cmd_admin_vendor_show";
import cmd_admin_vendor_index from "@/views/lobby_model_product/command/cmd_admin_vendor_index";
/**协议*/
export var HttpType = {
    admin_vendor_product_table_columns: "admin/vendor_product/table_columns",
    admin_vendor_product_index: "admin/vendor_product/index",
    admin_vendor_product_store: "admin/vendor_product/store",
    admin_vendor_product_show: "admin/vendor_product/show/{vendor_product_id}",
    admin_vendor_product_update: "admin/vendor_product/update/{vendor_product_id}",
    admin_vendor_show: "admin/vendor/show/{vendor_id}",
    admin_vendor_index: "admin/vendor/index",
};
/**事件*/
export var EventType = {
    admin_vendor_product_table_columns: "admin_vendor_product_table_columns",
    admin_vendor_product_index: "admin_vendor_product_index",
    admin_vendor_product_store: "admin_vendor_product_store",
    admin_vendor_product_show: "admin_vendor_product_show",
    admin_vendor_product_update: "admin_vendor_product_update",
    admin_vendor_show: "admin_vendor_show",
    admin_vendor_index: "admin_vendor_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_vendor_product_table_columns, cmd_admin_vendor_product_table_columns);
facade.registerCommand(HttpType.admin_vendor_product_index, cmd_admin_vendor_product_index);
facade.registerCommand(HttpType.admin_vendor_product_store, cmd_admin_vendor_product_store);
facade.registerCommand(HttpType.admin_vendor_product_show, cmd_admin_vendor_product_show);
facade.registerCommand(HttpType.admin_vendor_product_update, cmd_admin_vendor_product_update);
facade.registerCommand(HttpType.admin_vendor_show, cmd_admin_vendor_show);
facade.registerCommand(HttpType.admin_vendor_index, cmd_admin_vendor_index);
