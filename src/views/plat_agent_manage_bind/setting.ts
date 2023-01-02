/**
 * description: 渠道代理用户
 * document: 
 */
import cmd_admin_plat_agent_manage_bind_table_columns from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_agent_manage_bind_table_columns";
import cmd_admin_plat_agent_manage_bind_index from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_agent_manage_bind_index";
/**协议*/
export var HttpType = {
    admin_plat_agent_manage_bind_table_columns: "admin/plat_agent_manage_bind/table_columns",
    admin_plat_agent_manage_bind_index: "admin/plat_agent_manage_bind/index",
};
/**事件*/
export var EventType = {
    admin_plat_agent_manage_bind_table_columns: "admin_plat_agent_manage_bind_table_columns",
    admin_plat_agent_manage_bind_index: "admin_plat_agent_manage_bind_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_agent_manage_bind_table_columns, cmd_admin_plat_agent_manage_bind_table_columns);
facade.registerCommand(HttpType.admin_plat_agent_manage_bind_index, cmd_admin_plat_agent_manage_bind_index);

