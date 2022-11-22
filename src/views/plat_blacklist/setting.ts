/**
 * description: 黑名单管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=67101
 */
import cmd_admin_plats_blacklist_table_columns from "@/views/plat_blacklist/command/cmd_admin_plats_blacklist_table_columns";
import cmd_admin_plats_blacklist_index from "@/views/plat_blacklist/command/cmd_admin_plats_blacklist_index";
import cmd_admin_plats_blacklist_store from "@/views/plat_blacklist/command/cmd_admin_plats_blacklist_store";
import cmd_admin_plats_blacklist_update from "@/views/plat_blacklist/command/cmd_admin_plats_blacklist_update";
import cmd_admin_plats_blacklist_delete_batch from "@/views/plat_blacklist/command/cmd_admin_plats_blacklist_delete_batch";
/**协议*/
export var HttpType = {
    admin_plats_blacklist_table_columns: "admin/plats_blacklist/table_columns",
    admin_plats_blacklist_index: "admin/plats_blacklist/index",
    admin_plats_blacklist_store: "admin/plats_blacklist/store",
    admin_plats_blacklist_update: "admin/plats_blacklist/update/{id}",
    admin_plats_blacklist_delete_batch: "admin/plats_blacklist/delete_batch",
};
/**事件*/
export var EventType = {
    admin_plats_blacklist_table_columns: "admin_plats_blacklist_table_columns",
    admin_plats_blacklist_index: "admin_plats_blacklist_index",
    admin_plats_blacklist_store: "admin_plats_blacklist_store",
    admin_plats_blacklist_update: "admin_plats_blacklist_update",
    admin_plats_blacklist_delete_batch: "admin_plats_blacklist_delete_batch",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plats_blacklist_table_columns, cmd_admin_plats_blacklist_table_columns);
facade.registerCommand(HttpType.admin_plats_blacklist_index, cmd_admin_plats_blacklist_index);
facade.registerCommand(HttpType.admin_plats_blacklist_store, cmd_admin_plats_blacklist_store);
facade.registerCommand(HttpType.admin_plats_blacklist_update, cmd_admin_plats_blacklist_update);
facade.registerCommand(HttpType.admin_plats_blacklist_delete_batch, cmd_admin_plats_blacklist_delete_batch);
