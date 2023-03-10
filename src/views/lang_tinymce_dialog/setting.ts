/**
 * description: 设置多语言的弹窗
 * document: http://35.76.23.220:8080/pages/viewpage.action?pageId=36766368
 */
import cmd_admin_plat_lang_table_columns from "@/views/lang_tinymce_dialog/command/cmd_admin_plat_lang_table_columns";
import cmd_admin_plat_lang_store from "@/views/lang_tinymce_dialog/command/cmd_admin_plat_lang_store";
import cmd_admin_system_lang_store from "@/views/lang_tinymce_dialog/command/cmd_admin_system_lang_store";
import cmd_admin_system_lang_check from "@/views/lang_tinymce_dialog/command/cmd_admin_system_lang_check";
import cmd_admin_plat_lang_update from "@/views/lang_tinymce_dialog/command/cmd_admin_plat_lang_update";

/**协议*/
export var HttpType = {
    admin_plat_lang_table_columns: "admin/plat_lang/table_columns ",
    admin_plat_lang_store: "admin/plat_lang/store",
    admin_system_lang_store: "admin/system_lang/store",
    admin_system_lang_check: "admin/system_lang/show_key",
    admin_plat_lang_update: "admin/plat_lang/update/{id}",
};
/**事件*/
export var EventType = {
    admin_plat_lang_table_columns: "admin_plat_lang_table_columns",
    admin_plat_lang_store: "admin_plat_lang_store",
    admin_system_lang_store: "admin_system_lang_store",
    admin_system_lang_check: "admin_system_lang_check",
    admin_plat_lang_update: "admin_plat_lang_update",
};
/**注册协议*/
const facade = puremvc.Facade.getInstance();
facade.registerCommand(HttpType.admin_plat_lang_table_columns, cmd_admin_plat_lang_table_columns);
facade.registerCommand(HttpType.admin_plat_lang_store, cmd_admin_plat_lang_store);
facade.registerCommand(HttpType.admin_system_lang_store, cmd_admin_system_lang_store);
facade.registerCommand(HttpType.admin_system_lang_check, cmd_admin_system_lang_check);
facade.registerCommand(HttpType.admin_plat_lang_update, cmd_admin_plat_lang_update);
