/**
 * description: 平台公告管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67042, http://18.166.154.73:8090/pages/viewpage.action?pageId=65748
 */
import cmd_admin_plat_users_bet_table_columns from "@/views/promotion_discount_index/command/cmd_admin_plat_users_bet_table_columns";
import cmd_admin_plat_users_bet_promotion_discount_index from "@/views/promotion_discount_index/command/cmd_admin_plat_users_bet_promotion_discount_index";
import cmd_admin_plat_users_bet_promotion_discount_recover from "@/views/promotion_discount_index/command/cmd_admin_plat_users_bet_promotion_discount_recover";
import cmd_admin_plat_users_bet_store_fake_bet from "@/views/promotion_discount_index/command/cmd_admin_plat_users_bet_store_fake_bet";
/**协议*/
export var HttpType = {
    admin_plat_users_bet_table_columns: "admin/plat_users_bet/table_columns",
    admin_plat_users_bet_promotion_discount_index: "admin/plat_users_bet/promotion_discount/index",
    admin_plat_users_bet_promotion_discount_recover: "admin/plat_users_bet/promotion_discount/recover",
    admin_plat_users_bet_store_fake_bet: "admin/plat_users_bet/store_fake_bet",
};
/**事件*/
export var EventType = {
    admin_plat_users_bet_table_columns: "admin_plat_users_bet_table_columns",
    admin_plat_users_bet_promotion_discount_index: "admin_plat_users_bet_promotion_discount_index",
    admin_plat_users_bet_promotion_discount_recover: "admin_plat_users_bet_promotion_discount_recover",
    admin_plat_users_bet_store_fake_bet: "admin_plat_users_bet_store_fake_bet",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_bet_table_columns, cmd_admin_plat_users_bet_table_columns);
facade.registerCommand(HttpType.admin_plat_users_bet_promotion_discount_index, cmd_admin_plat_users_bet_promotion_discount_index);
facade.registerCommand(HttpType.admin_plat_users_bet_promotion_discount_recover, cmd_admin_plat_users_bet_promotion_discount_recover);
facade.registerCommand(HttpType.admin_plat_users_bet_store_fake_bet, cmd_admin_plat_users_bet_store_fake_bet);

