/**
 * description: 充值渠道管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705100
 */
import cmd_admin_recharge_channels_table_columns from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_table_columns";
import cmd_admin_recharge_channels_index from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_index";
import cmd_admin_recharge_channels_update from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_update";
import cmd_admin_recharge_channels_paymethods_table_columns from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_paymethods_table_columns";
import cmd_admin_recharge_channels_paymethods_index from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_paymethods_index";
import cmd_admin_recharge_channels_paymethods_show from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_paymethods_show";
import cmd_admin_recharge_channels_paymethods_store from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_paymethods_store";
import cmd_admin_recharge_channels_paymethods_update from "@/views/recharge_channels_paymethods/command/cmd_admin_recharge_channels_paymethods_update";
/**协议*/
export var HttpType = {
    admin_recharge_channels_table_columns: "admin/recharge_channels/table_columns",
    admin_recharge_channels_index: "admin/recharge_channels/index",
    admin_recharge_channels_update: "admin/recharge_channels/update/{id}",
    admin_recharge_channels_paymethods_table_columns: "admin/recharge_channels_paymethods/table_columns",
    admin_recharge_channels_paymethods_index: "admin/recharge_channels_paymethods/index",
    admin_recharge_channels_paymethods_show: "admin/recharge_channels_paymethods/show/{id}",
    admin_recharge_channels_paymethods_store: "admin/recharge_channels_paymethods/store",
    admin_recharge_channels_paymethods_update: "admin/recharge_channels_paymethods/update/{id}",
};
/**事件*/
export var EventType = {
    admin_recharge_channels_table_columns: "admin_recharge_channels_table_columns",
    admin_recharge_channels_index: "admin_recharge_channels_index",
    admin_recharge_channels_update: "admin_recharge_channels_update",
    admin_recharge_channels_paymethods_table_columns: "admin_recharge_channels_paymethods_table_columns",
    admin_recharge_channels_paymethods_index: "admin_recharge_channels_paymethods_index",
    admin_recharge_channels_paymethods_show: "admin_recharge_channels_paymethods_show",
    admin_recharge_channels_paymethods_store: "admin_recharge_channels_paymethods_store",
    admin_recharge_channels_paymethods_update: "admin_recharge_channels_paymethods_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_recharge_channels_table_columns, cmd_admin_recharge_channels_table_columns);
facade.registerCommand(HttpType.admin_recharge_channels_index, cmd_admin_recharge_channels_index);
facade.registerCommand(HttpType.admin_recharge_channels_update, cmd_admin_recharge_channels_update);
facade.registerCommand(HttpType.admin_recharge_channels_paymethods_table_columns, cmd_admin_recharge_channels_paymethods_table_columns);
facade.registerCommand(HttpType.admin_recharge_channels_paymethods_index, cmd_admin_recharge_channels_paymethods_index);
facade.registerCommand(HttpType.admin_recharge_channels_paymethods_show, cmd_admin_recharge_channels_paymethods_show);
facade.registerCommand(HttpType.admin_recharge_channels_paymethods_store, cmd_admin_recharge_channels_paymethods_store);
facade.registerCommand(HttpType.admin_recharge_channels_paymethods_update, cmd_admin_recharge_channels_paymethods_update);

