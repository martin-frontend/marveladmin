/**
 * description: 代理总报表
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776426
 */
import cmd_admin_statistic_credit_table_columns from "@/views/statistic_agent_credit/command/cmd_admin_statistic_credit_table_columns";
import cmd_admin_statistic_agent_credit_index from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_index";
import cmd_admin_statistic_agent_credit_user_show from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_user_show";
import cmd_admin_statistic_agent_credit_user_update from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_user_update";
/**协议*/
export var HttpType = {
    admin_statistic_credit_table_columns: "admin/statistic_credit/table_columns",
    admin_statistic_agent_credit_index: "admin/statistic_agent_credit/index",
    admin_statistic_agent_credit_user_show: "admin/statistic_agent_credit/user/show",
    admin_statistic_agent_credit_user_update: "admin/statistic_agent_credit/user/update",
};
/**事件*/
export var EventType = {
    admin_statistic_credit_table_columns: "admin_statistic_credit_table_columns",
    admin_statistic_agent_credit_index: "admin_statistic_agent_credit_index",
    admin_statistic_agent_credit_user_show: "admin_statistic_agent_credit_user_show",
    admin_statistic_agent_credit_user_update: "admin_statistic_agent_credit_user_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_credit_table_columns, cmd_admin_statistic_credit_table_columns);
facade.registerCommand(HttpType.admin_statistic_agent_credit_index, cmd_admin_statistic_agent_credit_index);
facade.registerCommand(HttpType.admin_statistic_agent_credit_user_show, cmd_admin_statistic_agent_credit_user_show);
facade.registerCommand(HttpType.admin_statistic_agent_credit_user_update, cmd_admin_statistic_agent_credit_user_update);

