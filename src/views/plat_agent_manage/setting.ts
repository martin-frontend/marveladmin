/**
 * description: 代理人员管理
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=47776701
 */
import cmd_admin_plat_agent_manage_table_columns from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_table_columns";
import cmd_admin_plat_agent_manage_index from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_index";
import cmd_admin_plat_agent_manage_store from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_store";
import cmd_admin_plat_agent_manage_update from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_update";
import cmd_admin_plat_agent_manage_update_user from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_update_user";
import cmd_admin_plat_agent_manage_delete from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_delete";
import cmd_admin_plat_agent_manage_change_bind from "@/views/plat_agent_manage/command/cmd_admin_plat_agent_manage_change_bind";
/**协议*/
export var HttpType = {
    admin_plat_agent_manage_table_columns: "admin/plat_agent_manage/table_columns",
    admin_plat_agent_manage_index: "admin/plat_agent_manage/index",
    admin_plat_agent_manage_store: "admin/plat_agent_manage/store",
    admin_plat_agent_manage_update: "admin/plat_agent_manage/update/{user_id}",
    admin_plat_agent_manage_update_user: "admin/plat_agent_manage/update/user/{customer_user_id}",
    admin_plat_agent_manage_delete: "admin/plat_agent_manage/delete/{user_id}",
    admin_plat_agent_manage_change_bind: "admin/plat_agent_manage/change_bind/{user_id}",
};
/**事件*/
export var EventType = {
    admin_plat_agent_manage_table_columns: "admin_plat_agent_manage_table_columns",
    admin_plat_agent_manage_index: "admin_plat_agent_manage_index",
    admin_plat_agent_manage_store: "admin_plat_agent_manage_store",
    admin_plat_agent_manage_update: "admin_plat_agent_manage_update",
    admin_plat_agent_manage_update_user: "admin_plat_agent_manage_update_user",
    admin_plat_agent_manage_delete: "admin_plat_agent_manage_delete",
    admin_plat_agent_manage_change_bind: "admin_plat_agent_manage_change_bind",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_agent_manage_table_columns, cmd_admin_plat_agent_manage_table_columns);
facade.registerCommand(HttpType.admin_plat_agent_manage_index, cmd_admin_plat_agent_manage_index);
facade.registerCommand(HttpType.admin_plat_agent_manage_store, cmd_admin_plat_agent_manage_store);
facade.registerCommand(HttpType.admin_plat_agent_manage_update, cmd_admin_plat_agent_manage_update);
facade.registerCommand(HttpType.admin_plat_agent_manage_update_user, cmd_admin_plat_agent_manage_update_user);
facade.registerCommand(HttpType.admin_plat_agent_manage_delete, cmd_admin_plat_agent_manage_delete);
facade.registerCommand(HttpType.admin_plat_agent_manage_change_bind, cmd_admin_plat_agent_manage_change_bind);

