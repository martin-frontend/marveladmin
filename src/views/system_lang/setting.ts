/**
 * description: 语言管理
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=1708654
 */
import cmd_admin_system_lang_table_columns from "@/views/system_lang/command/cmd_admin_system_lang_table_columns";
import cmd_admin_system_lang_index from "@/views/system_lang/command/cmd_admin_system_lang_index";
import cmd_admin_system_lang_store from "@/views/system_lang/command/cmd_admin_system_lang_store";
import cmd_admin_system_lang_update from "@/views/system_lang/command/cmd_admin_system_lang_update";
import cmd_admin_system_lang_delete from "@/views/system_lang/command/cmd_admin_system_lang_delete";
/**协议*/
export var HttpType = {
    admin_system_lang_table_columns: "admin/system_lang/table_columns",
    admin_system_lang_index: "admin/system_lang/index",
    admin_system_lang_store: "admin/system_lang/store",
    admin_system_lang_update: "admin/system_lang/update/{id}",
    admin_system_lang_delete: "admin/system_lang/delete/{id}",
};
/**事件*/
export var EventType = {
    admin_system_lang_table_columns: "admin_system_lang_table_columns",
    admin_system_lang_index: "admin_system_lang_index",
    admin_system_lang_store: "admin_system_lang_store",
    admin_system_lang_update: "admin_system_lang_update",
    admin_system_lang_delete: "admin_system_lang_delete",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_system_lang_table_columns, cmd_admin_system_lang_table_columns);
facade.registerCommand(HttpType.admin_system_lang_index, cmd_admin_system_lang_index);
facade.registerCommand(HttpType.admin_system_lang_store, cmd_admin_system_lang_store);
facade.registerCommand(HttpType.admin_system_lang_update, cmd_admin_system_lang_update);
facade.registerCommand(HttpType.admin_system_lang_delete, cmd_admin_system_lang_delete);

