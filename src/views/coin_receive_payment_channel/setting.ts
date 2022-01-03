/**
 * description: 币商收款通道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707530
 */
import cmd_admin_coin_receive_payment_channel_table_columns from "@/views/coin_receive_payment_channel/command/cmd_admin_coin_receive_payment_channel_table_columns";
import cmd_admin_coin_receive_payment_channel_index from "@/views/coin_receive_payment_channel/command/cmd_admin_coin_receive_payment_channel_index";
import cmd_admin_coin_receive_payment_channel_show from "@/views/coin_receive_payment_channel/command/cmd_admin_coin_receive_payment_channel_show";
import cmd_admin_coin_receive_payment_channel_store from "@/views/coin_receive_payment_channel/command/cmd_admin_coin_receive_payment_channel_store";
import cmd_admin_coin_receive_payment_channel_update from "@/views/coin_receive_payment_channel/command/cmd_admin_coin_receive_payment_channel_update";
import cmd_admin_common_bank_list from "@/views/coin_receive_payment_channel/command/cmd_admin_common_bank_list";
import cmd_admin_resource_upload from "@/views/coin_receive_payment_channel/command/cmd_admin_resource_upload";
/**协议*/
export var HttpType = {
    admin_coin_receive_payment_channel_table_columns: "admin/coin_receive_payment_channel/table_columns",
    admin_coin_receive_payment_channel_index: "admin/coin_receive_payment_channel/index",
    admin_coin_receive_payment_channel_show: "admin/coin_receive_payment_channel/show/{id}",
    admin_coin_receive_payment_channel_store: "admin/coin_receive_payment_channel/store",
    admin_coin_receive_payment_channel_update: "admin/coin_receive_payment_channel/update/{id}",
    admin_common_bank_list: "admin/common/bank_list",
    admin_resource_upload: "admin/resource/upload",
};
/**事件*/
export var EventType = {
    admin_coin_receive_payment_channel_table_columns: "admin_coin_receive_payment_channel_table_columns",
    admin_coin_receive_payment_channel_index: "admin_coin_receive_payment_channel_index",
    admin_coin_receive_payment_channel_show: "admin_coin_receive_payment_channel_show",
    admin_coin_receive_payment_channel_store: "admin_coin_receive_payment_channel_store",
    admin_coin_receive_payment_channel_update: "admin_coin_receive_payment_channel_update",
    admin_common_bank_list: "admin_common_bank_list",
    admin_resource_upload: "admin_resource_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_coin_receive_payment_channel_table_columns, cmd_admin_coin_receive_payment_channel_table_columns);
facade.registerCommand(HttpType.admin_coin_receive_payment_channel_index, cmd_admin_coin_receive_payment_channel_index);
facade.registerCommand(HttpType.admin_coin_receive_payment_channel_show, cmd_admin_coin_receive_payment_channel_show);
facade.registerCommand(HttpType.admin_coin_receive_payment_channel_store, cmd_admin_coin_receive_payment_channel_store);
facade.registerCommand(HttpType.admin_coin_receive_payment_channel_update, cmd_admin_coin_receive_payment_channel_update);
facade.registerCommand(HttpType.admin_common_bank_list, cmd_admin_common_bank_list);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);

