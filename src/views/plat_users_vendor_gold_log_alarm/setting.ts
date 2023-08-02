/**
 * description: 投注报警
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777507
 */
import cmd_admin_plat_users_vendor_gold_log_alarm_table_columns from "@/views/plat_users_vendor_gold_log_alarm/command/cmd_admin_plat_users_vendor_gold_log_alarm_table_columns";
import cmd_admin_plat_users_vendor_gold_log_alarm_index from "@/views/plat_users_vendor_gold_log_alarm/command/cmd_admin_plat_users_vendor_gold_log_alarm_index";
import cmd_admin_plat_users_vendor_gold_log_alarm_update from "@/views/plat_users_vendor_gold_log_alarm/command/cmd_admin_plat_users_vendor_gold_log_alarm_update";
/**协议*/
export var HttpType = {
    admin_plat_users_vendor_gold_log_alarm_table_columns: "admin/plat_users_vendor_gold_log_alarm/table_columns",
    admin_plat_users_vendor_gold_log_alarm_index: "admin/plat_users_vendor_gold_log_alarm/index",
    admin_plat_users_vendor_gold_log_alarm_update: "admin/plat_users_vendor_gold_log_alarm/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_users_vendor_gold_log_alarm_table_columns: "admin_plat_users_vendor_gold_log_alarm_table_columns",
    admin_plat_users_vendor_gold_log_alarm_index: "admin_plat_users_vendor_gold_log_alarm_index",
    admin_plat_users_vendor_gold_log_alarm_update: "admin_plat_users_vendor_gold_log_alarm_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_alarm_table_columns, cmd_admin_plat_users_vendor_gold_log_alarm_table_columns);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_alarm_index, cmd_admin_plat_users_vendor_gold_log_alarm_index);
facade.registerCommand(HttpType.admin_plat_users_vendor_gold_log_alarm_update, cmd_admin_plat_users_vendor_gold_log_alarm_update);

