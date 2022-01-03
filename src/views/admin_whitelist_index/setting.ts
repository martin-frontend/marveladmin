/**
 * description: 登录白名单
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706935
 */
import cmd_admin_admin_whitelist_table_columns from "@/views/admin_whitelist_index/command/cmd_admin_admin_whitelist_table_columns";
import cmd_admin_admin_whitelist_index from "@/views/admin_whitelist_index/command/cmd_admin_admin_whitelist_index";
import cmd_admin_admin_whitelist_store from "@/views/admin_whitelist_index/command/cmd_admin_admin_whitelist_store";
import cmd_admin_admin_whitelist_update from "@/views/admin_whitelist_index/command/cmd_admin_admin_whitelist_update";
/**协议*/
export var HttpType = {
    admin_admin_whitelist_table_columns: "admin/admin_whitelist/table_columns",
    admin_admin_whitelist_index: "admin/admin_whitelist/index",
    admin_admin_whitelist_store: "admin/admin_whitelist/store",
    admin_admin_whitelist_update: "admin/admin_whitelist/update/{id}",
};
/**事件*/
export var EventType = {
    admin_admin_whitelist_table_columns: "admin_admin_whitelist_table_columns",
    admin_admin_whitelist_index: "admin_admin_whitelist_index",
    admin_admin_whitelist_store: "admin_admin_whitelist_store",
    admin_admin_whitelist_update: "admin_admin_whitelist_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_whitelist_table_columns, cmd_admin_admin_whitelist_table_columns);
facade.registerCommand(HttpType.admin_admin_whitelist_index, cmd_admin_admin_whitelist_index);
facade.registerCommand(HttpType.admin_admin_whitelist_store, cmd_admin_admin_whitelist_store);
facade.registerCommand(HttpType.admin_admin_whitelist_update, cmd_admin_admin_whitelist_update);

