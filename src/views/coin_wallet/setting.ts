/**
 * description: 币商管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707580
 */
import cmd_admin_coin_wallet_table_columns from "@/views/coin_wallet/command/cmd_admin_coin_wallet_table_columns";
import cmd_admin_coin_wallet_index from "@/views/coin_wallet/command/cmd_admin_coin_wallet_index";
import cmd_admin_coin_wallet_wallet from "@/views/coin_wallet/command/cmd_admin_coin_wallet_wallet";
import cmd_admin_coin_wallet_deposit from "@/views/coin_wallet/command/cmd_admin_coin_wallet_deposit";
import cmd_admin_coin_wallet_withdraw from "@/views/coin_wallet/command/cmd_admin_coin_wallet_withdraw";
import cmd_admin_coin_wallet_log_table_columns from "@/views/coin_wallet/command/cmd_admin_coin_wallet_log_table_columns";
import cmd_admin_coin_wallet_log_index from "@/views/coin_wallet/command/cmd_admin_coin_wallet_log_index";
import cmd_admin_coin_wallet_update from "@/views/coin_wallet/command/cmd_admin_coin_wallet_update";
import cmd_admin_admin_user_mine from "@/views/coin_wallet/command/cmd_admin_admin_user_mine";
/**协议*/
export var HttpType = {
    admin_coin_wallet_table_columns: "admin/coin_wallet/table_columns",
    admin_coin_wallet_index: "admin/coin_wallet/index",
    admin_coin_wallet_wallet: "admin/coin_wallet/wallet",
    admin_coin_wallet_deposit: "admin/coin_wallet/deposit/{id}",
    admin_coin_wallet_withdraw: "admin/coin_wallet/withdraw/{id}",
    admin_coin_wallet_log_table_columns: "admin/coin_wallet_log/table_columns",
    admin_coin_wallet_log_index: "admin/coin_wallet_log/index",
    admin_coin_wallet_update: "admin/coin_wallet/update/{id}",
    admin_admin_user_mine: "admin/admin_user/mine",
};
/**事件*/
export var EventType = {
    admin_coin_wallet_table_columns: "admin_coin_wallet_table_columns",
    admin_coin_wallet_index: "admin_coin_wallet_index",
    admin_coin_wallet_wallet: "admin_coin_wallet_wallet",
    admin_coin_wallet_deposit: "admin_coin_wallet_deposit",
    admin_coin_wallet_withdraw: "admin_coin_wallet_withdraw",
    admin_coin_wallet_log_table_columns: "admin_coin_wallet_log_table_columns",
    admin_coin_wallet_log_index: "admin_coin_wallet_log_index",
    admin_coin_wallet_update: "admin_coin_wallet_update",
    admin_admin_user_mine: "admin_admin_user_mine",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_coin_wallet_table_columns, cmd_admin_coin_wallet_table_columns);
facade.registerCommand(HttpType.admin_coin_wallet_index, cmd_admin_coin_wallet_index);
facade.registerCommand(HttpType.admin_coin_wallet_wallet, cmd_admin_coin_wallet_wallet);
facade.registerCommand(HttpType.admin_coin_wallet_deposit, cmd_admin_coin_wallet_deposit);
facade.registerCommand(HttpType.admin_coin_wallet_withdraw, cmd_admin_coin_wallet_withdraw);
facade.registerCommand(HttpType.admin_coin_wallet_log_table_columns, cmd_admin_coin_wallet_log_table_columns);
facade.registerCommand(HttpType.admin_coin_wallet_log_index, cmd_admin_coin_wallet_log_index);
facade.registerCommand(HttpType.admin_coin_wallet_update, cmd_admin_coin_wallet_update);
facade.registerCommand(HttpType.admin_admin_user_mine, cmd_admin_admin_user_mine);

