/**
 * description: 彩球统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268263
 */
import cmd_admin_plat_activity_statistic_ball_table_columns from "@/views/plat_activity_statistic_ball/command/cmd_admin_plat_activity_statistic_ball_table_columns";
import cmd_admin_plat_activity_statistic_ball_index from "@/views/plat_activity_statistic_ball/command/cmd_admin_plat_activity_statistic_ball_index";
import cmd_admin_plat_activity_statistic_ball_user_table_columns from "@/views/plat_activity_statistic_ball/command/cmd_admin_plat_activity_statistic_ball_user_table_columns";
import cmd_admin_plat_activity_statistic_ball_user_index from "@/views/plat_activity_statistic_ball/command/cmd_admin_plat_activity_statistic_ball_user_index";
/**协议*/
export var HttpType = {
    admin_plat_activity_statistic_ball_table_columns: "admin/plat_activity_statistic_ball/table_columns",
    admin_plat_activity_statistic_ball_index: "admin/plat_activity_statistic_ball/index",
    admin_plat_activity_statistic_ball_user_table_columns: "admin/plat_activity_statistic_ball_user/table_columns",
    admin_plat_activity_statistic_ball_user_index: "admin/plat_activity_statistic_ball_user/index",
};
/**事件*/
export var EventType = {
    admin_plat_activity_statistic_ball_table_columns: "admin_plat_activity_statistic_ball_table_columns",
    admin_plat_activity_statistic_ball_index: "admin_plat_activity_statistic_ball_index",
    admin_plat_activity_statistic_ball_user_table_columns: "admin_plat_activity_statistic_ball_user_table_columns",
    admin_plat_activity_statistic_ball_user_index: "admin_plat_activity_statistic_ball_user_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_activity_statistic_ball_table_columns, cmd_admin_plat_activity_statistic_ball_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_statistic_ball_index, cmd_admin_plat_activity_statistic_ball_index);
facade.registerCommand(HttpType.admin_plat_activity_statistic_ball_user_table_columns, cmd_admin_plat_activity_statistic_ball_user_table_columns);
facade.registerCommand(HttpType.admin_plat_activity_statistic_ball_user_index, cmd_admin_plat_activity_statistic_ball_user_index);

