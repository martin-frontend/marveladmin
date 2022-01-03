/**
 * description: 权限组
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706107
 */
import cmd_admin_admin_role_table_columns from "@/views/admin_role/command/cmd_admin_admin_role_table_columns";
import cmd_admin_admin_role_index from "@/views/admin_role/command/cmd_admin_admin_role_index";
import cmd_admin_admin_role_show from "@/views/admin_role/command/cmd_admin_admin_role_show";
import cmd_admin_admin_role_store from "@/views/admin_role/command/cmd_admin_admin_role_store";
import cmd_admin_admin_role_update from "@/views/admin_role/command/cmd_admin_admin_role_update";
import cmd_admin_admin_user_mine from "@/views/admin_role/command/cmd_admin_admin_user_mine";
/**协议*/
export var HttpType = {
    admin_admin_role_table_columns: "admin/admin_role/table_columns",
    admin_admin_role_index: "admin/admin_role/index",
    admin_admin_role_show: "admin/admin_role/show/{role_id}",
    admin_admin_role_store: "admin/admin_role/store",
    admin_admin_role_update: "admin/admin_role/update/{role_id}",
    admin_admin_user_mine: "admin/admin_user/mine",
};
/**事件*/
export var EventType = {
    admin_admin_role_table_columns: "admin_admin_role_table_columns",
    admin_admin_role_index: "admin_admin_role_index",
    admin_admin_role_show: "admin_admin_role_show",
    admin_admin_role_store: "admin_admin_role_store",
    admin_admin_role_update: "admin_admin_role_update",
    admin_admin_user_mine: "admin_admin_user_mine",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_role_table_columns, cmd_admin_admin_role_table_columns);
facade.registerCommand(HttpType.admin_admin_role_index, cmd_admin_admin_role_index);
facade.registerCommand(HttpType.admin_admin_role_show, cmd_admin_admin_role_show);
facade.registerCommand(HttpType.admin_admin_role_store, cmd_admin_admin_role_store);
facade.registerCommand(HttpType.admin_admin_role_update, cmd_admin_admin_role_update);
facade.registerCommand(HttpType.admin_admin_user_mine, cmd_admin_admin_user_mine);

