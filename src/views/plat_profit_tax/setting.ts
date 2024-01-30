/**
 * description: 营利税收管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75271146
 */
import cmd_admin_plat_profit_tax_table_columns from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_table_columns";
import cmd_admin_plat_profit_tax_index from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_index";
import cmd_admin_plat_profit_tax_show from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_show";
import cmd_admin_plat_profit_tax_store from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_store";
import cmd_admin_plat_profit_tax_update from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_update";
import cmd_admin_plat_profit_tax_delete from "@/views/plat_profit_tax/command/cmd_admin_plat_profit_tax_delete";
/**协议*/
export var HttpType = {
    admin_plat_profit_tax_table_columns: "admin/plat_profit_tax/table_columns",
    admin_plat_profit_tax_index: "admin/plat_profit_tax/index",
    admin_plat_profit_tax_show: "admin/plat_profit_tax/show/{id}",
    admin_plat_profit_tax_store: "admin/plat_profit_tax/store",
    admin_plat_profit_tax_update: "admin/plat_profit_tax/update/{id}",
    admin_plat_profit_tax_delete: "admin/plat_profit_tax/delete/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_profit_tax_table_columns: "admin_plat_profit_tax_table_columns",
    admin_plat_profit_tax_index: "admin_plat_profit_tax_index",
    admin_plat_profit_tax_show: "admin_plat_profit_tax_show",
    admin_plat_profit_tax_store: "admin_plat_profit_tax_store",
    admin_plat_profit_tax_update: "admin_plat_profit_tax_update",
    admin_plat_profit_tax_delete: "admin_plat_profit_tax_delete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_profit_tax_table_columns, cmd_admin_plat_profit_tax_table_columns);
facade.registerCommand(HttpType.admin_plat_profit_tax_index, cmd_admin_plat_profit_tax_index);
facade.registerCommand(HttpType.admin_plat_profit_tax_show, cmd_admin_plat_profit_tax_show);
facade.registerCommand(HttpType.admin_plat_profit_tax_store, cmd_admin_plat_profit_tax_store);
facade.registerCommand(HttpType.admin_plat_profit_tax_update, cmd_admin_plat_profit_tax_update);
facade.registerCommand(HttpType.admin_plat_profit_tax_delete, cmd_admin_plat_profit_tax_delete);

