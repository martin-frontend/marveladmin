/**
 * description: 标签列表
 * document: http://35.220.178.180:8090/pages/viewpage.action?pageId=75268098
 */
import cmd_admin_user_tag_table_columns from "@/views/user_tag/command/cmd_admin_user_tag_table_columns";
import cmd_admin_user_tag_index from "@/views/user_tag/command/cmd_admin_user_tag_index";
import cmd_admin_user_tag_store from "@/views/user_tag/command/cmd_admin_user_tag_store";
import cmd_admin_user_tag_show from "@/views/user_tag/command/cmd_admin_user_tag_show";
import cmd_admin_user_tag_update from "@/views/user_tag/command/cmd_admin_user_tag_update";
import cmd_admin_user_tag_delete from "@/views/user_tag/command/cmd_admin_user_tag_delete";
import cmd_admin_user_tag_show_users from "@/views/user_tag/command/cmd_admin_user_tag_show_users";
import cmd_admin_plat_user_table_columns from "@/views/user_tag/command/cmd_admin_plat_user_table_columns";
/**协议*/
export var HttpType = {
    admin_user_tag_table_columns: "admin/user_tag/table_columns",
    admin_user_tag_index: "admin/user_tag/index",
    admin_user_tag_store: "admin/user_tag/store",
    admin_user_tag_show: "admin/user_tag/show/{id}",
    admin_user_tag_update: "admin/user_tag/update/{id}",
    admin_user_tag_delete: "admin/user_tag/delete/{id}",
    admin_user_tag_show_users: "admin/user_tag/show_users/{id}",
    admin_plat_user_table_columns: "admin/plat_user/table_columns",
};
/**事件*/
export var EventType = {
    admin_user_tag_table_columns: "admin_user_tag_table_columns",
    admin_user_tag_index: "admin_user_tag_index",
    admin_user_tag_store: "admin_user_tag_store",
    admin_user_tag_show: "admin_user_tag_show",
    admin_user_tag_update: "admin_user_tag_update",
    admin_user_tag_delete: "admin_user_tag_delete",
    admin_user_tag_show_users: "admin_user_tag_show_users",
    admin_plat_user_table_columns: "admin_plat_user_table_columns",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_user_tag_table_columns, cmd_admin_user_tag_table_columns);
facade.registerCommand(HttpType.admin_user_tag_index, cmd_admin_user_tag_index);
facade.registerCommand(HttpType.admin_user_tag_store, cmd_admin_user_tag_store);
facade.registerCommand(HttpType.admin_user_tag_show, cmd_admin_user_tag_show);
facade.registerCommand(HttpType.admin_user_tag_update, cmd_admin_user_tag_update);
facade.registerCommand(HttpType.admin_user_tag_delete, cmd_admin_user_tag_delete);
facade.registerCommand(HttpType.admin_user_tag_show_users, cmd_admin_user_tag_show_users);
facade.registerCommand(HttpType.admin_plat_user_table_columns, cmd_admin_plat_user_table_columns);

