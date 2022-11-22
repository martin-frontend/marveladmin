/**
 * description: 节点管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706040
 */
import cmd_admin_admin_permission_table_columns from "@/views/admin_permission/command/cmd_admin_admin_permission_table_columns";
import cmd_admin_admin_permission_index from "@/views/admin_permission/command/cmd_admin_admin_permission_index";
import cmd_admin_admin_permission_show from "@/views/admin_permission/command/cmd_admin_admin_permission_show";
import cmd_admin_admin_permission_store from "@/views/admin_permission/command/cmd_admin_admin_permission_store";
import cmd_admin_admin_permission_update from "@/views/admin_permission/command/cmd_admin_admin_permission_update";
/**协议*/
export var HttpType = {
    admin_admin_permission_table_columns: "admin/admin_permission/table_columns",
    admin_admin_permission_index: "admin/admin_permission/index",
    admin_admin_permission_show: "admin/admin_permission/show/{permission_id}",
    admin_admin_permission_store: "admin/admin_permission/store",
    admin_admin_permission_update: "admin/admin_permission/update/{permission_id}",
};
/**事件*/
export var EventType = {
    admin_admin_permission_table_columns: "admin_admin_permission_table_columns",
    admin_admin_permission_index: "admin_admin_permission_index",
    admin_admin_permission_show: "admin_admin_permission_show",
    admin_admin_permission_store: "admin_admin_permission_store",
    admin_admin_permission_update: "admin_admin_permission_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_permission_table_columns, cmd_admin_admin_permission_table_columns);
facade.registerCommand(HttpType.admin_admin_permission_index, cmd_admin_admin_permission_index);
facade.registerCommand(HttpType.admin_admin_permission_show, cmd_admin_admin_permission_show);
facade.registerCommand(HttpType.admin_admin_permission_store, cmd_admin_admin_permission_store);
facade.registerCommand(HttpType.admin_admin_permission_update, cmd_admin_admin_permission_update);
