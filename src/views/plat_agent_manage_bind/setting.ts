/**
 * description: 渠道代理用户
 * document: 
 */
import cmd_admin_plat_agent_manage_bind_table_columns from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_agent_manage_bind_table_columns";
import cmd_admin_plat_agent_manage_bind_index from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_agent_manage_bind_index";
import cmd_admin_plat_agent_bind_update from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_agent_bind_update";
import cmd_admin_plat_user_update from "@/views/plat_agent_manage_bind/command/cmd_admin_plat_user_update";
/**协议*/
export var HttpType = {
    admin_plat_agent_manage_bind_table_columns: "admin/plat_agent_manage_bind/table_columns",
    admin_plat_agent_manage_bind_index: "admin/plat_agent_manage_bind/index",
    admin_plat_agent_bind_update: "admin/plat_agent_bind/update/{user_id}",
    admin_plat_user_update: "admin/plat_user/update/{user_id}",
};
/**事件*/
export var EventType = {
    admin_plat_agent_manage_bind_table_columns: "admin_plat_agent_manage_bind_table_columns",
    admin_plat_agent_manage_bind_index: "admin_plat_agent_manage_bind_index",
    admin_plat_agent_bind_update: "admin_plat_agent_bind_update",
    admin_plat_user_update: "admin_plat_user_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_agent_manage_bind_table_columns, cmd_admin_plat_agent_manage_bind_table_columns);
facade.registerCommand(HttpType.admin_plat_agent_manage_bind_index, cmd_admin_plat_agent_manage_bind_index);
facade.registerCommand(HttpType.admin_plat_agent_bind_update, cmd_admin_plat_agent_bind_update);
facade.registerCommand(HttpType.admin_plat_user_update, cmd_admin_plat_user_update);

