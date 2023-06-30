/**
 * description: 国家信息
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1704626
 */
import cmd_admin_country_table_columns from "@/views/country/command/cmd_admin_country_table_columns";
import cmd_admin_country_index from "@/views/country/command/cmd_admin_country_index";
import cmd_admin_country_show from "@/views/country/command/cmd_admin_country_show";
import cmd_admin_country_store from "@/views/country/command/cmd_admin_country_store";
import cmd_admin_country_update from "@/views/country/command/cmd_admin_country_update";
/**协议*/
export var HttpType = {
    admin_country_table_columns: "admin/country/table_columns",
    admin_country_index: "admin/country/index",
    admin_country_show: "admin/country/show/{id}",
    admin_country_store: "admin/country/store",
    admin_country_update: "admin/country/update/{id}",
};
/**事件*/
export var EventType = {
    admin_country_table_columns: "admin_country_table_columns",
    admin_country_index: "admin_country_index",
    admin_country_show: "admin_country_show",
    admin_country_store: "admin_country_store",
    admin_country_update: "admin_country_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_country_table_columns, cmd_admin_country_table_columns);
facade.registerCommand(HttpType.admin_country_index, cmd_admin_country_index);
facade.registerCommand(HttpType.admin_country_show, cmd_admin_country_show);
facade.registerCommand(HttpType.admin_country_store, cmd_admin_country_store);
facade.registerCommand(HttpType.admin_country_update, cmd_admin_country_update);

