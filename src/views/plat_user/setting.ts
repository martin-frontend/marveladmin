/**
 * description: 平台用户
 * document: http://202.60.254.250:8090/pages/viewpage.action?pageId=6558294
 */
import cmd_admin_plat_user_table_columns from "@/views/plat_user/command/cmd_admin_plat_user_table_columns";
import cmd_admin_plat_user_index from "@/views/plat_user/command/cmd_admin_plat_user_index";
import cmd_admin_plat_user_store from "@/views/plat_user/command/cmd_admin_plat_user_store";
import cmd_admin_plat_user_show from "@/views/plat_user/command/cmd_admin_plat_user_show";
import cmd_admin_plat_user_update from "@/views/plat_user/command/cmd_admin_plat_user_update";
import cmd_admin_plat_user_vendor_withdraw from "@/views/plat_user/command/cmd_admin_plat_user_vendor_withdraw";
import cmd_admin_plat_user_update_safe_gold from "@/views/plat_user/command/cmd_admin_plat_user_update_safe_gold";
import cmd_admin_plat_user_update_user_gold from "@/views/plat_user/command/cmd_admin_plat_user_update_user_gold";
import cmd_admin_plat_user_recharge_address from "@/views/plat_user/command/cmd_admin_plat_user_recharge_address";
/**协议*/
export var HttpType = {
    admin_plat_user_table_columns: "admin/plat_user/table_columns",
    admin_plat_user_index: "admin/plat_user/index",
    admin_plat_user_store: "admin/plat_user/store",
    admin_plat_user_show: "admin/plat_user/show/{user_id}",
    admin_plat_user_update: "admin/plat_user/update/{user_id}",
    admin_plat_user_vendor_withdraw: "admin/plat_user/{user_id}/vendor/withdraw",
    admin_plat_user_update_safe_gold: "admin/plat_user/update_safe_gold/{user_id}",
    admin_plat_user_update_user_gold: "admin/plat_user/update_user_gold/{user_id}",
    admin_plat_user_recharge_address: "admin/plat_user/recharge_address/{user_id}",
};
/**事件*/
export var EventType = {
    admin_plat_user_table_columns: "admin_plat_user_table_columns",
    admin_plat_user_index: "admin_plat_user_index",
    admin_plat_user_store: "admin_plat_user_store",
    admin_plat_user_show: "admin_plat_user_show",
    admin_plat_user_update: "admin_plat_user_update",
    admin_plat_user_vendor_withdraw: "admin_plat_user_vendor_withdraw",
    admin_plat_user_update_safe_gold: "admin_plat_user_update_safe_gold",
    admin_plat_user_update_user_gold: "admin_plat_user_update_user_gold",
    admin_plat_user_recharge_address: "admin_plat_user_recharge_address",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_user_table_columns, cmd_admin_plat_user_table_columns);
facade.registerCommand(HttpType.admin_plat_user_index, cmd_admin_plat_user_index);
facade.registerCommand(HttpType.admin_plat_user_store, cmd_admin_plat_user_store);
facade.registerCommand(HttpType.admin_plat_user_show, cmd_admin_plat_user_show);
facade.registerCommand(HttpType.admin_plat_user_update, cmd_admin_plat_user_update);
facade.registerCommand(HttpType.admin_plat_user_vendor_withdraw, cmd_admin_plat_user_vendor_withdraw);
facade.registerCommand(HttpType.admin_plat_user_update_safe_gold, cmd_admin_plat_user_update_safe_gold);
facade.registerCommand(HttpType.admin_plat_user_update_user_gold, cmd_admin_plat_user_update_user_gold);
facade.registerCommand(HttpType.admin_plat_user_recharge_address, cmd_admin_plat_user_recharge_address);

