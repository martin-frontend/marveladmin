/**
 * description: 游戏类型管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766268
 */
import cmd_admin_menu_vendor_products_table_columns from "@/views/menu_vendor_products/command/cmd_admin_menu_vendor_products_table_columns";
import cmd_admin_menu_vendor_products_index from "@/views/menu_vendor_products/command/cmd_admin_menu_vendor_products_index";
import cmd_admin_menu_vendor_products_show from "@/views/menu_vendor_products/command/cmd_admin_menu_vendor_products_show";
import cmd_admin_menu_vendor_products_store from "@/views/menu_vendor_products/command/cmd_admin_menu_vendor_products_store";
import cmd_admin_menu_vendor_products_update from "@/views/menu_vendor_products/command/cmd_admin_menu_vendor_products_update";
import cmd_admin_resource_upload from "@/views/menu_vendor_products/command/cmd_admin_resource_upload";
import cmd_admin_plat_update from "@/views/menu_vendor_products/command/cmd_admin_plat_update";
import cmd_admin_plat_show from "@/views/menu_vendor_products/command/cmd_admin_plat_show";
/**协议*/
export var HttpType = {
    admin_menu_vendor_products_table_columns: "admin/menu_vendor_products/table_columns",
    admin_menu_vendor_products_index: "admin/menu_vendor_products/index",
    admin_menu_vendor_products_show: "admin/menu_vendor_products/show/{id}",
    admin_menu_vendor_products_store: "admin/menu_vendor_products/store",
    admin_menu_vendor_products_update: "admin/menu_vendor_products/update/{id}",
    admin_resource_upload: "admin/resource/upload",
    admin_plat_update: "admin/plat/update/{id}",
    admin_plat_show: "admin/plat/show/{id}",
};
/**事件*/
export var EventType = {
    admin_menu_vendor_products_table_columns: "admin_menu_vendor_products_table_columns",
    admin_menu_vendor_products_index: "admin_menu_vendor_products_index",
    admin_menu_vendor_products_show: "admin_menu_vendor_products_show",
    admin_menu_vendor_products_store: "admin_menu_vendor_products_store",
    admin_menu_vendor_products_update: "admin_menu_vendor_products_update",
    admin_resource_upload: "admin_resource_upload",
    admin_plat_update: "admin_plat_update",
    admin_plat_show: "admin_plat_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_menu_vendor_products_table_columns, cmd_admin_menu_vendor_products_table_columns);
facade.registerCommand(HttpType.admin_menu_vendor_products_index, cmd_admin_menu_vendor_products_index);
facade.registerCommand(HttpType.admin_menu_vendor_products_show, cmd_admin_menu_vendor_products_show);
facade.registerCommand(HttpType.admin_menu_vendor_products_store, cmd_admin_menu_vendor_products_store);
facade.registerCommand(HttpType.admin_menu_vendor_products_update, cmd_admin_menu_vendor_products_update);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);
facade.registerCommand(HttpType.admin_plat_update, cmd_admin_plat_update);
facade.registerCommand(HttpType.admin_plat_show, cmd_admin_plat_show);

