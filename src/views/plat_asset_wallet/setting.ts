/**
 * description: 资产钱包
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766755
 */
import cmd_admin_plat_asset_wallet_table_columns from "@/views/plat_asset_wallet/command/cmd_admin_plat_asset_wallet_table_columns";
import cmd_admin_plat_asset_wallet_index from "@/views/plat_asset_wallet/command/cmd_admin_plat_asset_wallet_index";
/**协议*/
export var HttpType = {
    admin_plat_asset_wallet_table_columns: "admin/plat_asset_wallet/table_columns",
    admin_plat_asset_wallet_index: "admin/plat_asset_wallet/index",
};
/**事件*/
export var EventType = {
    admin_plat_asset_wallet_table_columns: "admin_plat_asset_wallet_table_columns",
    admin_plat_asset_wallet_index: "admin_plat_asset_wallet_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_asset_wallet_table_columns, cmd_admin_plat_asset_wallet_table_columns);
facade.registerCommand(HttpType.admin_plat_asset_wallet_index, cmd_admin_plat_asset_wallet_index);

