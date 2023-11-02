/**
 * description: 币种汇率管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268574
 */
import cmd_admin_plat_currency_conversion_rate_table_columns from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_table_columns";
import cmd_admin_plat_currency_conversion_rate_index from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_index";
import cmd_admin_plat_currency_conversion_rate_show from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_show";
import cmd_admin_plat_currency_conversion_rate_store from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_store";
import cmd_admin_plat_currency_conversion_rate_update from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_update";
import cmd_admin_plat_currency_conversion_rate_delete from "@/views/plat_currency_conversion_rate/command/cmd_admin_plat_currency_conversion_rate_delete";
import cmd_admin_conversion_orders_show_index from "@/views/plat_currency_conversion_rate/command/cmd_admin_conversion_orders_show_index";
/**协议*/
export var HttpType = {
    admin_plat_currency_conversion_rate_table_columns: "admin/plat_currency_conversion_rate/table_columns",
    admin_plat_currency_conversion_rate_index: "admin/plat_currency_conversion_rate/index",
    admin_plat_currency_conversion_rate_show: "admin/plat_currency_conversion_rate/show/{id}",
    admin_plat_currency_conversion_rate_store: "admin/plat_currency_conversion_rate/store",
    admin_plat_currency_conversion_rate_update: "admin/plat_currency_conversion_rate/update/{id}",
    admin_plat_currency_conversion_rate_delete: "admin/plat_currency_conversion_rate/delete/{id}",
    admin_conversion_orders_show_index: "admin/conversion_orders/show_index/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_currency_conversion_rate_table_columns: "admin_plat_currency_conversion_rate_table_columns",
    admin_plat_currency_conversion_rate_index: "admin_plat_currency_conversion_rate_index",
    admin_plat_currency_conversion_rate_show: "admin_plat_currency_conversion_rate_show",
    admin_plat_currency_conversion_rate_store: "admin_plat_currency_conversion_rate_store",
    admin_plat_currency_conversion_rate_update: "admin_plat_currency_conversion_rate_update",
    admin_plat_currency_conversion_rate_delete: "admin_plat_currency_conversion_rate_delete",
    admin_conversion_orders_show_index: "admin_conversion_orders_show_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_table_columns, cmd_admin_plat_currency_conversion_rate_table_columns);
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_index, cmd_admin_plat_currency_conversion_rate_index);
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_show, cmd_admin_plat_currency_conversion_rate_show);
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_store, cmd_admin_plat_currency_conversion_rate_store);
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_update, cmd_admin_plat_currency_conversion_rate_update);
facade.registerCommand(HttpType.admin_plat_currency_conversion_rate_delete, cmd_admin_plat_currency_conversion_rate_delete);
facade.registerCommand(HttpType.admin_conversion_orders_show_index, cmd_admin_conversion_orders_show_index);

