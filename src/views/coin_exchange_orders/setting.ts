/**
 * description: 定时任务
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706722
 */
import cmd_admin_coin_exchange_orders_table_columns from "@/views/coin_exchange_orders/command/cmd_admin_coin_exchange_orders_table_columns";
import cmd_admin_coin_exchange_orders_index from "@/views/coin_exchange_orders/command/cmd_admin_coin_exchange_orders_index";
import cmd_admin_coin_exchange_orders_finish_order from "@/views/coin_exchange_orders/command/cmd_admin_coin_exchange_orders_finish_order";
import cmd_admin_coin_exchange_orders_close_order_return_gold from "@/views/coin_exchange_orders/command/cmd_admin_coin_exchange_orders_close_order_return_gold";
import cmd_admin_coin_exchange_orders_close_order from "@/views/coin_exchange_orders/command/cmd_admin_coin_exchange_orders_close_order";
import cmd_admin_admin_user_mine from "@/views/coin_exchange_orders/command/cmd_admin_admin_user_mine";
/**协议*/
export var HttpType = {
    admin_coin_exchange_orders_table_columns: "admin/coin_exchange_orders/table_columns",
    admin_coin_exchange_orders_index: "admin/coin_exchange_orders/index",
    admin_coin_exchange_orders_finish_order: "admin/coin_exchange_orders/finish_order/{id}",
    admin_coin_exchange_orders_close_order_return_gold: "admin/coin_exchange_orders/close_order_return_gold/{id}",
    admin_coin_exchange_orders_close_order: "admin/coin_exchange_orders/close_order/{id}",
    admin_admin_user_mine: "admin/admin_user/mine",
};
/**事件*/
export var EventType = {
    admin_coin_exchange_orders_table_columns: "admin_coin_exchange_orders_table_columns",
    admin_coin_exchange_orders_index: "admin_coin_exchange_orders_index",
    admin_coin_exchange_orders_finish_order: "admin_coin_exchange_orders_finish_order",
    admin_coin_exchange_orders_close_order_return_gold: "admin_coin_exchange_orders_close_order_return_gold",
    admin_coin_exchange_orders_close_order: "admin_coin_exchange_orders_close_order",
    admin_admin_user_mine: "admin_admin_user_mine",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_coin_exchange_orders_table_columns, cmd_admin_coin_exchange_orders_table_columns);
facade.registerCommand(HttpType.admin_coin_exchange_orders_index, cmd_admin_coin_exchange_orders_index);
facade.registerCommand(HttpType.admin_coin_exchange_orders_finish_order, cmd_admin_coin_exchange_orders_finish_order);
facade.registerCommand(HttpType.admin_coin_exchange_orders_close_order_return_gold, cmd_admin_coin_exchange_orders_close_order_return_gold);
facade.registerCommand(HttpType.admin_coin_exchange_orders_close_order, cmd_admin_coin_exchange_orders_close_order);
facade.registerCommand(HttpType.admin_admin_user_mine, cmd_admin_admin_user_mine);

