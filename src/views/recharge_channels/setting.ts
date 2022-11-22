/**
 * description: 平台充值渠道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1704974
 */
import cmd_admin_recharge_channels_table_columns from "@/views/recharge_channels/command/cmd_admin_recharge_channels_table_columns";
import cmd_admin_recharge_channels_index from "@/views/recharge_channels/command/cmd_admin_recharge_channels_index";
import cmd_admin_recharge_channels_show from "@/views/recharge_channels/command/cmd_admin_recharge_channels_show";
import cmd_admin_recharge_channels_store from "@/views/recharge_channels/command/cmd_admin_recharge_channels_store";
import cmd_admin_recharge_channels_update from "@/views/recharge_channels/command/cmd_admin_recharge_channels_update";
/**协议*/
export var HttpType = {
    admin_recharge_channels_table_columns: "admin/recharge_channels/table_columns",
    admin_recharge_channels_index: "admin/recharge_channels/index",
    admin_recharge_channels_show: "admin/recharge_channels/show/{id}",
    admin_recharge_channels_store: "admin/recharge_channels/store",
    admin_recharge_channels_update: "admin/recharge_channels/update/{id}",
};
/**事件*/
export var EventType = {
    admin_recharge_channels_table_columns: "admin_recharge_channels_table_columns",
    admin_recharge_channels_index: "admin_recharge_channels_index",
    admin_recharge_channels_show: "admin_recharge_channels_show",
    admin_recharge_channels_store: "admin_recharge_channels_store",
    admin_recharge_channels_update: "admin_recharge_channels_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_recharge_channels_table_columns, cmd_admin_recharge_channels_table_columns);
facade.registerCommand(HttpType.admin_recharge_channels_index, cmd_admin_recharge_channels_index);
facade.registerCommand(HttpType.admin_recharge_channels_show, cmd_admin_recharge_channels_show);
facade.registerCommand(HttpType.admin_recharge_channels_store, cmd_admin_recharge_channels_store);
facade.registerCommand(HttpType.admin_recharge_channels_update, cmd_admin_recharge_channels_update);
