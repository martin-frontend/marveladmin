/**
 * description: 平台资产
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766406
 */
import cmd_admin_plats_wallet_table_columns from "@/views/plats_wallet/command/cmd_admin_plats_wallet_table_columns";
import cmd_admin_plats_wallet_index from "@/views/plats_wallet/command/cmd_admin_plats_wallet_index";
/**协议*/
export var HttpType = {
    admin_plats_wallet_table_columns: "admin/plats_wallet/table_columns",
    admin_plats_wallet_index: "admin/plats_wallet/index",
};
/**事件*/
export var EventType = {
    admin_plats_wallet_table_columns: "admin_plats_wallet_table_columns",
    admin_plats_wallet_index: "admin_plats_wallet_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_wallet_table_columns, cmd_admin_plats_wallet_table_columns);
facade.registerCommand(HttpType.admin_plats_wallet_index, cmd_admin_plats_wallet_index);

