/**
 * description: 平台出入款
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707815
 */
import cmd_admin_statistic_plat_funds_flow_table_columns from "@/views/statistic_plat_funds_flow/command/cmd_admin_statistic_plat_funds_flow_table_columns";
import cmd_admin_statistic_plat_funds_flow_show from "@/views/statistic_plat_funds_flow/command/cmd_admin_statistic_plat_funds_flow_show";
/**协议*/
export var HttpType = {
    admin_statistic_plat_funds_flow_table_columns: "admin/statistic_plat_funds_flow/table_columns",
    admin_statistic_plat_funds_flow_show: "admin/statistic_plat_funds_flow/show",
};
/**事件*/
export var EventType = {
    admin_statistic_plat_funds_flow_table_columns: "admin_statistic_plat_funds_flow_table_columns",
    admin_statistic_plat_funds_flow_show: "admin_statistic_plat_funds_flow_show",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_statistic_plat_funds_flow_table_columns,
    cmd_admin_statistic_plat_funds_flow_table_columns
);
facade.registerCommand(HttpType.admin_statistic_plat_funds_flow_show, cmd_admin_statistic_plat_funds_flow_show);
