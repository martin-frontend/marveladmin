/**
 * description: 用户兑换订单
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1705433
 */
import cmd_admin_exchange_orders_table_columns from "@/views/exchange_orders/command/cmd_admin_exchange_orders_table_columns";
import cmd_admin_exchange_orders_index from "@/views/exchange_orders/command/cmd_admin_exchange_orders_index";
import cmd_admin_exchange_orders_approved from "@/views/exchange_orders/command/cmd_admin_exchange_orders_approved";
import cmd_admin_exchange_orders_close_order_return_gold from "@/views/exchange_orders/command/cmd_admin_exchange_orders_close_order_return_gold";
import cmd_admin_exchange_orders_close_order from "@/views/exchange_orders/command/cmd_admin_exchange_orders_close_order";
import cmd_admin_exchange_orders_finish_order from "@/views/exchange_orders/command/cmd_admin_exchange_orders_finish_order";
import cmd_admin_exchange_orders_update_channel from "@/views/exchange_orders/command/cmd_admin_exchange_orders_update_channel";
import cmd_admin_exchange_auto_check_setting_table_columns from "@/views/exchange_orders/command/cmd_admin_exchange_auto_check_setting_table_columns";
import cmd_admin_exchange_auto_check_setting_show from "@/views/exchange_orders/command/cmd_admin_exchange_auto_check_setting_show";
import cmd_admin_exchange_auto_check_setting_store from "@/views/exchange_orders/command/cmd_admin_exchange_auto_check_setting_store";
import cmd_admin_exchange_auto_check_setting_update from "@/views/exchange_orders/command/cmd_admin_exchange_auto_check_setting_update";
import cmd_admin_exchange_orders_rush from "@/views/exchange_orders/command/cmd_admin_exchange_orders_rush";
import cmd_admin_exchange_orders_update_remark from "@/views/exchange_orders/command/cmd_admin_exchange_orders_update_remark";
import cmd_admin_exchange_orders_dispatch from "@/views/exchange_orders/command/cmd_admin_exchange_orders_dispatch";
import cmd_admin_exchange_orders_dispatch_cancel from "@/views/exchange_orders/command/cmd_admin_exchange_orders_dispatch_cancel";
import cmd_admin_exchange_orders_manual_refund from "@/views/exchange_orders/command/cmd_admin_exchange_orders_manual_refund";
import cmd_admin_exchange_orders_batch_accept from "@/views/exchange_orders/command/cmd_admin_exchange_orders_batch_accept";
import cmd_admin_exchange_orders_batch_cancel_accept from "@/views/exchange_orders/command/cmd_admin_exchange_orders_batch_cancel_accept";
/**协议*/
export var HttpType = {
    admin_exchange_orders_table_columns: "admin/exchange_orders/table_columns",
    admin_exchange_orders_index: "admin/exchange_orders/index",
    admin_exchange_orders_approved: "admin/exchange_orders/approved/{id}",
    admin_exchange_orders_close_order_return_gold: "admin/exchange_orders/close_order_return_gold/{id}",
    admin_exchange_orders_close_order: "admin/exchange_orders/close_order/{id}",
    admin_exchange_orders_finish_order: "admin/exchange_orders/finish_order/{id}",
    admin_exchange_orders_update_channel: "admin/exchange_orders/update_channel/{id}",
    admin_exchange_auto_check_setting_table_columns: "admin/exchange_auto_check_setting/table_columns",
    admin_exchange_auto_check_setting_show: "admin/exchange_auto_check_setting/show/{plat_id}",
    admin_exchange_auto_check_setting_store: "admin/exchange_auto_check_setting/store",
    admin_exchange_auto_check_setting_update: "admin/exchange_auto_check_setting/update/{plat_id}",
    admin_exchange_orders_rush: "admin/exchange_orders/rush/{id}",
    admin_exchange_orders_update_remark: "admin/exchange_orders/update_remark/{id}",
    admin_exchange_orders_dispatch: "admin/exchange_orders/dispatch/{id}",
    admin_exchange_orders_dispatch_cancel: "admin/exchange_orders/dispatch_cancel/{id}",
    admin_exchange_orders_manual_refund: "admin/exchange_orders/manual_refund/{id}",
    admin_exchange_orders_batch_accept: "admin/exchange_orders/batch_accept",
    admin_exchange_orders_batch_cancel_accept: "admin/exchange_orders/batch_cancel_accept",
};
/**事件*/
export var EventType = {
    admin_exchange_orders_table_columns: "admin_exchange_orders_table_columns",
    admin_exchange_orders_index: "admin_exchange_orders_index",
    admin_exchange_orders_approved: "admin_exchange_orders_approved",
    admin_exchange_orders_close_order_return_gold: "admin_exchange_orders_close_order_return_gold",
    admin_exchange_orders_close_order: "admin_exchange_orders_close_order",
    admin_exchange_orders_finish_order: "admin_exchange_orders_finish_order",
    admin_exchange_orders_update_channel: "admin_exchange_orders_update_channel",
    admin_exchange_auto_check_setting_table_columns: "admin_exchange_auto_check_setting_table_columns",
    admin_exchange_auto_check_setting_show: "admin_exchange_auto_check_setting_show",
    admin_exchange_auto_check_setting_store: "admin_exchange_auto_check_setting_store",
    admin_exchange_auto_check_setting_update: "admin_exchange_auto_check_setting_update",
    admin_exchange_orders_rush: "admin_exchange_orders_rush",
    admin_exchange_orders_update_remark: "admin_exchange_orders_update_remark",
    admin_exchange_orders_dispatch: "admin_exchange_orders_dispatch",
    admin_exchange_orders_dispatch_cancel: "admin_exchange_orders_dispatch_cancel",
    admin_exchange_orders_manual_refund: "admin_exchange_orders_manual_refund",
    admin_exchange_orders_batch_accept: "admin_exchange_orders_batch_accept",
    admin_exchange_orders_batch_cancel_accept: "admin_exchange_orders_batch_cancel_accept",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_exchange_orders_table_columns, cmd_admin_exchange_orders_table_columns);
