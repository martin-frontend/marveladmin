/**
 * description: 代币帐号管理
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766094
 */
import cmd_admin_block_transfer_account_table_columns from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_table_columns";
import cmd_admin_block_transfer_account_index from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_index";
import cmd_admin_block_transfer_account_show from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_show";
import cmd_admin_block_transfer_account_store from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_store";
import cmd_admin_block_transfer_account_update from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_update";
import cmd_admin_block_transfer_account_balance from "@/views/block_transfer_account/command/cmd_admin_block_transfer_account_balance";
/**协议*/
export var HttpType = {
    admin_block_transfer_account_table_columns: "admin/block_transfer_account/table_columns",
    admin_block_transfer_account_index: "admin/block_transfer_account/index",
    admin_block_transfer_account_show: "admin/block_transfer_account/show/{id}",
    admin_block_transfer_account_store: "admin/block_transfer_account/store",
    admin_block_transfer_account_update: "admin/block_transfer_account/update/{id}",
    admin_block_transfer_account_balance: "admin/block_transfer_account/balance/{id}",
};
/**事件*/
export var EventType = {
    admin_block_transfer_account_table_columns: "admin_block_transfer_account_table_columns",
    admin_block_transfer_account_index: "admin_block_transfer_account_index",
    admin_block_transfer_account_show: "admin_block_transfer_account_show",
    admin_block_transfer_account_store: "admin_block_transfer_account_store",
    admin_block_transfer_account_update: "admin_block_transfer_account_update",
    admin_block_transfer_account_balance: "admin_block_transfer_account_balance",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_block_transfer_account_table_columns, cmd_admin_block_transfer_account_table_columns);
facade.registerCommand(HttpType.admin_block_transfer_account_index, cmd_admin_block_transfer_account_index);
facade.registerCommand(HttpType.admin_block_transfer_account_show, cmd_admin_block_transfer_account_show);
facade.registerCommand(HttpType.admin_block_transfer_account_store, cmd_admin_block_transfer_account_store);
facade.registerCommand(HttpType.admin_block_transfer_account_update, cmd_admin_block_transfer_account_update);
facade.registerCommand(HttpType.admin_block_transfer_account_balance, cmd_admin_block_transfer_account_balance);

