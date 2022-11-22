/**
 * description: 系统参数
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1707872
 */
import cmd_admin_system_config_table_columns from "@/views/system_config/command/cmd_admin_system_config_table_columns";
import cmd_admin_system_config_index from "@/views/system_config/command/cmd_admin_system_config_index";
import cmd_admin_system_config_store from "@/views/system_config/command/cmd_admin_system_config_store";
import cmd_admin_system_config_update from "@/views/system_config/command/cmd_admin_system_config_update";
/**协议*/
export var HttpType = {
    admin_system_config_table_columns: "admin/system_config/table_columns",
    admin_system_config_index: "admin/system_config/index",
    admin_system_config_store: "admin/system_config/store",
    admin_system_config_update: "admin/system_config/update/{id}",
};
/**事件*/
export var EventType = {
    admin_system_config_table_columns: "admin_system_config_table_columns",
    admin_system_config_index: "admin_system_config_index",
    admin_system_config_store: "admin_system_config_store",
    admin_system_config_update: "admin_system_config_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_config_table_columns, cmd_admin_system_config_table_columns);
facade.registerCommand(HttpType.admin_system_config_index, cmd_admin_system_config_index);
facade.registerCommand(HttpType.admin_system_config_store, cmd_admin_system_config_store);
facade.registerCommand(HttpType.admin_system_config_update, cmd_admin_system_config_update);
