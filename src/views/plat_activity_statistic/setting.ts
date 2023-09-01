/**
 * description: 活动统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268319
 */
import cmd_admin_plat_activity_statistic_table_columns from "@/views/plat_activity_statistic/command/cmd_admin_plat_activity_statistic_table_columns";
import cmd_admin_plat_activity_statistic_index from "@/views/plat_activity_statistic/command/cmd_admin_plat_activity_statistic_index";
import cmd_admin_plat_activity_statistic_user_table_columns from "@/views/plat_activity_statistic/command/cmd_admin_plat_activity_statistic_user_table_columns";
import cmd_admin_plat_activity_statistic_user_index from "@/views/plat_activity_statistic/command/cmd_admin_plat_activity_statistic_user_index";
/**协议*/
export var HttpType = {
    admin_plat_activity_statistic_table_columns: "admin/plat_activity_statistic/table_columns",
    admin_plat_activity_statistic_index: "admin/plat_activity_statistic/index",
    admin_plat_activity_statistic_user_table_columns: "admin/plat_activity_statistic_user/table_columns",
    admin_plat_activity_statistic_user_index: "admin/plat_activity_statistic_user/index",
};
/**事件*/
export var EventType = {
    admin_plat_activity_statistic_table_columns: "admin_plat_activity_statistic_table_columns",
    admin_plat_activity_statistic_index: "admin_plat_activity_statistic_index",
    admin_plat_activity_statistic_user_table_columns: "admin_plat_activity_statistic_user_table_columns",
    admin_plat_activity_statistic_user_index: "admin_plat_activity_statistic_user_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_activity_statistic_table_columns,
    cmd_admin_plat_activity_statistic_table_columns
);
facade.registerCommand(HttpType.admin_plat_activity_statistic_index, cmd_admin_plat_activity_statistic_index);
facade.registerCommand(
    HttpType.admin_plat_activity_statistic_user_table_columns,
    cmd_admin_plat_activity_statistic_user_table_columns
);
facade.registerCommand(HttpType.admin_plat_activity_statistic_user_index, cmd_admin_plat_activity_statistic_user_index);
