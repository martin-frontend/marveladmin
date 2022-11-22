/**
 * description: 总代分红
 * document: http://18.167.151.206:8090/pages/viewpage.action?pageId=9633825
 */
import cmd_admin_plat_agent_bonus_table_columns from "@/views/plat_agent_bonus/command/cmd_admin_plat_agent_bonus_table_columns";
import cmd_admin_plat_agent_bonus_index from "@/views/plat_agent_bonus/command/cmd_admin_plat_agent_bonus_index";
/**协议*/
export var HttpType = {
    admin_plat_agent_bonus_table_columns: "admin/plat_agent_bonus/table_columns",
    admin_plat_agent_bonus_index: "admin/plat_agent_bonus/index",
};
/**事件*/
export var EventType = {
    admin_plat_agent_bonus_table_columns: "admin_plat_agent_bonus_table_columns",
    admin_plat_agent_bonus_index: "admin_plat_agent_bonus_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_agent_bonus_table_columns, cmd_admin_plat_agent_bonus_table_columns);
facade.registerCommand(HttpType.admin_plat_agent_bonus_index, cmd_admin_plat_agent_bonus_index);
