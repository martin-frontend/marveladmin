/**
 * description: 代理分红查询
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268726
 */
import cmd_admin_plat_user_agent_bonus_table_columns from "@/views/plat_user_agent_bonus/command/cmd_admin_plat_user_agent_bonus_table_columns";
import cmd_admin_plat_user_agent_bonus_index from "@/views/plat_user_agent_bonus/command/cmd_admin_plat_user_agent_bonus_index";
import cmd_admin_plat_user_agent_bonus_send_mail from "@/views/plat_user_agent_bonus/command/cmd_admin_plat_user_agent_bonus_send_mail";
/**协议*/
export var HttpType = {
    admin_plat_user_agent_bonus_table_columns: "admin/plat_user/agent_bonus/table_columns",
    admin_plat_user_agent_bonus_index: "admin/plat_user/agent_bonus/index",
    admin_plat_user_agent_bonus_send_mail: "admin/plat_user/agent_bonus/send_mail",
};
/**事件*/
export var EventType = {
    admin_plat_user_agent_bonus_table_columns: "admin_plat_user_agent_bonus_table_columns",
    admin_plat_user_agent_bonus_index: "admin_plat_user_agent_bonus_index",
    admin_plat_user_agent_bonus_send_mail: "admin_plat_user_agent_bonus_send_mail",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_user_agent_bonus_table_columns, cmd_admin_plat_user_agent_bonus_table_columns);
facade.registerCommand(HttpType.admin_plat_user_agent_bonus_index, cmd_admin_plat_user_agent_bonus_index);
facade.registerCommand(HttpType.admin_plat_user_agent_bonus_send_mail, cmd_admin_plat_user_agent_bonus_send_mail);

