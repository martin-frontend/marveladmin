/**
 * description: 代理用户
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66117
 */
import cmd_admin_plat_agent_bind_table_columns from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bind_table_columns";
import cmd_admin_plat_agent_bind_index from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bind_index";
import cmd_admin_plat_agent_bind_show from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bind_show";
import cmd_admin_plat_agent_bind_show_floor_range from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bind_show_floor_range";
import cmd_admin_plat_agent_bind_update from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bind_update";
import cmd_admin_plat_user_change_bind from "@/views/plat_agent_bind/command/cmd_admin_plat_user_change_bind";
import cmd_admin_plat_agent_bonus_config_table_columns from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bonus_config_table_columns";
import cmd_admin_plat_agent_bonus_config_show from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bonus_config_show";
import cmd_admin_plat_agent_bonus_config_update from "@/views/plat_agent_bind/command/cmd_admin_plat_agent_bonus_config_update";
/**协议*/
export var HttpType = {
    admin_plat_agent_bind_table_columns: "admin/plat_agent_bind/table_columns",
    admin_plat_agent_bind_index: "admin/plat_agent_bind/index",
    admin_plat_agent_bind_show: "admin/plat_agent_bind/show/{user_id}",
    admin_plat_agent_bind_show_floor_range: "admin/plat_agent_bind/show/{user_id}/floor_range",
    admin_plat_agent_bind_update: "admin/plat_agent_bind/update/{user_id}",
    admin_plat_user_change_bind: "admin/plat_user/change_bind/{user_id}",
    admin_plat_agent_bonus_config_table_columns: "admin/plat_agent_bonus_config/table_columns",
    admin_plat_agent_bonus_config_show: "admin/plat_agent_bonus_config/show/{user_id}",
    admin_plat_agent_bonus_config_update: "admin/plat_agent_bonus_config/update/{user_id}",
};
/**事件*/
export var EventType = {
    admin_plat_agent_bind_table_columns: "admin_plat_agent_bind_table_columns",
    admin_plat_agent_bind_index: "admin_plat_agent_bind_index",
    admin_plat_agent_bind_show: "admin_plat_agent_bind_show",
    admin_plat_agent_bind_show_floor_range: "admin_plat_agent_bind_show_floor_range",
    admin_plat_agent_bind_update: "admin_plat_agent_bind_update",
    admin_plat_user_change_bind: "admin_plat_user_change_bind",
    admin_plat_agent_bonus_config_table_columns: "admin_plat_agent_bonus_config_table_columns",
    admin_plat_agent_bonus_config_show: "admin_plat_agent_bonus_config_show",
    admin_plat_agent_bonus_config_update: "admin_plat_agent_bonus_config_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_agent_bind_table_columns, cmd_admin_plat_agent_bind_table_columns);
facade.registerCommand(HttpType.admin_plat_agent_bind_index, cmd_admin_plat_agent_bind_index);
facade.registerCommand(HttpType.admin_plat_agent_bind_show, cmd_admin_plat_agent_bind_show);
facade.registerCommand(HttpType.admin_plat_agent_bind_show_floor_range, cmd_admin_plat_agent_bind_show_floor_range);
facade.registerCommand(HttpType.admin_plat_agent_bind_update, cmd_admin_plat_agent_bind_update);
facade.registerCommand(HttpType.admin_plat_user_change_bind, cmd_admin_plat_user_change_bind);
facade.registerCommand(
    HttpType.admin_plat_agent_bonus_config_table_columns,
    cmd_admin_plat_agent_bonus_config_table_columns
);
facade.registerCommand(HttpType.admin_plat_agent_bonus_config_show, cmd_admin_plat_agent_bonus_config_show);
facade.registerCommand(HttpType.admin_plat_agent_bonus_config_update, cmd_admin_plat_agent_bonus_config_update);
