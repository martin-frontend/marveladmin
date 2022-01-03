/**
 * description: 代理每日统计
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707322
 */
import cmd_admin_statistic_user_promotion_days_table_columns from "@/views/statistic_user_promotion_days_index/command/cmd_admin_statistic_user_promotion_days_table_columns";
import cmd_admin_statistic_user_promotion_days_index from "@/views/statistic_user_promotion_days_index/command/cmd_admin_statistic_user_promotion_days_index";
/**协议*/
export var HttpType = {
    admin_statistic_user_promotion_days_table_columns: "admin/statistic_user_promotion_days/table_columns",
    admin_statistic_user_promotion_days_index: "admin/statistic_user_promotion_days/index",
};
/**事件*/
export var EventType = {
    admin_statistic_user_promotion_days_table_columns: "admin_statistic_user_promotion_days_table_columns",
    admin_statistic_user_promotion_days_index: "admin_statistic_user_promotion_days_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_user_promotion_days_table_columns, cmd_admin_statistic_user_promotion_days_table_columns);
facade.registerCommand(HttpType.admin_statistic_user_promotion_days_index, cmd_admin_statistic_user_promotion_days_index);

