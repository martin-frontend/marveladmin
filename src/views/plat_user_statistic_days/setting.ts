/**
 * description: 用户排行统计
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1708493
 */
import cmd_admin_plat_user_statistic_days_table_columns from "@/views/plat_user_statistic_days/command/cmd_admin_plat_user_statistic_days_table_columns";
import cmd_admin_plat_user_statistic_days_index from "@/views/plat_user_statistic_days/command/cmd_admin_plat_user_statistic_days_index";
import cmd_admin_plat_user_statistic_days_store from "@/views/plat_user_statistic_days/command/cmd_admin_plat_user_statistic_days_store";
import cmd_admin_plat_user_statistic_days_update from "@/views/plat_user_statistic_days/command/cmd_admin_plat_user_statistic_days_update";
/**协议*/
export var HttpType = {
    admin_plat_user_statistic_days_table_columns: "admin/plat_user_statistic_days/table_columns",
    admin_plat_user_statistic_days_index: "admin/plat_user_statistic_days/index",
    admin_plat_user_statistic_days_store: "admin/plat_user_statistic_days/store",
    admin_plat_user_statistic_days_update: "admin/plat_user_statistic_days/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_user_statistic_days_table_columns: "admin_plat_user_statistic_days_table_columns",
    admin_plat_user_statistic_days_index: "admin_plat_user_statistic_days_index",
    admin_plat_user_statistic_days_store: "admin_plat_user_statistic_days_store",
    admin_plat_user_statistic_days_update: "admin_plat_user_statistic_days_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(
    HttpType.admin_plat_user_statistic_days_table_columns,
    cmd_admin_plat_user_statistic_days_table_columns
);
facade.registerCommand(HttpType.admin_plat_user_statistic_days_index, cmd_admin_plat_user_statistic_days_index);
facade.registerCommand(HttpType.admin_plat_user_statistic_days_store, cmd_admin_plat_user_statistic_days_store);
facade.registerCommand(HttpType.admin_plat_user_statistic_days_update, cmd_admin_plat_user_statistic_days_update);
