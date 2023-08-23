/**
 * description: 投放日报
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268145
 */
import cmd_admin_statistic_plat_days_deliver_table_columns from "@/views/statistic_plat_days_deliver/command/cmd_admin_statistic_plat_days_deliver_table_columns";
import cmd_admin_statistic_plat_days_deliver_index from "@/views/statistic_plat_days_deliver/command/cmd_admin_statistic_plat_days_deliver_index";
import cmd_admin_statistic_plat_days_deliver_edit_deliver_use from "@/views/statistic_plat_days_deliver/command/cmd_admin_statistic_plat_days_deliver_edit_deliver_use";
/**协议*/
export var HttpType = {
    admin_statistic_plat_days_deliver_table_columns: "admin/statistic_plat_days_deliver/table_columns",
    admin_statistic_plat_days_deliver_index: "admin/statistic_plat_days_deliver/index",
    admin_statistic_plat_days_deliver_edit_deliver_use: "admin/statistic_plat_days_deliver/edit_deliver_use",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_days_deliver_table_columns: "admin_statistic_plat_days_deliver_table_columns",
    admin_statistic_plat_days_deliver_index: "admin_statistic_plat_days_deliver_index",
    admin_statistic_plat_days_deliver_edit_deliver_use: "admin_statistic_plat_days_deliver_edit_deliver_use",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_statistic_plat_days_deliver_table_columns,
    cmd_admin_statistic_plat_days_deliver_table_columns
);
facade.registerCommand(HttpType.admin_statistic_plat_days_deliver_index, cmd_admin_statistic_plat_days_deliver_index);
facade.registerCommand(
    HttpType.admin_statistic_plat_days_deliver_edit_deliver_use,
    cmd_admin_statistic_plat_days_deliver_edit_deliver_use
);
