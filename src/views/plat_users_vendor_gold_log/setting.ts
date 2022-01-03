/**
 * description: 上下分记录
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66173
 */
import cmd_admin_plat_users_vendor_gold_log_table_columns from "@/views/plat_users_vendor_gold_log/command/cmd_admin_plat_users_vendor_gold_log_table_columns";
import cmd_admin_plat_users_vendor_gold_log_index from "@/views/plat_users_vendor_gold_log/command/cmd_admin_plat_users_vendor_gold_log_index";
import cmd_admin_plat_users_vendor_gold_log_show from "@/views/plat_users_vendor_gold_log/command/cmd_admin_plat_users_vendor_gold_log_show";
import cmd_admin_plat_users_vendor_gold_log_update_manual from "@/views/plat_users_vendor_gold_log/command/cmd_admin_plat_users_vendor_gold_log_update_manual";
import cmd_admin_plat_users_vendor_gold_log_auto_check from "@/views/plat_users_vendor_gold_log/command/cmd_admin_plat_users_vendor_gold_log_auto_check";
/**协议*/
export var HttpType = {
    admin_plat_users_vendor_gold_log_table_columns: "admin/plat_users_vendor_gold_log/table_columns",
    admin_plat_users_vendor_gold_log_index: "admin/plat_users_vendor_gold_log/index",
    admin_plat_users_vendor_gold_log_show: "admin/plat_users_vendor_gold_log/show/{vendor_gold_log_id}",
    admin_plat_users_vendor_gold_log_update_manual: "admin/plat_users_vendor_gold_log/update_manual/{vendor_gold_log_id}",
    admin_plat_users_vendor_gold_log_auto_check: "admin/plat_users_vendor_gold_log/auto_check/{vendor_gold_log_id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_vendor_gold_log_table_columns: "admin_plat_users_vendor_gold_log_table_columns",
    admin_plat_users_vendor_gold_log_index: "admin_plat_users_vendor_gold_log_index",
    admin_plat_users_vendor_gold_log_show: "admin_plat_users_vendor_gold_log_show",
    admin_plat_users_vendor_gold_log_update_manual: "admin_plat_users_vendor_gold_log_update_manual",
    admin_plat_users_vendor_gold_log_auto_check: "admin_plat_users_vendor_gold_log_auto_check",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_table_columns, cmd_admin_plat_users_vendor_gold_log_table_columns);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_index, cmd_admin_plat_users_vendor_gold_log_index);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_show, cmd_admin_plat_users_vendor_gold_log_show);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_update_manual, cmd_admin_plat_users_vendor_gold_log_update_manual);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_auto_check, cmd_admin_plat_users_vendor_gold_log_auto_check);

