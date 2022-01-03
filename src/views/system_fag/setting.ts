/**
 * description: 系统常见问题配置
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=65744
 */
import cmd_admin_system_fag_table_columns from "@/views/system_fag/command/cmd_admin_system_fag_table_columns";
import cmd_admin_system_fag_index from "@/views/system_fag/command/cmd_admin_system_fag_index";
import cmd_admin_system_fag_show from "@/views/system_fag/command/cmd_admin_system_fag_show";
import cmd_admin_system_fag_store from "@/views/system_fag/command/cmd_admin_system_fag_store";
import cmd_admin_system_fag_update from "@/views/system_fag/command/cmd_admin_system_fag_update";
/**协议*/
export var HttpType = {
    admin_system_fag_table_columns: "admin/system_fag/table_columns",
    admin_system_fag_index: "admin/system_fag/index",
    admin_system_fag_show: "admin/system_fag/show/{id}",
    admin_system_fag_store: "admin/system_fag/store",
    admin_system_fag_update: "admin/system_fag/update/{id}",
};
/**事件*/
export var EventType = {
    admin_system_fag_table_columns: "admin_system_fag_table_columns",
    admin_system_fag_index: "admin_system_fag_index",
    admin_system_fag_show: "admin_system_fag_show",
    admin_system_fag_store: "admin_system_fag_store",
    admin_system_fag_update: "admin_system_fag_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_fag_table_columns, cmd_admin_system_fag_table_columns);
facade.registerCommand(HttpType.admin_system_fag_index, cmd_admin_system_fag_index);
facade.registerCommand(HttpType.admin_system_fag_show, cmd_admin_system_fag_show);
facade.registerCommand(HttpType.admin_system_fag_store, cmd_admin_system_fag_store);
facade.registerCommand(HttpType.admin_system_fag_update, cmd_admin_system_fag_update);

