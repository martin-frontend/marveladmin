/**
 * description: 信用统计
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776270
 */
import cmd_admin_statistic_credit_table_columns from "@/views/statistic_credit/command/cmd_admin_statistic_credit_table_columns";
import cmd_admin_statistic_credit_index from "@/views/statistic_credit/command/cmd_admin_statistic_credit_index";
/**协议*/
export var HttpType = {
    admin_statistic_credit_table_columns: "admin/statistic_credit/table_columns",
    admin_statistic_credit_index: "admin/statistic_credit/index",
};
/**事件*/
export var EventType = {
    admin_statistic_credit_table_columns: "admin_statistic_credit_table_columns",
    admin_statistic_credit_index: "admin_statistic_credit_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_credit_table_columns, cmd_admin_statistic_credit_table_columns);
facade.registerCommand(HttpType.admin_statistic_credit_index, cmd_admin_statistic_credit_index);
