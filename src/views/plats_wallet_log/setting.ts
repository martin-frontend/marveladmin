/**
 * description: 平台资产明细
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766406
 */
import cmd_admin_plats_wallet_log_table_columns from "@/views/plats_wallet_log/command/cmd_admin_plats_wallet_log_table_columns";
import cmd_admin_plats_wallet_log_index from "@/views/plats_wallet_log/command/cmd_admin_plats_wallet_log_index";
/**协议*/
export var HttpType = {
    admin_plats_wallet_log_table_columns: "admin/plats_wallet_log/table_columns",
    admin_plats_wallet_log_index: "admin/plats_wallet_log/index",
};
/**事件*/
export var EventType = {
    admin_plats_wallet_log_table_columns: "admin_plats_wallet_log_table_columns",
    admin_plats_wallet_log_index: "admin_plats_wallet_log_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_wallet_log_table_columns, cmd_admin_plats_wallet_log_table_columns);
facade.registerCommand(HttpType.admin_plats_wallet_log_index, cmd_admin_plats_wallet_log_index);
