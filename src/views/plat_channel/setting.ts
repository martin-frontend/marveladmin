/**
 * description: 渠道管理
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558267
 */
import cmd_admin_plat_channel_table_columns from "@/views/plat_channel/command/cmd_admin_plat_channel_table_columns";
import cmd_admin_plat_channel_index from "@/views/plat_channel/command/cmd_admin_plat_channel_index";
import cmd_admin_plat_channel_store from "@/views/plat_channel/command/cmd_admin_plat_channel_store";
import cmd_admin_plat_channel_show from "@/views/plat_channel/command/cmd_admin_plat_channel_show";
import cmd_admin_plat_channel_update from "@/views/plat_channel/command/cmd_admin_plat_channel_update";
/**协议*/
export var HttpType = {
    admin_plat_channel_table_columns: "admin/plat_channel/table_columns",
    admin_plat_channel_index: "admin/plat_channel/index",
    admin_plat_channel_store: "admin/plat_channel/store",
    admin_plat_channel_show: "admin/plat_channel/show/{id}",
    admin_plat_channel_update: "admin/plat_channel/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_channel_table_columns: "admin_plat_channel_table_columns",
    admin_plat_channel_index: "admin_plat_channel_index",
    admin_plat_channel_store: "admin_plat_channel_store",
    admin_plat_channel_show: "admin_plat_channel_show",
    admin_plat_channel_update: "admin_plat_channel_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_channel_table_columns, cmd_admin_plat_channel_table_columns);
facade.registerCommand(HttpType.admin_plat_channel_index, cmd_admin_plat_channel_index);
facade.registerCommand(HttpType.admin_plat_channel_store, cmd_admin_plat_channel_store);
facade.registerCommand(HttpType.admin_plat_channel_show, cmd_admin_plat_channel_show);
facade.registerCommand(HttpType.admin_plat_channel_update, cmd_admin_plat_channel_update);

