/**
 * description: VIP充值中心
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707668
 */
import cmd_admin_vip_recharge_table_columns from "@/views/vip_recharge/command/cmd_admin_vip_recharge_table_columns";
import cmd_admin_vip_recharge_recharge from "@/views/vip_recharge/command/cmd_admin_vip_recharge_recharge";
import cmd_admin_coin_wallet_wallet from "@/views/vip_recharge/command/cmd_admin_coin_wallet_wallet";
import cmd_admin_plat_user_table_columns from "@/views/vip_recharge/command/cmd_admin_plat_user_table_columns";
import cmd_admin_plat_user_show from "@/views/vip_recharge/command/cmd_admin_plat_user_show";
/**协议*/
export var HttpType = {
    admin_vip_recharge_table_columns: "admin/vip_recharge/table_columns",
    admin_vip_recharge_recharge: "admin/vip_recharge/recharge",
    admin_coin_wallet_wallet: "admin/coin_wallet/wallet",
    admin_plat_user_table_columns: "admin/plat_user/table_columns",
    admin_plat_user_show: "admin/plat_user/show/{user_id}",
};
/**事件*/
export var EventType = {
    admin_vip_recharge_table_columns: "admin_vip_recharge_table_columns",
    admin_vip_recharge_recharge: "admin_vip_recharge_recharge",
    admin_coin_wallet_wallet: "admin_coin_wallet_wallet",
    admin_plat_user_table_columns: "admin_plat_user_table_columns",
    admin_plat_user_show: "admin_plat_user_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_vip_recharge_table_columns, cmd_admin_vip_recharge_table_columns);
facade.registerCommand(HttpType.admin_vip_recharge_recharge, cmd_admin_vip_recharge_recharge);
facade.registerCommand(HttpType.admin_coin_wallet_wallet, cmd_admin_coin_wallet_wallet);
facade.registerCommand(HttpType.admin_plat_user_table_columns, cmd_admin_plat_user_table_columns);
facade.registerCommand(HttpType.admin_plat_user_show, cmd_admin_plat_user_show);
