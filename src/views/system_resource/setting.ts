/**
 * description: 资源管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66932, http://18.166.154.73:8090/pages/viewpage.action?pageId=67076
 */
import cmd_admin_system_resource_table_columns from "@/views/system_resource/command/cmd_admin_system_resource_table_columns";
import cmd_admin_system_resource_index from "@/views/system_resource/command/cmd_admin_system_resource_index";
import cmd_admin_system_resource_store from "@/views/system_resource/command/cmd_admin_system_resource_store";
import cmd_admin_system_resource_update from "@/views/system_resource/command/cmd_admin_system_resource_update";
import cmd_admin_resource_upload from "@/views/system_resource/command/cmd_admin_resource_upload";
/**协议*/
export var HttpType = {
    admin_system_resource_table_columns: "admin/system_resource/table_columns",
    admin_system_resource_index: "admin/system_resource/index",
    admin_system_resource_store: "admin/system_resource/store",
    admin_system_resource_update: "admin/system_resource/update/{id}",
    admin_resource_upload: "admin/resource/upload",
};
/**事件*/
export var EventType = {
    admin_system_resource_table_columns: "admin_system_resource_table_columns",
    admin_system_resource_index: "admin_system_resource_index",
    admin_system_resource_store: "admin_system_resource_store",
    admin_system_resource_update: "admin_system_resource_update",
    admin_resource_upload: "admin_resource_upload",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_resource_table_columns, cmd_admin_system_resource_table_columns);
facade.registerCommand(HttpType.admin_system_resource_index, cmd_admin_system_resource_index);
facade.registerCommand(HttpType.admin_system_resource_store, cmd_admin_system_resource_store);
facade.registerCommand(HttpType.admin_system_resource_update, cmd_admin_system_resource_update);
facade.registerCommand(HttpType.admin_resource_upload, cmd_admin_resource_upload);

