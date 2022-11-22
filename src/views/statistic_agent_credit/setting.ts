/**
 * description: 代理总报表
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776426
 */
import cmd_admin_statistic_credit_table_columns from "@/views/statistic_agent_credit/command/cmd_admin_statistic_credit_table_columns";
import cmd_admin_statistic_agent_credit_index from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_index";
/**协议*/
export var HttpType = {
    admin_statistic_credit_table_columns: "admin/statistic_credit/table_columns",
    admin_statistic_agent_credit_index: "admin/statistic_agent_credit/index",
};
/**事件*/
export var EventType = {
    admin_statistic_credit_table_columns: "admin_statistic_credit_table_columns",
    admin_statistic_agent_credit_index: "admin_statistic_agent_credit_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_credit_table_columns, cmd_admin_statistic_credit_table_columns);
facade.registerCommand(HttpType.admin_statistic_agent_credit_index, cmd_admin_statistic_agent_credit_index);
