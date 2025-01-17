/**
 * description: 平台兑换渠道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705770
 */
import cmd_admin_exchange_channel_table_columns from "@/views/exchange_channel/command/cmd_admin_exchange_channel_table_columns";
import cmd_admin_exchange_channel_index from "@/views/exchange_channel/command/cmd_admin_exchange_channel_index";
import cmd_admin_exchange_channel_show from "@/views/exchange_channel/command/cmd_admin_exchange_channel_show";
import cmd_admin_exchange_channel_store from "@/views/exchange_channel/command/cmd_admin_exchange_channel_store";
import cmd_admin_exchange_channel_update from "@/views/exchange_channel/command/cmd_admin_exchange_channel_update";
import cmd_admin_exchange_channel_method_table_columns from "@/views/exchange_channel/command/cmd_admin_exchange_channel_method_table_columns";
import cmd_admin_exchange_channel_method_show from "@/views/exchange_channel/command/cmd_admin_exchange_channel_method_show";
import cmd_admin_exchange_channel_method_store from "@/views/exchange_channel/command/cmd_admin_exchange_channel_method_store";
import cmd_admin_exchange_channel_method_update from "@/views/exchange_channel/command/cmd_admin_exchange_channel_method_update";
/**协议*/
export var HttpType = {
    admin_exchange_channel_table_columns: "admin/exchange_channel/table_columns",
    admin_exchange_channel_index: "admin/exchange_channel/index",
    admin_exchange_channel_show: "admin/exchange_channel/show/{id}",
    admin_exchange_channel_store: "admin/exchange_channel/store",
    admin_exchange_channel_update: "admin/exchange_channel/update/{id}",
    admin_exchange_channel_method_table_columns: "admin/exchange_channel_method/table_columns",
    admin_exchange_channel_method_show: "admin/exchange_channel_method/show/{id}",
    admin_exchange_channel_method_store: "admin/exchange_channel_method/store",
    admin_exchange_channel_method_update: "admin/exchange_channel_method/update/{id}",
};
/**事件*/
export var EventType = {
    admin_exchange_channel_table_columns: "admin_exchange_channel_table_columns",
    admin_exchange_channel_index: "admin_exchange_channel_index",
    admin_exchange_channel_show: "admin_exchange_channel_show",
    admin_exchange_channel_store: "admin_exchange_channel_store",
    admin_exchange_channel_update: "admin_exchange_channel_update",
    admin_exchange_channel_method_table_columns: "admin_exchange_channel_method_table_columns",
    admin_exchange_channel_method_show: "admin_exchange_channel_method_show",
    admin_exchange_channel_method_store: "admin_exchange_channel_method_store",
    admin_exchange_channel_method_update: "admin_exchange_channel_method_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_exchange_channel_table_columns, cmd_admin_exchange_channel_table_columns);
facade.registerCommand(HttpType.admin_exchange_channel_index, cmd_admin_exchange_channel_index);
facade.registerCommand(HttpType.admin_exchange_channel_show, cmd_admin_exchange_channel_show);
facade.registerCommand(HttpType.admin_exchange_channel_store, cmd_admin_exchange_channel_store);
facade.registerCommand(HttpType.admin_exchange_channel_update, cmd_admin_exchange_channel_update);
facade.registerCommand(
    HttpType.admin_exchange_channel_method_table_columns,
    cmd_admin_exchange_channel_method_table_columns
);
facade.registerCommand(HttpType.admin_exchange_channel_method_show, cmd_admin_exchange_channel_method_show);
facade.registerCommand(HttpType.admin_exchange_channel_method_store, cmd_admin_exchange_channel_method_store);
facade.registerCommand(HttpType.admin_exchange_channel_method_update, cmd_admin_exchange_channel_method_update);
