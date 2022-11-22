/**
 * description: 平台VIP通道
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707582
 */
import cmd_admin_vip_receive_payment_channel_table_columns from "@/views/vip_receive_payment_channel/command/cmd_admin_vip_receive_payment_channel_table_columns";
import cmd_admin_vip_receive_payment_channel_index from "@/views/vip_receive_payment_channel/command/cmd_admin_vip_receive_payment_channel_index";
import cmd_admin_vip_receive_payment_channel_show from "@/views/vip_receive_payment_channel/command/cmd_admin_vip_receive_payment_channel_show";
import cmd_admin_vip_receive_payment_channel_store from "@/views/vip_receive_payment_channel/command/cmd_admin_vip_receive_payment_channel_store";
import cmd_admin_vip_receive_payment_channel_update from "@/views/vip_receive_payment_channel/command/cmd_admin_vip_receive_payment_channel_update";
/**协议*/
export var HttpType = {
    admin_vip_receive_payment_channel_table_columns: "admin/vip_receive_payment_channel/table_columns",
    admin_vip_receive_payment_channel_index: "admin/vip_receive_payment_channel/index",
    admin_vip_receive_payment_channel_show: "admin/vip_receive_payment_channel/show/{id}",
    admin_vip_receive_payment_channel_store: "admin/vip_receive_payment_channel/store",
    admin_vip_receive_payment_channel_update: "admin/vip_receive_payment_channel/update/{id}",
};
/**事件*/
export var EventType = {
    admin_vip_receive_payment_channel_table_columns: "admin_vip_receive_payment_channel_table_columns",
    admin_vip_receive_payment_channel_index: "admin_vip_receive_payment_channel_index",
    admin_vip_receive_payment_channel_show: "admin_vip_receive_payment_channel_show",
    admin_vip_receive_payment_channel_store: "admin_vip_receive_payment_channel_store",
    admin_vip_receive_payment_channel_update: "admin_vip_receive_payment_channel_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_vip_receive_payment_channel_table_columns,
    cmd_admin_vip_receive_payment_channel_table_columns
);
facade.registerCommand(HttpType.admin_vip_receive_payment_channel_index, cmd_admin_vip_receive_payment_channel_index);
facade.registerCommand(HttpType.admin_vip_receive_payment_channel_show, cmd_admin_vip_receive_payment_channel_show);
facade.registerCommand(HttpType.admin_vip_receive_payment_channel_store, cmd_admin_vip_receive_payment_channel_store);
facade.registerCommand(HttpType.admin_vip_receive_payment_channel_update, cmd_admin_vip_receive_payment_channel_update);