facade.registerCommand(HttpType.admin_exchange_orders_index, cmd_admin_exchange_orders_index);
facade.registerCommand(HttpType.admin_exchange_orders_approved, cmd_admin_exchange_orders_approved);
facade.registerCommand(HttpType.admin_exchange_orders_close_order_return_gold, cmd_admin_exchange_orders_close_order_return_gold);
facade.registerCommand(HttpType.admin_exchange_orders_close_order, cmd_admin_exchange_orders_close_order);
facade.registerCommand(HttpType.admin_exchange_orders_finish_order, cmd_admin_exchange_orders_finish_order);
facade.registerCommand(HttpType.admin_exchange_orders_update_channel, cmd_admin_exchange_orders_update_channel);
facade.registerCommand(HttpType.admin_exchange_auto_check_setting_table_columns, cmd_admin_exchange_auto_check_setting_table_columns);
facade.registerCommand(HttpType.admin_exchange_auto_check_setting_show, cmd_admin_exchange_auto_check_setting_show);
facade.registerCommand(HttpType.admin_exchange_auto_check_setting_store, cmd_admin_exchange_auto_check_setting_store);
facade.registerCommand(HttpType.admin_exchange_auto_check_setting_update, cmd_admin_exchange_auto_check_setting_update);
facade.registerCommand(HttpType.admin_exchange_orders_rush, cmd_admin_exchange_orders_rush);
facade.registerCommand(HttpType.admin_exchange_orders_update_remark, cmd_admin_exchange_orders_update_remark);
facade.registerCommand(HttpType.admin_exchange_orders_dispatch, cmd_admin_exchange_orders_dispatch);
facade.registerCommand(HttpType.admin_exchange_orders_dispatch_cancel, cmd_admin_exchange_orders_dispatch_cancel);
facade.registerCommand(HttpType.admin_exchange_orders_manual_refund, cmd_admin_exchange_orders_manual_refund);
facade.registerCommand(HttpType.admin_exchange_orders_batch_accept, cmd_admin_exchange_orders_batch_accept);
facade.registerCommand(HttpType.admin_exchange_orders_batch_cancel_accept, cmd_admin_exchange_orders_batch_cancel_accept);

