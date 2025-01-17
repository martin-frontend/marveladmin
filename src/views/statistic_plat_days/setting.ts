/**
 * description: 平台统计
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1704619
 */
import cmd_admin_statistic_plat_days_table_columns from "@/views/statistic_plat_days/command/cmd_admin_statistic_plat_days_table_columns";
import cmd_admin_statistic_plat_days_index from "@/views/statistic_plat_days/command/cmd_admin_statistic_plat_days_index";
import cmd_admin_statistic_plat_days_plat_summary_index from "@/views/statistic_plat_days/command/cmd_admin_statistic_plat_days_plat_summary_index";
/**协议*/
export var HttpType = {
    admin_statistic_plat_days_table_columns: "admin/statistic_plat_days/table_columns",
    admin_statistic_plat_days_index: "admin/statistic_plat_days/index",
    admin_statistic_plat_days_plat_summary_index: "admin/statistic_plat_days/plat_summary/index",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_days_table_columns: "admin_statistic_plat_days_table_columns",
    admin_statistic_plat_days_index: "admin_statistic_plat_days_index",
    admin_statistic_plat_days_plat_summary_index: "admin_statistic_plat_days_plat_summary_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_plat_days_table_columns, cmd_admin_statistic_plat_days_table_columns);
facade.registerCommand(HttpType.admin_statistic_plat_days_index, cmd_admin_statistic_plat_days_index);
facade.registerCommand(HttpType.admin_statistic_plat_days_plat_summary_index, cmd_admin_statistic_plat_days_plat_summary_index);

