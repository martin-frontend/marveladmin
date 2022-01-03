/**
 * description: 兑换厂商
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705766
 */
import cmd_admin_exchange_vendors_table_columns from "@/views/exchange_vendors/command/cmd_admin_exchange_vendors_table_columns";
import cmd_admin_exchange_vendors_index from "@/views/exchange_vendors/command/cmd_admin_exchange_vendors_index";
import cmd_admin_exchange_vendors_show from "@/views/exchange_vendors/command/cmd_admin_exchange_vendors_show";
import cmd_admin_exchange_vendors_store from "@/views/exchange_vendors/command/cmd_admin_exchange_vendors_store";
import cmd_admin_exchange_vendors_update from "@/views/exchange_vendors/command/cmd_admin_exchange_vendors_update";
/**协议*/
export var HttpType = {
    admin_exchange_vendors_table_columns: "admin/exchange_vendors/table_columns",
    admin_exchange_vendors_index: "admin/exchange_vendors/index",
    admin_exchange_vendors_show: "admin/exchange_vendors/show/{id}",
    admin_exchange_vendors_store: "admin/exchange_vendors/store",
    admin_exchange_vendors_update: "admin/exchange_vendors/update/{id}",
};
/**事件*/
export var EventType = {
    admin_exchange_vendors_table_columns: "admin_exchange_vendors_table_columns",
    admin_exchange_vendors_index: "admin_exchange_vendors_index",
    admin_exchange_vendors_show: "admin_exchange_vendors_show",
    admin_exchange_vendors_store: "admin_exchange_vendors_store",
    admin_exchange_vendors_update: "admin_exchange_vendors_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_exchange_vendors_table_columns, cmd_admin_exchange_vendors_table_columns);
facade.registerCommand(HttpType.admin_exchange_vendors_index, cmd_admin_exchange_vendors_index);
facade.registerCommand(HttpType.admin_exchange_vendors_show, cmd_admin_exchange_vendors_show);
facade.registerCommand(HttpType.admin_exchange_vendors_store, cmd_admin_exchange_vendors_store);
facade.registerCommand(HttpType.admin_exchange_vendors_update, cmd_admin_exchange_vendors_update);

