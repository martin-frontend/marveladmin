/**
 * description: 代理用户报表
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47777654
 */
import cmd_admin_statistic_credit_user_table_columns from "@/views/statistic_credit_user/command/cmd_admin_statistic_credit_user_table_columns";
import cmd_admin_statistic_credit_user_index from "@/views/statistic_credit_user/command/cmd_admin_statistic_credit_user_index";
/**协议*/
export var HttpType = {
    admin_statistic_credit_user_table_columns: "admin/statistic_credit_user/table_columns",
    admin_statistic_credit_user_index: "admin/statistic_credit_user/index",
};
/**事件*/
export var EventType = {
    admin_statistic_credit_user_table_columns: "admin_statistic_credit_user_table_columns",
    admin_statistic_credit_user_index: "admin_statistic_credit_user_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_credit_user_table_columns, cmd_admin_statistic_credit_user_table_columns);
facade.registerCommand(HttpType.admin_statistic_credit_user_index, cmd_admin_statistic_credit_user_index);

