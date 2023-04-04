/**
 * description: 代理总报表
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776426
 */
import cmd_admin_statistic_credit_table_columns from "@/views/statistic_agent_credit/command/cmd_admin_statistic_credit_table_columns";
import cmd_admin_statistic_agent_credit_index from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_index";
import cmd_admin_statistic_agent_credit_user_show from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_user_show";
import cmd_admin_statistic_agent_credit_user_update from "@/views/statistic_agent_credit/command/cmd_admin_statistic_agent_credit_user_update";
import cmd_admin_credit_dividend_period_table_columns from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_table_columns";
import cmd_admin_credit_dividend_period_index from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_index";
import cmd_admin_credit_dividend_period_show from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_show";
import cmd_admin_credit_dividend_period_store from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_store";
import cmd_admin_credit_dividend_period_update from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_update";
import cmd_admin_credit_dividend_period_delete from "@/views/statistic_agent_credit/command/cmd_admin_credit_dividend_period_delete";
/**协议*/
export var HttpType = {
    admin_statistic_credit_table_columns: "admin/statistic_credit/table_columns",
    admin_statistic_agent_credit_index: "admin/statistic_agent_credit/index",
    admin_statistic_agent_credit_user_show: "admin/statistic_agent_credit/user/show",
    admin_statistic_agent_credit_user_update: "admin/statistic_agent_credit/user/update",
    admin_credit_dividend_period_table_columns: "admin/credit_dividend_period/table_columns",
    admin_credit_dividend_period_index: "admin/credit_dividend_period/index",
    admin_credit_dividend_period_show: "admin/credit_dividend_period/show/{id}",
    admin_credit_dividend_period_store: "admin/credit_dividend_period/store",
    admin_credit_dividend_period_update: "admin/credit_dividend_period/update/{id}",
    admin_credit_dividend_period_delete: "admin/credit_dividend_period/delete/{id}",
};
/**事件*/
export var EventType = {
    admin_statistic_credit_table_columns: "admin_statistic_credit_table_columns",
    admin_statistic_agent_credit_index: "admin_statistic_agent_credit_index",
    admin_statistic_agent_credit_user_show: "admin_statistic_agent_credit_user_show",
    admin_statistic_agent_credit_user_update: "admin_statistic_agent_credit_user_update",
    admin_credit_dividend_period_table_columns: "admin_credit_dividend_period_table_columns",
    admin_credit_dividend_period_index: "admin_credit_dividend_period_index",
    admin_credit_dividend_period_show: "admin_credit_dividend_period_show",
    admin_credit_dividend_period_store: "admin_credit_dividend_period_store",
    admin_credit_dividend_period_update: "admin_credit_dividend_period_update",
    admin_credit_dividend_period_delete: "admin_credit_dividend_period_delete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_statistic_credit_table_columns, cmd_admin_statistic_credit_table_columns);
facade.registerCommand(HttpType.admin_statistic_agent_credit_index, cmd_admin_statistic_agent_credit_index);
facade.registerCommand(HttpType.admin_statistic_agent_credit_user_show, cmd_admin_statistic_agent_credit_user_show);
facade.registerCommand(HttpType.admin_statistic_agent_credit_user_update, cmd_admin_statistic_agent_credit_user_update);
facade.registerCommand(HttpType.admin_credit_dividend_period_table_columns, cmd_admin_credit_dividend_period_table_columns);
facade.registerCommand(HttpType.admin_credit_dividend_period_index, cmd_admin_credit_dividend_period_index);
facade.registerCommand(HttpType.admin_credit_dividend_period_show, cmd_admin_credit_dividend_period_show);
facade.registerCommand(HttpType.admin_credit_dividend_period_store, cmd_admin_credit_dividend_period_store);
facade.registerCommand(HttpType.admin_credit_dividend_period_update, cmd_admin_credit_dividend_period_update);
facade.registerCommand(HttpType.admin_credit_dividend_period_delete, cmd_admin_credit_dividend_period_delete);

