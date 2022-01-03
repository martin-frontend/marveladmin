/**
 * description: 币商充值订单
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706722
 */
import cmd_admin_coin_receive_recharge_order_table_columns from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_receive_recharge_order_table_columns";
import cmd_admin_coin_receive_recharge_order_index from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_receive_recharge_order_index";
import cmd_admin_coin_receive_recharge_order_show from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_receive_recharge_order_show";
import cmd_admin_coin_receive_recharge_order_close from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_receive_recharge_order_close";
import cmd_admin_coin_receive_recharge_order_confirm from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_receive_recharge_order_confirm";
import cmd_admin_coin_wallet_wallet from "@/views/coin_receive_recharge_order/command/cmd_admin_coin_wallet_wallet";
/**协议*/
export var HttpType = {
    admin_coin_receive_recharge_order_table_columns: "admin/coin_receive_recharge_order/table_columns",
    admin_coin_receive_recharge_order_index: "admin/coin_receive_recharge_order/index",
    admin_coin_receive_recharge_order_show: "admin/coin_receive_recharge_order/show/{id}",
    admin_coin_receive_recharge_order_close: "admin/coin_receive_recharge_order/close/{id}",
    admin_coin_receive_recharge_order_confirm: "admin/coin_receive_recharge_order/confirm/{id}",
    admin_coin_wallet_wallet: "admin/coin_wallet/wallet",
};
/**事件*/
export var EventType = {
    admin_coin_receive_recharge_order_table_columns: "admin_coin_receive_recharge_order_table_columns",
    admin_coin_receive_recharge_order_index: "admin_coin_receive_recharge_order_index",
    admin_coin_receive_recharge_order_show: "admin_coin_receive_recharge_order_show",
    admin_coin_receive_recharge_order_close: "admin_coin_receive_recharge_order_close",
    admin_coin_receive_recharge_order_confirm: "admin_coin_receive_recharge_order_confirm",
    admin_coin_wallet_wallet: "admin_coin_wallet_wallet",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_coin_receive_recharge_order_table_columns, cmd_admin_coin_receive_recharge_order_table_columns);
facade.registerCommand(HttpType.admin_coin_receive_recharge_order_index, cmd_admin_coin_receive_recharge_order_index);
facade.registerCommand(HttpType.admin_coin_receive_recharge_order_show, cmd_admin_coin_receive_recharge_order_show);
facade.registerCommand(HttpType.admin_coin_receive_recharge_order_close, cmd_admin_coin_receive_recharge_order_close);
facade.registerCommand(HttpType.admin_coin_receive_recharge_order_confirm, cmd_admin_coin_receive_recharge_order_confirm);
facade.registerCommand(HttpType.admin_coin_wallet_wallet, cmd_admin_coin_wallet_wallet);

