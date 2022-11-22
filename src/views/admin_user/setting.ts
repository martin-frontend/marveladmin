/**
 * description: 账号管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1706103
 */
import cmd_admin_admin_user_table_columns from "@/views/admin_user/command/cmd_admin_admin_user_table_columns";
import cmd_admin_admin_user_index from "@/views/admin_user/command/cmd_admin_admin_user_index";
import cmd_admin_admin_user_show from "@/views/admin_user/command/cmd_admin_admin_user_show";
import cmd_admin_admin_user_store from "@/views/admin_user/command/cmd_admin_admin_user_store";
import cmd_admin_admin_user_update from "@/views/admin_user/command/cmd_admin_admin_user_update";
import cmd_admin_plat_channel_index from "@/views/admin_user/command/cmd_admin_plat_channel_index";
/**协议*/
export var HttpType = {
    admin_admin_user_table_columns: "admin/admin_user/table_columns",
    admin_admin_user_index: "admin/admin_user/index",
    admin_admin_user_show: "admin/admin_user/show/{admin_user_id}",
    admin_admin_user_store: "admin/admin_user/store",
    admin_admin_user_update: "admin/admin_user/update/{admin_user_id}",
    admin_plat_channel_index: "admin/plat_channel/index",
};
/**事件*/
export var EventType = {
    admin_admin_user_table_columns: "admin_admin_user_table_columns",
    admin_admin_user_index: "admin_admin_user_index",
    admin_admin_user_show: "admin_admin_user_show",
    admin_admin_user_store: "admin_admin_user_store",
    admin_admin_user_update: "admin_admin_user_update",
    admin_plat_channel_index: "admin_plat_channel_index",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_admin_user_table_columns, cmd_admin_admin_user_table_columns);
facade.registerCommand(HttpType.admin_admin_user_index, cmd_admin_admin_user_index);
facade.registerCommand(HttpType.admin_admin_user_show, cmd_admin_admin_user_show);
facade.registerCommand(HttpType.admin_admin_user_store, cmd_admin_admin_user_store);
facade.registerCommand(HttpType.admin_admin_user_update, cmd_admin_admin_user_update);
facade.registerCommand(HttpType.admin_plat_channel_index, cmd_admin_plat_channel_index);
