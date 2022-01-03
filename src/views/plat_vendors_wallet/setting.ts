/**
 * description: 平台钱包
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1704160
 */
import cmd_admin_plat_vendors_wallet_table_columns from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_table_columns";
import cmd_admin_plat_vendors_wallet_index from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_index";
import cmd_admin_plat_vendors_wallet_show from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_show";
import cmd_admin_plat_vendors_wallet_store from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_store";
import cmd_admin_plat_vendors_wallet_update from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_update";
import cmd_admin_plat_vendors_wallet_index_vendors from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_index_vendors";
import cmd_admin_plat_vendors_wallet_update_gold from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_update_gold";
import cmd_admin_plat_vendors_wallet_log_table_columns from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_log_table_columns";
import cmd_admin_plat_vendors_wallet_log_index from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_log_index";
import cmd_admin_plat_vendors_wallet_log_show from "@/views/plat_vendors_wallet/command/cmd_admin_plat_vendors_wallet_log_show";
import cmd_admin_plat_wallet_update_gold from "@/views/plat_vendors_wallet/command/cmd_admin_plat_wallet_update_gold";
import cmd_admin_plat_wallet_log_index from "@/views/plat_vendors_wallet/command/cmd_admin_plat_wallet_log_index";
/**协议*/
export var HttpType = {
    admin_plat_vendors_wallet_table_columns: "admin/plat_vendors_wallet/table_columns",
    admin_plat_vendors_wallet_index: "admin/plat_vendors_wallet/index",
    admin_plat_vendors_wallet_show: "admin/plat_vendors_wallet/show/{id}",
    admin_plat_vendors_wallet_store: "admin/plat_vendors_wallet/store",
    admin_plat_vendors_wallet_update: "admin/plat_vendors_wallet/update/{id}",
    admin_plat_vendors_wallet_index_vendors: "admin/plat_vendors_wallet/index/{plat_id}/vendors",
    admin_plat_vendors_wallet_update_gold: "admin/plat_vendors_wallet/update/{id}/gold",
    admin_plat_vendors_wallet_log_table_columns: "admin/plat_vendors_wallet_log/table_columns",
    admin_plat_vendors_wallet_log_index: "admin/plat_vendors_wallet_log/index",
    admin_plat_vendors_wallet_log_show: "admin/plat_vendors_wallet_log/show/{id}",
    admin_plat_wallet_update_gold: "admin/plat_wallet/update/{plat_id}/gold",
    admin_plat_wallet_log_index: "admin/plat_wallet_log/index",
};
/**事件*/
export var EventType = {
    admin_plat_vendors_wallet_table_columns: "admin_plat_vendors_wallet_table_columns",
    admin_plat_vendors_wallet_index: "admin_plat_vendors_wallet_index",
    admin_plat_vendors_wallet_show: "admin_plat_vendors_wallet_show",
    admin_plat_vendors_wallet_store: "admin_plat_vendors_wallet_store",
    admin_plat_vendors_wallet_update: "admin_plat_vendors_wallet_update",
    admin_plat_vendors_wallet_index_vendors: "admin_plat_vendors_wallet_index_vendors",
    admin_plat_vendors_wallet_update_gold: "admin_plat_vendors_wallet_update_gold",
    admin_plat_vendors_wallet_log_table_columns: "admin_plat_vendors_wallet_log_table_columns",
    admin_plat_vendors_wallet_log_index: "admin_plat_vendors_wallet_log_index",
    admin_plat_vendors_wallet_log_show: "admin_plat_vendors_wallet_log_show",
    admin_plat_wallet_update_gold: "admin_plat_wallet_update_gold",
    admin_plat_wallet_log_index: "admin_plat_wallet_log_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_vendors_wallet_table_columns, cmd_admin_plat_vendors_wallet_table_columns);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_index, cmd_admin_plat_vendors_wallet_index);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_show, cmd_admin_plat_vendors_wallet_show);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_store, cmd_admin_plat_vendors_wallet_store);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_update, cmd_admin_plat_vendors_wallet_update);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_index_vendors, cmd_admin_plat_vendors_wallet_index_vendors);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_update_gold, cmd_admin_plat_vendors_wallet_update_gold);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_log_table_columns, cmd_admin_plat_vendors_wallet_log_table_columns);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_log_index, cmd_admin_plat_vendors_wallet_log_index);
facade.registerCommand(HttpType.admin_plat_vendors_wallet_log_show, cmd_admin_plat_vendors_wallet_log_show);
facade.registerCommand(HttpType.admin_plat_wallet_update_gold, cmd_admin_plat_wallet_update_gold);
facade.registerCommand(HttpType.admin_plat_wallet_log_index, cmd_admin_plat_wallet_log_index);

